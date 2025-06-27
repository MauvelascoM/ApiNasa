import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';
import './EpicSection.css';

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
        <Swiper
        modules={[Navigation]}
        navigation
         spaceBetween={10} 
         slidesPerView={1} 
         >
  {images.map(item => (
    <SwiperSlide key={item.image}>
      <img
        src={`https://epic.gsfc.nasa.gov/archive/natural/${date.replaceAll('-', '/')}/png/${item.image}.png`}
        alt={item.caption}
      />
    </SwiperSlide>
  ))}
</Swiper>
      ) : (
        <p>No images found for {date}.</p>
      )}
    </section>
  );
}
