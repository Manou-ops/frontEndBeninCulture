import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlayCircle } from 'react-icons/fa';

const Contents = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios
      .get('https://projetbeninculture-1.onrender.com/api/contents')
      .then(response => setContents(response.data))
      .catch(error => console.error('Erreur lors de la récupération des contenus:', error));
  }, []);

  return (
    <div className="container mt-5">
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
                    backgroundImage: `url('src/assets/image/amazone.jpg')`,
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
