import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./Navbar.css"; // Asegúrate de tener este archivo CSS

const Navbar = (props) => {
  const { toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <Link className="logo" to="/">
          {props.title}
        </Link>
      </div>

      <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={toggleMenu}>Inicio</Link>
        <Link to="/servicios" onClick={toggleMenu}>Servicios</Link>
        <Link to="/mascotas" onClick={toggleMenu}>Mascotas</Link>
        <Link to="/servicios" className="cta" onClick={toggleMenu}>
          Dar una Mascota 🐾
        </Link>
        <div className="theme-toggle">
          <label className="switch">
            <input type="checkbox" onClick={toggleTheme} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
