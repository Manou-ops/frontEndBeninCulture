import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { FaPlayCircle } from 'react-icons/fa';

const Contents = () => {
  const [contents, setContents] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsConnected(false);
      return;
    }
    setIsConnected(true);

    axiosInstance
      .get('/contents')
      .then(response => setContents(response.data))
      .catch(error => {
        console.error('Erreur lors de la récupération des contenus:', error);
        setIsConnected(false);
      });
  }, []);

  if (!isConnected) {
    return (
      <div className="container text-center mt-5 fade-in">
        <h1 style={{ color: 'green', fontWeight: 'bold' }}>Bienvenue sur Benin Culture</h1>
        <p className="lead mt-3" style={{ color: 'gray' }}>
          Pour découvrir tout notre contenu exclusif, veuillez créer un compte ou vous connecter.
        </p>

        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/auth" className="btn btn-success">Se connecter</Link>
          <Link to="/auth" className="btn btn-outline-success">Créer un compte</Link>
        </div>

        <div className="mt-5">
          <h2 className="text-center mb-4" style={{ color: 'goldenrod', fontWeight: 'bold' }}>
            En voici quelques patrimoines de notre pays.
          </h2>

          <div className="row g-3 justify-content-center">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div className="col-12 col-sm-6 col-md-4" key={num}>
                <img
                  src={`/patrimoine${num}.jpg`} // Exemple : patrimoine1.jpg, patrimoine2.jpg
                  alt={`Patrimoine ${num}`}
                  className="img-fluid patrimoine-img"
                />
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .fade-in {
            animation: fadeInAnimation 1.5s ease-in;
          }

          @keyframes fadeInAnimation {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .patrimoine-img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
          }

          .patrimoine-img:hover {
            transform: scale(1.05);
          }

          @media (max-width: 768px) {
            .patrimoine-img {
              height: 200px;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container mt-5 fade-in">
      <h1 className="text-center mb-4">
        <span style={{ color: 'green' }}>MUSIQUE </span>
        <span style={{ color: 'goldenrod' }}>DISPONIBLE SUR </span>
        <span style={{ color: 'red' }}>Benin_Culture</span>
      </h1>

      <div className="row">
        {contents.length > 0 ? (
          contents.map((content, index) => (
            <div className="col-md-4" key={content._id || index}>
              <div
                className="card mb-4 shadow-sm border-0"
                style={{ borderRadius: '15px', overflow: 'hidden', transition: 'transform 0.3s ease' }}
              >
                <div
                  className="position-relative"
                  style={{
                    height: '200px',
                    backgroundImage: `url('/logos.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    const url = content.fileUrl;
                    if (typeof url === 'string' && url.trim() !== '') {
                      window.open(url, '_blank');
                    } else {
                      console.error('URL invalide ou manquante pour ce contenu');
                    }
                  }}
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <FaPlayCircle size={60} color="#fff" />
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{content.title || 'Titre indisponible'}</h5>
                  <p className="card-text text-muted">{content.description || 'Description indisponible'}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Aucun contenu disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Contents;
