import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // État pour basculer entre connexion et inscription
  const [username, setUsername] = useState(''); // Remplace email par username
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Utilisateur'); // État pour le rôle
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Connexion
      axios.post('https://projetbeninculture-1.onrender.com/api/auth/login', { username, password })
        .then(response => {
          console.log('Connexion réussie:', response.data);
          navigate('/contents');
        })
        .catch(error => console.error('Erreur de connexion:', error));
    } else {
      // Inscription
      axios.post('https://projetbeninculture-1.onrender.com/api/auth/register', { username, password, role })
        .then(response => {
          console.log('Inscription réussie:', response.data);
          setIsLogin(true); // Retour à la page de connexion après inscription
        })
        .catch(error => {
          console.error('Erreur d\'inscription:', error);
          if (error.response) {
            console.error('Détail:', error.response.data); // <- ici tu verras exactement pourquoi ça échoue
          }
        });
        
    }
  };

  return (
    <div className="container mt-5">
      <h1>{isLogin ? 'Connexion' : 'Inscription'}</h1>
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label className="form-label">Nom d'utilisateur</label>
    <input
      type="text"
      className="form-control"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
  </div>
  <div className="mb-3">
    <label className="form-label">Mot de passe</label>
    <input
      type="password"
      className="form-control"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>
  {!isLogin && (
    <div className="mb-3">
      <label className="form-label">Rôle</label>
      <select
        className="form-control"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="Utilisateur">Utilisateur</option>
        <option value="Artist">Artist</option>
        <option value="Promoteur">Promoter</option>
      </select>
    </div>
  )}
  <button type="submit" className="btn btn-primary">
    {isLogin ? 'Se connecter' : 'S\'inscrire'}
  </button>
</form>
      <button
        className="btn btn-link mt-3"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Créer un compte' : 'Déjà un compte ? Connectez-vous'}
      </button>
    </div>
  );
};

export default Login;