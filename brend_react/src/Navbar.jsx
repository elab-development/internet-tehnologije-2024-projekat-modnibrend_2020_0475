import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');

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
          <>
            {role == 'admin' && (
              <Link className="navbar-button" to="/admin">Admin dashboard</Link>
            )}
            <button className="navbar-button" onClick={logout}>
              Odjavi se
            </button>
          </>
  
        )}
      </div>
    </nav>
  );
}

export default Navbar;
