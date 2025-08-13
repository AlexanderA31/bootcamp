import React, { useState, useEffect } from 'react';
import AdoptedCards from './AdoptedCards';

const AdoptedHistory = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdoptedPets = async () => {
    try {
      const response = await fetch('http://localhost:4000/adoptedPets');
      if (!response.ok) {
        throw new Error('An error occurred while fetching adopted pets');
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching adopted pets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdoptedPets();
  }, []);

  return (
    <div className='pet-container'>
      {loading ? (
        <p>Cargando...</p>
      ) : 
      requests.length > 0 ? (
        requests.map((request) => (
          <AdoptedCards
            key={request._id}
            pet={request}
            updateCards={fetchAdoptedPets}
            deleteBtnText="Eliminar Historial"
            approveBtn={false}
          />
        ))
      ) : (
        <p>No hay mascotas adoptadas disponibles</p>
      )}
    </div>
  );
};

export default AdoptedHistory;
