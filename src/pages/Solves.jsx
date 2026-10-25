function SolvesScreen({ go }) {
  const { Badge, Band, Skyline, Button, Stat, PixelProgress } = window.DS;
  const rows = [
    ['Instance', 'secp80k1 (p = 2^80 − 8259)', true],
    ['Curve order n', '1208925819612459780337609', true],
    ['Public point P', '030D08430A6C00FAE05651', true],
    ['Target point Q', '02CF45D656507F3699875E', true],
    ['Discrete log kappa', '0x27f35e126a10e6e7d3d4', true],
    ['Solved', '2026-10-24, ~15:37 UTC', true],
    ['Method', 'Parallel Pollard rho with distinguished points, full range (the ladder cards are not interval-restricted)'],
    ['Hardware', 'One consumer-class GPU'],
    ['Verification file', <a href="https://github.com/decruptor/ecdlp-ladder" style={LINK}>result_80.json</a>],
  ];
  return (
    <main>
      <PageTitle eyebrow={<Badge tone="teal" mark>Solved · rung 80</Badge>} title="“Brace for impact” ECDLP ladder" intro="First classical solve of the ladder from arXiv:2508.14011." />
      <section style={{ padding: '96px 120px 0', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 40 }}>
        <Stat value="~31" unit="minutes" title="Wall time" description="At ~0.88 billion group operations per second." />
        <Stat value="1.4e12" unit="ops expected" title="Expected cost" description="1.25·√n group operations for the full range." />
        <Stat value="1.19×" unit="drawn" title="This run" description="Operations drawn relative to the expected cost." />
      </section>
      <section style={{ padding: '96px 120px 0' }}><RecordTable rows={rows} /></section>

      <div style={{ marginTop: 120 }}>
        <Skyline tone="teal" preset="city" />
        <Band tone="teal" innerStyle={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center', textAlign: 'center' }}>
          <h2 style={H_SECTION}>Check it yourself</h2>
          <span style={{ fontFamily: 'var(--font-data)', fontWeight: 500, fontSize: 46, letterSpacing: '.02em', color: 'var(--ink-900)' }}>P = [κ]·Q</span>
          <p style={{ ...BODY, maxWidth: 640 }}>Ten lines of Python on any laptop. No trust required.</p>
          <Button variant="teal" href="https://github.com/decruptor/ecdlp-ladder">Open result_80.json</Button>
        </Band>
      </div>

      <section style={{ padding: '160px 222px 0', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 56 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={H3}>Verification discipline</h3>
          <p style={BODY}>The GPU result was validated bit-for-bit against an independent CPU reference build before any counter was trusted. During this campaign we found and fixed a silent compiler miscompile on a new GPU architecture that corrupted walk states while looking perfectly healthy at the PTX level. Details are in the ladder repository.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={H3}>Note on the two “ladders”</h3>
          <p style={BODY}>The arXiv ladder (this solve) is a synthetic challenge series intended to demonstrate quantum advantage; it carries no Bitcoin prize. The public Bitcoin puzzle transaction is a separate, older challenge family. Both appear in our research because they are the same mathematics at different sizes.</p>
        </div>
      </section>
      <div style={{ height: 160 }} />
      <RungStatus />
    </main>
  );
}
window.SolvesScreen = SolvesScreen;
