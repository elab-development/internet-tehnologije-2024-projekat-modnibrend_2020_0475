import React, { useState, useEffect } from 'react';
import './Kolekcije.css';
import { useNavigate } from 'react-router-dom';
import Kolekcija from './Kolekcija';

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
          <Kolekcija
            key={kolekcija.id}
            kolekcija={kolekcija}
            onDetaljiClick={() => navigate(`/kolekcije/${kolekcija.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Kolekcije;
