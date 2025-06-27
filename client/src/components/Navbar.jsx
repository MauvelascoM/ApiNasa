import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">☀️ SpaceScope</h1>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/calendar" className="hover:underline">Solar Events</Link></li>
          <li><Link to="/epic" className="hover:underline">EPIC</Link></li>
          <li><Link to="/neo" className="hover:underline">NEO</Link></li>
        </ul>
      </div>
    </nav>
  );
}
