import React, { useEffect, useState } from 'react';
import { getAllContents } from '../../api/contentApi';

const ContentList = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await getAllContents();
        console.log(response.data); // Vérifiez si c'est un tableau
        setContents(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error(error.response?.data || error.message);
        alert('Erreur lors de la récupération des contenus');
      }
    };

    fetchContents();
  }, []);

  return (
    <div>
      <h1>Liste des contenus</h1>
      <ul>
        {Array.isArray(contents) && contents.map((content) => (
          <li key={content._id}>
            <h2>{content.title}</h2>
            <p>{content.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentList;