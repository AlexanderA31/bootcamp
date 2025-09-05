import React from "react";
import adoptPet from "./images/adoptPet.png";
import { Link } from "react-router-dom";

const AdoptSection = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="adopt-section">
      <h2>Adoptar una Mascota</h2>
      <img src={adoptPet} alt="Happy Pet" />

      <p>
        ¡Bienvenido a nuestro programa de adopción de mascotas! Adoptar una mascota es una manera maravillosa de traer alegría y compañía a tu vida.
      </p>

      <h3>Beneficios de la Adopción de Mascotas</h3>
      <ul>
        <li>Proporcionar un hogar amoroso a una mascota necesitada</li>
        <li>Experimentar el amor incondicional de una mascota</li>
        <li>Crear recuerdos duraderos y momentos preciados</li>
      </ul>

      <h3>Proceso de Adopción</h3>
      <ol>
        <li>Llenar una solicitud de adopción</li>
        <li>Conocer a las posibles mascotas en persona</li>
        <li>Completar el papeleo necesario</li>
      </ol>

      <h3>Responsabilidades</h3>
      <p>
        Adoptar una mascota conlleva responsabilidades, como la alimentación, el aseo, el ejercicio regular y la atención médica.
      </p>

      <Link to="/mascotas">
        <button className="cta-button" onClick={scrollToTop}>Encuentra tu Mascota Perfecta</button>
      </Link>
    </section>
  );
};

export default AdoptSection;
