import React, { useState } from 'react'
import PostingPets from './PostingPets'
import AdoptingRequests from './AdoptingRequests'
import AdoptedHistory from './AdoptedHistory'
import ApprovedRequests from './ApprovedRequests'

import { FileText, Heart, Users, Clock } from 'lucide-react'

const AdminScreen = () => {
  const [screen, setScreen] = useState('postingPet')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '50px 0',
    position: 'relative',
    zIndex: 1,
    isolation: 'isolate'
  }

  const leftSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: isMenuOpen ? 'calc(80vw - 290px)' : 'calc(80vw + 180px)',
    minWidth: isMenuOpen ? '340px' : '60px',
    padding: '25px 10px',
    transition: 'all 0.3s ease',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  }

  const menuButtonStyle = {
    background: '#fbc256',
    color: 'white',
    border: '2px solid black',
    padding: '10px 15px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '18px',
    marginBottom: '20px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isMenuOpen ? 'flex-start' : 'center',
    fontWeight: 'bold'
  }

  const iconButtonStyle = (isActive) => ({
    background: isActive ? 'rgba(251, 194, 86, 0.2)' : 'transparent',
    color: '#fbc256',
    border: '2px solid black',
    padding: '12px',
    borderRadius: '10px',
    cursor: 'pointer',
    marginBottom: '15px',
    width: '100%',
    transition: 'background 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })

  const menuItemStyle = {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#fbc256',
    fontFamily: '"Varela Round", sans-serif',
    cursor: 'pointer',
    margin: '10px 0',
    padding: '12px 16px',
    borderBottom: '2px solid #fbc256',
    width: '100%',
    textAlign: 'left',
    background: 'none',
    border: 'none',
    transition: 'opacity 0.2s ease',
    whiteSpace: 'nowrap',
    opacity: isMenuOpen ? 1 : 0,
    visibility: isMenuOpen ? 'visible' : 'hidden',
    transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
    transitionDelay: isMenuOpen ? '0.1s' : '0s',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }


  const rightSectionStyle = {
    borderLeft: '3px solid #fbc256',
    padding: '0 1.5vw',

    maxWidth: isMenuOpen ? 'calc(100vw - 390px)' : 'calc(100vw - 120px)',
    minWidth: isMenuOpen ? 'calc(100vw - 390px)' : 'calc(100vw - 120px)',
    width: isMenuOpen ? 'calc(100vw - 390px)' : 'calc(100vw - 120px)',
    flex: '1',
    position: 'relative',
    zIndex: 1,
    overflow: 'visible',
    transition: 'all 0.3s ease'
  }

  const menuItems = [
    { key: 'postingPet', label: 'Solicitudes de Publicación de Mascotas', icon: <FileText size={20} /> },
    { key: 'approvedRequests', label: 'Mascotas Aprobadas', icon: <Heart size={20} /> },
    { key: 'adoptingPet', label: 'Solicitudes de Adopción', icon: <Users size={20} /> },
    { key: 'adoptedHistory', label: 'Historial de Adopciones', icon: <Clock size={20} /> }
  ]

  return (
    <div className='admin-screen-container' style={containerStyle}>
      <div className='admin-screen-left' style={leftSectionStyle}>
        <button 
          style={menuButtonStyle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '←' : '☰'}
        </button>

        {!isMenuOpen ? (
          <div style={{ width: '100%' }}>
            {menuItems.map((item) => (
              <button
                key={item.key}
                style={iconButtonStyle(screen === item.key)}
                onClick={() => setScreen(item.key)}
                title={item.label}
              >
                {item.icon}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ width: '100%' }}>
            {menuItems.map((item, index) => (
              <button
                key={item.key}
                style={{
                  ...menuItemStyle,
                  backgroundColor: screen === item.key ? 'rgba(251, 194, 86, 0.2)' : 'transparent',
                  transitionDelay: isMenuOpen ? `${0.1 + index * 0.05}s` : '0s'
                }}
                onClick={() => setScreen(item.key)}
              >
                {item.icon}
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className='admin-screen-right' style={rightSectionStyle}>
        {screen === 'postingPet' && <PostingPets />}
        {screen === 'approvedRequests' && <ApprovedRequests />}
        {screen === 'adoptingPet' && <AdoptingRequests />}
        {screen === 'adoptedHistory' && <AdoptedHistory />}
      </div>
    </div>
  )
}

export default AdminScreen