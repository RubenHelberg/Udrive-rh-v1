import { useState } from 'react';
import { Modal, Btn, inputStyle } from './UI';

export default function AgreementModal({ open, onClose, car }) {
  const [form, setForm] = useState({
    driverName: '', driverID: '', driverPhone: '', driverLicense: '',
    startDate: '', endDate: '', agreedRate: car?.weeklyRent || '',
    deposit: car?.deposit || '', extraTerms: '',
    ownerSigned: false, driverSigned: false,
  });
  const [generated, setGenerated] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const generate = () => {
    if (!form.driverName || !form.startDate) return;
    setGenerated(true);
  };

  const printAgreement = () => window.print();

  const inp = (k, extra = {}) => ({
    value: form[k], onChange: e => set(k, e.target.value),
    style: inputStyle, ...extra,
  });

  if (!car) return null;

  return (
    <Modal open={open} onClose={() => { setGenerated(false); onClose(); }} title="Rental Agreement Generator" maxWidth={620}>
      {!generated ? (
        <>
          <p style={{ fontSize: '0.85rem', color: '#686868', marginBottom: 18, lineHeight: 1.6 }}>
            Generate a simple rental agreement between the car owner and driver. Both parties should sign a printed copy.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ gridColumn: '1/-1', background: '#f6f4f0', borderRadius: 10, padding: 12, fontSize: '0.82rem', color: '#686868' }}>
              🚗 <strong style={{ color: '#0d0d0d' }}>Vehicle:</strong> {car.year} {car.make} {car.model} · Owner: {car.ownerName}
            </div>
            <FieldWrap label="Driver full name"><input {...inp('driverName')} placeholder="Full legal name" /></FieldWrap>
            <FieldWrap label="Driver SA ID number"><input {...inp('driverID')} placeholder="13-digit ID" maxLength={13} /></FieldWrap>
            <FieldWrap label="Driver phone"><input {...inp('driverPhone')} placeholder="0821234567" /></FieldWrap>
            <FieldWrap label="Driver licence number"><input {...inp('driverLicense')} placeholder="Licence number" /></FieldWrap>
            <FieldWrap label="Start date"><input {...inp('startDate')} type="date" /></FieldWrap>
            <FieldWrap label="End date (optional)"><input {...inp('endDate')} type="date" /></FieldWrap>
            <FieldWrap label="Agreed weekly rate (R)"><input {...inp('agreedRate')} type="number" /></FieldWrap>
            <FieldWrap label="Deposit amount (R)"><input {...inp('deposit')} type="number" /></FieldWrap>
            <FieldWrap label="Additional terms" full>
              <textarea {...inp('extraTerms')} style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }} placeholder="e.g. No smoking in vehicle, weekly payment every Monday..." />
            </FieldWrap>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
            <Btn variant="green" size="md" onClick={generate} disabled={!form.driverName || !form.startDate}>
              Generate agreement →
            </Btn>
          </div>
        </>
      ) : (
        <>
          <div id="agreement-doc" style={{ fontFamily: 'Georgia, serif', fontSize: '0.88rem', lineHeight: 1.7, color: '#0d0d0d' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 }}>VEHICLE RENTAL AGREEMENT</div>
              <div style={{ fontSize: '0.8rem', color: '#686868' }}>Generated via DriveLink · {new Date().toLocaleDateString('en-ZA')}</div>
            </div>
            <hr style={{ border: 'none', borderTop: '2px solid #0d0d0d', marginBottom: 16 }} />

            <Section title="1. PARTIES">
              <Row label="Owner (Lessor)" value={car.ownerName} />
              <Row label="Owner contact" value={car.ownerPhone} />
              <Row label="Driver (Lessee)" value={form.driverName} />
              <Row label="Driver ID number" value={form.driverID} />
              <Row label="Driver licence" value={form.driverLicense} />
              <Row label="Driver contact" value={form.driverPhone} />
            </Section>

            <Section title="2. VEHICLE">
              <Row label="Vehicle" value={`${car.year} ${car.make} ${car.model}`} />
              <Row label="Transmission" value={car.transmission} />
            </Section>

            <Section title="3. RENTAL TERMS">
              <Row label="Start date" value={form.startDate} />
              {form.endDate && <Row label="End date" value={form.endDate} />}
              <Row label="Weekly rental rate" value={`R${Number(form.agreedRate).toLocaleString()}`} />
              <Row label="Refundable deposit" value={`R${Number(form.deposit).toLocaleString()}`} />
            </Section>

            <Section title="4. CONDITIONS">
              <p style={{ marginBottom: 6 }}>The lessee agrees to the following:</p>
              <ul style={{ paddingLeft: 18, color: '#2c2c2c' }}>
                <li>The vehicle shall only be used for Uber/e-hailing purposes.</li>
                <li>The lessee is responsible for all traffic fines incurred during the rental period.</li>
                <li>The vehicle must be returned in the same condition as received, fair wear and tear excepted.</li>
                <li>Weekly rental payments are due every Monday before 09:00.</li>
                <li>The deposit is refundable upon return of the vehicle in good condition.</li>
                <li>The lessee must hold a valid PrDP for the duration of this agreement.</li>
                {form.extraTerms && <li>{form.extraTerms}</li>}
              </ul>
            </Section>

            <Section title="5. SIGNATURES">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 16 }}>
                {[['Owner / Lessor', car.ownerName], ['Driver / Lessee', form.driverName]].map(([role, name]) => (
                  <div key={role}>
                    <div style={{ borderBottom: '1px solid #0d0d0d', marginBottom: 6, height: 40 }} />
                    <div style={{ fontSize: '0.78rem' }}><strong>{role}:</strong> {name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#686868' }}>Date: _______________</div>
                  </div>
                ))}
              </div>
            </Section>

            <div style={{ marginTop: 16, padding: 12, background: '#f6f4f0', borderRadius: 8, fontSize: '0.75rem', color: '#a8a8a8', textAlign: 'center' }}>
              This agreement was generated by DriveLink (drivelink.co.za). Both parties should retain a signed copy. DriveLink is not a party to this agreement.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <Btn variant="outline" size="md" onClick={() => setGenerated(false)}>← Edit</Btn>
            <Btn variant="green" size="md" onClick={printAgreement} style={{ flex: 1 }}>
              🖨 Print / Save as PDF
            </Btn>
          </div>
        </>
      )}
    </Modal>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8, paddingBottom: 4, borderBottom: '1px solid #e8e5df' }}>{title}</div>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
      <span style={{ color: '#686868', minWidth: 160, fontSize: '0.85rem' }}>{label}:</span>
      <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{value || '—'}</span>
    </div>
  );
}

function FieldWrap({ label, children, full }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, gridColumn: full ? '1/-1' : undefined }}>
      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#686868', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>
      {children}
    </div>
  );
}
