import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function App() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const format = d => d.toISOString().split('T')[0];

    fetch(`https://apinasa-backend.onrender.com/api/events?start=${format(start)}&end=${format(end)}`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(console.error);
  }, [date]);

  function onDayClick(value) {
    const day = value.toISOString().split('T')[0];
    const matches = events.filter(ev => ev.startTime?.startsWith(day) || ev.activityID?.startsWith(day));
    setSelectedEvents(matches);
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🌞 Solar Event Calendar</h1>
      <Calendar
        value={date}
        onChange={setDate}
        onClickDay={onDayClick}
        tileClassName={({ date }) => {
          const dayStr = date.toISOString().split('T')[0];
          return events.some(ev => ev.startTime?.startsWith(dayStr) || ev.activityID?.startsWith(dayStr)) ? 'bg-yellow-100' : null;
        }}
      />

      {selectedEvents.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Events on {selectedEvents[0].startTime?.split('T')[0]}</h2>
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