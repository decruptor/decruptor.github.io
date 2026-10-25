import React from 'react';

const PRESETS = {
  stairs: [22, 40, 64, 96, 128, 176, 176, 128, 96, 64, 40, 22],
  city: [88, 72, 120, 40, 28, 52, 64, 72, 44, 96, 60, 52],
};
const TONES = { violet: 'var(--violet-200)', teal: 'var(--teal-100)', tint: 'var(--violet-50)' };

export function Skyline({ preset = 'stairs', heights, tone = 'violet', style }) {
  const hs = heights || PRESETS[preset] || PRESETS.stairs;
  const max = Math.max.apply(null, hs);
  const c = TONES[tone] || tone;
  return (
    <div aria-hidden="true" style={{ display: 'flex', alignItems: 'flex-end', height: max, width: '100%', ...style }}>
      {hs.map((h, i) => <span key={i} style={{ flex: '1 1 0', height: h, background: c }} />)}
    </div>
  );
}
