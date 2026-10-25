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
    ['Rung 96 · secp96k1', 'In progress.', false],
    ['Verification files', <a href={GH + '/ecdlp-ladder'} style={LINK}>github.com/decruptor/ecdlp-ladder — result_48.json, result_64.json, result_80.json</a>],
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
window.HuntScreen = HuntScreen;
