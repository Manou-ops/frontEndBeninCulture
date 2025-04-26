import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { FaUserCircle, FaEdit, FaLink, FaCamera } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Account = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [socialLinks, setSocialLinks] = useState(['']);
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || '');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axiosInstance.get('/auth/me')
      .then(response => {
        setUser(response.data);
        setBio(response.data.bio || '');
        setSocialLinks(response.data.socialLinks.length > 0 ? response.data.socialLinks : ['']);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du profil:', error);
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      navigate('/');
      window.location.reload(); // Recharge la page pour réinitialiser complètement
    }
  };

  const handleSocialLinkChange = (index, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = value;
    setSocialLinks(updatedLinks);
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, '']);
  };

  const handleUpdate = () => {
    axiosInstance.put('/auth/me', {
      bio,
      socialLinks
    })
    .then(response => {
      toast.success('Profil mis à jour avec succès', { position: "top-center", autoClose: 3000 });
      setUser(response.data);
      setEditing(false);
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour du profil:', error);
      toast.error('Erreur lors de la mise à jour.', { position: "top-center", autoClose: 3000 });
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Veuillez sélectionner un fichier image valide.', { position: "top-center", autoClose: 3000 });
    }
  };

  if (!user) {
    return <div className="container mt-5 text-center">Chargement...</div>;
  }

  return (
    <div className="account-background d-flex justify-content-center align-items-center mt-5 fade-in">
      <div className="profile-card p-4 shadow-lg">
        <div className="text-center position-relative mb-4">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profil"
              className="profile-image"
            />
          ) : (
            <FaUserCircle size={100} color="green" />
          )}
          <label htmlFor="profileImageUpload" className="upload-icon">
            <FaCamera />
          </label>
          <input
            id="profileImageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        <h1 className="text-center mb-4" style={{ color: 'green', fontWeight: 'bold' }}>Mon Compte</h1>

        <div className="info-card mb-3">
          <strong>Nom d'utilisateur :</strong> {user.username}
        </div>

        <div className="info-card mb-3">
          <strong>Rôle :</strong> {user.role}
        </div>

        <div className="info-card mb-3">
          <strong>Bio :</strong> {user.bio ? user.bio : "Aucune bio enregistrée."}
        </div>

        <div className="info-card mb-4">
          <strong>Liens sociaux :</strong>
          {user.socialLinks && user.socialLinks.length > 0 ? (
            <ul className="list-unstyled mt-2">
              {user.socialLinks.map((link, index) => (
                <li key={index}><FaLink style={{ marginRight: '8px' }} /> {link}</li>
              ))}
            </ul>
          ) : (
            <p>Aucun lien social enregistré.</p>
          )}
        </div>

        <div className="text-center">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="btn btn-warning w-100 mb-3"
              style={{ fontWeight: 'bold', color: 'white' }}
            >
              <FaEdit style={{ marginRight: '8px' }} />
              Modifier mon profil
            </button>
          ) : (
            <>
              <div className="form-group mb-3">
                <label className="fw-bold">Bio</label>
                <textarea
                  className="form-control"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="3"
                />
              </div>

              <div className="form-group mb-3">
                <label className="fw-bold">Liens sociaux</label>
                {socialLinks.map((link, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-control mb-2"
                    value={link}
                    onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                    placeholder="Lien réseau social"
                  />
                ))}
                <button onClick={addSocialLink} className="btn btn-warning btn-sm mt-2 w-100" style={{ fontWeight: 'bold', color: 'white' }}>
                  Ajouter un lien
                </button>
              </div>

              <button
                onClick={handleUpdate}
                className="btn btn-warning w-100 mt-3"
                style={{ fontWeight: 'bold', color: 'white' }}
              >
                Enregistrer
              </button>
            </>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="btn w-100 mt-3 logout-button"
          style={{ fontWeight: 'bold' }}
        >
          Se déconnecter
        </button>
      </div>

      <style>{`
        .fade-in {
          animation: fadeInAnimation 1.2s ease;
        }
        @keyframes fadeInAnimation {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .account-background {
          background: linear-gradient(to bottom right, #e9fbe9, #f9fff9);
          min-height: 100vh;
          padding-bottom: 50px;
        }
        .profile-card {
          background: #ffffff;
          border-radius: 20px;
          max-width: 500px;
          width: 100%;
        }
        .profile-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid #006400; /* Vert sombre autour de l'avatar */
          transition: box-shadow 0.3s;
        }
        .profile-image:hover {
          box-shadow: 0 0 15px rgba(0, 100, 0, 0.7);
        }
        .upload-icon {
          position: absolute;
          bottom: 0;
          right: 40%;
          background-color: white;
          border-radius: 50%;
          padding: 6px;
          cursor: pointer;
          border: 2px solid goldenrod;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s;
        }
        .upload-icon:hover {
          background-color: #e0ffe0;
        }
        .info-card {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 15px;
          font-size: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          transition: transform 0.3s;
        }
        .info-card:hover {
          transform: scale(1.02);
        }
        .logout-button {
          background-color: #d90429;
          color: white;
        }
        .logout-button:hover {
          background-color: #c00225;
        }
      `}</style>
    </div>
  );
};

export default Account;
