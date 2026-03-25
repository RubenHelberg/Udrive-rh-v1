import { Modal, Badge, StarRating, Avatar, Btn } from './UI';
import ReviewForm from './ReviewForm';
import { useState } from 'react';

function SpecBox({ label, value }) {
  return (
    <div style={{ background: '#f6f4f0', border: '1px solid #e8e5df', borderRadius: 10, padding: '11px 14px' }}>
      <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#a8a8a8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>{label}</div>
      <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{value}</div>
    </div>
  );
}

export default function CarDetailModal({ car, open, onClose, onAddReview }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  if (!car) return null;

  const avgRating = car.reviews.length
    ? (car.reviews.reduce((s, r) => s + r.rating, 0) / car.reviews.length).toFixed(1)
    : null;

  const waMsg = encodeURIComponent(`Hi ${car.ownerName}, I saw your ${car.year} ${car.make} ${car.model} on DriveLink and I'm interested. Is it still available?`);
  const waLink = `https://wa.me/27${car.ownerPhone.replace(/^0/, '')}?text=${waMsg}`;

  return (
    <Modal open={open} onClose={onClose} title={`${car.year} ${car.make} ${car.model}`} maxWidth={600}>
      {/* Hero image */}
      <div style={{ width: '100%', height: 200, borderRadius: 12, background: 'linear-gradient(135deg, #f0ede8, #e4e0da)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5.5rem', marginBottom: 18 }}>
        {car.emoji}
      </div>

      {/* Status badges */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 16, flexWrap: 'wrap' }}>
        <Badge type={car.status === 'available' ? 'available' : 'rented'}>
          {car.status === 'available' ? '● Available now' : '● Currently rented'}
        </Badge>
        {car.featured && <Badge type="featured">★ Featured listing</Badge>}
        {car.ownerVerified && <Badge type="verified">✓ Verified owner</Badge>}
      </div>

      {/* Specs grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 18 }}>
        <SpecBox label="Weekly rent" value={`R${car.weeklyRent.toLocaleString()}`} />
        <SpecBox label="Deposit" value={`R${car.deposit.toLocaleString()}`} />
        <SpecBox label="Transmission" value={car.transmission} />
        <SpecBox label="Location" value={`${car.area}, ${car.city}`} />
        <SpecBox label="Year" value={car.year} />
        <SpecBox label="Reviews" value={avgRating ? `⭐ ${avgRating} (${car.reviews.length})` : 'No reviews yet'} />
      </div>

      {/* Description */}
      <p style={{ color: '#686868', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 20 }}>{car.description}</p>

      {/* Owner card */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#f6f4f0', border: '1px solid #e8e5df', borderRadius: 12, padding: 16, marginBottom: 20 }}>
        <Avatar initials={car.ownerInitials} size={48} verified={car.ownerVerified} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{car.ownerName}</div>
          <div style={{ fontSize: '0.8rem', color: '#686868', marginTop: 2 }}>Car owner</div>
        </div>
        {car.ownerVerified
          ? <Badge type="verified">✓ ID Verified</Badge>
          : <Badge type="unverified">Unverified</Badge>}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <Btn as="a" variant="whatsapp" size="lg" href={waLink} style={{ flex: 1 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp owner
        </Btn>
        <Btn as="a" variant="dark" size="lg" href={`tel:${car.ownerPhone}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.22 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
          Call
        </Btn>
      </div>

      {/* Reviews */}
      <div style={{ borderTop: '1px solid #e8e5df', paddingTop: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h4 style={{ fontSize: '1rem' }}>Reviews {car.reviews.length > 0 && `(${car.reviews.length})`}</h4>
          <Btn variant="outline" size="sm" onClick={() => setShowReviewForm(v => !v)}>
            {showReviewForm ? 'Cancel' : '+ Add review'}
          </Btn>
        </div>

        {showReviewForm && (
          <ReviewForm onSubmit={(review) => {
            onAddReview(car.id, review);
            setShowReviewForm(false);
          }} />
        )}

        {car.reviews.length === 0 && !showReviewForm && (
          <p style={{ color: '#a8a8a8', fontSize: '0.88rem', textAlign: 'center', padding: '20px 0' }}>No reviews yet. Be the first!</p>
        )}
        {car.reviews.map((r, i) => (
          <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < car.reviews.length - 1 ? '1px solid #f2f0ec' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
              <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{r.author}</div>
              <StarRating rating={r.rating} size={12} />
            </div>
            <p style={{ color: '#686868', fontSize: '0.85rem', lineHeight: 1.5 }}>{r.text}</p>
            <div style={{ fontSize: '0.72rem', color: '#a8a8a8', marginTop: 4 }}>{r.date}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
