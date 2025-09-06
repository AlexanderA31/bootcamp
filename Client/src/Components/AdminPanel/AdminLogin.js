import React, { useState, useEffect } from "react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [usersData, setUsersData] = useState({});

  useEffect(() => {
    // Simulated users data for demo purposes
    setUsersData({
      username: "admin@gmail.com",
      password: "password123"
    });
  }, []);

  const handleLogin = () => {
    const user = usersData.username === username && usersData.password === password;
    if (user) {
      localStorage.setItem("isAdmin", "true");
      window.location.reload();
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleClose = () => {
    window.location.href = "/";
  }

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    width: '400px',
    maxWidth: '90vw',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#666',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.2s ease'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
    fontSize: '1.5rem',
    marginTop: '0.5rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  };

  const loginButtonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#f4b942',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  };

  const errorStyle = {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '0.9rem'
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <button 
          style={closeButtonStyle}
          onClick={handleClose}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f0f0f0';
            e.target.style.color = '#333';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#666';
          }}
        >
          ×
        </button>
        
        <h2 style={titleStyle}>Inicio de Sesión de Administrador</h2>
        
        <input
          style={inputStyle}
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <input
          style={inputStyle}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {showErrorMessage && (
          <p style={errorStyle}>Nombre de usuario o contraseña incorrectos</p>
        )}
        
        <button 
          style={loginButtonStyle}
          onClick={handleLogin}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e8a635';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f4b942';
          }}
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;