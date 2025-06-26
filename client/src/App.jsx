import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    axios.get('https://your-backend-url.onrender.com/api/apod')
      .then(res => setApod(res.data))
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
       {/* <div className="section">
        <NearEarthObjects />
      </div>

      <div className="section">
        <EarthImage />
      </div>
      <div className="section">
        <Mars />
      </div> */}
    </div>
    
  );
}

export default App;
