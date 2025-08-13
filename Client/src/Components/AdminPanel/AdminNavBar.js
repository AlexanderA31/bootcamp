import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

function AdminNavBar() {
  const { toggleTheme } = useContext(ThemeContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Estilos con color fijo
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1A1A1A',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  };

  const logoutBtnStyle = {
    cursor: 'pointer',
    margin: 0,
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease'
  };

  return (
    <nav className="navbar" style={navbarStyle}>
      <div className="navbar-brand">Panel de Administrador</div>
      <div className="navbar-time">{currentTime.toLocaleString()}</div>
      <div className="theme-switcher">
        <label className="switch">
          <input type="checkbox" onClick={toggleTheme} />
          <span className="slider round"></span>
        </label>
      </div>
      <h3 
        className='logout-btn' 
        style={logoutBtnStyle}
        onClick={() => (window.location.reload())}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Cerrar Sesión
      </h3>
    </nav>
  );
}

export default AdminNavBar;