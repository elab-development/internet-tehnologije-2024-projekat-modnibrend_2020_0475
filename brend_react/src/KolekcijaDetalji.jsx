import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './KolekcijaDetalji.css';
import Proizvod from './Proizvod';
import { FaChevronDown, FaEdit, FaPlus, FaSave, FaTimes } from 'react-icons/fa';

const exchangeRates = {
  EUR: 117.5,
  USD: 110,
  RSD: 1,
};

const KolekcijaDetalji = () => {
  const { id } = useParams();
  const [kolekcija, setKolekcija] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fashionImages, setFashionImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filterDostupan, setFilterDostupan] = useState(''); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currency, setCurrency] = useState('RSD');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [editForm, setEditForm] = useState({
    naziv: '',
    opis: '',
    datum_objave: '',
    slika: ''
  });

  const [newProduct, setNewProduct] = useState({
    naziv: '',
    opis: '',
    cena: '',
    kolekcija_id: id,
    slika: '',
    dostupan: true
  });

  const [editProductForm, setEditProductForm] = useState({
    naziv: '',
    opis: '',
    cena: '',
    kolekcija_id: id,
    slika: '',
    dostupan: true
  });

  const role = localStorage.getItem('role'); 

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
        setEditForm(data);

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

  const convertPrice = (price) => {
    if (!exchangeRates[currency]) return price;
    return (price / exchangeRates[currency]).toFixed(2); // Ispravljen proračun
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/kolekcije/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Greška pri izmeni kolekcije.');
      }

      const odgovor = await response.json();
      setKolekcija(odgovor.kolekcija);
      setShowEditModal(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.naziv || !newProduct.cena) {
      alert('Naziv i cena su obavezni!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/proizvodi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Greška pri dodavanju proizvoda.');
      }

      const odgovor = await response.json();
      setFilteredProducts([...filteredProducts, odgovor.proizvod]);
      setShowAddProductModal(false);
      setNewProduct({
        naziv: '',
        opis: '',
        cena: '',
        kolekcija_id: id,
        slika: '',
        dostupan: true
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleProductClick = (product) => {
    if (role !== 'admin') return;
    setSelectedProduct(product);
    setEditProductForm(product);
    setShowEditProductModal(true);
  };

  const handleEditProduct = async () => {
    if (!editProductForm.naziv || !editProductForm.cena) {
      alert('Naziv i cena su obavezni!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/proizvodi/${selectedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editProductForm),
      });

      if (!response.ok) {
        throw new Error('Greška pri ažuriranju proizvoda.');
      }

      const odgovor = await response.json();
      const updatedProduct = odgovor.proizvod;
      const updatedProducts = filteredProducts.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      setFilteredProducts(updatedProducts);
      setShowEditProductModal(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const handleDeleteProduct = async (id) => {
    if (role !== 'admin') return;

    if (!window.confirm('Da li ste sigurni da želite da obrišete ovaj proizvod?')) return;
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/proizvodi/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Greška pri brisanju proizvoda.');
      }
  
      setFilteredProducts(filteredProducts.filter((proizvod) => proizvod.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

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
          {role === 'admin' && (
              <>
                <button className="edit-button" onClick={() => setShowEditModal(true)}>
                  <FaEdit /> Izmeni kolekciju
                </button>
                <button className="add-product-button" onClick={() => setShowAddProductModal(true)}>
                  <FaPlus /> Dodaj proizvod
                </button>
            </>
          )}
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
          currency={currency}
          convertPrice={convertPrice}
          onClick={() => handleProductClick(proizvod)} 
          onDelete={handleDeleteProduct}
        />
      ))}
    </div>

      <div className="currency-selector" onClick={() => setShowDropdown(!showDropdown)}>
        <span>{currency} <FaChevronDown /></span>
        {showDropdown && (
          <ul className="currency-dropdown">
            {Object.keys(exchangeRates).map((cur) => (
              <li key={cur} onClick={() => { setCurrency(cur); setShowDropdown(false); }}>
                {cur}
              </li>
            ))}
          </ul>
        )}
      </div>

       {/* Modal za izmenu kolekcije */}
       {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Izmeni kolekciju</h2>
            <input
              type="text"
              placeholder="Naziv kolekcije"
              value={editForm.naziv}
              onChange={(e) => setEditForm({ ...editForm, naziv: e.target.value })}
            />
            <textarea
              placeholder="Opis kolekcije"
              value={editForm.opis}
              onChange={(e) => setEditForm({ ...editForm, opis: e.target.value })}
            />
            <input
              type="date"
              value={editForm.datum_objave}
              onChange={(e) => setEditForm({ ...editForm, datum_objave: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL slike"
              value={editForm.slika}
              onChange={(e) => setEditForm({ ...editForm, slika: e.target.value })}
            />
            <div className="modal-actions">
              <button className="save-btn" onClick={handleEdit}>
                <FaSave /> Sačuvaj
              </button>
              <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                <FaTimes /> Otkaži
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal za dodavanje proizvoda */}
      {showAddProductModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Dodaj novi proizvod</h2>
            <input
              type="text"
              placeholder="Naziv proizvoda"
              value={newProduct.naziv}
              onChange={(e) => setNewProduct({ ...newProduct, naziv: e.target.value })}
            />
            <textarea
              placeholder="Opis proizvoda"
              value={newProduct.opis}
              onChange={(e) => setNewProduct({ ...newProduct, opis: e.target.value })}
            />
            <input
              type="number"
              placeholder="Cena"
              value={newProduct.cena}
              onChange={(e) => setNewProduct({ ...newProduct, cena: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL slike"
              value={newProduct.slika}
              onChange={(e) => setNewProduct({ ...newProduct, slika: e.target.value })}
            />
            <label>
              <input
                type="checkbox"
                checked={newProduct.dostupan}
                onChange={(e) => setNewProduct({ ...newProduct, dostupan: e.target.checked })}
              />
              Dostupan
            </label>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleAddProduct}>
                <FaSave /> Sačuvaj
              </button>
              <button className="cancel-btn" onClick={() => setShowAddProductModal(false)}>
                <FaTimes /> Otkaži
              </button>
            </div>
          </div>
        </div>
      )}

       {/* Modal za izmenu proizvoda */}
       {showEditProductModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Izmeni proizvod</h2>
            <input
              type="text"
              placeholder="Naziv proizvoda"
              value={editProductForm.naziv}
              onChange={(e) => setEditProductForm({ ...editProductForm, naziv: e.target.value })}
            />
            <textarea
              placeholder="Opis proizvoda"
              value={editProductForm.opis}
              onChange={(e) => setEditProductForm({ ...editProductForm, opis: e.target.value })}
            />
            <input
              type="number"
              placeholder="Cena"
              value={editProductForm.cena}
              onChange={(e) => setEditProductForm({ ...editProductForm, cena: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL slike"
              value={editProductForm.slika}
              onChange={(e) => setEditProductForm({ ...editProductForm, slika: e.target.value })}
            />
            <label>
              <input
                type="checkbox"
                checked={editProductForm.dostupan}
                onChange={(e) => setEditProductForm({ ...editProductForm, dostupan: e.target.checked })}
              />
              Dostupan
            </label>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleEditProduct}>
                <FaSave /> Sačuvaj
              </button>
              <button className="cancel-btn" onClick={() => setShowEditProductModal(false)}>
                <FaTimes /> Otkaži
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KolekcijaDetalji;
