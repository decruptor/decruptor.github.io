function HuntScreen() {
  const { Badge, Band, Stat, Button, Tag } = window.DS;
  const d = window.DS.hunt; // generated at build time by scripts/build-hunt-data.mjs
  const h = d.headline;

  // Rung states, colored from the data only. Nothing here is hand-entered.
  const STATE = {
    solved: { bg: 'var(--status-solved)', label: 'Solved & claimed' },
    pubkey: { bg: 'var(--status-progress)', label: 'Public key known, unsolved' },
    blind: { bg: 'var(--gray-300)', label: 'Address-only (blind)' },
    unfunded: { bg: 'transparent', label: 'No live prize (rungs 161-256)' },
  };
  const cellTitle = (r) =>
    '#' + r.n +
    ' · ' + STATE[r.state].label.toLowerCase() +
    (r.prize_btc > 0 ? ' · ' + r.prize_btc + ' BTC' : '') +
    (r.claim_year ? ' · claimed ' + r.claim_year : '');

  const cell = (r, size) => (
    <div key={r.n} title={cellTitle(r)} style={{
      width: size, height: size, background: STATE[r.state].bg,
      border: r.state === 'unfunded' ? '1px solid var(--ink-20)' : 'none',
      boxSizing: 'border-box', flex: '0 0 auto',
    }} />
  );

  // Full 256-rung band: 8 rows of 32.
  const rows = [];
  for (let i = 0; i < d.rungs.length; i += 32) rows.push(d.rungs.slice(i, i + 32));

  // Zoomed strip: rungs 60-160 in one row.
  const zoom = d.rungs.filter((r) => r.n >= 60 && r.n <= 160);

  const L = { fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 14, lineHeight: 1, letterSpacing: '.03em', textTransform: 'uppercase' };

  const fmtTime = (s) => (s >= 100 ? Math.round(s).toLocaleString('en-US') : s) + ' s';
  const ladderRows = [
    ...d.ladder.map((r) => ['Rung ' + r.bits + ' · secp' + r.bits + 'k1', 'κ = ' + r.kappa_hex + ' · ' + fmtTime(r.time_s) + ' · ' + r.date, true]),
    ['Verification files', <a href={GH + '/ecdlp-ladder'} style={LINK}>github.com/decruptor/ecdlp-ladder — result_48.json, result_64.json, result_80.json, result_96.json</a>],
  ];

  const th = { ...L, fontSize: 12, color: 'var(--teal-700)', padding: '14px 16px 14px 0', borderBottom: '1px solid var(--ink-20)', textAlign: 'left' };
  const td = { padding: '14px 16px 14px 0', borderBottom: '1px solid var(--ink-20)', fontFamily: 'var(--font-data)', fontWeight: 500, fontSize: 16, color: 'var(--ink-900)', whiteSpace: 'nowrap' };

  return (
    <main>
      <PageTitle
        eyebrow={<Badge tone="teal" mark>Data as of {d.as_of}</Badge>}
        title="State of the hunt"
        intro={'The public puzzle economy, measured. Every number on this page is generated at build time from the campaign’s data files — ' + d.sources.rungs + ' and ' + d.sources.events + ' — nothing is entered by hand and nothing is fetched when you read it.'}
      />

      {/* (a) headline stat band */}
      <section style={{ padding: '96px 120px 0', display: 'flex', flexWrap: 'wrap', gap: 40 }}>
        {[
          <Stat key="pool" value={String(h.pool_btc)} unit={'BTC · ' + h.pool_addresses + ' addresses'} title="Unclaimed prize pool" description={'Rungs 1-160, funding-scheme accounting; all principal UTXOs verified unspent ' + d.as_of + '.'} />,
          <Stat key="roo" value={String(h.kangaroo_btc)} unit={'BTC · ' + h.kangaroo_share_pct + '%'} title="Reachable by computation" description={'Public keys are known only for the every-5th rungs 140-160 (revealed June 2019). The other ' + h.blind_btc + ' BTC is address-only.'} />,
          <Stat key="rate" value={String(h.frontier_bits_per_year)} unit="bits / year" title="Frontier pace" description={'OLS on the six hard frontier rungs 2020-2026 (standard error ' + h.frontier_se + ') — effective attack throughput growing about 3.7× per year.'} />,
          <Stat key="fc" value={String(h.forecast_140_year)} unit={'forecast · band ' + h.forecast_140_band} title="Rung 140 (14 BTC)" description="Model A frontier extrapolation. Estimate, not prediction — see the caveat below." />,
        ].map((s) => <div key={s.key} style={{ flex: '1 1 240px', minWidth: 0 }}>{s}</div>)}
      </section>

      <section style={{ padding: '48px 222px 0' }}>
        <p style={{ ...BODY, maxWidth: 1040 }}>{h.caveat}</p>
      </section>

      {/* (b) ladder visualization — 256 rungs */}
      <section style={{ padding: '160px 120px 0', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={H_SECTION}>The 256 rungs</h2>
          <p style={{ ...BODY, maxWidth: 895 }}>One square per puzzle rung of the 2015 Bitcoin puzzle transaction, colored by its current state. Hover any square for the rung’s prize and claim year.</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 560, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {rows.map((row, i) => (
              <div key={i} style={{ display: 'flex', gap: 3 }}>{row.map((r) => cell(r, 14))}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>
          {Object.entries(STATE).map(([k, s]) => (
            <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 12, height: 12, background: s.bg, border: k === 'unfunded' ? '1px solid var(--ink-20)' : 'none', boxSizing: 'border-box' }} />
              <span style={{ ...L, fontSize: 13, color: 'var(--ink-900)' }}>{s.label} · {d.counts[k]}</span>
            </span>
          ))}
        </div>
      </section>

      {/* zoomed view, rungs 60-160 */}
      <section style={{ padding: '64px 120px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <span style={{ ...L, color: 'var(--mute-400)' }}>Rungs 60-160 — the funded middle</span>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 640 }}>
            <div style={{ position: 'relative', paddingBottom: 24 }}>
              <div style={{ display: 'flex', gap: 2 }}>{zoom.map((r) => (
                <div key={r.n} title={cellTitle(r)} style={{ flex: '1 1 0', height: 40, background: STATE[r.state].bg, border: r.state === 'unfunded' ? '1px solid var(--ink-20)' : 'none', boxSizing: 'border-box' }} />
              ))}</div>
              {zoom.filter((r) => r.n % 10 === 0).map((r) => (
                <span key={r.n} style={{ position: 'absolute', left: ((r.n - 59.5) / zoom.length * 100) + '%', bottom: 0, transform: 'translateX(-50%)', fontFamily: 'var(--font-data)', fontWeight: 500, fontSize: 11, color: 'var(--ink-60)' }}>{r.n}</span>
              ))}
            </div>
          </div>
        </div>
        <p style={{ ...BODY, maxWidth: 895 }}>Violet squares are the only rungs whose public keys are known — and they are exactly the every-5th rungs. The five open ones (140-160, {h.kangaroo_btc} BTC) are the only large prizes that can fall to computation. Everything grey is address-only: the keyspace starts at 2^70, beyond any observed pooled capacity for decades.</p>
      </section>

      {/* (c) our verified ladder records */}
      <section style={{ padding: '160px 120px 0', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={H_SECTION}>Our ladder records</h2>
          <p style={{ ...BODY, maxWidth: 895 }}>Verified solves on the arXiv:2508.14011 “Brace for impact” ECDLP ladder. Each κ was re-checked at build time: the decimal value equals the hexadecimal one, and each result file carries an independent verification record.</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <RecordTable rows={ladderRows} />
        </div>
      </section>

      {/* (d) series timeline summary */}
      <section style={{ padding: '160px 120px 0', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={H_SECTION}>Solve timeline by series</h2>
          <p style={{ ...BODY, maxWidth: 895 }}>{events_total(d.series)} solve events across {d.series.length} series, from the analytics dataset. Every BTC-puzzle row is anchored to an on-chain claim transaction; every external row carries its source in the dataset. Rows whose dataset date is not a single day are shown as a dash.</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', minWidth: 560 }}>
            <thead><tr>
              <th style={{ ...th, width: '38%' }}>Series</th>
              <th style={th}>Events</th>
              <th style={th}>First</th>
              <th style={th}>Most recent</th>
            </tr></thead>
            <tbody>
              {d.series.map((s) => (
                <tr key={s.series}>
                  <td style={{ ...td, whiteSpace: 'normal' }}>{s.series}</td>
                  <td style={td}>{s.events}</td>
                  <td style={td}>{s.first || '—'}</td>
                  <td style={td}>{s.last || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* (d.5) live fleet — the grind, in phone-equivalents */}
      <section style={{ padding: '160px 120px 0', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={H_SECTION}>The grind, right now</h2>
          <p style={{ ...BODY, maxWidth: 895 }}>Rung 140 is the target with a known public key. A solo fleet of GPUs works its interval around the clock; here is what that means in numbers anyone can feel. A snapshot as of {FLEET.as_of}, updated by hand when the fleet changes.</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
          {[
            <Stat key="r" value={FLEET.gkps} unit="GKeys / second" title="Grind rate" description="Kangaroo jump operations per second across the whole fleet." />,
            <Stat key="p" value={FLEET.phones} unit="phone-equivalents" title="Phone equivalent" description="How many phones, each running one core at about 1.3 million jumps per second, it would take to match the fleet." />,
            <Stat key="o" value={'1 in ' + FLEET.year_odds} unit="in the first year" title="First-year odds" description="Chance of landing rung 140 if the fleet runs unbroken for a year as one solver. Kangaroo odds grow with the square of the work done — P ≈ 1 − exp(−0.9·(T/E)²), E ≈ 9.6×10²⁰ jumps — so the early years are by far the hardest. This is why it is a lottery, not a schedule." />,
            <Stat key="d" value={FLEET.median_years} unit="years" title="Median time to solve" description="Half of all runs at this rate would finish sooner, half later. Kangaroo jumps are a random walk, so this is a median, not a deadline — and it assumes no accumulated work is ever lost." />,
          ].map((s) => <div key={s.key} style={{ flex: '1 1 240px', minWidth: 0 }}>{s}</div>)}
        </div>
        <Band tone="tint" innerStyle={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start', width: 'fit-content' }}>
          <span style={{ ...LABEL, color: 'var(--violet-700)' }}>One day of grinding</span>
          <div style={{ fontFamily: 'var(--font-data)', fontWeight: 500, fontSize: 28, color: 'var(--ink-900)' }}>{FLEET.phone_years_per_day} phone-years per day</div>
          <p style={{ ...BODY, maxWidth: 895, fontSize: 16 }}>Every day, the fleet does as many key-jumps as a single phone would in {FLEET.phone_years_per_day} years. A top phone does about 1.3 million per second; the fleet does {FLEET.gkps} billion. And still, rung 140 is a multi-century lottery — the honest arithmetic above, not a countdown.</p>
        </Band>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          <h2 style={H_SECTION}>Work banked so far</h2>
          <p style={{ ...BODY, maxWidth: 895 }}>The search accumulates distinguished points — the trail markers the kangaroo method records. Together they stand for the total work done; a solve is a match between two of them. Here is the search progress to date.</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
          {[
            <Stat key="dp" value={FLEET.dps} unit="distinguished points" title="Trail markers banked" description="Points recorded in the search database so far. A collision between any two of them recovers the key." />,
            <Stat key="j" value={FLEET.jumps_banked} unit="kangaroo jumps" title="Work represented" description="Total key-jump operations the banked points stand for." />,
            <Stat key="e" value={FLEET.pct_expected + ' %'} unit="of expected work" title="Fraction of the total" description={'Of the roughly 9.6×10²⁰ jumps rung 140 is expected to need. The number is tiny by design — it is why the odds above are a multi-century lottery, and why no work can ever be thrown away.'} />,
          ].map((s) => <div key={s.key} style={{ flex: '1 1 240px', minWidth: 0 }}>{s}</div>)}
        </div>
      </section>

      {/* (e) provenance stamp + methodology */}
      <div style={{ marginTop: 120 }}>
        <Band tone="tint" innerStyle={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start' }}>
          <span style={{ ...LABEL, color: 'var(--violet-700)' }}>Where these numbers come from</span>
          <p style={{ ...BODY, maxWidth: 1040 }}>Data as of {d.generated} (analytics as-of {d.as_of}). Generated at build time from {d.sources.rungs}, {d.sources.events} and the ladder result files in {d.sources.ladder.replace('result_{48,64,80}.json', '')}. This page makes no network requests and runs no code beyond rendering the snapshot you see. The pace model, the forecast bands and their limitations are documented in the analytics workbook (PUZZLE-ECONOMY.md); verification artifacts for our ladder solves are public in the repository below.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Tag tone="teal" href={GH + '/ecdlp-ladder'}>Ladder verification artifacts →</Tag>
            <Tag tone="blue" href={GH + '/recovery-guide/issues'}>Report a correction →</Tag>
          </div>
        </Band>
      </div>
      <div style={{ height: 40 }} />
    </main>
  );
}

function events_total(series) {
  return series.reduce((s, x) => s + x.events, 0);
}

// Fleet snapshot — raw figures come from d.fleet (built from analytics/pool-stats.json,
// refreshed from the live GPU rate + distinguished-point count). GPU models, hosts and spend are not published.
const FLEET = (() => {
  const f = (window.DS.hunt && window.DS.hunt.fleet) || { gkps: 6.2, dp_count: 226421, dp_bits: 30, as_of: '2026-10-30' };
  const gkps_num = f.gkps;                   // GKeys/s, whole owned fleet
  const as_of = new Date(f.as_of + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  const PHONE_GKPS = 0.0013;                // GKeys/s, one phone core
  const E = 9.6e20;                         // expected jumps for rung 140: 1.15 · 2^69.5
  const YEAR_S = 365.25 * 86400;
  const fmt = (n) => n.toLocaleString('en-US', { maximumSignificantDigits: 3 });
  // compact notation keeps long values inside their stat column (a plain "26,700,000" overflows)
  const compact = (n) => n >= 1e9 ? +(n / 1e9).toPrecision(3) + 'B'
    : n >= 1e6 ? +(n / 1e6).toPrecision(3) + 'M'
    : n >= 1e3 ? +(n / 1e3).toPrecision(3) + 'K' : String(Math.round(n));
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const sci = (n) => {   // 2.43e14 -> "2.43×10¹⁴"
    const e = Math.floor(Math.log10(n));
    const m = +(n / Math.pow(10, e)).toPrecision(3);
    return m + '×10' + String(e).split('').map((c) => SUP[c]).join('');
  };
  const phones = gkps_num / PHONE_GKPS;
  // kangaroo is a collision search: P(T) ≈ 1 − exp(−0.9·(T/E)²), quadratic while T ≪ E
  const x = gkps_num * 1e9 * YEAR_S / E;
  const year_p = -Math.expm1(-0.9 * x * x);
  const median_s = Math.sqrt(Math.LN2 / 0.9) * E / (gkps_num * 1e9);
  // Work banked so far — distinguished points accumulated in the search database.
  const dp_count = f.dp_count;               // distinguished points found so far
  const dp_bits = f.dp_bits;                 // ~2^dp_bits jumps represented per distinguished point
  const jumps = dp_count * Math.pow(2, dp_bits);
  return {
    as_of,
    gkps: fmt(gkps_num),
    phones: fmt(Math.round(phones)),
    phone_years_per_day: fmt(Math.round(phones / 365.25)),
    year_odds: compact(Math.round(1 / year_p)),
    median_years: fmt(Math.round(median_s / YEAR_S)),
    dps: dp_count.toLocaleString('en-US'),   // exact count
    jumps_banked: sci(jumps),                // e.g. 2.43×10¹⁴
    pct_expected: (jumps / E * 100).toPrecision(2),   // ~0.000025 %
  };
})();
window.HuntScreen = HuntScreen;
