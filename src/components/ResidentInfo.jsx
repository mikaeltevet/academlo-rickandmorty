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
      <div className="resident-status">{residentInfo.status}</div>
      <p className="resident-card-name">{residentInfo.name}</p>
      <hr/>
      <p><span>Species</span><br/>{residentInfo.species}</p>
      <p><span>Origin</span><br/>{residentInfo.origin.name}</p>
      <p><span>Number of episodes</span><br/>{residentInfo.episode.length}</p><br/>
    </div>
  );
};

export default ResidentInfo;