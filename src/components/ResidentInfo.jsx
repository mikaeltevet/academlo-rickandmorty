import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ResidentInfo(props) {
  const [resident, setResident] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const result = await axios(props.url);
          setResident(result.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };      
    fetchData();
  }, [props.url]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{resident.name}</h1>
      <img src={resident.image} alt={resident.name} />
      <p>Status: {resident.status}</p>
      <p>Origin: {resident.origin.name}</p>
      <p>Episode count: {resident.episodes.length}</p>
    </div>
  );
}

export default ResidentInfo;