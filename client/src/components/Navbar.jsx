import { Link } from 'react-router-dom';
import './Navbar.css'; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">☀️</h1>
        <ul className="navbar-menu">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/calendar" className="navbar-link">Solar Events</Link></li>
          <li><Link to="/epic" className="navbar-link">EPIC</Link></li>
          <li><Link to="/neo" className="navbar-link">NEO</Link></li>
        </ul>
      </div>
    </nav>
  );
}