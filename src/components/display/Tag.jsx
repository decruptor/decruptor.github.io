import React from 'react';

const TONES = {
  blue: ['var(--blue-300)', 'var(--blue-600)'],
  violet: ['var(--violet-200)', 'var(--violet-500)'],
  teal: ['var(--teal-200)', 'var(--teal-700)'],
  ink: ['var(--ink-20)', 'var(--ink-900)'],
};

export function Tag({ tone = 'blue', href, children, style }) {
  const [b, c] = TONES[tone] || TONES.blue;
  const El = href ? 'a' : 'span';
  return (
    <El href={href} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      padding: '8px 12px', borderRadius: 'var(--radius-hair)', boxShadow: 'inset 0 0 0 1.5px ' + b,
      fontFamily: 'var(--font-data)', fontWeight: 500, fontSize: 'var(--fs-tag)', lineHeight: 1,
      letterSpacing: 'var(--ls-tag)', textTransform: 'uppercase', color: c, textDecoration: 'none',
      whiteSpace: 'nowrap', boxSizing: 'border-box', ...style,
    }}>{children}</El>
  );
}
