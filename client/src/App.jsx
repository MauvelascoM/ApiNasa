import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://your-backend-url.onrender.com/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <h1>NASA App</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
