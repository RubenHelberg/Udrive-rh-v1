import { Btn } from './UI';

export default function Nav({ page, setPage, onListCar }) {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#0d0d0d',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', height: 64,
    }}>
      <button onClick={() => setPage('home')} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        fontSize: '1.3rem', color: '#f6f4f0', letterSpacing: '-0.5px',
      }}>
        Drive<span style={{ color: '#1db954' }}>Link</span>
      </button>

      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {[
          { label: 'Browse', key: 'home' },
          { label: 'Drivers', key: 'drivers' },
          { label: 'Pricing', key: 'pricing' },
        ].map(({ label, key }) => (
          <button key={key} onClick={() => setPage(key)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: page === key ? '#fff' : '#a8a8a8',
            fontSize: '0.88rem', padding: '6px 12px', borderRadius: 20,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: page === key ? 500 : 400,
            transition: 'color 0.15s',
          }}>{label}</button>
        ))}
        <Btn variant="green" size="sm" onClick={onListCar} style={{ marginLeft: 6 }}>
          + List your car
        </Btn>
      </div>
    </nav>
  );
}
