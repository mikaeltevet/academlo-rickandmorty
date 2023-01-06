import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResidentInfo from './components/ResidentInfo';
import './App.css';

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
      {location ? (
        <>
          <h1>{location.name}</h1>
          <span><strong>type: </strong>{location.type}</span>
          <span><strong>dimension: </strong>{location.dimension}</span>
          <span><strong>population: </strong>{location.residents.length}</span>
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
          <div className="resident-grid">
            {location.residents.map((resident) => (
              <ResidentInfo key={resident.id} resident={resident} />
            ))}
          </div>
        </>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default App;