import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

function AdminNavBar() {
  const { toggleTheme } = useContext(ThemeContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#FEA034',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  };

  const centerTimeStyle = {
    flex: 1,
    textAlign: 'center',
    fontWeight: 500
  };

  const rightGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
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

      <div className="navbar-time" style={centerTimeStyle}>
        {currentTime.toLocaleString()}
      </div>


      <div style={rightGroupStyle}>
        <div className="theme-switcher">
          <label className="switch" title="Cambiar tema">
            <input type="checkbox" onClick={toggleTheme} aria-label="Cambiar tema" />
            <span className="slider round"></span>
          </label>
        </div>

        <h3
          className="logout-btn"
          style={logoutBtnStyle}
          onClick={() => window.location.reload()}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          Cerrar Sesión
        </h3>
      </div>
    </nav>
  );
}

export default AdminNavBar;
