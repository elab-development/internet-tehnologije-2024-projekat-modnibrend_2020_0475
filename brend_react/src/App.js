import './App.css';
import Login from './Login';
import Pocetna from './Pocetna';
import Register from './Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Kolekcije from './Kolekcije';
import KolekcijaDetalji from './KolekcijaDetalji';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/kolekcije" element={<Kolekcije />} />
          <Route path="/kolekcije/:id" element={<KolekcijaDetalji />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register handleLogin={handleLogin} />} />
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
