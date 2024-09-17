import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link
import './Navbar.css';

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cargar el tema guardado en localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Cambiar el tema y guardar la preferencia en localStorage
  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.body.classList.toggle('dark-mode', newMode);
      return newMode;
    });
  };

  // Aplicar la clase del tema al body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return (
    <header className="header">
      <Link to="/" className="logoText">Ju.Riart</Link>
      <Link to="/" ><img className="logo" src="images/logo.png" alt="" /></Link>

      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
