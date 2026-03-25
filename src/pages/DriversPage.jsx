import { useState } from 'react';
import DriverCard from '../components/DriverCard';
import DriverDetailModal from '../components/DriverDetailModal';
import { Btn } from '../components/UI';

export default function DriversPage({ drivers, setDrivers, showToast }) {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = drivers.filter(d => {
    if (filter === 'verified') return d.verificationStatus === 'verified';
    if (filter === 'partial') return d.verificationStatus === 'partial';
    if (filter === 'unverified') return d.verificationStatus === 'unverified';
    return true;
  });

  const selectedDriver = selectedId ? drivers.find(d => d.id === selectedId) : null;

  const addDriverReview = (driverId, review) => {
    setDrivers(prev => prev.map(d =>
      d.id === driverId ? { ...d, reviews: [...d.reviews, review] } : d
    ));
    showToast('Review added!');
  };

  const requestCheck = (driverId) => {
    showToast('Background check requested! Driver will be notified.');
  };

  const tabs = [
    { key: 'all', label: `All (${drivers.length})` },
    { key: 'verified', label: `✓ Verified (${drivers.filter(d => d.verificationStatus === 'verified').length})` },
    { key: 'partial', label: `⚠ Partial (${drivers.filter(d => d.verificationStatus === 'partial').length})` },
  ];

  return (
    <>
      {/* Header */}
      <div style={{ background: '#0d0d0d', padding: '48px 32px 52px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(29,185,84,0.12)', border: '1px solid rgba(29,185,84,0.3)', color: '#1db954', fontSize: '0.78rem', fontWeight: 500, padding: '5px 14px', borderRadius: 20, marginBottom: 20 }}>
          <span style={{ fontSize: '0.55rem' }}>●</span> Verified Driver Network
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", color: '#f6f4f0', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-1px', marginBottom: 12 }}>
          Find a <span style={{ color: '#1db954' }}>trusted driver</span>
        </h1>
        <p style={{ color: '#a8a8a8', maxWidth: 460, margin: '0 auto', lineHeight: 1.7, fontSize: '0.92rem' }}>
          Browse drivers who have been ID-verified, licence-checked, and background screened. Fully verified drivers are flagged with a green badge.
        </p>
      </div>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px 80px' }}>
        {/* Verification info banner */}
        <div style={{ background: '#fff', border: '1px solid #e8e5df', borderRadius: 14, padding: '18px 22px', marginBottom: 28, display: 'flex', alignItems: 'flex-start', gap: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '1.6rem', flexShrink: 0 }}>🔒</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', marginBottom: 5 }}>How driver verification works</div>
            <p style={{ fontSize: '0.85rem', color: '#686868', lineHeight: 1.65 }}>
              Drivers pay <strong style={{ color: '#0d0d0d' }}>R149 once</strong> to get verified. We check their SA ID, driver's licence, PrDP, and run a criminal background check via our screening partner. Verified drivers get a green badge visible to all car owners.
            </p>
          </div>
          <Btn variant="green" size="sm" style={{ flexShrink: 0 }} onClick={() => showToast('Driver registration coming soon!')}>
            Get verified →
          </Btn>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, borderBottom: '1px solid #e8e5df', paddingBottom: 0 }}>
          {tabs.map(({ key, label }) => (
            <button key={key} onClick={() => setFilter(key)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '10px 16px', fontSize: '0.88rem',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: filter === key ? 600 : 400,
              color: filter === key ? '#0d0d0d' : '#a8a8a8',
              borderBottom: `2px solid ${filter === key ? '#1db954' : 'transparent'}`,
              marginBottom: -1, transition: 'all 0.15s',
            }}>{label}</button>
          ))}
        </div>

        {/* Driver grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#a8a8a8' }}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>👤</div>
            <p>No drivers in this category yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {filtered.map(driver => (
              <DriverCard key={driver.id} driver={driver} onClick={() => setSelectedId(driver.id)} />
            ))}
          </div>
        )}

        {/* CTA for drivers */}
        <div style={{ marginTop: 60, background: '#f6f4f0', borderRadius: 18, padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, border: '1px solid #e8e5df' }}>
          <div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.3rem', letterSpacing: '-0.4px', marginBottom: 7 }}>Are you an Uber driver?</h3>
            <p style={{ color: '#686868', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Create your driver profile and get verified for R149. Stand out to car owners and get access to more cars.
            </p>
          </div>
          <Btn variant="green" size="lg" onClick={() => showToast('Driver registration coming soon!')}>
            Create driver profile
          </Btn>
        </div>
      </main>

      <DriverDetailModal
        driver={selectedDriver}
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
        onAddReview={addDriverReview}
        onRequestCheck={requestCheck}
      />
    </>
  );
}
