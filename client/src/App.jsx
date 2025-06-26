import { useEffect, useState } from 'react';
import './AppNasa.css';
import NearEarthObjects from './components/NearEarthObjects';
import EpicSection from './components/EpicSection';
import SolarCalendar from './components/SolarCalendar'


function App() {
  const [apod, setApod] = useState(null);

  useEffect(() => {
  fetch('https://apinasa-backend.onrender.com/api/apod')
    .then(res => {
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      return res.json();
    })
    .then(data => setApod(data))
    .catch(console.error);
}, []);

  if (!apod) return <p>Loading...</p>;

  return (
    <div className="App">
      <h1>{apod.title}</h1>
      <p>{apod.date}</p>
      {apod.media_type === 'image' ? (
        <img src={apod.url} alt={apod.title} width="600" />
      ) : (
        <iframe src={apod.url} width="600" height="400" title="NASA Video" />
      )}
      <p>{apod.explanation}</p>
       <div className="section">
        <NearEarthObjects />
      </div>
      <div className="section">
        <EpicSection/>
      </div>
      <div className="section">
        <SolarCalendar/>
      </div>
 

    </div>
    
  );
}

export default App;
