import { useState } from 'react';
import { Btn, inputStyle } from './UI';

export default function ReviewForm({ onSubmit }) {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  const handle = () => {
    if (!author.trim() || !text.trim()) return;
    onSubmit({ author, rating, text, date: new Date().toISOString().split('T')[0] });
    setAuthor(''); setText(''); setRating(5);
  };

  return (
    <div style={{ background: '#f6f4f0', borderRadius: 12, padding: 16, marginBottom: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
        <div>
          <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#686868', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 4 }}>Your name</label>
          <input value={author} onChange={e => setAuthor(e.target.value)} style={inputStyle} placeholder="e.g. Thabo M." />
        </div>
        <div>
          <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#686868', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 4 }}>Rating</label>
          <select value={rating} onChange={e => setRating(Number(e.target.value))} style={inputStyle}>
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} star{n !== 1 ? 's' : ''}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#686868', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 4 }}>Review</label>
        <textarea value={text} onChange={e => setText(e.target.value)} style={{ ...inputStyle, minHeight: 72, resize: 'vertical' }} placeholder="Share your experience..." />
      </div>
      <Btn variant="dark" size="sm" onClick={handle}>Submit review</Btn>
    </div>
  );
}
