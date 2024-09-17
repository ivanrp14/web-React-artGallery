import React, { useEffect, useState } from 'react';
import './About.css'; // Asegúrate de importar el archivo CSS
import logo from '../../images/logo.png'; // Asegúrate de que la ruta sea correcta

const About: React.FC = () => {
  const [, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Verifica el tema guardado en localStorage al montar el componente
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);


  return (
    <div className="about-page">
      <div className="about-container">
        <img src={logo} alt="Logo" className="about-logo" />
        <h1 className="about-title">Sobre Mí</h1>
        <p>
          ¡Hola! Mi nombre es <strong className="about-strong">Julia Ribas Roig</strong>, soy una apasionada estudiante de ilustración en la <strong className="about-strong">Escuela Joso</strong>.
        </p>
        <p>
          Desde pequeña, el dibujo ha sido una de mis grandes pasiones. Ahora, tengo la oportunidad de profundizar en el mundo del arte y la ilustración, aprendiendo nuevas técnicas y estilos.
        </p>
        <p>
          Si deseas contactarme, puedes enviarme un correo a:  
          <a href="mailto:jujurib14@gmail.com" className="about-link"> jujurib14@gmail.com</a>.
        </p>
        
      </div>
    </div>
  );
};

export default About;
