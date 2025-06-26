import React, { useState,useRef, useEffect } from 'react';



export default function NearEarthObjects() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [asteroids, setAsteroids] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDistanceFor, setShowDistanceFor] = useState(null);
  const [error, setError] = useState(null);


  async function fetchNEO() {
    setLoading(true);
    setError(null);
    setAsteroids(null);
      setShowDistanceFor(null); // reset any open distance display

    // Build query string for backend API
    let query = '';
    if (startDate) query += `start_date=${startDate}`;
    if (endDate) query += (query ? '&' : '') + `end_date=${endDate}`;

    try {
      const res = await fetch(`/api/neo?${query}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setAsteroids(data.near_earth_objects);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }
  function toggleShowDistance(id) {
    setShowDistanceFor(showDistanceFor === id ? null : id);

  }


 return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Near Earth Objects (Asteroids)</h2>
      <label>
        Start Date:{' '}
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
      </label>{' '}
      <label>
        End Date:{' '}
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </label>{' '}
      <button onClick={fetchNEO} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Asteroids'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {asteroids && (
        <div>
          <h3>Results:</h3>
          {Object.keys(asteroids).length === 0 && <p>No asteroids found.</p>}

          {Object.entries(asteroids).map(([date, asteroidsOnDate]) => (
            <div key={date}>
              <h4>{date}</h4>
              <ul>
                {asteroidsOnDate.map(asteroid => (
                   
                  <li key={asteroid.id} style={{ marginBottom: '2rem' }}>
                    <strong>{asteroid.name}</strong> -{' '}
                    {asteroid.is_potentially_hazardous_asteroid
                      ? '⚠️ Potentially Hazardous'
                      : 'Safe'}
                    <br />
                    Estimated diameter (meters):{' '}
                    {asteroid.estimated_diameter.meters.estimated_diameter_min.toFixed(2)} -{' '}
                    {asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}
                    <br />
                    
                    Miss distance (km):{' '}
                    {parseFloat(
                      asteroid.close_approach_data[0].miss_distance.kilometers
                    ).toFixed(2)}
                   
                    <br />
                    <button onClick={() => toggleShowDistance(asteroid.id)}>
                      {showDistanceFor === asteroid.id ? 'Hide Distance' : 'Show Distance'}
                    </button>

                    {/* Conditionally show the image + line */}
                    {showDistanceFor === asteroid.id && (
                      <div
                        style={{
                          marginTop: '10px',
                          position: 'relative',
                          width: 400,
                          height: 200,
                          border: '1px solid #ccc',
                        }}
                      >
                        <img
                          src="/marss.jpg"
                          alt="Earth"
                          style={{ width: '100%', height: 'auto' }}
                        />

                        {/* Example red line - you can improve logic for placement */}
                        <svg
      width="400"
      height="300"
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      <line
        x1="350" 
        y1="80"  
        x2={350-(180*((asteroid.close_approach_data[0].miss_distance.kilometers)/55000000))}
        y2="80" 

        stroke="red"
        strokeWidth="2"
      />
    </svg>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}