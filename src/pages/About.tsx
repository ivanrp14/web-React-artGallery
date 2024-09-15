import React from 'react';
import './About.css'; // Asegúrate de importar el archivo CSS

const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">Sobre Mí</h1>
        <p>
          ¡Hola! Mi nombre es <strong className="about-strong">Julia Ribas Roig</strong>, soy una apasionada estudiante de ilustración en la <strong className="about-strong">Escuela Joso</strong>.
        </p>
        <p>
          Desde pequeña, el dibujo ha sido una de mis grandes pasiones. Ahora, tengo la oportunidad de profundizar en el mundo del arte y la ilustración, aprendiendo nuevas técnicas y estilos.
        </p>
        <p>
          Si deseas contactarme, puedes enviarme un correo a:  
          <a href="mailto:jujurib14@gmail.com" className="about-link"> correo@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
