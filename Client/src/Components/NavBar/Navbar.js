import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./Navbar.css";

const Navbar = (props) => {
  const { toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const closeMenu = () => setMenuOpen(false);

  // Cerrar menú al hacer scroll o resize
  useEffect(() => {
    const handleScroll = () => closeMenu();
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
        
        <Link className="logo" to="/" onClick={closeMenu}>
          {props.title}
        </Link>
      </div>

      <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Inicio
        </Link>
        <Link to="/servicios" onClick={closeMenu}>
          Servicios
        </Link>
        <Link to="/mascotas" onClick={closeMenu}>
          Mascotas
        </Link>
        <Link to="/servicios" className="cta" onClick={closeMenu}>
          Dar una Mascota 🐾
        </Link>
        <div className="theme-toggle">
          <label className="switch">
            <input type="checkbox" onChange={toggleTheme} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {/* Overlay para cerrar menú al hacer clic fuera */}
      {isMenuOpen && (
        <div 
          className="menu-overlay" 
          onClick={closeMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;