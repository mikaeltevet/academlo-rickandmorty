import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResidentInfo from './components/ResidentInfo';
import './App.css';
import overlay from './assets/overlay.png'

const App = () => {
  const [location, setLocation] = useState(null);
  const [locationId, setLocationId] = useState('');

  useEffect(() => {
    // Fetch a random location on mount
    (async () => {
      const { data } = await axios.get(
        'https://rickandmortyapi.com/api/location/'
      );
      setLocation(data.results[Math.floor(Math.random() * data.results.length)]);
    })();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    // Search for location by ID
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/location/${locationId}`
    );
    setLocation(data);
  };

  return (
    <div>
      <div className="banner">
        <img className="overlay" src={overlay}></img>
      </div>
      {location ? (
        <>
          <div className="location-card">
            <h1>{location.name}</h1>
            <span><strong>Type: </strong>{location.type}</span>
            <span><strong>Dimension: </strong>{location.dimension}</span>
            <span><strong>Population: </strong>{location.residents.length}</span>
            <form onSubmit={handleSearch}>
              <label htmlFor="location-id">
                Enter a location ID:
                <input
                  type="text"
                  id="location-id"
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="resident-grid">
            {location.residents.map((resident) => (
              <ResidentInfo key={resident.id} resident={resident} />
            ))}
          </div>
        </>
      ) : (
        'Loading...'
      )}
      <footer>Hecho con &hearts; en Academlo por Miguel &Aacute;ngel Garc&iacute;a.</footer>
    </div>
  );
};

export default App;