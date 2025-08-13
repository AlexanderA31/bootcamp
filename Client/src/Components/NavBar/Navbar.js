import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = (props) => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="navbar-container">
      <div>
        <Link className="logo-container" to="/">
     
          <p>{props.title}</p>
        </Link>
      </div>
      <div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/services">Servicios</Link>
          </li>
          <li>
            <Link to="/pets">Mascotas</Link>
          </li>
        
        </ul>
      </div>
      <div className="nav-buttons-container">
        <div className="theme-switcher">
          <label className="switch">
            <input type="checkbox" onClick={toggleTheme} />
            <span className="slider round"></span>
          </label>
        </div>
        <div>
          <Link to="/services">
            <button className="Navbar-button">Dar una Mascota</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
