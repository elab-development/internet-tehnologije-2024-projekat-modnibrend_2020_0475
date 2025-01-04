import React from 'react';
import './Pocetna.css';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import videoSrc from './assets/videos/intro.mp4';
import { useNavigate } from 'react-router-dom';

const Pocetna = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero">

        <video autoPlay muted loop playsInline className="hero-video">
          <source src={videoSrc} type="video/mp4" />
          Vaš pretraživač ne podržava video tag.
        </video>
        <div className="hero-content">
          <h1 className="hero-title">Nove kolekcije</h1>
          <p className="hero-subtitle">Inspirisana modernim linijama i luksuznim materijalima.</p>
          <button
            className="hero-button"
            onClick={() => navigate('/kolekcije')}
          >
            Istraži sada
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-socials">
          <FaInstagram className="footer-icon" />
          <FaFacebookF className="footer-icon" />
          <FaTwitter className="footer-icon" />
        </div>
        <p className="footer-text">© {new Date().getFullYear()} Modni Brend. Sva prava zadržana.</p>
      </footer>
    </div>
  );
};

export default Pocetna;
