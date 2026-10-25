import React from 'react';

export function PixelProgress({ value = 0, cells = 36, gap = 2, label, color = 'var(--teal-700)', track = 'var(--teal-150)', style }) {
  const n = Math.round(Math.max(0, Math.min(1, value)) * cells);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start', ...style }}>
      <div style={{ display: 'flex', gap, height: 24, alignItems: 'center' }} role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
        {Array.from({ length: cells }).map((_, i) => (
          <span key={i} style={{ width: 8, height: 8, background: i < n ? color : track, flexShrink: 0 }} />
        ))}
      </div>
      {label && <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'var(--fs-label)', lineHeight: 1, letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: color, whiteSpace: 'nowrap' }}>{label}</span>}
    </div>
  );
}
