function RecoveryScreen() {
  const { Badge, Feature, Button, Band, Skyline, Step, Tag } = window.DS;
  const RG = GH + '/recovery-guide/blob/main/docs/';
  return (
    <main>
      <PageTitle eyebrow={<Badge mark>Recovery notes</Badge>} title="What is feasible, what is scam architecture" intro="Public, non-commercial notes on lost-wallet recovery — and how to check anyone’s claims, including ours." />
      <section style={{ padding: '120px 120px 0', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'flex-start' }}>
          <Feature icon={<img src="../../assets/marks/mark-fragment-3-violet.svg" width="48" alt="" />} title="How to spot a crypto wallet recovery scam" description="The red flags (upfront fees, guarantees, DM-first outreach, seed requests, impossible-case acceptance) and the legitimate model. No services named — principles age better than brands." />
          <Button variant="ink" href={RG + 'scam-redflag-checklist.md'}>Read the checklist</Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'flex-start' }}>
          <Feature icon={<img src="../../assets/marks/mark-fragment-1-violet.svg" width="48" alt="" />} title="What AI and GPU search can and cannot do (2026)" description="A capability benchmark with every number labeled verified / published / estimate, plus a self-assessment flowchart so you can size your own case before paying anyone anything." />
          <Button variant="ink" href={RG + 'ai-gpu-benchmark.md'}>Read the benchmark</Button>
        </div>
      </section>
      <section style={{ padding: '160px 120px 0', display: 'flex', flexDirection: 'column', gap: 56 }}>
        <h2 style={H_SECTION}>The short version</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 40 }}>
          <Step index="Recoverable" title="Often worth sizing" description="Forgotten passwords with remembered fragments; seeds with a few missing words at known positions; derivation-path and passphrase mismatches; weak-RNG-era wallets." />
          <Step index="Not recoverable" title="At any price" description="Fully lost seeds; strong-RNG keys; five or more missing seed words. Anyone claiming otherwise is the scam." />
          <Step index="Legitimate help" title="Never asks first" description="Never asks for money up front, never asks for your spendable material, and never contacts you first." />
        </div>
      </section>
      <div style={{ marginTop: 160 }}>
        <Skyline tone="violet" preset="city" />
        <Band tone="violet" innerStyle={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
          <span style={{ ...LABEL, color: 'var(--violet-700)' }}>Why we publish this</span>
          <p style={{ ...LEAD, maxWidth: 1040 }}>The recovery-scam layer is now bigger than the loss itself — over ten thousand FBI-reported complaints in 2025, roughly $1.4B taken from people who had already lost money once.</p>
          <p style={{ ...BODY, maxWidth: 895 }}>The best defense we know of is an informed owner, and the only credential we can offer is our public track record: every technical claim on this site is checkable from public artifacts.</p>
          <Tag tone="ink">Evidence class: published</Tag>
        </Band>
      </div>
    </main>
  );
}
window.RecoveryScreen = RecoveryScreen;
