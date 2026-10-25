const SG = { fontFamily: 'var(--font-data)', fontWeight: 500, fontSize: 12, lineHeight: '16px', letterSpacing: '.05em', textTransform: 'uppercase' };
const H_SECTION = { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 80, lineHeight: 1.1, letterSpacing: '.01em', color: 'var(--ink-900)' };
const H3 = { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 32, lineHeight: 1.2, color: 'var(--ink-900)' };
const LEAD = { margin: 0, fontFamily: 'var(--font-sans)', fontSize: 32, lineHeight: 1.3, color: 'var(--ink-900)', textWrap: 'pretty' };
const BODY = { margin: 0, fontFamily: 'var(--font-sans)', fontSize: 20, lineHeight: 1.46, color: 'var(--ink-900)', textWrap: 'pretty' };
const LABEL = { fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 20, lineHeight: 1, letterSpacing: '.03em', textTransform: 'uppercase' };
const LINK = { color: 'var(--blue-600)', textDecoration: 'underline', textUnderlineOffset: 3, textDecorationThickness: 1 };
const GH = 'https://github.com/decruptor';

const PAGES = [['home', 'Home'], ['solves', 'Solves'], ['research', 'Research'], ['recovery', 'Recovery'], ['about', 'About']];

function SiteHeader({ page, go }) {
  const { Logo, PixelPlus } = window.DS;
  return (
    <header style={{ position: 'relative', padding: '68px 120px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <PixelPlus style={{ position: 'absolute', left: 72, top: 34 }} />
      <PixelPlus style={{ position: 'absolute', right: 32, top: 34 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <a href="#home" onClick={(e) => { e.preventDefault(); go('home'); }} style={{ display: 'inline-flex' }}><Logo /></a>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 20, lineHeight: 1, color: 'var(--mute-400)', marginTop: 2 }}>Independent research on lost cryptographic keys</span>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, paddingTop: 4 }}>
        {PAGES.map(([id, label]) => (
          <a key={id} href={'#' + id} onClick={(e) => { e.preventDefault(); go(id); }}
            style={{ ...SG, color: page === id ? 'var(--violet-500)' : 'var(--teal-600)', textDecoration: 'none' }}>
            {page === id ? '[ ' + label + ' ]' : label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function PageTitle({ eyebrow, title, intro }) {
  const { Badge } = window.DS;
  return (
    <div style={{ padding: '120px 120px 0', display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
      {eyebrow}
      <h1 style={{ margin: 0, maxWidth: 1000, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 70, lineHeight: '75px', letterSpacing: '.01em', color: 'var(--violet-500)', textWrap: 'balance' }}>{title}</h1>
      {intro && <p style={{ ...BODY, maxWidth: 895 }}>{intro}</p>}
    </div>
  );
}

function RecordTable({ rows }) {
  return (
    <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '260px minmax(0,1fr)', borderTop: '1px solid var(--ink-20)' }}>
      {rows.map(([k, v, mono]) => (
        <React.Fragment key={k}>
          <dt style={{ ...LABEL, fontSize: 16, color: 'var(--teal-700)', padding: '18px 0', borderBottom: '1px solid var(--ink-20)' }}>{k}</dt>
          <dd style={{ margin: 0, padding: '16px 0', borderBottom: '1px solid var(--ink-20)', ...(mono ? { fontFamily: 'var(--font-data)', fontWeight: 500, fontSize: 20, letterSpacing: '.02em', lineHeight: 1.3, wordBreak: 'break-all' } : { ...BODY }) }}>{v}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

function RungStatus({ status = 'in-progress', go }) {
  const { Badge, BlockRow, DataReadout, Button } = window.DS;
  const solved = status === 'solved';
  return (
    <section style={{ padding: '0 120px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 48, alignItems: 'end' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
        <Badge tone={solved ? 'teal' : 'violet'} mark>{solved ? 'Solved' : 'Current challenge'}</Badge>
        <h2 style={H_SECTION}>Rung 96</h2>
        <p style={{ ...BODY, maxWidth: 560 }}>In progress. This line fills on completion with the same record format as rung 80: curve parameters, κ, method, hardware, wall time, verification file, and the same ten-line check.</p>
        {go && <Button variant="violet" onClick={() => go('solves')}>See the rung 80 record</Button>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-end' }}>
        <BlockRow count={5} size={64} gap={6} filled={solved ? [0, 1, 2, 3, 4] : [0]} />
        <DataReadout heading="Status" tone="violet" lines={[solved ? 'Solved' : 'In progress', 'First-kappa window: 2026-10-26 UTC']} />
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer style={{ background: 'var(--violet-50)', height: 93, padding: '0 120px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 160 }}>
      <span style={{ ...BODY }}>© 2026 Decruptor. Corrections are public git commits.</span>
      <div style={{ display: 'flex', gap: 28 }}>
        <a href={GH} style={{ ...BODY, color: 'var(--ink-900)' }}>github.com/decruptor</a>
        <a href={GH + '/recovery-guide/issues'} style={{ ...BODY, color: 'var(--ink-900)' }}>Report a correction</a>
      </div>
    </footer>
  );
}

Object.assign(window, { SG, H_SECTION, H3, LEAD, BODY, LABEL, LINK, GH, SiteHeader, PageTitle, RecordTable, RungStatus, SiteFooter });
