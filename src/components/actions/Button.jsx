import React from 'react';

const FILLS = { ink: 'var(--ink-900)', violet: 'var(--violet-500)', teal: 'var(--teal-600)', blue: 'var(--blue-600)' };

function Glyph({ size }) {
  const s = size === 'sm' ? 0.62 : 1;
  return (
    <svg width={14 * s} height={16 * s} viewBox="0 0 14 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M3 2V10H11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 7L14 10L9 13Z" fill="currentColor" />
    </svg>
  );
}

export function Button({ variant = 'ink', size = 'md', icon = true, href, onClick, disabled = false, children, style }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const sm = size === 'sm';
  const s = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: sm ? 6.23 : 13, padding: sm ? '11.493px 15.324px' : '24px 32px',
    borderRadius: sm ? 'var(--radius-btn-sm)' : 'var(--radius-btn)',
    background: FILLS[variant] || FILLS.ink, color: 'var(--white)', border: 0,
    fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: sm ? 10 : 'var(--fs-button)', lineHeight: 1,
    textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap', boxSizing: 'border-box',
    cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1,
    filter: hover && !disabled ? 'brightness(1.18)' : 'none',
    transform: press && !disabled ? 'translateY(1px)' : 'none',
    transition: 'filter 120ms linear, transform 80ms linear', ...style,
  };
  const Tag = href ? 'a' : 'button';
  return (
    <Tag href={href} onClick={disabled ? undefined : onClick} disabled={Tag === 'button' ? disabled : undefined} style={s}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}>
      {icon && <Glyph size={size} />}
      <span>{children}</span>
    </Tag>
  );
}
