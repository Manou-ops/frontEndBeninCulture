import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contents = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios.get('https://api.example.com/contents') // Remplacez par l'URL de votre API
      .then(response => setContents(response.data))
      .catch(error => console.error('Erreur lors de la récupération des contenus:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Contenus</h1>
      <div className="row">
        {contents.map(content => (
          <div className="col-md-4" key={content.id}>
            <div className="card mb-4">
              <img src={content.image} className="card-img-top" alt={content.title} />
              <div className="card-body">
                <h5 className="card-title">{content.title}</h5>
                <p className="card-text">{content.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contents;