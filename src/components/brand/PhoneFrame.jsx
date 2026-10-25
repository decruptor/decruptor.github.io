import React from 'react';

export function PhoneFrame({ children, screen = 'transparent', style }) {
  return (
    <div style={{ position: 'relative', width: 224, height: 436, margin: 22, flexShrink: 0, ...style }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 'var(--radius-phone)', boxShadow: '0 0 0 var(--phone-ring) var(--ink-900)', background: screen }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 20, boxSizing: 'border-box' }}>{children}</div>
    </div>
  );
}
