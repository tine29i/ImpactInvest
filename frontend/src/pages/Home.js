// frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur Blockchain Invest</h1>
      <p className="mb-4">Investissez dans des projets innovants grâce à la technologie blockchain.</p>
      <Link to="/invest" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
        Commencer à investir
      </Link>
    </div>
  );
};

export default Home;
