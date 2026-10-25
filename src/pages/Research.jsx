function ResearchScreen() {
  const { Badge, Tag, Band, Step, Button } = window.DS;
  return (
    <main>
      <PageTitle eyebrow={<Badge mark>Paper 1</Badge>} title="Walk constants for interval ECDLP on secp256k1" intro="An empirical analysis of Pollard-kangaroo walk constants for interval ECDLP on secp256k1, including the unpublished SOTA family." />
      <section style={{ padding: '40px 120px 0', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Tag>IACR ePrint 2026/112804</Tag><Tag tone="violet">Pending moderation</Tag><Tag tone="ink">CC BY 4.0</Tag>
      </section>
      <section style={{ padding: '96px 222px 0', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <p style={LEAD}>The kangaroo method solves the discrete logarithm problem in an interval of width W at cost K·√W, and the constant K is the entire practical difference between methods.</p>
        <p style={{ ...BODY, maxWidth: 895 }}>This paper provides the first independent, large-sample validation of the SOTA family’s constants (~5.1e5 full solves across 70 configurations), a mechanistic explanation of why the walks work (confinement), an exact derivation of the selection-induced distinguished-point rates, and honest accounting of where each claimed constant applies and where it fails — including why the “0.99” GPU constant is a CPU number.</p>
      </section>
      <div style={{ marginTop: 96 }}>
        <Band tone="tint" innerStyle={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start' }}>
          <span style={{ ...LABEL, color: 'var(--violet-700)' }}>Attribution</span>
          <p style={{ ...LEAD, maxWidth: 1040 }}>The SOTA family is RetiredCoder’s work, published as source and community-verified on the Bitcointalk research thread. This paper claims no priority on the method — it contributes independent measurement, mechanism, validity boundaries, and negative results.</p>
          <Button variant="violet" href="https://github.com/decruptor/kangaroo-constants">Code and raw run outputs</Button>
        </Band>
      </div>
      <section style={{ padding: '160px 120px 0', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
          <Badge tone="violet">Paper 2 · in preparation</Badge>
          <h3 style={H3}>Classical solutions on the ladder</h3>
          <p style={BODY}>A record of the classical solves on the arXiv:2508.14011 challenge ladder — rung 80 and, pending completion, rung 96 — including the compiler-miscompile case study and the verification methodology. Submission follows the final verification.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
          <Badge tone="teal">Method note</Badge>
          <h3 style={H3}>Evidence classes</h3>
          <p style={BODY}>Every number on this site carries its evidence class where it matters: measured-and-independently-rechecked, third-party published, or estimate. We do not publish unverified claims, and we correct in public.</p>
        </div>
      </section>
      <section style={{ padding: '160px 120px 0', display: 'flex', flexDirection: 'column', gap: 56 }}>
        <h2 style={H_SECTION}>Tools</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 40 }}>
          <Step index="[ 1 ]" title="calculator" description="Public feasibility calculator for key-space sizes: what is searchable, at what cost, on what hardware. 25/25 tests passing." action={<Tag href={GH + '/calculator'}>Open repository →</Tag>} />
          <Step index="[ 2 ]" title="ecdlp-ladder" description="Verification artifacts for the ladder solves (result files, validation log)." action={<Tag href={GH + '/ecdlp-ladder'}>Open repository →</Tag>} />
          <Step index="[ 3 ]" title="kangaroo-constants" description="Data and sources behind Paper 1." action={<Tag href={GH + '/kangaroo-constants'}>Open repository →</Tag>} />
        </div>
      </section>
    </main>
  );
}
window.ResearchScreen = ResearchScreen;
