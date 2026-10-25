import React from 'react';

export function PixelPlus({ size = 20, color = 'var(--ink-900)', style }) {
  const u = size / 5;
  const bar = (l, t, w, h) => <span style={{ position: 'absolute', left: l, top: t, width: w, height: h, background: color }} />;
  return (
    <span aria-hidden="true" style={{ position: 'relative', display: 'inline-block', width: size, height: size, flexShrink: 0, ...style }}>
      {bar(2 * u, 0, u, 2 * u)}{bar(2 * u, 3 * u, u, 2 * u)}{bar(0, 2 * u, 2 * u, u)}{bar(3 * u, 2 * u, 2 * u, u)}
    </span>
  );
}
