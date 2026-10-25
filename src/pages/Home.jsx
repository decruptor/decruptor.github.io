function HomeScreen({ go }) {
  const { Button, Skyline, Band, Step, DataReadout, Tag } = window.DS;
  const recent = [
    ['2026-10-25', 'State of the Hunt: the public puzzle economy, measured', 'hunt'],
    ['2026-10-24', 'Rung 80 solved and published', 'solves'],
    ['2026-10-24', 'SOTA walk-constants paper submitted to IACR ePrint', 'research'],
    ['2026-10-25', 'Wallet-recovery scam checklist and AI/GPU capability benchmark published', 'recovery'],
  ];
  return (
    <main>
      <section style={{ position: 'relative', padding: '96px 120px 0', display: 'grid', gridTemplateColumns: 'minmax(0,895px) auto', justifyContent: 'space-between', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 70, lineHeight: '75px', letterSpacing: '.01em', color: 'var(--violet-500)', textWrap: 'balance' }}>We solve, we publish, we verify twice.</h1>
          <p style={{ ...BODY }}>Independent research on the computational side of lost cryptographic keys — elliptic-curve discrete logarithms, key-derivation forensics, and the public Bitcoin puzzle economy.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 46, alignItems: 'flex-end' }}>
          <DataReadout lines={['Rung 80: solved 2026-10-24', 'Verified: GPU + CPU replay', 'ePrint: 2026/112804']} />
          <DataReadout heading="Current challenge" tone="violet" lines={['Rung 96: in progress', 'Window: 2026-10-26 UTC']} />
        </div>
      </section>

      <section style={{ padding: '120px 222px 0', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <p style={LEAD}>A public record of work: publications, solved challenges with verification files, and honest notes on what current techniques can and cannot do.</p>
      </section>

      <section style={{ padding: '96px 120px 0', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 40 }}>
        <Step index="[ 1 ]" title="Rung 80, solved" description="First classical solve on the “Brace for impact” ECDLP ladder (October 2026), verified independently twice." action={<Button variant="ink" size="md" onClick={() => go('solves')}>The record</Button>} />
        <Step index="[ 2 ]" title="Walk-constants paper" description="On the walk constants behind the fastest public ECDLP solvers — submitted to IACR ePrint, October 2026." action={<Tag tone="blue">ePrint 2026/112804 · pending</Tag>} />
        <Step index="[ 3 ]" title="Open tooling" description="Open-source tooling and verification artifacts for everything we claim." action={<Tag tone="teal" href="https://github.com/decruptor">github.com/decruptor</Tag>} />
      </section>

      <div style={{ marginTop: 120 }}>
        <Skyline tone="violet" preset="stairs" />
        <Band tone="violet" innerStyle={{ padding: '52px 68px', display: 'flex', flexDirection: 'column', gap: 48, alignItems: 'flex-start' }}>
          <span style={{ ...LABEL, color: 'var(--violet-700)' }}>What this site is not</span>
          <p style={{ ...LEAD, maxWidth: 1040 }}>We do not offer services through this site. We do not take contact requests. We never message anyone first. Corrections happen as public git commits, never silently. If you have lost access to a wallet, start with the scam checklist — and be suspicious of anyone who contacts you, including anyone claiming to be us.</p>
          <Button variant="ink" onClick={() => go('recovery')}>Read the scam checklist</Button>
        </Band>
      </div>

      <div style={{ height: 160 }} />
      <RungStatus go={go} />

      <section style={{ padding: '160px 120px 0', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <h2 style={H_SECTION}>Recent</h2>
        <div style={{ borderTop: '1px solid var(--ink-20)' }}>
          {recent.map(([d, t, p]) => (
            <a key={t} href={'#' + p} onClick={(e) => { e.preventDefault(); go(p); }}
              style={{ display: 'grid', gridTemplateColumns: '220px minmax(0,1fr) auto', gap: 24, alignItems: 'baseline', padding: '24px 0', borderBottom: '1px solid var(--ink-20)', textDecoration: 'none', color: 'var(--ink-900)' }}>
              <span style={{ fontFamily: 'var(--font-data)', fontWeight: 500, fontSize: 20, letterSpacing: '.05em', color: 'var(--teal-700)' }}>{d}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 32, lineHeight: 1.2 }}>{t}</span>
              <span style={{ ...LABEL, fontSize: 16, color: 'var(--violet-500)' }}>Details →</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
window.HomeScreen = HomeScreen;
