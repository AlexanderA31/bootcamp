import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const PetCards = (props) => {
  const [showJustificationPopup, setShowJustificationPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [showDeletedSuccess, setshowDeletedSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  const maxLength = 40;

  const formatTimeAgo = (updatedAt) => {
    const date = new Date(updatedAt);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/approving/${props.pet._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: "Approved"
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        setShowErrorPopup(true);
      } else {
        setShowApproved(true);
      }
    } catch (err) {
      setShowErrorPopup(true);
    } finally {
      setIsApproving(false);
    }
  }

  const deleteFormsAdoptedPet = async () => {
    setIsDeleting(true)
    try {
      const deleteResponses = await fetch(`${process.env.REACT_APP_API_URL}/form/delete/many/${props.pet._id}`, {
        method: 'DELETE'
      });
      if (!deleteResponses.ok) {
        throw new Error('Failed to delete forms');
      }
    } catch (err) {
    }finally{
      handleReject();
    }
  }

  const handleReject = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete/${props.pet._id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        setShowErrorPopup(true);
        throw new Error('Failed to delete pet');
      } else {
        setshowDeletedSuccess(true);
      }
    } catch (err) {
      setShowErrorPopup(true);
      console.error('Error deleting pet:', err);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className='req-containter'>
      <div className='pet-view-card'>
        <div className='pet-card-pic'>
          <img src={props.pet.imageUrl || `${process.env.REACT_APP_API_URL}/images/${props.pet.filename}`} alt={props.pet.name} />
        </div>
        <div className='pet-card-details'>
          <h2>{props.pet.name}</h2>
          <p><b>Tipo:</b> {props.pet.type}</p>
          <p><b>Edad:</b> {props.pet.age}</p>
          <p><b>Ubicación:</b> {props.pet.area}</p>
          <p><b>Correo Electrónico del Dueño:</b> {props.pet.email}</p>
          <p><b>Teléfono del Dueño:</b> {props.pet.phone}</p>
          <p>
            <b>Justificación:</b>
            <span>
              {truncateText(props.pet.justification, maxLength)}
              {props.pet.justification.length > maxLength && (
                <span onClick={() => setShowJustificationPopup(!showJustificationPopup)} className='read-more-btn'>
                  Leer Más
                </span>
              )}
            </span>
          </p>
          <p>{formatTimeAgo(props.pet.updatedAt)}</p>
        </div>
        <div className='app-rej-btn'>
          <button onClick={deleteFormsAdoptedPet} disabled={isDeleting || isApproving}>{isDeleting ? (<p>Eliminando</p>) : (props.deleteBtnText)}</button>
          {props.approveBtn ?
            <button disabled={isDeleting || isApproving} onClick={handleApprove}>{isApproving ? (<p>Aprobando</p>) : 'Aprobar'}</button>
            : ''
          }
        </div>
        {showJustificationPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <h4>Justificación:</h4>
              <p>{props.pet.justification}</p>
            </div>
            <button onClick={() => setShowJustificationPopup(!showJustificationPopup)} className='close-btn fa fa-times'>

            </button>
          </div>
        )}
        {showErrorPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <p>¡Vaya!... Error de Conexión</p>
            </div>
            <button onClick={() => setShowErrorPopup(!showErrorPopup)} className='close-btn fa fa-times'>
        
            </button>
          </div>
        )}
        {showApproved && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Aprobación Exitosa...</p>
              <p>
                Por favor, póngase en contacto con el cliente en{' '}
                <a href={`mailto:${props.pet.email}`}>{props.pet.email}</a>{' '}
                o{' '}
                <a href={`tel:${props.pet.phone}`}>{props.pet.phone}</a>{' '}
                para organizar el traslado de la mascota desde la casa del propietario a nuestro centro de adopción.
              </p>
            </div>
            <button onClick={() => {
              setShowApproved(!showApproved)
              props.updateCards()
            }} className='close-btn fa fa-times'>
   
            </button>
          </div>
        )}

        {showDeletedSuccess && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Eliminado Exitosamente de la Base de Datos...</p>
            </div>
            <button onClick={() => {
              setshowDeletedSuccess(!showDeletedSuccess)
              props.updateCards()
            }} className='close-btn fa fa-times'>
      
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default PetCards;
