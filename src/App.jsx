import { useState } from 'react';
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import DriversPage from './pages/DriversPage';
import PricingPage from './pages/PricingPage';
import ListCarModal from './components/ListCarModal';
import { Toast, useToast } from './components/UI';
import { SEED_CARS, SEED_DRIVERS } from './data';

export default function App() {
  const [page, setPage] = useState('home');
  const [cars, setCars] = useState(SEED_CARS);
  const [drivers, setDrivers] = useState(SEED_DRIVERS);
  const [listCarOpen, setListCarOpen] = useState(false);
  const { toast, show: showToast } = useToast();

  const handleAddCar = (newCar) => {
    setCars(prev => [{ ...newCar, id: Date.now() }, ...prev]);
    showToast('✅ Your car has been listed!');
    setListCarOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav page={page} setPage={setPage} onListCar={() => setListCarOpen(true)} />

      <div style={{ flex: 1 }}>
        {page === 'home' && (
          <HomePage cars={cars} setCars={setCars} onListCar={() => setListCarOpen(true)} showToast={showToast} />
        )}
        {page === 'drivers' && (
          <DriversPage drivers={drivers} setDrivers={setDrivers} showToast={showToast} />
        )}
        {page === 'pricing' && (
          <PricingPage showToast={showToast} />
        )}
      </div>

      <footer style={{ background: '#0d0d0d', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <button onClick={() => setPage('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.15rem', color: '#f6f4f0', letterSpacing: '-0.4px' }}>
          Drive<span style={{ color: '#1db954' }}>Link</span>
        </button>
        <p style={{ color: '#686868', fontSize: '0.82rem' }}>Built for South Africa's Uber drivers 🇿🇦</p>
        <p style={{ color: '#686868', fontSize: '0.78rem' }}>© 2025 DriveLink · Free to use</p>
      </footer>

      <ListCarModal open={listCarOpen} onClose={() => setListCarOpen(false)} onSubmit={handleAddCar} />
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
