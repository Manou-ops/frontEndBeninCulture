import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaFileAlt, FaCalendarAlt, FaSignInAlt, FaUserCircle } from 'react-icons/fa';
import { UserContext } from '../contexts/UserContext'; // ➔ on utilise le UserContext
import { toast } from 'react-toastify';


const Navbar = () => {
  const { user, setUser } = useContext(UserContext); // ➔ user et setUser viennent du contexte
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Vous avez été déconnecté avec succès !', {
      position: "top-center",
      autoClose: 2000,
    });
    navigate('/');
  };
  

  return (
    <nav
      className="navbar fixed-top shadow-sm"
      style={{
        backgroundColor: '#ffffff',
        padding: '10px 0',
        zIndex: 1000,
        height: '80px',
      }}
    >
      <div className="container d-flex justify-content-center">
        <ul className="navbar-nav d-flex flex-row gap-5 align-items-center">
          <li className="nav-item">
            <Link to="/" className="nav-link d-flex align-items-center gap-2 custom-link link-green">
              <FaHome />
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contents" className="nav-link d-flex align-items-center gap-2 custom-link link-red">
              <FaFileAlt />
              Contenu
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="nav-link d-flex align-items-center gap-2 custom-link link-green">
              <FaCalendarAlt />
              Événements
            </Link>
          </li>

          {user ? (
            <>
              <li className="nav-item">
                <Link to="/account" className="nav-link d-flex align-items-center gap-2 custom-link link-green">
                  <FaUserCircle />
                  Mon Compte
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link custom-link" style={{ fontWeight: 'bold', color: 'red' }}>
                  Bienvenue, {user.username}
                </span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/auth" className="nav-link d-flex align-items-center gap-2 custom-link link-red">
                <FaSignInAlt />
                Connexion
              </Link>
            </li>
          )}
        </ul>
      </div>

      <style>{`
        .custom-link {
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          transition: all 0.4s ease-in-out;
          position: relative;
          opacity: 0;
          animation: fadeIn 1s forwards;
        }

        .custom-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: transparent;
          transition: width 0.5s ease-in-out;
        }

        .custom-link:hover {
          transform: translateY(-2px);
        }

        .link-green {
          color: green;
        }

        .link-yellow {
          color: goldenrod;
        }

        .link-red {
          color: red;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar-nav {
          list-style: none;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
