import React, { useState } from 'react';
import { loginUser } from '../../api/authApi';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Données envoyées :', formData); // Vérifiez les données ici
    try {
      const response = await loginUser(formData);
      console.log('Réponse du serveur :', response.data);
      alert('Connexion réussie');
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || 'Erreur lors de la connexion');
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
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Données reçues :', { username, password });

    const user = await User.findOne({ username });
    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(404).json({ message: 'User not found!' });
    }

    console.log('Utilisateur trouvé :', user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Mot de passe incorrect');
      return res.status(401).json({ message: 'Invalid credentials!' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
    console.log('Token généré :', token);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error.message);
    res.status(400).json({ error: error.message });
  }
};