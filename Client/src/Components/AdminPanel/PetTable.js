import React, { useState } from "react";
import { Trash2, Check, X, Loader } from "lucide-react";

const PetTable = ({ pets, updateTable, showApproveButton }) => {
  const [showJustificationPopup, setShowJustificationPopup] = useState({});
  const [showErrorPopup, setShowErrorPopup] = useState({});
  const [showApproved, setShowApproved] = useState({});
  const [showDeletedSuccess, setShowDeletedSuccess] = useState({});
  const [isDeleting, setIsDeleting] = useState({});
  const [isApproving, setIsApproving] = useState({});

  const truncateText = (text, maxLength = 40) => {
    if (!text) return "";
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  const formatTimeAgo = (updatedAt) => {
    try {
      const date = new Date(updatedAt);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      if (diffInSeconds < 60) return 'hace unos segundos';
      if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} minutos`;
      if (diffInSeconds < 86400) return `hace ${Math.floor(diffInSeconds / 3600)} horas`;
      if (diffInSeconds < 2592000) return `hace ${Math.floor(diffInSeconds / 86400)} días`;
      
      return date.toLocaleDateString('es-ES');
    } catch {
      return "Fecha inválida";
    }
  };

  const handleApprove = async (pet) => {
    setIsApproving(prev => ({ ...prev, [pet._id]: true }));
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/approving/${pet._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: "Approved"
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        setShowErrorPopup(prev => ({ ...prev, [pet._id]: true }));
      } else {
        setShowApproved(prev => ({ ...prev, [pet._id]: true }));
      }
    } catch (err) {
      setShowErrorPopup(prev => ({ ...prev, [pet._id]: true }));
    } finally {
      setIsApproving(prev => ({ ...prev, [pet._id]: false }));
    }
  };

  const deleteFormsAdoptedPet = async (pet) => {
    setIsDeleting(prev => ({ ...prev, [pet._id]: true }));
    try {
      const deleteResponses = await fetch(`${process.env.REACT_APP_API_URL}/form/delete/many/${pet._id}`, {
        method: 'DELETE'
      });
      if (!deleteResponses.ok) {
        throw new Error('Failed to delete forms');
      }
    } catch (err) {
    } finally {
      handleReject(pet);
    }
  };

  const handleReject = async (pet) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete/${pet._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        setShowErrorPopup(prev => ({ ...prev, [pet._id]: true }));
        throw new Error('Failed to delete pet');
      } else {
        setShowDeletedSuccess(prev => ({ ...prev, [pet._id]: true }));
      }
    } catch (err) {
      setShowErrorPopup(prev => ({ ...prev, [pet._id]: true }));
      console.error('Error deleting pet:', err);
    } finally {
      setIsDeleting(prev => ({ ...prev, [pet._id]: false }));
    }
  };

  const togglePopup = (petId, popupType, currentState) => {
    const setters = {
      justification: setShowJustificationPopup,
      error: setShowErrorPopup,
      approved: setShowApproved,
      deleted: setShowDeletedSuccess
    };
    
    setters[popupType](prev => ({ ...prev, [petId]: !currentState }));
  };

  return (
    <>
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Edad</th>
              <th>Ubicación</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th style={{width: '180px', maxWidth: '180px'}}>Justificación</th>
              <th>Actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pets.length === 0 ? (
              <tr>
                <td colSpan="10" className="empty-state">
                  No hay mascotas para mostrar
                </td>
              </tr>
            ) : (
              pets.map((pet) => (
                <tr key={pet._id}>
                  <td>
                    <img
                      src={pet.imageUrl || `${process.env.REACT_APP_API_URL}/images/${pet.filename}`}
                      alt={pet.name}
                      className="pet-image"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><rect width="60" height="60" fill="%23f3f4f6"/><text x="30" y="30" font-family="Arial" font-size="12" text-anchor="middle" dominant-baseline="middle" fill="%236b7280">Sin imagen</text></svg>';
                      }}
                    />
                  </td>
                  <td>{pet.name || 'Sin nombre'}</td>
                  <td>{pet.type || 'No especificado'}</td>
                  <td>{pet.age || 'No especificado'}</td>
                  <td>{pet.area || 'No especificado'}</td>
                  <td>
                    <a href={`mailto:${pet.email}`} className="table-link">
                      {pet.email || 'No disponible'}
                    </a>
                  </td>
                  <td>
                    <a href={`tel:${pet.phone}`} className="table-link">
                      {pet.phone || 'No disponible'}
                    </a>
                  </td>
                  <td style={{width: '180px', maxWidth: '180px'}}>
                    <div className="justification-cell">
                      <span>
                        {truncateText(pet.justification)}
                        {pet.justification && pet.justification.length > 40 && (
                          <span 
                            onClick={() => togglePopup(pet._id, 'justification', showJustificationPopup[pet._id])} 
                            className="read-more-btn"
                          >
                            Leer Más
                          </span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td>
                    <time dateTime={pet.updatedAt}>
                      {formatTimeAgo(pet.updatedAt)}
                    </time>
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button
                        onClick={() => handleReject(pet)}
                        disabled={isDeleting[pet._id] || isApproving[pet._id]}
                        className="delete-button"
                        style={{
                          opacity: (isDeleting[pet._id] || isApproving[pet._id]) ? 0.6 : 1,
                          cursor: (isDeleting[pet._id] || isApproving[pet._id]) ? 'not-allowed' : 'pointer'
                        }}
                        title="Eliminar mascota"
                      >
                        {isDeleting[pet._id] ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                      {showApproveButton && (
                        <button
                          disabled={isDeleting[pet._id] || isApproving[pet._id]}
                          onClick={() => handleApprove(pet)}
                          className="approve-button"
                          style={{
                            opacity: (isDeleting[pet._id] || isApproving[pet._id]) ? 0.6 : 1,
                            cursor: (isDeleting[pet._id] || isApproving[pet._id]) ? 'not-allowed' : 'pointer'
                          }}
                          title="Aprobar mascota"
                        >
                          {isApproving[pet._id] ? (
                            <Loader size={16} className="animate-spin" />
                          ) : (
                            <Check size={16} />
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Popups siguiendo el mismo patrón que PetCards */}
      {pets.map((pet) => (
        <React.Fragment key={`popups-${pet._id}`}>
          {showJustificationPopup[pet._id] && (
            <div className="popup">
              <div className="popup-content">
                <h4>Justificación:</h4>
                <p>{pet.justification}</p>
              </div>
              <button 
                onClick={() => togglePopup(pet._id, 'justification', showJustificationPopup[pet._id])} 
                className="close-btn"
              >
                Cerrar <X size={16} style={{ marginLeft: '4px' }} />
              </button>
            </div>
          )}

          {showErrorPopup[pet._id] && (
            <div className="popup">
              <div className="popup-content">
                <p>¡Vaya!... Error de Conexión</p>
              </div>
              <button 
                onClick={() => togglePopup(pet._id, 'error', showErrorPopup[pet._id])} 
                className="close-btn"
              >
                Cerrar <X size={16} style={{ marginLeft: '4px' }} />
              </button>
            </div>
          )}

          {showApproved[pet._id] && (
            <div className="popup">
              <div className="popup-content">
                <p>Aprobación Exitosa...</p>
                <p>
                  Por favor, póngase en contacto con el cliente en{' '}
                  <a href={`mailto:${pet.email}`}>{pet.email}</a>{' '}
                  o{' '}
                  <a href={`tel:${pet.phone}`}>{pet.phone}</a>{' '}
                  para organizar el traslado de la mascota desde la casa del propietario a nuestro centro de adopción.
                </p>
              </div>
              <button 
                onClick={() => {
                  togglePopup(pet._id, 'approved', showApproved[pet._id]);
                  updateTable();
                }} 
                className="close-btn"
              >
                Cerrar <X size={16} style={{ marginLeft: '4px' }} />
              </button>
            </div>
          )}

          {showDeletedSuccess[pet._id] && (
            <div className="popup">
              <div className="popup-content">
                <p>Eliminado Exitosamente de la Base de Datos...</p>
              </div>
              <button 
                onClick={() => {
                  togglePopup(pet._id, 'deleted', showDeletedSuccess[pet._id]);
                  updateTable();
                }} 
                className="close-btn"
              >
                Cerrar <X size={16} style={{ marginLeft: '4px' }} />
              </button>
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default PetTable;