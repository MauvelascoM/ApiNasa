const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'https://apinasa-frontend.onrender.com',  
  methods: ['GET', 'POST'],
  credentials: true
}));

const NASA_API_KEY = "doeOrDrZkTaYZQKoT0klkRa3ojksk4xmWI7bqcjN";


app.get('/api/apod', async (req, res) => {
  try {
    const { date } = req.query;
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date || ''}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APOD' });
  }
});





const NASA_API = 'https://api.nasa.gov/DONKI';
app.get('/api/events', async (req, res) => {
  try {
    const type = req.query.type || 'CME'; 
    const { start, end} = req.query;

    const params = {
      startDate: start,
      endDate: end,
      api_key: NASA_API_KEY,
    };

    const response = await axios.get(`${NASA_API}/${type}`, { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching DONKI data:', error.message);
    res.status(500).json({ error: 'Failed to fetch space weather events' });
  }
});





app.get('/api/neo', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
      params: {
        start_date,
        end_date,
        api_key: NASA_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("NASA NEO fetch failed:", error.message);
    res.status(500).json({ error: 'Failed to fetch Near Earth Objects data' });
  }
});

app.get('/api/epic/:date', async (req, res) => {
  const { date } = req.params; 
  try {
    const resp = await axios.get(
      `https://api.nasa.gov/EPIC/api/natural/date/${date}`,
      { params: { api_key: NASA_API_KEY } }
    );
    res.json(resp.data);
  } catch (err) {
    console.error('EPIC fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch EPIC' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

