import React, { useState } from "react";
import { Trash2, Check, X, Loader } from "lucide-react";

const PetTable = ({ pets, updateTable }) => {
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
      const response = await fetch(`http://localhost:4000/approving/${pet._id}`, {
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
      const deleteResponses = await fetch(`http://localhost:4000/form/delete/many/${pet._id}`, {
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
      const response = await fetch(`http://localhost:4000/delete/${pet._id}`, {
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
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.headerCell}>Imagen</th>
              <th style={styles.headerCell}>Nombre</th>
              <th style={styles.headerCell}>Tipo</th>
              <th style={styles.headerCell}>Edad</th>
              <th style={styles.headerCell}>Ubicación</th>
              <th style={styles.headerCell}>Correo</th>
              <th style={styles.headerCell}>Teléfono</th>
              <th style={{...styles.headerCell, width: '180px', maxWidth: '180px'}}>Justificación</th>
              <th style={styles.headerCell}>Actualización</th>
              <th style={styles.headerCell}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pets.length === 0 ? (
              <tr>
                <td colSpan="10" style={styles.emptyState}>
                  No hay mascotas para mostrar
                </td>
              </tr>
            ) : (
              pets.map((pet) => (
                <tr key={pet._id} style={styles.bodyRow}>
                  <td style={styles.bodyCell}>
                    <img
                      src={`http://localhost:4000/images/${pet.filename}`}
                      alt={pet.name}
                      style={styles.petImage}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><rect width="60" height="60" fill="%23f3f4f6"/><text x="30" y="30" font-family="Arial" font-size="12" text-anchor="middle" dominant-baseline="middle" fill="%236b7280">Sin imagen</text></svg>';
                      }}
                    />
                  </td>
                  <td style={styles.bodyCell}>{pet.name || 'Sin nombre'}</td>
                  <td style={styles.bodyCell}>{pet.type || 'No especificado'}</td>
                  <td style={styles.bodyCell}>{pet.age || 'No especificado'}</td>
                  <td style={styles.bodyCell}>{pet.area || 'No especificado'}</td>
                  <td style={styles.bodyCell}>
                    <a href={`mailto:${pet.email}`} style={styles.link}>
                      {pet.email || 'No disponible'}
                    </a>
                  </td>
                  <td style={styles.bodyCell}>
                    <a href={`tel:${pet.phone}`} style={styles.link}>
                      {pet.phone || 'No disponible'}
                    </a>
                  </td>
                  <td style={{...styles.bodyCell, width: '180px', maxWidth: '180px'}}>
                    <div style={styles.justificationCell}>
                      <span>
                        {truncateText(pet.justification)}
                        {pet.justification && pet.justification.length > 40 && (
                          <span 
                            onClick={() => togglePopup(pet._id, 'justification', showJustificationPopup[pet._id])} 
                            style={styles.readMoreBtn}
                          >
                            Leer Más
                          </span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td style={styles.bodyCell}>
                    <time dateTime={pet.updatedAt}>
                      {formatTimeAgo(pet.updatedAt)}
                    </time>
                  </td>
                  <td style={styles.actionsCell}>
                    <div style={styles.actionButtons}>
                      <button 
                        onClick={() => deleteFormsAdoptedPet(pet)} 
                        disabled={isDeleting[pet._id] || isApproving[pet._id]}
                        style={{
                          ...styles.deleteButton, 
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
                      <button 
                        disabled={isDeleting[pet._id] || isApproving[pet._id]} 
                        onClick={() => handleApprove(pet)}
                        style={{
                          ...styles.approveButton, 
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
            <div style={styles.popup}>
              <div style={styles.popupContent}>
                <h4>Justificación:</h4>
                <p>{pet.justification}</p>
              </div>
              <button 
                onClick={() => togglePopup(pet._id, 'justification', showJustificationPopup[pet._id])} 
                style={styles.closeBtn}
              >
                Cerrar <X size={16} style={{ marginLeft: '4px' }} />
              </button>
            </div>
          )}

          {showErrorPopup[pet._id] && (
            <div style={styles.popup}>
              <div style={styles.popupContent}>
                <p>¡Vaya!... Error de Conexión</p>
              </div>
              <button 
                onClick={() => togglePopup(pet._id, 'error', showErrorPopup[pet._id])} 
                style={styles.closeBtn}
              >
                Cerrar <X size={16} style={{ marginLeft: '4px' }} />
              </button>
            </div>
          )}

          {showApproved[pet._id] && (
            <div style={styles.popup}>
              <div style={styles.popupContent}>
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
                style={styles.closeBtn}
              >
                Cerrar <X size={16} style={{ marginLeft: '4px' }} />
              </button>
            </div>
          )}

          {showDeletedSuccess[pet._id] && (
            <div style={styles.popup}>
              <div style={styles.popupContent}>
                <p>Eliminado Exitosamente de la Base de Datos...</p>
              </div>
              <button 
                onClick={() => {
                  togglePopup(pet._id, 'deleted', showDeletedSuccess[pet._id]);
                  updateTable();
                }} 
                style={styles.closeBtn}
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

// Estilos actualizados para los botones con iconos
const styles = {
  tableContainer: {
    overflowX: 'auto',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    margin: '16px 0'
  },
  
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    minWidth: '1000px'
  },
  
  headerRow: {
    background: '#f9f9f9',
    textAlign: 'left'
  },
  
  headerCell: {
    padding: '12px',
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd'
  },
  
  bodyRow: {
    borderBottom: '1px solid #eee'
  },
  
  bodyCell: {
    padding: '12px',
    verticalAlign: 'middle'
  },
  
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
    fontStyle: 'italic'
  },
  
  petImage: {
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    objectFit: 'cover'
  },
  
  link: {
    color: '#3498db',
    textDecoration: 'none'
  },
  
  justificationCell: {
    maxWidth: '180px',
    minWidth: '150px',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
    whiteSpace: 'normal',
    overflow: 'hidden',
    display: 'block',
    lineHeight: '1.4'
  },
  
  readMoreBtn: {
    color: '#3498db',
    cursor: 'pointer',
    marginLeft: '4px',
    textDecoration: 'underline'
  },
  
  actionsCell: {
    textAlign: 'end',
    paddingRight: '20px'
  },
  
  actionButtons: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end'
  },
  
  deleteButton: {
    padding: '8px',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '36px',
    minHeight: '36px',
    transition: 'all 0.2s ease'
  },
  
  approveButton: {
    padding: '8px',
    background: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '36px',
    minHeight: '36px',
    transition: 'all 0.2s ease'
  },
  

  popup: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    flexDirection: 'column'
  },
  
  popupContent: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '90%',
    textAlign: 'center',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    maxHeight: '70vh',
    overflowY: 'auto'
  },
  
  closeBtn: {
    marginTop: '12px',
    padding: '8px 16px',
    background: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px'
  }
};

export default PetTable;