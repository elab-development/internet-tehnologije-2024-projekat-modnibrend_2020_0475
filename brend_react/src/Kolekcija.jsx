// Reusable component: Kolekcija
import React from 'react';

const Kolekcija = ({ kolekcija, onDetaljiClick }) => {
  return (
    <div className="kolekcija-card">
      <h2>{kolekcija.naziv}</h2>
      <p>{kolekcija.opis}</p>
      <button className="detalji-button" onClick={onDetaljiClick}>
        Pogledaj detalje
      </button>
    </div>
  );
};

export default Kolekcija;
