
#  Frontend (React)

Project NasaAPI is a frontend React application that consumes data from multiple NASA APIs through a custom Express backend. It provides a clean interface to explore space events, Earth imagery, asteroid data, and the Astronomy Picture of the Day (APOD).

Backend is deployed at:  
**https://apinasa-backend.onrender.com**

---
# NASA API Backend (Express)

This is the **backend server** for a NASA space exploration application. It connects to various NASA APIs and provides clean, ready-to-use endpoints for a frontend (e.g., React) to consume.

Frontend is deployed at:  
 **https://apinasa-frontend.onrender.com**

---

## Features

- 🖼️ View NASA's Astronomy Picture of the Day
- 🌍 Explore satellite imagery by date and location (EPIC)
- ☄️ Check Near-Earth Object data (asteroids)
- 🌞 View solar events like flares and CMEs on a calendar

---

## Tech Stack

### Frontend
- React 19, Vite, React Router DOM
- Swiper for sliders
- React Calendar for date picking

### Backend
- Node.js + Express 5
- Axios for NASA API calls
- dotenv for environment variables
- CORS for frontend-backend communication


## Project Structure

```
client/
├── src/
│   ├── App.jsx
│   ├── AppNasa.css
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── solarCalendar.jsx
│   │   ├── EpicSection.jsx
│   │   └── NearEarthObjects.jsx
├── public/
├── package.json
server
├── server.js      
├── package.json
README.md


## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/spacescope-frontend.git
cd spacescope-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the  server & app

```bash
npm run dev
```

Frontend will run at:  
`http://localhost:5173` (default Vite port)

Backend is running at:
Server will be available at `http://localhost:5000`
`https://apinasa-backend.onrender.com`



## 🌐 API Endpoints

### `/api/apod`

Returns NASA’s Astronomy Picture of the Day.

**Query parameters (optional):**
- `date` = `YYYY-MM-DD`

Example:
```
GET /api/apod?date=2024-06-01
```

---

### `/api/events`

Returns solar activity from NASA’s DONKI API.

**Query parameters:**
- `start` = `YYYY-MM-DD`
- `end` = `YYYY-MM-DD`
- `type` = CME | FLR | SEP | HSS | etc. (optional, default is CME)

Example:
```
GET /api/events?start=2024-06-01&end=2024-06-15&type=FLR
```

---

### `/api/neo`

Returns Near Earth Object data.

**Query parameters:**
- `start_date` = `YYYY-MM-DD`
- `end_date` = `YYYY-MM-DD`

Example:
```
GET /api/neo?start_date=2024-06-10&end_date=2024-06-17
```

---

### `/api/epic/:date`

Returns EPIC Earth image metadata for a specific date.

**URL parameter:**
- `:date` = `YYYY-MM-DD`

Example:
```
GET /api/epic/2024-06-01
```

---

## Deployment

### On Render

1. Push this project to a GitHub repo
2. Create a new **Web Service** on [Render](https://render.com)
3. Connect to your repo
4. Set build/start command:
   ```
   npm install && npm start
   ```



## License

MIT © 2025 Mauricio Velasco

---

## Credits

- NASA Open APIs: https://api.nasa.gov