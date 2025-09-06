import React, { useState } from 'react';
import AdoptForm from '../AdoptForm/AdoptForm';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import './PetsViewer.css';

const PetsViewer = (props) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const formatTimeAgo = (updatedAt) => {
    const date = new Date(updatedAt);
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
  };

  return (
    <div className='pet-view-card'>
      <div className='pet-card-pic'>
          <img
            src={props.pet.imageUrl || `${process.env.REACT_APP_API_URL}/images/${props.pet.filename}`}
            alt={props.pet.name}
            className='pet-img-rounded'
          />
      </div>
      <div className='pet-card-details'>
          <h2>{props.pet.name}</h2>
          <div className='pet-info-row'>
            <span className='pet-info-icon'><i className='fa fa-paw'></i></span>
            <span className='pet-info-label'>Tipo:</span>
            <span className='pet-info-value'>{props.pet.type}</span>
          </div>
          <div className='pet-info-row'>
            <span className='pet-info-icon'><i className='fa fa-birthday-cake'></i></span>
            <span className='pet-info-label'>Edad:</span>
            <span className='pet-info-value'>{props.pet.age}</span>
          </div>
          <div className='pet-info-row'>
            <span className='pet-info-icon'><i className='fa fa-map-marker'></i></span>
            <span className='pet-info-label'>Ubicación:</span>
            <span className='pet-info-value'>{props.pet.area}</span>
          </div>
          <div className='pet-info-row'>
            <span className='pet-info-icon'><i className='fa fa-clock-o'></i></span>
            <span className='pet-info-label'>Actualizado:</span>
            <span className='pet-info-value'>{formatTimeAgo(props.pet.updatedAt)}</span>
          </div>
      </div>
      <div className='show-interest-btn'>
        <button onClick={togglePopup}>Adoptar <i className="fa fa-paw"></i></button>
      </div>
      {showPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <AdoptForm closeForm={togglePopup} pet={props.pet}/>
          </div>
          <button onClick={togglePopup} className='close-btn fa fa-times'>
          </button>
        </div>
      )}
    </div>
  );
};

export default PetsViewer;
