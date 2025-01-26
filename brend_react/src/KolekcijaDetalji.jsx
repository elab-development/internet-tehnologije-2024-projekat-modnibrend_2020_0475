import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './KolekcijaDetalji.css';
import Proizvod from './Proizvod';

const KolekcijaDetalji = () => {
  const { id } = useParams();
  const [kolekcija, setKolekcija] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fashionImages, setFashionImages] = useState([]);

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
        fetchFashionImages(data.proizvodi.length);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchFashionImages = async (count) => {
      try {
        const imagePromises = Array.from({ length: count }).map(() => 
          fetch(`https://api.unsplash.com/photos/random?query=fashion&client_id=6DBJ_LAazkBEfzQMoDLEIIrANJoWJvYsmJHq9Ud8wAw`).then((res) => {
            if (!res.ok) {
              throw new Error('Greška pri dohvatanju slike sa Unsplash-a.');
            }
            return res.json();
          })
        );
        const images = await Promise.all(imagePromises);
        setFashionImages(images.map((img) => img.urls.regular));
      } catch (error) {
        console.error(error.message);
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
        {fashionImages[0] ? (
          <img src={fashionImages[0]} alt="Fashion" className="kolekcija-slika" />
        ) : (
          <p>Učitavanje slike...</p>
        )}
        <div className="kolekcija-info">
          <h1>{kolekcija.naziv}</h1>
          <p>{kolekcija.opis}</p>
          <p><strong>Datum objave:</strong> {kolekcija.datum_objave}</p>
        </div>
      </div>
      <div className="proizvodi-lista">
        <h2>Proizvodi u kolekciji:</h2>
        {kolekcija.proizvodi.map((proizvod, index) => (
          <Proizvod
            key={proizvod.id}
            proizvod={proizvod}
            image={fashionImages[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default KolekcijaDetalji;
