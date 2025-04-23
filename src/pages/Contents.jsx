import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlayCircle } from 'react-icons/fa'; // Import de l'icône Play

const Contents = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    // Récupération des contenus depuis l'API
    axios
      .get('https://projetbeninculture-1.onrender.com/api/contents') // Vérifiez que cette URL est correcte
      .then(response => {
        setContents(response.data); // Mise à jour de l'état avec les données récupérées
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des contenus:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contenus</h1>
      <div className="row">
        {contents.length > 0 ? (
          contents.map((content, index) => (
            <div className="col-md-4" key={content.id || index}>
              <div className="card mb-4 text-center">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    height: '200px',
                    backgroundColor: '#f7f7f7', // Couleur de fond pour l'icône
                    borderRadius: '10px',
                    cursor: 'pointer', // Ajout du curseur pour indiquer que c'est cliquable
                  }}
                  onClick={() => {
                    if (content.url) {
                      window.open(content.url, '_blank'); // Ouvre l'URL dans un nouvel onglet
                    } else {
                      console.error('URL manquante pour ce contenu');
                    }
                  }}
                >
                  <FaPlayCircle size={60} color="#800020" /> {/* Icône Play */}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{content.title || 'Titre indisponible'}</h5>
                  <p className="card-text">{content.description || 'Description indisponible'}</p>
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