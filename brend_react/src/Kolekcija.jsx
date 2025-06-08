import React from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';

const Kolekcija = ({ kolekcija, onDetaljiClick, onDelete }) => {
  const role = localStorage.getItem('role'); 

  const handleDelete = async () => {
    if (window.confirm(`Da li ste sigurni da želite da obrišete kolekciju "${kolekcija.naziv}"?`)) {
      await onDelete(kolekcija.id);
    }
  };

  return (
    <div className="kolekcija-card">
      <h2>{kolekcija.naziv}</h2>
      <p>{kolekcija.opis}</p>
      <div className="kolekcija-actions">
        <button className="detalji-button" onClick={onDetaljiClick}>
          <FaEye /> Pogledaj detalje
        </button>
        {role === 'admin' && (
          <button className="delete-button" onClick={handleDelete}>
            <FaTrash /> Obriši
          </button>
        )}
      </div>
    </div>
  );
};

export default Kolekcija;
