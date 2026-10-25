import React from 'react';

export function BlockRow({ count = 7, filled = [0], size = 96, gap = 7, color = 'var(--violet-500)', empty = 'var(--violet-200)', style }) {
  const set = new Set(filled);
  return (
    <div style={{ display: 'flex', gap, alignItems: 'center', ...style }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ width: size, height: size, borderRadius: 'var(--radius-hair)', background: set.has(i) ? color : empty, flexShrink: 0, transition: 'background 200ms linear' }} />
      ))}
    </div>
  );
}
