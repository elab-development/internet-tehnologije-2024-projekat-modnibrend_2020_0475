import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem('token');
        handleLogout();
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div>
        <Link className="navbar-button" to="/">Pocetna</Link>
      </div>
      <div>
        {!isLoggedIn ? (
          <>
            <Link className="navbar-button" to="/login">Login</Link>
            <Link className="navbar-button" to="/register">Register</Link>
          </>
        ) : (
          <button className="navbar-button" onClick={logout}>
            Odjavi se
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;