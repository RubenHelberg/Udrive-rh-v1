import { Badge, Avatar, StarRating } from './UI';

function CheckItem({ done, label }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.82rem' }}>
      <div style={{
        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
        background: done ? '#e6f7ed' : '#fef2f2',
        border: `1.5px solid ${done ? '#1db954' : '#fca5a5'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.65rem', color: done ? '#17a348' : '#ef4444',
      }}>{done ? '✓' : '✗'}</div>
      <span style={{ color: done ? '#2c2c2c' : '#a8a8a8' }}>{label}</span>
    </div>
  );
}

export default function DriverCard({ driver, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 16,
      border: '1px solid #e8e5df',
      padding: '20px 22px', cursor: 'pointer',
      boxShadow: '0 2px 20px rgba(0,0,0,0.07)',
      transition: 'transform 0.18s, box-shadow 0.18s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(0,0,0,0.12)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.07)'; }}
    >
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
        <Avatar initials={driver.initials} size={52} verified={driver.verificationStatus === 'verified'} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.05rem', marginBottom: 3 }}>{driver.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#686868', fontSize: '0.8rem', marginBottom: 6 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {driver.city}
          </div>
          <Badge type={driver.verificationStatus === 'verified' ? 'verified' : driver.verificationStatus === 'partial' ? 'partial' : 'unverified'}>
            {driver.verificationStatus === 'verified' ? '✓ Fully verified' : driver.verificationStatus === 'partial' ? '⚠ Partial verification' : '✗ Unverified'}
          </Badge>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <div style={{ flex: 1, background: '#f6f4f0', borderRadius: 10, padding: '9px 12px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.1rem' }}>{driver.uberRating}</div>
          <div style={{ fontSize: '0.7rem', color: '#a8a8a8', marginTop: 1 }}>Uber rating</div>
        </div>
        <div style={{ flex: 1, background: '#f6f4f0', borderRadius: 10, padding: '9px 12px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.1rem' }}>{driver.trips.toLocaleString()}</div>
          <div style={{ fontSize: '0.7rem', color: '#a8a8a8', marginTop: 1 }}>Trips</div>
        </div>
        <div style={{ flex: 1, background: '#f6f4f0', borderRadius: 10, padding: '9px 12px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem' }}>{driver.experience}</div>
          <div style={{ fontSize: '0.7rem', color: '#a8a8a8', marginTop: 1 }}>Experience</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <CheckItem done={driver.idVerified} label="ID verified" />
        <CheckItem done={driver.licenseVerified} label="Driver's licence verified" />
        <CheckItem done={driver.prdpVerified} label="PrDP verified" />
        <CheckItem done={driver.criminalClear} label="Criminal record clear" />
      </div>
    </div>
  );
}
