import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResidentInfo.css';

const ResidentInfo = ({ resident }) => {
  const [residentInfo, setResidentInfo] = useState(null);

  useEffect(() => {
    (async () => {
      // Fetch resident data from the Rick and Morty API
      const { data } = await axios.get(resident);
      setResidentInfo(data);
    })();
  }, [resident]);

  if (!residentInfo) {
    return 'Loading...';
  }

  return (
    <div className="resident-card">
      <img src={residentInfo.image} alt={residentInfo.name} />
      <p><strong>Name: </strong>{residentInfo.name}</p>
      <p><strong>Status: </strong>{residentInfo.status}</p>
      <p><strong>Origin: </strong>{residentInfo.origin.name}</p>
      <p><strong>Number of episodes: </strong>{residentInfo.episode.length}</p>
    </div>
  );
};

export default ResidentInfo;