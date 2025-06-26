import { useState, useEffect } from 'react';

export default function EpicSection() {
  const [date, setDate] = useState('2024-04-08');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!date) return;
    fetch(`https://apinasa-backend.onrender.com/api/epic/${date}`)
      .then(res => res.json())
      .then(setImages)
      .catch(console.error);
  }, [date]);

  return (
    <section className="epic-section">
      <h2>EPIC Images by Date</h2>
      <input
        type="date"
        value={date}
        max={new Date().toISOString().split('T')[0]}
        onChange={e => setDate(e.target.value)}
      />

      {images.length > 0 ? (
        <div className="image-grid">
          {images.map(item => (
            <div key={item.image}>
              <img
                src={`https://epic.gsfc.nasa.gov/archive/natural/${date.replaceAll('-', '/')}/png/${item.image}.png`}
                alt={item.caption}
              />
              <p>{item.caption}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No images found for {date}.</p>
      )}
    </section>
  );
}
