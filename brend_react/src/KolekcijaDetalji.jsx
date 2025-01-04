import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './KolekcijaDetalji.css';

const KolekcijaDetalji = () => {
  const { id } = useParams();
  const [kolekcija, setKolekcija] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKolekcija = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch(`http://localhost:8000/api/kolekcije/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, 
            },
          });        
        if (!response.ok) {
            throw new Error('Greška pri dohvatanju detalja kolekcije.');
        }
        const data = await response.json();
        setKolekcija(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKolekcija();
  }, [id]);

  if (loading) {
    return <p>Učitavanje detalja kolekcije...</p>;
  }

  if (!kolekcija) {
    return <p>Detalji kolekcije nisu dostupni.</p>;
  }

  return (
    <div className="kolekcija-detalji-container">
      <div className="kolekcija-header">
        <img src={kolekcija.slika} alt={kolekcija.naziv} className="kolekcija-slika" />
        <div className="kolekcija-info">
          <h1>{kolekcija.naziv}</h1>
          <p>{kolekcija.opis}</p>
          <p><strong>Datum objave:</strong> {kolekcija.datum_objave}</p>
        </div>
      </div>
      <div className="proizvodi-lista">
        <h2>Proizvodi u kolekciji:</h2>
        {kolekcija.proizvodi.map((proizvod) => (
          <div key={proizvod.id} className="proizvod-item">
            <img src={proizvod.slika} alt={proizvod.naziv} className="proizvod-slika" />
            <div>
              <h3>{proizvod.naziv}</h3>
              <p>{proizvod.opis}</p>
              <p><strong>Cena:</strong> {proizvod.cena} RSD</p>
              <p><strong>Dostupan:</strong> {proizvod.dostupan ? 'Da' : 'Ne'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KolekcijaDetalji;
