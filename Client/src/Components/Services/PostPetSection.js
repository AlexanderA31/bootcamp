import React, { useState, useEffect } from "react";
import postPet from "./images/postPet.png";

const PostPetSection = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [area, setArea] = useState("");
  const [justification, setJustification] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [type, setType] = useState("Ninguno");
  const [picture, setPicture] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isSubmitting) {
      setEmailError(false);
      setAgeError(false);
      setFormError(false);
    }
  }, [isSubmitting]);

  // Prevenir scroll cuando el popup está abierto
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPopup]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Cerrar popup al presionar Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showPopup) {
        togglePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showPopup]);

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return emailPattern.test(email);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPicture(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !age ||
      !area ||
      !justification ||
      !email ||
      !phone ||
      !fileName ||
      type === "Ninguno" ||
      ageError
    ) {
      setFormError(true);
      return;
    }

    if (!isEmailValid(email)) {
      setEmailError(true);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("area", area);
    formData.append("justification", justification);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("type", type);

    if (picture) {
      formData.append("picture", picture);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/servicios`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Form submitted successfully");

      setEmailError(false);
      setFormError(false);
      setName("");
      setAge("");
      setArea("");
      setJustification("");
      setEmail("");
      setPhone("");
      setPicture(null);
      setFileName("");
      setType("Ninguno");
      togglePopup();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="post-pet-section">
      <h2>Publicar una Mascota para Adopción</h2>
      <img src={postPet} alt="Pet Looking for a Home" />

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* INFORMACIÓN DE CONTACTO */}
        <div className="form-row">
           <h3>Información de Contacto</h3>
          <div className="input-box">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>

          <div className="input-box">
            <label>Teléfono:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ingresa tu teléfono"
            />
          </div>
        </div>

        {/* INFORMACIÓN DE LA MASCOTA */}
        <div className="form-row">
            <h3>Información de la Mascota</h3>
          <div className="input-box">
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre de la mascota"
            />
          </div>

          <div className="input-box">
            <label>Edad de la Mascota:</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Ej: 2 años"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-box">
            <label>Ubicación:</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Ciudad, País"
            />
          </div>

          <div className="filter-selection-service">
            <label>Tipo:</label>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="Ninguno">Selecciona el tipo</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Conejo">Conejo</option>
              <option value="Pájaro">Pájaro</option>
              <option value="Pez">Pez</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>

        <div className="input-box full-width">
          <label>Foto:</label>
          <label className="file-input-label">
            <span className="file-input-label-text">
              {fileName || "📸 Elegir una Foto"}
            </span>
            <input
              className="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="input-box full-width">
          <h3>Justificación para dar una mascota</h3>
          <textarea
            rows="4"
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            placeholder="Explica por qué necesitas dar en adopción a tu mascota..."
          />
        </div>

        {/* MENSAJES DE ERROR */}
        {emailError && (
          <p className="error-message">
            Por favor, proporcione una dirección de correo electrónico válida de Gmail.
          </p>
        )}
        {formError && (
          <p className="error-message">
            Por favor, rellene todos los campos correctamente.
          </p>
        )}

        <button type="submit" className="cta-button" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar su Mascota"}
        </button>
      </form>

      {/* POPUP MEJORADO */}
      {showPopup && (
        <>
          <div 
            className="popup"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                togglePopup();
              }
            }}
          >
            <div className="popup-content">
              <button 
                onClick={togglePopup} 
                className="close-btn"
                aria-label="Cerrar"
              >
                ✕
              </button>
              <h4>¡Solicitud enviada exitosamente!</h4>
              <p style={{ 
                fontFamily: '"Varela Round", sans-serif',
                color: 'var(--text)',
                fontSize: '1.1rem',
                lineHeight: '1.5',
                marginBottom: '20px'
              }}>
                Nos pondremos en contacto contigo pronto para revisar la información de tu mascota.
              </p>
              <button 
                onClick={togglePopup}
                style={{
                  backgroundColor: 'var(--orange)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'var(--hoverorange)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'var(--orange)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Entendido
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default PostPetSection;