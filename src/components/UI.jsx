import { useState } from 'react';

export function Badge({ type = 'default', children, size = 'sm' }) {
  const styles = {
    verified: { background: '#e6f7ed', color: '#17a348', border: '1px solid #b7e4c7' },
    partial:  { background: '#fff8e6', color: '#b87d00', border: '1px solid #ffe08a' },
    unverified:{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' },
    available: { background: '#e6f7ed', color: '#17a348', border: '1px solid #b7e4c7' },
    rented:    { background: '#fff1ec', color: '#c2410c', border: '1px solid #fed7aa' },
    featured:  { background: '#0d0d0d', color: '#f5a623', border: '1px solid #f5a623' },
    gold:      { background: '#fffbeb', color: '#92400e', border: '1px solid #fde68a' },
    default:   { background: '#f2f0ec', color: '#686868', border: '1px solid #e8e5df' },
  };
  const s = styles[type] || styles.default;
  const fontSize = size === 'xs' ? '0.68rem' : '0.75rem';
  const padding = size === 'xs' ? '2px 7px' : '4px 10px';
  return (
    <span style={{
      ...s, fontSize, padding,
      borderRadius: 20, fontWeight: 600,
      display: 'inline-flex', alignItems: 'center', gap: 4,
      whiteSpace: 'nowrap', lineHeight: 1.4,
    }}>
      {children}
    </span>
  );
}

export function Btn({ variant = 'green', size = 'md', onClick, children, style = {}, disabled = false, as: Tag = 'button', href }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 7, fontWeight: 500, borderRadius: 30, border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.16s', fontFamily: "'DM Sans', sans-serif",
    opacity: disabled ? 0.5 : 1, textDecoration: 'none',
  };
  const sizes = {
    sm: { fontSize: '0.82rem', padding: '7px 16px' },
    md: { fontSize: '0.9rem', padding: '10px 22px' },
    lg: { fontSize: '1rem', padding: '13px 28px' },
  };
  const variants = {
    green:   { background: '#1db954', color: '#fff' },
    dark:    { background: '#0d0d0d', color: '#fff' },
    outline: { background: 'transparent', color: '#0d0d0d', border: '1.5px solid #e8e5df' },
    ghost:   { background: 'transparent', color: '#686868' },
    danger:  { background: '#fee2e2', color: '#dc2626' },
    gold:    { background: '#f5a623', color: '#fff' },
    white:   { background: '#fff', color: '#0d0d0d' },
    whatsapp:{ background: '#25D366', color: '#fff' },
  };
  const props = { style: { ...base, ...sizes[size], ...variants[variant], ...style }, onClick, disabled };
  if (Tag === 'a') { props.href = href; props.target = '_blank'; props.rel = 'noopener noreferrer'; }
  return <Tag {...props}>{children}</Tag>;
}

export function StarRating({ rating, max = 5, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? '#f5a623' : 'none'}
          stroke={i < Math.round(rating) ? '#f5a623' : '#d1d5db'} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
      <span style={{ fontSize: size * 0.85, color: '#686868', marginLeft: 3 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

export function Avatar({ initials, size = 44, verified = false }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: 'var(--black)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Syne', sans-serif", fontWeight: 700,
        fontSize: size * 0.35,
      }}>{initials}</div>
      {verified && (
        <div style={{
          position: 'absolute', bottom: -1, right: -1,
          width: size * 0.38, height: size * 0.38, borderRadius: '50%',
          background: '#1db954', border: '2px solid #fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: size * 0.2, color: '#fff',
        }}>✓</div>
      )}
    </div>
  );
}

export function Modal({ open, onClose, title, children, maxWidth = 580 }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 20,
        maxWidth, width: '100%',
        maxHeight: '92vh', overflowY: 'auto',
        boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
        animation: 'modalIn 0.2s ease',
      }}>
        <style>{`@keyframes modalIn { from { opacity:0; transform:translateY(16px) scale(0.97); } to { opacity:1; transform:none; } }`}</style>
        <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
          <h3 style={{ fontSize: '1.35rem', letterSpacing: '-0.4px' }}>{title}</h3>
          <button onClick={onClose} style={{
            background: '#f2f0ec', border: 'none', width: 32, height: 32,
            borderRadius: '50%', fontSize: '1rem', display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            marginTop: 2, cursor: 'pointer',
          }}>✕</button>
        </div>
        <div style={{ padding: '16px 28px 28px' }}>{children}</div>
      </div>
    </div>
  );
}

export function Toast({ message, visible }) {
  return (
    <div style={{
      position: 'fixed', bottom: 28, left: '50%',
      transform: `translateX(-50%) translateY(${visible ? 0 : 100}px)`,
      background: '#0d0d0d', color: '#fff',
      padding: '12px 24px', borderRadius: 30,
      fontSize: '0.88rem', fontWeight: 500,
      boxShadow: '0 8px 40px rgba(0,0,0,0.2)', zIndex: 999,
      transition: 'transform 0.3s ease', whiteSpace: 'nowrap',
      pointerEvents: 'none',
    }}>{message}</div>
  );
}

export function useToast() {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const show = (message, duration = 2800) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), duration);
  };
  return { toast, show };
}

export function FormField({ label, children, full = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, gridColumn: full ? '1 / -1' : undefined }}>
      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#686868', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>
      {children}
    </div>
  );
}

export const inputStyle = {
  fontSize: '0.92rem', padding: '10px 14px',
  border: '1.5px solid #e8e5df', borderRadius: 10,
  background: '#f6f4f0', color: '#0d0d0d',
  outline: 'none', width: '100%',
  transition: 'border-color 0.15s',
};
