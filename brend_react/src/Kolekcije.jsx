import React, { useState, useEffect } from 'react';
import './Kolekcije.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Kolekcije = () => {
  const [kolekcije, setKolekcije] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchKolekcije = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/kolekcije', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Greška pri dohvatanju kolekcija.');
        }

        const data = await response.json();
        setKolekcije(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKolekcije();
  }, []);

  if (loading) {
    return <p>Učitavanje kolekcija...</p>;
  }

  return (
    <div className="kolekcije-container">
      <h1 className="kolekcije-title">Naše Kolekcije</h1>
      <div className="kolekcije-grid">
        {kolekcije.map((kolekcija) => (
          <div key={kolekcija.id} className="kolekcija-card">
            <h2>{kolekcija.naziv}</h2>
            <p>{kolekcija.opis}</p>
            <button
              className="detalji-button"
              onClick={() => navigate(`/kolekcije/${kolekcija.id}`)}
            >
              Pogledaj detalje
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kolekcije;
