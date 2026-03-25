import { Badge, StarRating, Avatar } from './UI';

export default function CarCard({ car, onClick, onToggleRented }) {
  const avgRating = car.reviews.length
    ? car.reviews.reduce((s, r) => s + r.rating, 0) / car.reviews.length
    : null;

  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 16,
      border: '1px solid #e8e5df',
      overflow: 'hidden',
      boxShadow: car.featured ? '0 0 0 2px #f5a623, 0 4px 24px rgba(0,0,0,0.1)' : '0 2px 20px rgba(0,0,0,0.07)',
      cursor: 'pointer', transition: 'transform 0.18s, box-shadow 0.18s',
      position: 'relative',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = car.featured ? '0 0 0 2px #f5a623, 0 12px 40px rgba(0,0,0,0.14)' : '0 12px 40px rgba(0,0,0,0.14)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = car.featured ? '0 0 0 2px #f5a623, 0 4px 24px rgba(0,0,0,0.1)' : '0 2px 20px rgba(0,0,0,0.07)'; }}
    >
      {/* Image area */}
      <div style={{ position: 'relative', height: 180, background: 'linear-gradient(135deg, #f0ede8, #e4e0da)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4.5rem' }}>
        {car.emoji}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          <Badge type={car.status === 'available' ? 'available' : 'rented'}>
            {car.status === 'available' ? '● Available' : '● Rented'}
          </Badge>
          {car.featured && <Badge type="featured">★ Featured</Badge>}
        </div>
        {onToggleRented && (
          <button onClick={e => { e.stopPropagation(); onToggleRented(car.id); }} style={{
            position: 'absolute', top: 10, right: 10,
            background: 'rgba(255,255,255,0.9)', border: 'none',
            borderRadius: 20, padding: '5px 11px', fontSize: '0.75rem',
            fontWeight: 600, cursor: 'pointer', color: '#686868',
          }}>
            {car.status === 'available' ? 'Mark rented' : 'Mark available'}
          </button>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.3px', marginBottom: 3 }}>
          {car.year} {car.make} {car.model}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#686868', fontSize: '0.82rem', marginBottom: 10 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {car.area}, {car.city}
        </div>

        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
          {car.specs.slice(0,3).map(s => (
            <span key={s} style={{ background: '#f2f0ec', color: '#2c2c2c', fontSize: '0.73rem', fontWeight: 500, padding: '3px 9px', borderRadius: 20 }}>{s}</span>
          ))}
          <span style={{ background: '#f2f0ec', color: '#2c2c2c', fontSize: '0.73rem', fontWeight: 500, padding: '3px 9px', borderRadius: 20 }}>{car.transmission}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #f2f0ec' }}>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.2rem' }}>R{car.weeklyRent.toLocaleString()}</div>
            <div style={{ fontSize: '0.72rem', color: '#a8a8a8', marginTop: 1 }}>per week</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {avgRating && <StarRating rating={avgRating} size={12} />}
            <Avatar initials={car.ownerInitials} size={32} verified={car.ownerVerified} />
          </div>
        </div>
      </div>
    </div>
  );
}
