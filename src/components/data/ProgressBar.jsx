import React from 'react';

const TONES = {
  violet: ['var(--violet-200)', 'var(--violet-500)'],
  teal: ['var(--teal-150)', 'var(--teal-600)'],
  ink: ['var(--ink-20)', 'var(--ink-900)'],
};

export function ProgressBar({ value = 0, tone = 'violet', label, width = 184, style }) {
  const [t, f] = TONES[tone] || TONES.violet;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width, ...style }}>
      <div style={{ position: 'relative', height: 12, background: t, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: Math.max(0, Math.min(1, value)) * 100 + '%', background: f, transition: 'width 400ms ease-out' }} />
      </div>
      {label && <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'var(--fs-micro)', lineHeight: 'var(--lh-micro)', letterSpacing: 'var(--ls-micro)', textTransform: 'uppercase', color: 'var(--text-tertiary)', textAlign: 'center' }}>{label}</span>}
    </div>
  );
}
