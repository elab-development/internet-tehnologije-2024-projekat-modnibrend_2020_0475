// Reusable component: Proizvod
import React from 'react';
import { FaTrash } from 'react-icons/fa';

const Proizvod = ({ proizvod, image, currency, convertPrice, onClick, onDelete  }) => {

  const role = localStorage.getItem('role'); 

  return (
    <div className="proizvod-item" onClick={onClick}>
      <img src={image} alt={proizvod.naziv} className="proizvod-slika" />
      <div>
        <h3>{proizvod.naziv}</h3>
        <p>{proizvod.opis}</p>
        <p>
          <strong>Cena:</strong> {convertPrice(proizvod.cena)} {currency}
        </p>
        <p><strong>Dostupan:</strong> {proizvod.dostupan ? 'Da' : 'Ne'}</p>
        {role === 'user' && (
          <button className="delete-button" onClick={(event) => {
            event.stopPropagation(); // Sprečavamo klik na karticu
            onDelete(proizvod.id);
          }}>
            <FaTrash /> Obriši
          </button>
        )}
      </div>
    </div>
  );
};

export default Proizvod;
