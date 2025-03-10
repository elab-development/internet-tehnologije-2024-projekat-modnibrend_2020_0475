import React, { useState, useEffect } from 'react';
import './Kolekcije.css';
import { useNavigate } from 'react-router-dom';
import Kolekcija from './Kolekcija';
import { FaPlus } from 'react-icons/fa';

const Kolekcije = () => {
  const [kolekcije, setKolekcije] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newKolekcija, setNewKolekcija] = useState({
    naziv: '',
    opis: '',
    datum_objave: '',
    slika: '',
  });

  const role = localStorage.getItem('role');
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

  const handleAdd = async () => {
    if (!newKolekcija.naziv || !newKolekcija.opis || !newKolekcija.datum_objave || !newKolekcija.slika) {
      alert('Popunite sva polja!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/kolekcije', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newKolekcija),
      });
  
      if (!response.ok) {
        throw new Error('Greška pri dodavanju kolekcije.');
      }
  
      const responseData = await response.json();
      const novaKolekcija = responseData.kolekcija;
      setKolekcije([...kolekcije, novaKolekcija]);
      localStorage.setItem('kolekcije', JSON.stringify([...kolekcije, novaKolekcija]));
  
      setShowModal(false);
      setNewKolekcija({ naziv: '', opis: '', datum_objave: '', slika: '' }); // Reset form
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/kolekcije/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Greška pri brisanju kolekcije.');
      }
  
      const noveKolekcije = kolekcije.filter(k => k.id !== id);
      setKolekcije(noveKolekcije);
      localStorage.setItem('kolekcije', JSON.stringify(noveKolekcije));
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) {
    return <p>Učitavanje kolekcija...</p>;
  }

  return (
    <div className="kolekcije-container">
      <h1 className="kolekcije-title">Naše kolekcije</h1>
      {role === 'user' && (
        <div className="actions">
          <button className="add-btn" onClick={() => setShowModal(true)}>
            <FaPlus /> Dodaj kolekciju
          </button>
        </div>
      )}
      <div className="kolekcije-grid">
        {kolekcije.map((kolekcija) => (
          <Kolekcija
            key={kolekcija.id}
            kolekcija={kolekcija}
            onDetaljiClick={() => navigate(`/kolekcije/${kolekcija.id}`)}
            onDelete={handleDelete} 
          />
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Dodaj novu kolekciju</h2>
            <input
              type="text"
              placeholder="Naziv kolekcije"
              value={newKolekcija.naziv}
              onChange={(e) => setNewKolekcija({ ...newKolekcija, naziv: e.target.value })}
            />
            <textarea
              placeholder="Opis kolekcije"
              value={newKolekcija.opis}
              onChange={(e) => setNewKolekcija({ ...newKolekcija, opis: e.target.value })}
            />
            <input
              type="date"
              value={newKolekcija.datum_objave}
              onChange={(e) => setNewKolekcija({ ...newKolekcija, datum_objave: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL slike"
              value={newKolekcija.slika}
              onChange={(e) => setNewKolekcija({ ...newKolekcija, slika: e.target.value })}
            />
            <div className="modal-actions">
              <button className="save-btn" onClick={handleAdd}>Sačuvaj</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Otkaži</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kolekcije;
