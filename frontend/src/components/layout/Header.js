// frontend/src/components/layout/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-purple-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Blockchain Invest</Link>
        <ul className="flex space-x-4">
          <li><Link to="/invest">Investir</Link></li>
          <li><Link to="/projects">Projets</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;