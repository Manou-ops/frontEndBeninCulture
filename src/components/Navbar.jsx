import { right } from '@popperjs/core';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: 'black', // Noir
        color: 'yellow', // Orange doré
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="container-fluid d-flex justify-content-center">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav d-flex justify-content-center" style={{ gap: '30px' }}>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                style={{
                  color: '#f5deb3', // Beige clair
                  fontWeight: 'bold',
                   marginLeft: '400px'
                }}
              >
                Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contents"
                style={{
                  color: '#f5deb3', // Beige clair
                  fontWeight: 'bold',
                }}
              >
                Contenu
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/events"
                style={{
                  color: '#f5deb3', // Beige clair
                  fontWeight: 'bold',
                }}
              >
                Événements
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/auth"
                style={{
                  color: '#f5deb3', // Beige clair
                  fontWeight: 'bold',
                }}
              >
                Connexion
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;