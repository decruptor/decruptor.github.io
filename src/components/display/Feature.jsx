import React from 'react';

export function Feature({ icon, title, description, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start', ...style }}>
      {icon && <div style={{ width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignSelf: 'stretch' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--fs-h3)', lineHeight: 'var(--lh-h3)', color: 'var(--text-primary)' }}>{title}</span>
        {description && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body-tight)', color: 'var(--text-primary)', textWrap: 'pretty' }}>{description}</span>}
      </div>
    </div>
  );
}
