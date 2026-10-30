// Build-time data pipeline for the "State of the Hunt" page.
// Reads the campaign's local analytics sources and emits src/data/hunt.json.
// Deterministic: no network, no clock-dependent values except the single
// "generated" stamp. Fails loudly if the data contradicts known invariants,
// so a silently-corrupt source can never ship as a pretty number.
//
// Sources (all local, maintained by the analytics lane):
//   analytics/btc_puzzle_state.csv   — all 256 rungs
//   analytics/solves.csv             — dated solve events across series
//   analytics/PUZZLE-ECONOMY.md      — fitted pace, forecast, caveat sentences
//   publish-kit/repo-ladder/result_*.json — our verified ladder records

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..', '..', '..'); // puzzle-hq monorepo root
const OUT = resolve(HERE, '..', 'src', 'data', 'hunt.json');

const read = (p) => readFileSync(join(ROOT, p), 'utf8');

// --- minimal RFC-4180 CSV (handles quoted fields with commas) --------------
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQ = false;
      } else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.length > 1 || row[0] !== '') rows.push(row);
  return rows;
}

const bool = (s) => s === 'True';
const num = (s) => (s === '' ? null : Number(s));

// --- 1. per-rung state ------------------------------------------------------
const rungRows = parseCSV(read('analytics/btc_puzzle_state.csv'));
const rungHeader = rungRows[0];
const rungs = rungRows.slice(1).map((r) => {
  const o = Object.fromEntries(rungHeader.map((h, i) => [h, r[i]]));
  const n = Number(o.n);
  const solved = bool(o.solved);
  const claimed = bool(o.claimed);
  const pubkey_known = bool(o.pubkey_known);
  const live = num(o.live_prize_sats);
  const prize_btc = live == null ? 0 : Math.round((live / 1e8) * 1000) / 1000;
  const claim_year = o.claim_utc ? Number(o.claim_utc.slice(0, 4)) : null;
  let state;
  if (solved) state = 'solved';
  else if (prize_btc > 0 && pubkey_known) state = 'pubkey';
  else if (prize_btc > 0) state = 'blind';
  else state = 'unfunded';
  return { n, prize_btc, solved, claimed, pubkey_known, claim_year, state };
});

// --- 2. headline numbers (computed from the rung table) ---------------------
const unclaimed = rungs.filter((r) => r.n <= 160 && !r.claimed);
const pool_btc = unclaimed.reduce((s, r) => s + r.prize_btc, 0);
const kangaroo = unclaimed.filter((r) => r.pubkey_known);
const kangaroo_btc = kangaroo.reduce((s, r) => s + r.prize_btc, 0);
const blind_btc = Math.round((pool_btc - kangaroo_btc) * 10) / 10;
const counts = {
  solved: rungs.filter((r) => r.state === 'solved').length,
  pubkey: rungs.filter((r) => r.state === 'pubkey').length,
  blind: rungs.filter((r) => r.state === 'blind').length,
  unfunded: rungs.filter((r) => r.state === 'unfunded').length,
};

// --- 3. series summary from solves.csv --------------------------------------
const solveRows = parseCSV(read('analytics/solves.csv'));
const sHeader = solveRows[0];
const events = solveRows.slice(1).map((r) => Object.fromEntries(sHeader.map((h, i) => [h, r[i]])));
const seriesMap = new Map();
for (const e of events) {
  if (!seriesMap.has(e.series)) seriesMap.set(e.series, []);
  seriesMap.get(e.series).push(e);
}
const series = [...seriesMap.entries()].map(([name, list]) => {
  const dates = list.map((e) => e.solved_utc).filter((d) => /^\d{4}-\d{2}-\d{2}/.test(d)).sort();
  return {
    series: name,
    events: list.length,
    first: dates[0] ? dates[0].slice(0, 10) : null,
    last: dates[dates.length - 1] ? dates[dates.length - 1].slice(0, 10) : null,
  };
}).sort((a, b) => (a.first || '9999').localeCompare(b.first || '9999') || a.series.localeCompare(b.series));

// --- 4. our verified ladder records (kappa decimal must equal hex) ----------
const ladderBits = [48, 64, 80, 96];
const ladderEvents = new Map(
  events.filter((e) => e.series === 'arxiv-2508.14011-ladder').map((e) => [Number(e.size_bits), e])
);
const ladder = ladderBits.map((bits) => {
  const res = JSON.parse(read(`publish-kit/repo-ladder/result_${bits}.json`));
  if (res.bits !== bits) throw new Error(`result_${bits}.json: bits mismatch (${res.bits})`);
  if (res.verified !== true) throw new Error(`result_${bits}.json: not marked verified`);
  if (BigInt(res.kappa) !== BigInt(res.hex)) {
    throw new Error(`result_${bits}.json: kappa decimal != int(hex,16) — refusing to publish`);
  }
  const ev = ladderEvents.get(bits);
  if (!ev || !ev.solved_utc) throw new Error(`no dated solve event for ladder rung ${bits} in solves.csv`);
  return {
    bits,
    kappa_hex: res.hex,
    time_s: res.time_s,
    date: ev.solved_utc.slice(0, 10),
    method: res.method,
  };
});

