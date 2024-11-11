// src/components/Home.jsx


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query) {
      navigate(`/items?search=${query}`);
    }
  };

  return (
    
      <div className="home">
      <h1 className="home-title">Bazar Online</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Buscar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Buscar</button>
      </div>
    </div>
  );
}

export default Home;
