import { Btn } from '../components/UI';

function Check({ children }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#e6f7ed', border: '1.5px solid #1db954', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#17a348', flexShrink: 0, marginTop: 1 }}>✓</div>
      <span style={{ fontSize: '0.88rem', color: '#2c2c2c', lineHeight: 1.5 }}>{children}</span>
    </div>
  );
}

function PricingCard({ badge, title, price, period, desc, features, cta, highlight, onCta }) {
  return (
    <div style={{
      background: highlight ? '#0d0d0d' : '#fff',
      border: highlight ? '2px solid #1db954' : '1px solid #e8e5df',
      borderRadius: 20, padding: '32px 28px',
      boxShadow: highlight ? '0 8px 48px rgba(29,185,84,0.15)' : '0 2px 20px rgba(0,0,0,0.06)',
      position: 'relative', display: 'flex', flexDirection: 'column',
    }}>
      {highlight && (
        <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#1db954', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '4px 16px', borderRadius: 20, whiteSpace: 'nowrap' }}>
          MOST POPULAR
        </div>
      )}
      <div style={{ fontSize: '1.4rem', marginBottom: 10 }}>{badge}</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: highlight ? '#f6f4f0' : '#0d0d0d', marginBottom: 6 }}>{title}</div>
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '2rem', color: highlight ? '#1db954' : '#0d0d0d' }}>{price}</span>
        {period && <span style={{ fontSize: '0.82rem', color: highlight ? '#a8a8a8' : '#686868', marginLeft: 5 }}>{period}</span>}
      </div>
      <p style={{ fontSize: '0.85rem', color: highlight ? '#a8a8a8' : '#686868', lineHeight: 1.6, marginBottom: 22, minHeight: 48 }}>{desc}</p>
      <div style={{ flex: 1, marginBottom: 24 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 9 }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: highlight ? 'rgba(29,185,84,0.15)' : '#e6f7ed', border: `1.5px solid ${highlight ? '#1db954' : '#1db954'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#17a348', flexShrink: 0, marginTop: 2 }}>✓</div>
            <span style={{ fontSize: '0.85rem', color: highlight ? '#d4d4d4' : '#2c2c2c', lineHeight: 1.5 }}>{f}</span>
          </div>
        ))}
      </div>
      <Btn variant={highlight ? 'green' : 'outline'} size="md" onClick={onCta} style={{ width: '100%', justifyContent: 'center' }}>
        {cta}
      </Btn>
    </div>
  );
}

export default function PricingPage({ showToast }) {
  const toast = (msg) => showToast(msg);

  return (
    <>
      {/* Header */}
      <div style={{ background: '#0d0d0d', padding: '52px 32px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(29,185,84,0.12)', border: '1px solid rgba(29,185,84,0.3)', color: '#1db954', fontSize: '0.78rem', fontWeight: 500, padding: '5px 14px', borderRadius: 20, marginBottom: 20 }}>
          Simple, transparent pricing
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", color: '#f6f4f0', fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-1px', marginBottom: 14 }}>
          Free to browse.<br /><span style={{ color: '#1db954' }}>Pay only for results.</span>
        </h1>
        <p style={{ color: '#a8a8a8', maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}>
          Listing and browsing are always free. Upgrade when you want more visibility or trust signals.
        </p>
      </div>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* PRICING GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22, marginBottom: 72 }}>
          <PricingCard
            badge="🚗"
            title="Free Listing"
            price="R0"
            period="forever"
            desc="Perfect for getting started. List your car and connect with drivers at no cost."
            features={[
              'List up to 3 cars',
              'WhatsApp & call contact button',
              'Basic listing in search results',
              'Add photos and specs',
              'Receive reviews',
            ]}
            cta="List your car free"
            highlight={false}
            onCta={() => toast('Scroll up and click "List your car"!')}
          />
          <PricingCard
            badge="⭐"
            title="Featured Listing"
            price="R299"
            period="/ month per car"
            desc="Get seen first. Featured listings appear at the top with a gold border and 3x more inquiries."
            features={[
              'Everything in Free',
              'Gold "Featured" badge',
              'Priority placement in search',
              'Highlighted in city results',
              'Performance stats (views, contacts)',
              'Cancel anytime',
            ]}
            cta="Upgrade to Featured"
            highlight={true}
            onCta={() => toast('Featured listing checkout coming soon!')}
          />
          <PricingCard
            badge="🔒"
            title="Driver Verification"
            price="R149"
            period="once-off"
            desc="For drivers. Get a verified badge that makes car owners trust you instantly."
            features={[
              'SA ID verification',
              "Driver's licence check",
              'PrDP verification',
              'Criminal background check',
              'Green verified badge on profile',
              'Valid for 12 months',
            ]}
            cta="Get verified as a driver"
            highlight={false}
            onCta={() => toast('Driver verification coming soon!')}
          />
        </div>

        {/* ADD-ONS */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', letterSpacing: '-0.5px', marginBottom: 6 }}>Add-ons</h2>
          <p style={{ color: '#686868', fontSize: '0.88rem', marginBottom: 24 }}>Pay only when you need these extras.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              ['📋', 'Rental Agreement', 'R50 per agreement', 'Generate a legally-sound digital rental agreement between owner and driver. Printable PDF.'],
              ['🔍', 'Driver Background Check', 'R199 per check', 'Request a full background check on any driver: ID, licence, PrDP & criminal record.'],
              ['📢', 'Boost Listing', 'R99 / 7 days', 'Temporarily pin your listing to the top of results in your city for 7 days.'],
              ['🛡️', 'Owner Verification', 'R99 once-off', 'Get an ID-verified owner badge on all your listings. Increases driver trust significantly.'],
            ].map(([emoji, title, price, desc]) => (
              <div key={title} style={{ background: '#fff', border: '1px solid #e8e5df', borderRadius: 14, padding: '20px 22px', display: 'flex', gap: 16, alignItems: 'flex-start', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{emoji}</div>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: 3 }}>{title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#1db954', fontWeight: 600, marginBottom: 5 }}>{price}</div>
                  <p style={{ fontSize: '0.82rem', color: '#686868', lineHeight: 1.55 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', letterSpacing: '-0.5px', marginBottom: 24 }}>Frequently asked questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              ['Is it really free to list a car?', 'Yes, 100%. Listing your car and receiving inquiries is completely free. You only pay if you want extra visibility with a Featured listing.'],
              ['How does driver verification work?', 'Drivers pay R149 once to submit their ID, licence, and PrDP. We run checks through our SA screening partner and update their profile within 24–48 hours.'],
              ['What does the background check include?', 'The R149 driver verification covers: SA ID confirmation, driver\'s licence validity, PrDP status, and a criminal background check against the SAPS database via our screening partner.'],
              ['Can I cancel a Featured listing?', 'Yes, you can cancel anytime. Your listing will remain featured until the end of the billing period.'],
              ['Is the rental agreement legally binding?', 'Our agreements are designed to be solid and practical. We recommend both parties sign a printed copy. For complex disputes, always consult a legal professional.'],
            ].map(([q, a], i, arr) => (
              <div key={q} style={{ padding: '18px 0', borderBottom: i < arr.length - 1 ? '1px solid #e8e5df' : 'none' }}>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 7 }}>{q}</div>
                <p style={{ fontSize: '0.88rem', color: '#686868', lineHeight: 1.65 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div style={{ background: '#0d0d0d', borderRadius: 20, padding: '44px 40px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", color: '#f6f4f0', fontSize: '1.8rem', letterSpacing: '-0.7px', marginBottom: 12 }}>Ready to get started?</h2>
          <p style={{ color: '#a8a8a8', marginBottom: 28, fontSize: '0.92rem' }}>List your car for free today. Upgrade whenever you need more.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn variant="green" size="lg" onClick={() => toast('Scroll up and click "List your car"!')}>List your car — free</Btn>
            <Btn variant="white" size="lg" onClick={() => toast('Driver verification coming soon!')}>Get driver verified</Btn>
          </div>
        </div>
      </main>
    </>
  );
}
