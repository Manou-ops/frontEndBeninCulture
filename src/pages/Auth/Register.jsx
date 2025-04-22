import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/register', { email, password }) // Remplacez par l'URL de votre API
      .then(response => {
        console.log('Inscription réussie:', response.data);
        navigate('/contents');
      })
      .catch(error => console.error('Erreur lors de l\'inscription:', error));
  };

  return (
    <div className="container mt-5">
      <h1>Enregistrement</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="btn btn-primary">S'enregistrer</button>
      </form>
    </div>
  );
};

export default Register;