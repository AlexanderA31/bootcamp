import React from 'react';
import Card from "./Card";

const PlanningToAdoptAPet = () => {
  return (
    <div className='planning-container'>
        <h1>¿Planeando Adoptar una Mascota?</h1>
        <div className='boxes-container'>
            <Card title="La Alegría de Adoptar una Mascota" description="Traer una mascota a tu vida puede ser una experiencia increíblemente gratificante, no solo para ti sino también para el amigo peludo que le das la bienvenida a tu hogar. Hay un tipo especial de magia que viene con la adopción de cualquier animal de compañía."/>
            <Card title="Una Guía para la Adopción de Mascotas" description="¿Estás considerando agregar una nueva mascota a tu familia? La adopción de mascotas es una opción maravillosa a considerar. El viaje de encontrar al compañero ideal implica una cuidadosa reflexión, investigación y planificación, pero las recompensas son inconmensurables. "/>
            <Card title="El Poder Curativo de los Animales" description="Los animales tienen una capacidad extraordinaria para tocar nuestras lives de maneras profundas, ofreciendo no solo compañía sino también un vínculo terapéutico que puede impactar positivamente nuestro bienestar físico, mental y emocional"/>
        </div>
    </div>
  )
}

export default PlanningToAdoptAPet;