import React, { useState, useEffect } from 'react'
import PetCards from './PetCards'
import  PetTable from './PetTable'

const ApprovedRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/approvedPets`)
      if (!response.ok) {
        throw new Error('An error occurred')
      }
      const data = await response.json()
      setRequests(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    fetchRequests()
  }, [])

  return (
    <div className='pet-container'>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        requests.length > 0 ? (
          <PetTable pets={requests} updateTable={fetchRequests} />
        ) : (
          <p>No hay mascotas aprobadas disponibles</p>
        )
      )}
    </div>
  )
}

export default ApprovedRequests
