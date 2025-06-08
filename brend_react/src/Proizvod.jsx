import React from 'react';
import { FaTrash, FaCartPlus  } from 'react-icons/fa';
import { useCart } from './CartContext';

const Proizvod = ({ proizvod, image, currency, convertPrice, onClick, onDelete  }) => {

  const role = localStorage.getItem('role');

  const { addToCart } = useCart();
  const dostupanBool = Boolean(proizvod.dostupan);

  return (
    <div className="proizvod-item" onClick={() => onClick && onClick()}>
      <img src={image} alt={proizvod.naziv} className="proizvod-slika" />
      <div>
        <h3>{proizvod.naziv}</h3>
        <p>{proizvod.opis}</p>
        <p>
          <strong>Cena:</strong> {convertPrice(proizvod.cena)} {currency}
        </p>
        <p><strong>Dostupan:</strong> {dostupanBool  ? 'Da' : 'Ne'}</p>

          {role === 'user' && dostupanBool  &&(
              <button onClick={(e) => {
                  e.stopPropagation();
                  addToCart(proizvod);
                  alert('Proizvod dodat u korpu!');
              }}>
                  <FaCartPlus /> Dodaj u korpu
              </button>
          )}

        {role === 'admin' && (
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
