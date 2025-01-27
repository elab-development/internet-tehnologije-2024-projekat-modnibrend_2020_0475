import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './KolekcijaDetalji.css';
import Proizvod from './Proizvod';

const KolekcijaDetalji = () => {
  const { id } = useParams();
  const [kolekcija, setKolekcija] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fashionImages, setFashionImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Stanje za pretragu
  const [filterDostupan, setFilterDostupan] = useState(''); // Stanje za filtriranje
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtrirani proizvodi

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

  useEffect(() => {
    const fetchFashionImages = async () => {
      if (!kolekcija || !kolekcija.proizvodi) return;

      try {
        const imagePromises = kolekcija.proizvodi.map(() =>
          fetch(
            `https://api.unsplash.com/photos/random?query=fashion&client_id=eiu2rLI_TjM26ST5_V2C1kl_eAkFTc3nNjw7dR1ziJY`
          ).then((res) => {
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

    if (kolekcija) {
      fetchFashionImages();
    }
  }, [kolekcija]);

  // Filtriranje proizvoda na osnovu pretrage i dostupnosti
  useEffect(() => {
    if (!kolekcija || !kolekcija.proizvodi) return;

    let filtered = kolekcija.proizvodi;

    if (searchTerm) {
      filtered = filtered.filter((proizvod) =>
        proizvod.naziv.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterDostupan === 'dostupan') {
      filtered = filtered.filter((proizvod) => proizvod.dostupan);
    } else if (filterDostupan === 'nedostupan') {
      filtered = filtered.filter((proizvod) => !proizvod.dostupan);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, filterDostupan, kolekcija]);

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
          <p>
            <strong>Datum objave:</strong> {kolekcija.datum_objave}
          </p>
        </div>
      </div>

      {/* Pretraga i filtriranje */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Pretraži proizvode..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterDostupan}
          onChange={(e) => setFilterDostupan(e.target.value)}
          className="filter-select"
        >
          <option value="">Svi proizvodi</option>
          <option value="dostupan">Dostupni</option>
          <option value="nedostupan">Nedostupni</option>
        </select>
      </div>

      <div className="proizvodi-lista">
        <h2>Proizvodi u kolekciji:</h2>
        {filteredProducts.map((proizvod, index) => (
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
