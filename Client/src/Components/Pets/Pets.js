import React, { useEffect, useState } from "react";
import PetsViewer from "./PetsViewer";

const Pets = () => {
  const [filter, setFilter] = useState("all");
  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/approvedPets`)
        if (!response.ok) {
          throw new Error('An error occurred')
        }
        const data = await response.json()
        setPetsData(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests();
  }, [])

  const filteredPets = petsData.filter((pet) => {
    if (filter === "all") {
      return true;
    }
    return pet.type === filter;
  });

  return (
    <>
      <div className="filter-selection">
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="all">Todas las Mascotas</option>
          <option value="Perro">Perros</option>
          <option value="Gato">Gatos</option>
          <option value="Conejo">Conejos</option>
          <option value="Pájaro">Pájaros</option>
          <option value="Pez">Peces</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div className="pet-container">
        {loading ?
          <p>Cargando</p> : ((filteredPets.length > 0 ) ? (
            filteredPets.map((petDetail, index) => (
              <PetsViewer pet={petDetail} key={index} />
            ))
          ) : (
            <p className="oops-msg">¡Vaya!... No hay mascotas disponibles</p>
          )
          )
        }
      </div>
    </>
  );
};

export default Pets;
