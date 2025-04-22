import React from 'react';

const Home = () => {
  return (
    <div className="container-fluid p-0">
      {/* Nouvelle section avec une image de fond */}
      <div
        className="text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundPosition: 'center',
          height: '80px', // Hauteur de la section
          color: '#f7b801', // Jaune
          transition: 'background-color 0.3s ease', // Transition pour l'effet hover
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)')} // Effet hover : arrière-plan plus foncé
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Retour à l'arrière-plan initial
      >
        <h1
          style={{
            fontSize: '4rem', // Taille du texte
            fontWeight: 'bold',
            color: '#f7b801', // Jaune
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Ombre du texte
          }}
        >
          BINEVENU.E SUR :
        </h1>
      </div>

      {/* Section principale avec une image de fond */}
      <div className="container mt-5" style={{ marginTop: '80px' }}>
        <div
          className="jumbotron text-white text-center p-5"
          style={{
            backgroundImage: "url('src/assets/image/logo.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px',
            height: '600px', // Augmentation de la hauteur
          }}
        >
        </div>

        {/* Bouton Explorer les Contenus */}
        <div
          className="text-center"
          style={{
            transition: 'background-color 0.3s ease', // Transition pour l'effet hover
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)')} // Effet hover
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Retour à l'arrière-plan initial
        >
          <a
            href="/contents"
            className="btn btn-lg mt-3"
            style={{
              fontSize: '4rem', // Taille du texte
              fontWeight: 'bold',
              color: '#f7b801', // Jaune
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Ombre du texte
              border: 'none', // Suppression de la bordure
              backgroundColor: 'transparent', // Suppression de la couleur de fond
            }}
          >
            Explorer les Contenus
          </a>
        </div>

        {/* Section : La richesse de notre culture */}
        <div className="mt-5 row align-items-center">
          <div className="col-md-6">
            <img
              src="src/assets/image/1.jpg"
              alt="Culture béninoise"
              className="img-fluid rounded animate__animated animate__fadeInLeft" // Animation ajoutée
            />
          </div>
          <div className="col-md-6">
            <h2 style={{ color: '#800020' }}>La richesse de notre culture</h2>
            <p>
              Le Bénin est un pays riche en traditions, en art et en musique.
              Découvrez les danses traditionnelles, les sculptures uniques et les
              rythmes qui font vibrer notre nation.
            </p>
          </div>
        </div>

        {/* Section des catégories */}
        <div className="mt-5">
          <h2 className="text-center mb-4" style={{ color: '#f7b801', fontWeight: 'bold' }}>
            Nos Catégories
          </h2>
          <div className="row">
            <div className="col-md-4">
              <div
                className="card animate__animated animate__zoomIn" // Animation ajoutée
                style={{
                  backgroundImage: "url('src/assets/image/1.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '200px',
                  borderRadius: '10px',
                }}
              >
                <div className="card-body text-white text-center">
                  <h5 className="card-title">Musique</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card animate__animated animate__zoomIn" // Animation ajoutée
                style={{
                  backgroundImage: "url('src/assets/image/2.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '200px',
                  borderRadius: '10px',
                }}
              >
                <div className="card-body text-white text-center">
                  <h5 className="card-title">Art</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card animate__animated animate__zoomIn" // Animation ajoutée
                style={{
                  backgroundImage: "url('src/assets/image/3.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '200px',
                  borderRadius: '10px',
                }}
              >
                <div className="card-body text-white text-center">
                  <h5 className="card-title">Événements</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section : Quelques-uns de nos artistes */}
        <div className="mt-5">
          <h2 className="text-center mb-4" style={{ color: '#800020', fontWeight: 'bold' }}>
            Quelques-uns de nos artistes
          </h2>
          <div
            id="artistCarousel"
            className="carousel slide animate__animated animate__fadeInUp" // Animation ajoutée
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="src/assets/image/1.jpg"
                  className="d-block w-100"
                  alt="Artiste 1"
                  style={{
                    height: '400px',
                    objectFit: 'cover',
                  }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Artiste 1</h5>
                  <p>Un des artistes les plus influents du Bénin.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="src/assets/image/2.jpg"
                  className="d-block w-100"
                  alt="Artiste 2"
                  style={{
                    height: '400px',
                    objectFit: 'cover',
                  }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Artiste 2</h5>
                  <p>Un talent exceptionnel dans la musique béninoise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;