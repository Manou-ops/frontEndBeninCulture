import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { FaCalendarAlt, FaPlus } from 'react-icons/fa';

const Events = () => {
  const { user } = useContext(UserContext);

  // Modifie ce tableau manuellement avec tes images, titres, descriptions, liens :
  const events = [
    {
      id: 1,
      title: 'Weloveya',
      description: 'WeLovEya Le FESTIVAL Urbain et Afrobeat de référence.',
      imageUrl: '/event1.jpg',
      link: 'https://web.facebook.com/WeLovEyaFestival'
    },
    {
      id: 2,
      title: 'Révélation ! Art contemporain du Bénin ',
      description: 'L exposition Révélation ! Art contemporain du Bénin est référencée dans notre rubrique Art contemporain. ',
      imageUrl: '/event2.jpg',
      link: 'https://www.offi.fr/expositions-musees/conciergerie-1922/revelation-art-contemporain-du-benin-97473.html'
    },
    {
      id: 3,
      title: 'FINAB',
      description: 'Tisser les liens : Le narratif africain à travers l‘art..',
      imageUrl: '/finab.jpg',
      link: 'https://finab.bj/'
    },




    // … jusqu’à 12 événements https://finab.bj/
  ];

  return (
    <div className="container mt-5">
      {/* TITRE ET INTRO */}
      <h1 className="text-center mb-3" style={{ color: 'green', fontWeight: 'bold' }}>
        <FaCalendarAlt style={{ marginRight: '8px' }} />
        Événements récents
      </h1>
      <p className="text-center mb-4 text-muted">
        Retrouvez ci-dessous les derniers événements organisés par nos artistes et promoteurs.
      </p>

      {/* BOUTON AJOUTER SI ARTISTE / PROMOTEUR */}
      {user && (user.role === 'Artist' || user.role === 'Promoteur') && (
        <div className="text-end mb-4">
          <Link to="/events/add" className="btn btn-outline-success">
            <FaPlus style={{ marginRight: '6px' }} />
            Ajouter un événement
          </Link>
        </div>
      )}

      {/* GRILLE D'ÉVÉNEMENTS */}
      <div className="row g-4">
        {events.slice(0, 12).map(evt => (
          <div key={evt.id} className="col-12 col-sm-6 col-md-4">
            <div className="card h-100 shadow-sm event-card">
              <img
                src={evt.imageUrl}
                alt={evt.title}
                className="card-img-top"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{evt.title}</h5>
                <p className="card-text flex-grow-1">{evt.description}</p>
                <a
                  href={evt.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn voir-plus-btn mt-3"
                >
                  Voir plus
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* INVITATION À SE CONNECTER SI AUCUN USER */}
      {!user && (
        <div className="text-center mt-5 p-4 bg-light rounded shadow-sm">
          <p className="mb-3" style={{ fontSize: '1.1rem' }}>
            Vous êtes <strong>artiste</strong> ou <strong>promoteur</strong> et souhaitez ajouter un événement ?
          </p>
          <Link to="/auth" className="btn btn-outline-success">
            Cliquez ici pour vous connecter
          </Link>
        </div>
      )}

      {/* STYLES */}
      <style>{`
        .card-img-top {
          height: 180px;
          object-fit: cover;
          border-top-left-radius: .25rem;
          border-top-right-radius: .25rem;
        }
        @media (max-width: 576px) {
          .card-img-top {
            height: 140px;
          }
        }
        .event-card {
          border-radius: 15px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        .voir-plus-btn {
          background-color: #f7c319;
          color: #000;
          border: none;
          font-weight: bold;
        }
        .voir-plus-btn:hover {
          background-color: #e0b217;
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default Events;
