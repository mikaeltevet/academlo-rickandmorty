import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResidentInfo from './components/ResidentInfo';
import './App.css';

function App() {
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const [residents, setResidents] = useState([]);

  const handleChange = (event) => {
    setId(event.target.value);
  };

  const handleClick = async () => {
    const result = await axios(
      `https://rickandmortyapi.com/api/location/${Number(id)}`,
    );
    setLocation(result.data.results.find((location) => location.id === id));
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://rickandmortyapi.com/api/location/${Number(id)}`,
        );
        setLocation(result.data.results.find((location) => location.id === id));
        const residentPromises = location.residents.map((residentUrl) => axios(residentUrl));
        const residentsResult = await Promise.all(residentPromises);
        setResidents(residentsResult.map((result) => result.data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    }, []);
    
    if (loading) {
      return <p>Loading...</p>;
    }
    
    return (
      <div>
        <h1>{location.name}</h1>
        <span><strong>type:</strong> {location.type}</span>
        <span><strong>dimension:</strong> {location.dimension}</span>
        <span><strong>population:</strong> {location.residents.length}</span>
        <br/>
        <input type="text" value={id} onChange={handleChange} />
        <button onClick={handleClick}>Search</button>
        {residents.map((resident) => (
        <ResidentInfo key={resident.id} url={resident.url} />
        ))}
      </div>
    );
    }
    
    export default App;    