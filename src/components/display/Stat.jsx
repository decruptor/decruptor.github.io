import React from 'react';

export function Stat({ value, unit, title, description, children, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start', ...style }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--fs-stat)', lineHeight: 'var(--lh-stat)', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{value}</span>
        {unit && <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'var(--fs-micro)', lineHeight: 'var(--lh-micro)', letterSpacing: 'var(--ls-micro)', textTransform: 'uppercase', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{unit}</span>}
      </div>
      {(title || description) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignSelf: 'stretch' }}>
          {title && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--fs-h4)', lineHeight: 'var(--lh-h4)', color: 'var(--text-primary)' }}>{title}</span>}
          {description && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body-tight)', color: 'var(--text-primary)', textWrap: 'pretty' }}>{description}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
