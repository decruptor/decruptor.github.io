import React from 'react';

const TONES = { teal: 'var(--teal-600)', violet: 'var(--violet-500)', ink: 'var(--ink-900)' };

export function DataReadout({ heading, lines = [], tone = 'teal', align = 'right', style }) {
  const c = TONES[tone] || TONES.teal;
  const ai = align === 'right' ? 'flex-end' : 'flex-start';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: ai, textAlign: align, ...style }}>
      {heading && <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'var(--fs-micro)', lineHeight: 1, letterSpacing: 'var(--ls-micro)', textTransform: 'uppercase', color: c }}>{heading}</span>}
      <span style={{ fontFamily: 'var(--font-data)', fontWeight: 500, fontSize: 'var(--fs-micro)', lineHeight: 'var(--lh-micro)', letterSpacing: 'var(--ls-micro)', textTransform: 'uppercase', color: c, whiteSpace: 'pre-line' }}>{lines.join('\n')}</span>
    </div>
  );
}
