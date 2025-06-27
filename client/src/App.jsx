import { useEffect, useState } from 'react';
import './AppNasa.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CalendarView from './components/solarCalendar';
import EpicSection from './components/EpicSection';
import NearEarthObjects from './components/NearEarthObjects';

function App() {

    const [apod, setApod] = useState(null);

  useEffect(() => {
    axios.get('https://apinasa-backend.onrender.com/api/apod')
      .then(res => setApod(res.data))
      .catch(console.error);
  }, []);

  if (!apod) return <p>Loading...</p>;

  return (
    <Router>
      
      <Navbar />
      <div className="p-4">
        <Routes>
<Route
  path="/"
  element={
    <>
      <h2 className="text-xl">Welcome to SpaceScope 🚀</h2>
      <div className="App">
        <h1>{apod.title}</h1>
        <p>{apod.date}</p>
        {apod.media_type === 'image' ? (
          <img src={apod.url} alt={apod.title} width="600" />
        ) : (
          <iframe src={apod.url} width="600" height="400" title="NASA Video" />
        )}
        <p>{apod.explanation}</p>
      </div>
    </>
  }
/>

          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/epic" element={<EpicSection />} />
          <Route path="/neo" element={<NearEarthObjects />} />
        </Routes>
      </div>

    </Router>
    
  );
}

export default App;