// --- 5. fitted pace + forecast + honest caveat, from the analytics doc ------
const md = read('analytics/PUZZLE-ECONOMY.md');
const grab = (re, what) => {
  const m = md.match(re);
  if (!m) throw new Error(`PUZZLE-ECONOMY.md: could not extract ${what}`);
  return m;
};
const as_of = grab(/^\*\*Decruptor lane 4 · (\d{4}-\d{2}-\d{2})/m, 'as-of date')[1];
const rateRow = grab(/hard rungs[^\n]*\|\s*\*\*([0-9.]+)\*\*\s*\|\s*\*\*([0-9.]+)\*\*/, 'frontier rate row');
const forecast140 = grab(/^\|\s*140\s*\|\s*14\.0\s*\|\s*\*\*([0-9.]+)\*\*\s*\|\s*([0-9.]+\-[0-9.]+)\s*\|/m, '#140 forecast row');
const summary = md.split('## Site-ready summary')[1].split('\n---')[0].replace(/\s+/g, ' ').trim();
const caveat = summary.match(/These are estimates, not predictions:.*?publicly retired\./);
if (!caveat) throw new Error('PUZZLE-ECONOMY.md: could not extract forecast caveat sentence');

const headline = {
  pool_btc: Math.round(pool_btc * 10) / 10,
  pool_addresses: unclaimed.length,
  kangaroo_btc: Math.round(kangaroo_btc * 10) / 10,
  kangaroo_share_pct: Math.round((kangaroo_btc / pool_btc) * 1000) / 10,
  blind_btc,
  frontier_bits_per_year: Number(rateRow[1]),
  frontier_se: Number(rateRow[2]),
  forecast_140_year: Number(forecast140[1]),
  forecast_140_band: forecast140[2],
  caveat: caveat[0],
};

// --- 6. invariants: fail the build rather than ship a wrong number ----------
const expect = (ok, msg) => { if (!ok) throw new Error('invariant failed: ' + msg); };
expect(rungs.length === 256, `expected 256 rungs, got ${rungs.length}`);
expect(rungs.every((r, i) => r.n === i + 1), 'rung n must be 1..256 in order');
expect(headline.pool_addresses === 77, `expected 77 unclaimed addresses <=160, got ${headline.pool_addresses}`);
expect(headline.pool_btc > 800 && headline.pool_btc < 1000, `pool_btc out of range: ${headline.pool_btc}`);
expect(headline.kangaroo_btc > 70 && headline.kangaroo_btc < 80, `kangaroo_btc out of range: ${headline.kangaroo_btc}`);
expect(counts.solved + counts.pubkey + counts.blind + counts.unfunded === 256, 'state counts must cover all 256 rungs');
expect(counts.solved === 83 && counts.pubkey === 5, `unexpected state counts: ${JSON.stringify(counts)}`);
expect(series.reduce((s, x) => s + x.events, 0) === events.length, 'series event counts must sum to all rows');
expect(ladder.length === 4, 'expected 4 verified ladder records');

// --- fleet / search-progress snapshot --------------------------------------
// analytics/pool-stats.json is refreshed out-of-band (refresh-pool-stats.sh)
// from the real GPU rate and the live distinguished-point count, so the
// published numbers track reality without hand-editing the page. The page
// derives the phone-equivalents, odds and banked-work figures from these.
// pool-stats.json lives in this repo (src/data/) so the CI build and the
// decruptor-pool updater share one source. decruptor-pool patches it + hunt.json's
// fleet block directly; the Mac's full build regenerates hunt.json from it.
const POOL_STATS = resolve(HERE, '..', 'src', 'data', 'pool-stats.json');
let fleet = { gkps: 6.2, dp_count: 226421, dp_bits: 30, as_of };  // fallback snapshot
if (existsSync(POOL_STATS)) {
  const ps = JSON.parse(readFileSync(POOL_STATS, 'utf8'));
  expect(ps.gkps > 0 && Number.isFinite(ps.dp_count) && ps.dp_count >= 0 && ps.dp_bits > 0,
    `pool-stats.json: bad values ${JSON.stringify(ps)}`);
  fleet = { gkps: ps.gkps, dp_count: ps.dp_count, dp_bits: ps.dp_bits, as_of: ps.as_of || as_of };
}

const data = {
  generated: new Date().toISOString().slice(0, 10),
  as_of,
  fleet,
  sources: {
    rungs: 'analytics/btc_puzzle_state.csv',
    events: 'analytics/solves.csv',
    economy: 'analytics/PUZZLE-ECONOMY.md',
    ladder: 'publish-kit/repo-ladder/result_{48,64,80,96}.json',
  },
  headline,
  counts,
  rungs,
  series,
  ladder,
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(data, null, 1) + '\n');
console.log(`hunt.json: ${rungs.length} rungs, pool ${headline.pool_btc} BTC, ${headline.pool_addresses} unclaimed, kangaroo ${headline.kangaroo_btc} BTC (${headline.kangaroo_share_pct}%), ${ladder.length} ladder records, as-of ${as_of}`);
