import { useState } from 'react';
import CarCard from '../components/CarCard';
import CarDetailModal from '../components/CarDetailModal';
import AgreementModal from '../components/AgreementModal';
import { Btn } from '../components/UI';

const CITIES = ['All cities', 'Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth'];

const selStyle = {
  fontSize: '0.88rem', padding: '9px 12px',
  border: '1.5px solid #e8e5df', borderRadius: 10,
  background: '#fff', color: '#0d0d0d',
  outline: 'none', width: '100%',
  fontFamily: "'DM Sans', sans-serif",
};

export default function HomePage({ cars, setCars, onListCar, showToast }) {
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [agreementCar, setAgreementCar] = useState(null);
  const [filters, setFilters] = useState({ city: '', transmission: '', maxPrice: '', status: '' });

  const setF = (k, v) => setFilters(f => ({ ...f, [k]: v }));

  const filtered = cars
    .filter(c => {
      if (filters.city && c.city !== filters.city) return false;
      if (filters.transmission && c.transmission !== filters.transmission) return false;
      if (filters.maxPrice && c.weeklyRent > Number(filters.maxPrice)) return false;
      if (filters.status && c.status !== filters.status) return false;
      return true;
    })
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const toggleRented = (id) => {
    setCars(prev => prev.map(c => c.id === id
      ? { ...c, status: c.status === 'available' ? 'rented' : 'available' }
      : c
    ));
    showToast('Listing status updated');
  };

  const addCarReview = (carId, review) => {
    setCars(prev => prev.map(c =>
      c.id === carId ? { ...c, reviews: [...c.reviews, review] } : c
    ));
    showToast('Review added!');
  };

  const selectedCar = selectedCarId ? cars.find(c => c.id === selectedCarId) : null;

  return (
    <>
      {/* HERO */}
      <section style={{
        background: '#0d0d0d', padding: '72px 32px 80px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 50% 115%, rgba(29,185,84,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(29,185,84,0.12)', border: '1px solid rgba(29,185,84,0.3)', color: '#1db954', fontSize: '0.78rem', fontWeight: 500, padding: '5px 14px', borderRadius: 20, marginBottom: 24, position: 'relative' }}>
          <span style={{ fontSize: '0.55rem' }}>●</span> South Africa's #1 Uber Car Marketplace
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.1rem, 5.5vw, 3.6rem)', color: '#f6f4f0', lineHeight: 1.09, letterSpacing: '-1.5px', maxWidth: 660, marginBottom: 18, position: 'relative' }}>
          Find your next <span style={{ color: '#1db954' }}>Uber car</span><br />in minutes
        </h1>
        <p style={{ color: '#a8a8a8', fontSize: '1rem', maxWidth: 480, lineHeight: 1.75, marginBottom: 32, position: 'relative' }}>
          No more WhatsApp groups. Browse verified cars, connect with owners directly, and start earning faster.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
          <Btn variant="green" size="lg" onClick={() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })}>
            Browse available cars
          </Btn>
          <Btn variant="white" size="lg" onClick={onListCar}>List your car →</Btn>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ background: '#1db954', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {[[cars.length, 'Cars listed'], ['9', 'Provinces covered'], ['48h', 'Avg. time to rent'], ['R0', 'Platform fee']].map(([n, l], i) => (
          <div key={l} style={{ flex: 1, minWidth: 120, maxWidth: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '18px 16px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.7rem', color: '#fff', lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* LISTINGS */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }} id="listings">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', letterSpacing: '-0.5px' }}>Available cars</h2>
            <p style={{ color: '#686868', fontSize: '0.84rem', marginTop: 4 }}>
              {filtered.length} listing{filtered.length !== 1 ? 's' : ''} · Featured shown first
            </p>
          </div>
          <Btn variant="dark" size="sm" onClick={onListCar}>+ List your car</Btn>
        </div>

        {/* FILTERS */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', background: '#fff', border: '1px solid #e8e5df', borderRadius: 14, padding: '16px 20px', marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', alignItems: 'flex-end' }}>
          {[
            { label: 'City', key: 'city', type: 'select', options: CITIES },
            { label: 'Transmission', key: 'transmission', type: 'select', options: ['Any', 'Automatic', 'Manual'] },
            { label: 'Status', key: 'status', type: 'select', options: ['All', 'available', 'rented'] },
          ].map(({ label, key, options }) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1, minWidth: 130 }}>
              <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#a8a8a8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>
              <select style={selStyle} value={filters[key]} onChange={e => setF(key, ['Any', 'All cities', 'All'].includes(e.target.value) ? '' : e.target.value)}>
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1, minWidth: 130 }}>
            <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#a8a8a8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Max weekly (R)</label>
            <input style={selStyle} type="number" placeholder="e.g. 4000" value={filters.maxPrice} onChange={e => setF('maxPrice', e.target.value)} />
          </div>
          <button onClick={() => setFilters({ city: '', transmission: '', maxPrice: '', status: '' })} style={{ fontSize: '0.82rem', color: '#686868', background: 'none', border: 'none', cursor: 'pointer', padding: '9px 4px', whiteSpace: 'nowrap', fontFamily: "'DM Sans', sans-serif" }}>
            Clear ✕
          </button>
        </div>

        {/* GRID */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#a8a8a8' }}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
            <p>No cars match your filters. Try adjusting your search.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 22 }}>
            {filtered.map(car => (
              <CarCard key={car.id} car={car} onClick={() => setSelectedCarId(car.id)} onToggleRented={toggleRented} />
            ))}
          </div>
        )}

        {/* HOW IT WORKS */}
        <div style={{ marginTop: 72, background: '#0d0d0d', borderRadius: 22, padding: 'clamp(28px, 5vw, 52px) clamp(24px, 5vw, 48px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 40, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", color: '#f6f4f0', fontSize: '1.8rem', letterSpacing: '-0.7px', marginBottom: 12 }}>
              No middleman.<br />Just you and the owner.
            </h2>
            <p style={{ color: '#a8a8a8', lineHeight: 1.75, fontSize: '0.9rem' }}>
              DriveLink replaces the chaos of WhatsApp groups with a clean, searchable marketplace. Verified owners, screened drivers, digital contracts — all in one place.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              ['1', 'Owner lists their car', 'Add details, set your rate, get a verified badge in minutes.'],
              ['2', 'Driver browses & filters', 'Search by city, price, transmission. See verified listings instantly.'],
              ['3', 'Background check', 'Owners can request a full driver screen: ID, licence, PrDP & criminal record.'],
              ['4', 'Sign & start earning', 'Generate a digital rental agreement. One tap to contact the owner.'],
            ].map(([n, title, desc]) => (
              <div key={n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1db954', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>{n}</div>
                <div>
                  <div style={{ color: '#f6f4f0', fontWeight: 600, fontSize: '0.9rem', marginBottom: 2 }}>{title}</div>
                  <div style={{ color: '#686868', fontSize: '0.8rem', lineHeight: 1.55 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <CarDetailModal
        car={selectedCar}
        open={!!selectedCarId}
        onClose={() => setSelectedCarId(null)}
        onAddReview={addCarReview}
      />
      <AgreementModal
        open={!!agreementCar}
        onClose={() => setAgreementCar(null)}
        car={agreementCar}
      />
    </>
  );
}
