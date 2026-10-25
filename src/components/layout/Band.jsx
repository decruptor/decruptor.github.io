import React from 'react';
import { PixelPlus } from '../brand/PixelPlus.jsx';

const TONES = { violet: 'var(--violet-200)', teal: 'var(--teal-100)', tint: 'var(--violet-50)', paper: 'var(--paper)', white: 'var(--white)' };

export function Band({ tone = 'violet', corners = true, children, style, innerStyle }) {
  const p = (pos) => <PixelPlus style={{ position: 'absolute', ...pos }} />;
  return (
    <section style={{ background: TONES[tone] || tone, padding: '67px 52px', boxSizing: 'border-box', ...style }}>
      <div style={{ position: 'relative', padding: '52px 68px', boxSizing: 'border-box', ...innerStyle }}>
        {corners && <>{p({ left: 0, top: 0 })}{p({ right: 0, top: 0 })}{p({ left: 0, bottom: 0 })}{p({ right: 0, bottom: 0 })}</>}
        {children}
      </div>
    </section>
  );
}
