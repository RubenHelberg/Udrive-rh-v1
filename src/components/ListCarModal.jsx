import { useState } from 'react';
import { Modal, Btn, inputStyle } from './UI';

const STEPS = ['Car details', 'Owner verification', 'Listing options'];

export default function ListCarModal({ open, onClose, onSubmit }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    make: '', model: '', year: '', transmission: 'Manual',
    city: 'Johannesburg', area: '', weeklyRent: '', deposit: '',
    description: '', specs: '',
    ownerName: '', ownerPhone: '', ownerIdNumber: '',
    ownerLicenseConfirm: false, ownerIdConfirm: false,
    featured: false,
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const canNext = () => {
    if (step === 0) return form.make && form.model && form.year && form.weeklyRent;
    if (step === 1) return form.ownerName && form.ownerPhone;
    return true;
  };

  const handleSubmit = () => {
    const specs = form.specs ? form.specs.split(',').map(s => s.trim()).filter(Boolean) : [];
    onSubmit({
      make: form.make, model: form.model, year: parseInt(form.year),
      transmission: form.transmission, city: form.city, area: form.area || form.city,
      weeklyRent: parseInt(form.weeklyRent), deposit: parseInt(form.deposit) || parseInt(form.weeklyRent) * 1.5,
      status: 'available', emoji: '🚗', featured: form.featured,
      description: form.description || 'Contact owner for more details.',
      ownerName: form.ownerName, ownerPhone: form.ownerPhone,
      ownerInitials: form.ownerName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
      ownerVerified: form.ownerIdConfirm && form.ownerLicenseConfirm,
      specs: specs.length ? specs : [form.transmission],
      reviews: [],
    });
    setStep(0);
    setForm({ make:'',model:'',year:'',transmission:'Manual',city:'Johannesburg',area:'',weeklyRent:'',deposit:'',description:'',specs:'',ownerName:'',ownerPhone:'',ownerIdNumber:'',ownerLicenseConfirm:false,ownerIdConfirm:false,featured:false });
  };

  const inp = (k) => ({
    value: form[k],
    onChange: e => set(k, e.target.value),
    style: inputStyle,
  });

  return (
    <Modal open={open} onClose={onClose} title="List your car" maxWidth={560}>
      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-start' }}>
            <div style={{ height: 3, width: '100%', borderRadius: 2, background: i <= step ? '#1db954' : '#e8e5df', transition: 'background 0.2s' }} />
            <span style={{ fontSize: '0.68rem', color: i === step ? '#0d0d0d' : '#a8a8a8', fontWeight: i === step ? 600 : 400 }}>{s}</span>
          </div>
        ))}
      </div>

      {/* Step 0: Car details */}
      {step === 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }}>
          {[['Make','make','Toyota'],['Model','model','Corolla Quest']].map(([l,k,ph]) => (
            <div key={k}>
              <Label>{l}</Label>
              <input {...inp(k)} placeholder={ph} />
            </div>
          ))}
          <div>
            <Label>Year</Label>
            <input {...inp('year')} type="number" placeholder="2021" min="2010" max="2026" />
          </div>
          <div>
            <Label>Transmission</Label>
            <select value={form.transmission} onChange={e => set('transmission', e.target.value)} style={inputStyle}>
              <option>Manual</option><option>Automatic</option>
            </select>
          </div>
          <div>
            <Label>City</Label>
            <select value={form.city} onChange={e => set('city', e.target.value)} style={inputStyle}>
              {['Johannesburg','Cape Town','Durban','Pretoria','Port Elizabeth','East London','Bloemfontein'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <Label>Area / Suburb</Label>
            <input {...inp('area')} placeholder="e.g. Sandton" />
          </div>
          <div>
            <Label>Weekly rent (R)</Label>
            <input {...inp('weeklyRent')} type="number" placeholder="3200" min="0" />
          </div>
          <div>
            <Label>Deposit (R)</Label>
            <input {...inp('deposit')} type="number" placeholder="5000" min="0" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <Label>Specs (comma separated)</Label>
            <input {...inp('specs')} placeholder="e.g. Petrol, 1.6L, A/C, Service history" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <Label>Requirements / Description</Label>
            <textarea {...inp('description')} style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} placeholder="PrDP required, clean driving record..." />
          </div>
        </div>
      )}

      {/* Step 1: Owner verification */}
      {step === 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ background: '#f6f4f0', borderRadius: 12, padding: 14, marginBottom: 14, fontSize: '0.85rem', color: '#686868', lineHeight: 1.6 }}>
              🔒 <strong style={{ color: '#0d0d0d' }}>Why verify?</strong> Verified owners get a trust badge on their listings, increasing the chance of finding a driver. Verification is free.
            </div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <Label>Full name</Label>
            <input {...inp('ownerName')} placeholder="Your full name" />
          </div>
          <div>
            <Label>WhatsApp number</Label>
            <input {...inp('ownerPhone')} type="tel" placeholder="0821234567" />
          </div>
          <div>
            <Label>SA ID number</Label>
            <input {...inp('ownerIdNumber')} placeholder="13-digit ID" maxLength={13} />
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['ownerIdConfirm', 'I confirm I own this vehicle and it is legally registered in my name'],
              ['ownerLicenseConfirm', 'I confirm the vehicle has a valid roadworthy certificate and licence disc'],
            ].map(([k, label]) => (
              <label key={k} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
                <input type="checkbox" checked={form[k]} onChange={e => set(k, e.target.checked)} style={{ marginTop: 2, accentColor: '#1db954', width: 16, height: 16 }} />
                <span style={{ fontSize: '0.85rem', color: '#2c2c2c', lineHeight: 1.5 }}>{label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Listing options */}
      {step === 2 && (
        <div>
          <div style={{ marginBottom: 16, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 16 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>⭐ Upgrade to Featured — R299/month</div>
            <p style={{ fontSize: '0.85rem', color: '#686868', lineHeight: 1.6, marginBottom: 12 }}>
              Featured listings appear at the top of search results with a gold border. Car owners with featured listings get 3x more inquiries on average.
            </p>
            <label style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} style={{ accentColor: '#f5a623', width: 16, height: 16 }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Yes, feature my listing (R299/month — billed separately)</span>
            </label>
          </div>

          <div style={{ background: '#f6f4f0', borderRadius: 12, padding: 16, fontSize: '0.85rem', lineHeight: 1.6, color: '#686868' }}>
            <strong style={{ color: '#0d0d0d' }}>📋 Summary</strong><br/>
            {form.year} {form.make} {form.model} · {form.city}<br/>
            R{Number(form.weeklyRent).toLocaleString()}/week · {form.ownerName}<br/>
            {(form.ownerIdConfirm && form.ownerLicenseConfirm) ? '✅ Will show as Verified owner' : '⚠️ Unverified listing'}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22 }}>
        {step > 0
          ? <Btn variant="outline" size="md" onClick={() => setStep(s => s - 1)}>← Back</Btn>
          : <div />}
        {step < STEPS.length - 1
          ? <Btn variant="green" size="md" onClick={() => canNext() && setStep(s => s + 1)} disabled={!canNext()}>Next →</Btn>
          : <Btn variant="green" size="md" onClick={handleSubmit}>Publish listing ✓</Btn>}
      </div>
    </Modal>
  );
}

function Label({ children }) {
  return <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#686868', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 4 }}>{children}</label>;
}
