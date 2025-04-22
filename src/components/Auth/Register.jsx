import React, { useState } from 'react';
import { registerUser } from '../../api/authApi';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '', // Initialisé à une chaîne vide
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      alert(response.data.message);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Erreur lors de l\'inscription');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Nom d'utilisateur"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={handleChange}
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      >
        <option value="">-- Sélectionnez un rôle --</option>
        <option value="artist">Artiste</option>
        <option value="promoter">Promoteur</option>
        <option value="spectator">Spectateur</option>
      </select>
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Register;