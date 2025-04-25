import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Utilisateur');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      axios.post('https://projetbeninculture-1.onrender.com/api/auth/login', { username, password })
        .then(response => {
          console.log('Connexion réussie:', response.data);
          navigate('/contents');
        })
        .catch(error => console.error('Erreur de connexion:', error));
    } else {
      axios.post('https://projetbeninculture-1.onrender.com/api/auth/register', { username, password, role })
        .then(response => {
          console.log('Inscription réussie:', response.data);
          setIsLogin(true);
        })
        .catch(error => {
          console.error('Erreur d\'inscription:', error);
          if (error.response) {
            console.error('Détail:', error.response.data);
          }
        });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h1
        className="text-center mb-4"
        style={{ color: 'green', fontWeight: 'bold' }}
      >
        {isLogin ? 'Connexion' : 'Inscription'}
      </h1>

      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#f6fff6',
        padding: '20px',
        borderRadius: '10px',
        border: '2px solid green',
        boxShadow: '0 0 10px rgba(0, 128, 0, 0.3)'
      }}>
        <div className="mb-3">
          <label className="form-label" style={{ color: 'green', fontWeight: 'bold' }}>Nom d'utilisateur</label>
          <input
            type="text"
            className="form-control"
            style={{ borderColor: 'green' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ color: 'green', fontWeight: 'bold' }}>Mot de passe</label>
          <input
            type="password"
            className="form-control"
            style={{ borderColor: 'green' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {!isLogin && (
          <div className="mb-3">
            <label className="form-label" style={{ color: 'green', fontWeight: 'bold' }}>Rôle</label>
            <select
              className="form-control"
              style={{ borderColor: 'green' }}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Utilisateur">Utilisateur</option>
              <option value="Artist">Artist</option>
              <option value="Promoteur">Promoteur</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="btn w-100"
          style={{
            backgroundColor: 'green',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          {isLogin ? 'Se connecter' : 'S\'inscrire'}
        </button>
      </form>

      <button
        className="btn btn-link mt-3 w-100"
        onClick={() => setIsLogin(!isLogin)}
        style={{
          color: 'red',
          fontWeight: 'bold',
          textAlign: 'center',
          textDecoration: 'none'
        }}
      >
        {isLogin ? 'Créer un compte' : 'Déjà un compte ? Connectez-vous'}
      </button>
    </div>
  );
};

export default Login;
