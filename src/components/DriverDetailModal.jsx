import { useState } from 'react';
import { Modal, Badge, Avatar, StarRating, Btn } from './UI';
import ReviewForm from './ReviewForm';

function CheckRow({ done, label, desc }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #f2f0ec' }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
        background: done ? '#e6f7ed' : '#fef2f2',
        border: `1.5px solid ${done ? '#1db954' : '#fca5a5'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.75rem', color: done ? '#17a348' : '#ef4444',
      }}>{done ? '✓' : '✗'}</div>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{label}</div>
        <div style={{ fontSize: '0.78rem', color: '#a8a8a8', marginTop: 1 }}>{desc}</div>
      </div>
      <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
        <Badge type={done ? 'verified' : 'unverified'} size="xs">{done ? 'Verified' : 'Not verified'}</Badge>
      </div>
    </div>
  );
}

export default function DriverDetailModal({ driver, open, onClose, onAddReview, onRequestCheck }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [checkRequested, setCheckRequested] = useState(false);
  if (!driver) return null;

  return (
    <Modal open={open} onClose={onClose} title={driver.name} maxWidth={560}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
        <Avatar initials={driver.initials} size={64} verified={driver.verificationStatus === 'verified'} />
        <div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 6 }}>
            <Badge type={driver.verificationStatus === 'verified' ? 'verified' : driver.verificationStatus === 'partial' ? 'partial' : 'unverified'}>
              {driver.verificationStatus === 'verified' ? '✓ Fully verified' : driver.verificationStatus === 'partial' ? '⚠ Partial' : '✗ Unverified'}
            </Badge>
            <Badge type="default">{driver.city}</Badge>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#686868', lineHeight: 1.5 }}>{driver.bio}</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
        {[['Uber rating', driver.uberRating], ['Total trips', driver.trips.toLocaleString()], ['Experience', driver.experience]].map(([l,v]) => (
          <div key={l} style={{ background: '#f6f4f0', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.1rem' }}>{v}</div>
            <div style={{ fontSize: '0.72rem', color: '#a8a8a8', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Verification checks */}
      <h4 style={{ fontSize: '0.95rem', marginBottom: 4 }}>Verification status</h4>
      <CheckRow done={driver.idVerified} label="SA ID verified" desc="Identity confirmed against Home Affairs database" />
      <CheckRow done={driver.licenseVerified} label="Driver's licence" desc="Valid SA driver's licence confirmed" />
      <CheckRow done={driver.prdpVerified} label="PrDP (Professional Driving Permit)" desc="Required for all Uber drivers" />
      <CheckRow done={driver.criminalClear} label="Criminal record check" desc="No criminal record on file" />

      {/* Background check CTA */}
      <div style={{ marginTop: 16, background: driver.verificationStatus === 'verified' ? '#e6f7ed' : '#f6f4f0', border: `1px solid ${driver.verificationStatus === 'verified' ? '#b7e4c7' : '#e8e5df'}`, borderRadius: 12, padding: 16, marginBottom: 20 }}>
        {driver.verificationStatus === 'verified' ? (
          <p style={{ fontSize: '0.85rem', color: '#17a348', fontWeight: 500 }}>✓ This driver has passed all background checks through our verified partner network.</p>
        ) : checkRequested ? (
          <p style={{ fontSize: '0.85rem', color: '#686868' }}>✅ Background check requested! The driver will be notified to complete their verification. You'll receive a notification once complete.</p>
        ) : (
          <>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>🔍 Request background check — R149</div>
            <p style={{ fontSize: '0.82rem', color: '#686868', lineHeight: 1.6, marginBottom: 12 }}>
              Run a full check: ID verification, criminal record, licence validity, and PrDP status. Powered by our SA screening partner.
            </p>
            <Btn variant="dark" size="sm" onClick={() => { onRequestCheck(driver.id); setCheckRequested(true); }}>
              Request check (R149)
            </Btn>
          </>
        )}
      </div>

      {/* Reviews */}
      <div style={{ borderTop: '1px solid #e8e5df', paddingTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h4 style={{ fontSize: '1rem' }}>Reviews {driver.reviews.length > 0 && `(${driver.reviews.length})`}</h4>
          <Btn variant="outline" size="sm" onClick={() => setShowReviewForm(v => !v)}>
            {showReviewForm ? 'Cancel' : '+ Add review'}
          </Btn>
        </div>
        {showReviewForm && <ReviewForm onSubmit={r => { onAddReview(driver.id, r); setShowReviewForm(false); }} />}
        {driver.reviews.length === 0 && !showReviewForm && (
          <p style={{ color: '#a8a8a8', fontSize: '0.88rem', textAlign: 'center', padding: '16px 0' }}>No reviews yet.</p>
        )}
        {driver.reviews.map((r, i) => (
          <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < driver.reviews.length - 1 ? '1px solid #f2f0ec' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{r.author}</span>
              <StarRating rating={r.rating} size={12} />
            </div>
            <p style={{ color: '#686868', fontSize: '0.85rem', lineHeight: 1.5 }}>{r.text}</p>
            <div style={{ fontSize: '0.72rem', color: '#a8a8a8', marginTop: 3 }}>{r.date}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
