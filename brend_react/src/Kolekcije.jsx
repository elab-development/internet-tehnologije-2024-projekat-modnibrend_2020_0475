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
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const cachedData = localStorage.getItem('kolekcije');
        if (cachedData) {
          setKolekcije(JSON.parse(cachedData));
          setLoading(false);
          return; 
        }

        
        const response = await fetch('http://localhost:8000/api/kolekcije', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login');
            return;
          }
          throw new Error('Greška pri dohvatanju kolekcija.');
        }

        const data = await response.json();
        setKolekcije(data);

        localStorage.setItem('kolekcije', JSON.stringify(data));
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
      <h1 className="kolekcije-title">Naše kolekcije</h1>
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
