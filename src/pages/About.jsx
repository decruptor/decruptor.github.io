function AboutScreen() {
  const { Badge, Step, Band, PixelPlus } = window.DS;
  const method = [
    ['Verify twice, independently', 'Results are confirmed by two different implementations — a GPU search kernel and a from-scratch Python elliptic-curve replay — before anything is recorded.'],
    ['Bit-compare across implementations', 'Our record includes catching a silent compiler miscompile that corrupted GPU walk states while looking healthy at the PTX level.'],
    ['Controls before scans', 'Every search battery is tested against planted known-answer controls before it touches real targets.'],
    ['Honest negatives', 'Null results are recorded with what they prove and what they don’t. Much of our published value is in the dead ends.'],
    ['Attribution', 'Where we verify or extend someone else’s method, we say so, by name.'],
  ];
  const conduct = [
    'We do not offer services through this site and do not take contact requests.',
    'We never message anyone first.',
    'We work on consensual targets: public puzzle challenges, and recovery only with the legitimate owner’s participation and proof of ownership.',
    'We do not touch wallets whose owners have not consented. Sweep-not-yours is theft, whatever the marketing calls it.',
    'Corrections are public git commits, never silent edits.',
  ];
  return (
    <main>
      <PageTitle eyebrow={<Badge mark>About</Badge>} title="Trust the artifacts, not the author" />
      <section style={{ padding: '96px 222px 0', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <p style={LEAD}>Decruptor is a research pseudonym. We study how cryptographic keys are lost, leaked, and recovered.</p>
        <p style={{ ...BODY, maxWidth: 895 }}>The elliptic-curve discrete logarithm problem and its best known classical attacks, the forensics of weak randomness and generator families, and the economics of the public puzzle ecosystem. Every claim on this site is tied to a public, checkable artifact — a paper, a verification file, a source repository, or a measurement another party can reproduce.</p>
      </section>
      <section style={{ padding: '160px 120px 0', display: 'flex', flexDirection: 'column', gap: 56 }}>
        <h2 style={H_SECTION}>Method</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', columnGap: 40, rowGap: 64 }}>
          {method.map(([t, d], i) => <Step key={t} index={'[ ' + (i + 1) + ' ]'} title={t} description={d} />)}
        </div>
      </section>
      <div style={{ marginTop: 160 }}>
        <Band tone="violet" innerStyle={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <h2 style={H_SECTION}>Conduct</h2>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
            {conduct.map((c, i) => (
              <li key={i} style={{ display: 'grid', gridTemplateColumns: '80px minmax(0,1fr)', gap: 24, padding: '22px 0', borderTop: '1px solid var(--ink-20)', alignItems: 'baseline' }}>
                <span style={{ ...LABEL, color: 'var(--ink-900)' }}>{'( ' + (i + 1) + ' )'}</span>
                <span style={{ ...LEAD, fontSize: 28 }}>{c}</span>
              </li>
            ))}
          </ol>
        </Band>
      </div>
      <section style={{ padding: '160px 222px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h3 style={H3}>The puzzle economy</h3>
        <p style={BODY}>Public puzzles are consented games: a creator publishes a challenge and funds a prize. We treat them as research benchmarks with a scoreboard, publish our methods and verification files, and support the community norm that solvers document their work. The same mathematics that solves a puzzle sizes the cost of weak nonces and weak randomness everywhere else — which is the practical argument for strong key generation.</p>
      </section>
    </main>
  );
}
window.AboutScreen = AboutScreen;
