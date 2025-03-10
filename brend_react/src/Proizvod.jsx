// Reusable component: Proizvod
import React from 'react';

const Proizvod = ({ proizvod, image, currency, convertPrice }) => {
  return (
    <div className="proizvod-item">
      <img src={image} alt={proizvod.naziv} className="proizvod-slika" />
      <div>
        <h3>{proizvod.naziv}</h3>
        <p>{proizvod.opis}</p>
        <p>
          <strong>Cena:</strong> {convertPrice(proizvod.cena)} {currency}
        </p>
        <p><strong>Dostupan:</strong> {proizvod.dostupan ? 'Da' : 'Ne'}</p>
      </div>
    </div>
  );
};

export default Proizvod;
