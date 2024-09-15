import React from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link
import './Navbar.css';

function Navbar() {
  return (
    <header className="header">
      <Link to="/" className="logoText">JuriArt</Link>
      <Link to="/" ><img className="logo" src="images/logo.png" alt="" /></Link>

      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
      </nav>
    </header>
  );
}

export default Navbar;
