import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

const Footer = (props) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div>
        <Link className="logo-container" to="/">
         
        </Link>
        <div className="copyright" style={{ textAlign: 'center' }}>
          <p>&copy; {currentYear} {props.title}. Todos los derechos reservados.</p>
        </div><br></br>
      </div>
    </footer>
  );
};

export default Footer;