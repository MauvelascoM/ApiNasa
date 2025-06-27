import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function App() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventType, setEventType] = useState('ALL');

useEffect(() => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const format = d => d.toISOString().split('T')[0];

  let query = `https://apinasa-backend.onrender.com/api/events?start=${format(start)}&end=${format(end)}`;
  if (eventType !== 'ALL') {
    query += `&type=${eventType}`;
  }

  fetch(query)
    .then(res => res.json())
    .then(data => setEvents(data))
    .catch(console.error);
}, [date, eventType]);

  function onDayClick(value) {
    const day = value.toISOString().split('T')[0];
    const matches = events.filter(ev => {
      const eventDate = ev.startTime?.split('T')[0] || ev.activityID?.split('T')[0];
      return eventDate === day;
    });
    setSelectedDate(day);
    setSelectedEvents(matches);
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🌞 Solar Event Calendar</h1>
      <div className="mb-4">
  <label className="mr-2 font-semibold">Filter by Event Type:</label>
  <select
    className="border p-1"
    value={eventType}
    onChange={e => setEventType(e.target.value)}
  >
    <option value="ALL">All</option>
    <option value="CME">CME</option>
    <option value="FLR">FLR</option>
    <option value="SEP">SEP</option>
    <option value="HSS">HSS</option>
    <option value="WSAEnlilSimulation">WSA Enlil</option>
  </select>
</div>
      <Calendar
        value={date}
        onChange={setDate}
        onClickDay={onDayClick}
        tileClassName={({ date }) => {
          const dayStr = date.toISOString().split('T')[0];
          return events.some(ev => ev.startTime?.startsWith(dayStr) || ev.activityID?.startsWith(dayStr)) ? 'bg-yellow-100' : null;
        }}
      />

      {selectedEvents.length > 0 && selectedDate && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Events on {selectedDate}</h2>
          <ul className="mt-2">
            {selectedEvents.map((ev, idx) => (
              <li key={idx} className="mb-2 border p-2 rounded bg-white shadow">
                <strong>{ev.eventType}</strong>: {ev.note || ev.message || 'No description'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;