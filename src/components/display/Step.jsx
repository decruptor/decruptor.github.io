import React from 'react';

export function Step({ index, title, description, action, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, alignItems: 'flex-start', ...style }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignSelf: 'stretch' }}>
        {index != null && <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'var(--fs-label)', lineHeight: 1, letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-index)', whiteSpace: 'nowrap' }}>{index}</span>}
        {title && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--fs-h4)', lineHeight: 'var(--lh-h4)', color: 'var(--text-primary)' }}>{title}</span>}
        {description && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body)', color: 'var(--text-primary)', textWrap: 'pretty' }}>{description}</span>}
      </div>
      {action}
    </div>
  );
}
