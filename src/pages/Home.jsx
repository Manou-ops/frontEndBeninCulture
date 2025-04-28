
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import 'animate.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  const [formData, setFormData] = useState({
    prenom: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true); // ➔ Dès qu'on clique, bouton devient "Envoi en cours..."
  
    // 1. Envoyer d'abord l'email vers toi (propriétaire)
    emailjs.send('service_fl5twzp', 'template_slv8e1w', {
      from_name: formData.prenom,
      reply_to: formData.email,
      message: formData.message,
    }, '7A6EkOUvNe08EijuP')
    .then((response) => {
      console.log('Message envoyé vers le propriétaire:', response.status);
  
      // 2. Ensuite envoyer la confirmation vers l'utilisateur
      emailjs.send('service_fl5twzp', 'template_qnxnayq', {
        from_name: formData.prenom,
        reply_to: formData.email, // Bien reply_to ici
      }, '7A6EkOUvNe08EijuP')
      .then(() => {
        toast.success('Merci pour votre avis ! Un email de confirmation a été envoyé.', {
          position: "top-center",
          autoClose: 3000,
        });
        setFormData({ prenom: '', email: '', message: '' });
        setSending(false);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi de l\'email de confirmation:', error);
        toast.error('Erreur lors de l\'envoi de l\'email de confirmation.', {
          position: "top-center",
          autoClose: 3000,
        });
        setSending(false);
      });
  
    })
    .catch((error) => {
      console.error('Erreur lors de l\'envoi du message principal:', error);
      toast.error('Erreur lors de l\'envoi du message.', {
        position: "top-center",
        autoClose: 3000,
      });
      setSending(false);
    });
  };
  


  return (
    <div className="container-fluid p-0">
      {/* Titre avec animation */}
      <div
        className="text-center d-flex align-items-center justify-content-center animate__animated animate__fadeInDown"
        style={{
          backgroundPosition: 'center',
          height: '80px',
          color: '#f7b801',
          transition: 'background-color 0.3s ease',
        }}
        >
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#bd6f2f',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            marginTop: '37px',
          }}
        >
          BIENVENU.E SUR :
        </h1>
      </div>


      {/* Image de fond avec animation zoom */}
      <div className="container mt-5">
        <div
          className="jumbotron text-white text-center p-5 animate__animated animate__zoomIn"
          style={{
            backgroundImage: "url('/logoss.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px',
            height: '800px',
          }}
        ></div>

        {/* Bouton Explorer */}
        <div
          className="text-center"
          style={{ transition: 'background-color 0.3s ease' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <a
            href="/contents"
            className="btn btn-lg mt-3 animate__animated animate__pulse animate__infinite"
            style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              color: '#f7c319',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              border: 'none',
              backgroundColor: 'transparent',
            }}
          >
            A PROPOS DE NOUS
          </a>
        </div>

        {/* Richesse de la culture */}
        <div className="mt-5 row align-items-center">
          <div className="col-md-6">
            <img
              src="/amazone.jpg"
              alt="Culture béninoise"
              className="img-fluid rounded animate__animated animate__fadeInLeft"
            />
          </div>
          <div className="col-md-6 animate__animated animate__fadeInRight">
            <h2 style={{ color: '#800020' }}></h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.5', fontWeight: 'bold', textAlign: 'justify' }}>
            <span style={{ color: '#bd6f2f' }}>Benin Culture</span> est une plateforme numérique dédiée à la valorisation des talents artistiques et culturels béninois. 
            Pensée comme un pont entre les artistes, les promoteurs culturels et le public, elle permet de partager des créations musicales, 
            d’organiser des événements et de connecter les passionnés de culture en un seul lieu. Grâce à une interface simple et intuitive, 
            les artistes peuvent créer leur profil, diffuser leurs œuvres, vendre leurs tickets de spectacle et recevoir le soutien direct 
            de leur communauté. Plus qu’un site, <span style={{ color: '#bd6f2f' }}>Benin Culture</span> est un espace d’expression, de découverte et de promotion de la richesse 
            culturelle du Bénin.
            </p>

          </div>
        </div>

        {/* Catégories */}
        <div className="mt-5">
          <h2 className="text-center mb-4" style={{ color: '#f7b801', fontWeight: 'bold' }}>
             NOS LEGENDES
          </h2>
          <div className="row">
            {['1.jpg', '2.jpg', '12.jpg'].map((img, index) => (
              <div className="col-md-4" key={index}>
                <div
                  className={`card animate__animated animate__zoomIn animate__delay-${index + 1}s`}
                  style={{
                    backgroundImage: `url('/${img}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '200px',
                    borderRadius: '10px',
                  }}
                >
                  <div className="card-body text-white text-center">
                    <h5 className="card-title">
                     
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Artistes */}
        <div className="mt-5">
          <h2 className="text-center mb-4" style={{ color: 'red', fontWeight: 'bold' }}>
            LA NOUVELLE GÉNÉRATION D'ARTISTES
          </h2>
          <div
            id="artistCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
            data-bs-wrap="true"
          >
            <div className="carousel-inner">
              {[124, 126, 127, 128, 5, 6].map((num, idx) => (
                <div
                  className={`carousel-item animate__animated animate__fadeIn ${idx === 0 ? 'active' : ''}`}
                  key={num}
                >
                  <img
                    src={`/${num}.jpg`}
                    className="d-block w-100"
                    alt={`Artiste ${num}`}
                    style={{ height: '650px', objectFit: 'cover' }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Artiste {num}</h5>
                    <p>
                      {[
                        'Un des artistes les plus influents du Bénin.',
                        'Un talent exceptionnel dans la musique béninoise.',
                        'Un artiste incontournable de la scène béninoise.',
                        'Un talent émergent dans l’art contemporain.',
                        'Un maître des rythmes traditionnels béninois.',
                        'Un artiste qui redéfinit la culture béninoise.',
                      ][idx]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contrôles */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#artistCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Précédent</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#artistCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Suivant</span>
            </button>
          </div>
        </div>
      </div>

      <section className="mt-5 p-4 bg-light rounded shadow fade-in">
        <h2 className="text-center mb-4" style={{ color: '#f7c319', fontWeight: 'bold' }}>
          Laissez-nous votre avis
        </h2>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label" style={{ fontWeight: 'bold' }}>
              <FaUser style={{ marginRight: '8px' }} /> Prénom
            </label>
            <input
              type="text"
              className="form-control"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Votre prénom"
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label" style={{ fontWeight: 'bold' }}>
              <FaEnvelope style={{ marginRight: '8px' }} /> Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre adresse email"
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label" style={{ fontWeight: 'bold' }}>
              <FaCommentDots style={{ marginRight: '8px' }} /> Message
            </label>
            <textarea
              className="form-control"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Votre message"
              required
            />
          </div>

          <div className="col-12 text-center">
            <button
                type="submit"
                className="btn btn-success px-5"
                style={{ fontWeight: 'bold', fontSize: '1.1rem', backgroundColor:'#f7c319' }}
                disabled={sending} // ➔ désactivé pendant l'envoi
              >
                {sending ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </div>
        </form>

        <style>{`
          .fade-in {
            animation: fadeInAnimation 1.5s ease;
          }

          @keyframes fadeInAnimation {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
    </div>
  );
};

// Ajoute ce CSS dans ton fichier CSS ou dans un <style> global
<style>
  {`
    .scrolling-text-wrapper {
      overflow: hidden;
      position: relative;
      width: 100%;
      height: 80px;
    }

    .scrolling-text {
      display: inline-block;
      white-space: nowrap;
      position: absolute;
      will-change: transform;
      animation: scrollLeft 10s linear infinite;
    }

    @keyframes scrollLeft {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  `}
</style>



export default Home;
