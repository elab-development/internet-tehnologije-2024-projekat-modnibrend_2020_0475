import React from 'react';
import './Pocetna.css';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Pocetna = () => {
  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Nova Kolekcija</h1>
          <p className="hero-subtitle">Inspirisana modernim linijama i luksuznim materijalima.</p>
          <button className="hero-button">Istraži sada</button>
        </div>
      </section>

      {/* Icons / Brand Stories */}
      <section className="brand-highlights">
        <div className="highlight-card highlight-card--icon">
          <img src="https://source.unsplash.com/100x100/?fashion" alt="Fashion Icon" />
          <h3>Najkvalitetniji Materijali</h3>
          <p>Pažljivo birani materijali za najbolji osećaj na koži.</p>
        </div>
        <div className="highlight-card highlight-card--icon">
          <img src="https://source.unsplash.com/100x100/?dress" alt="Dress Icon" />
          <h3>Unikatni Dizajn</h3>
          <p>Svaki komad je unikatan, stvoren da istakne Vašu ličnost.</p>
        </div>
        <div className="highlight-card highlight-card--icon">
          <img src="https://source.unsplash.com/100x100/?shoes" alt="Shoes Icon" />
          <h3>Izdržljiva Oprema</h3>
          <p>Komadi koji traju, bez kompromisa u kvalitetu.</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2 className="section-title">Izdvojeni Proizvodi</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="https://source.unsplash.com/400x400/?coat" alt="Proizvod 1" className="product-image" />
            <h3 className="product-title">Elegantan Kaput</h3>
            <p className="product-description">Minimalistički kaput vrhunskog kvaliteta.</p>
            <button className="product-button">Kupi sada</button>
          </div>
          <div className="product-card">
            <img src="https://source.unsplash.com/400x400/?bag" alt="Proizvod 2" className="product-image" />
            <h3 className="product-title">Kožna Torba</h3>
            <p className="product-description">Savršena za svakodnevnu upotrebu i posebne prilike.</p>
            <button className="product-button">Kupi sada</button>
          </div>
          <div className="product-card">
            <img src="https://source.unsplash.com/400x400/?scarf" alt="Proizvod 3" className="product-image" />
            <h3 className="product-title">Svilen Kastig</h3>
            <p className="product-description">Lagan i prijatan, izdvaja Vaš stil u masi.</p>
            <button className="product-button">Kupi sada</button>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="instagram-section">
        <h2 className="section-title">Pratite nas na Instagramu</h2>
        <div className="insta-grid">
          <img src="https://source.unsplash.com/200x200/?fashion,1" alt="Insta 1" className="insta-image" />
          <img src="https://source.unsplash.com/200x200/?fashion,2" alt="Insta 2" className="insta-image" />
          <img src="https://source.unsplash.com/200x200/?fashion,3" alt="Insta 3" className="insta-image" />
          <img src="https://source.unsplash.com/200x200/?fashion,4" alt="Insta 4" className="insta-image" />
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
