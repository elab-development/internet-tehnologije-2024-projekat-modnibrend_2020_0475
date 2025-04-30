import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { FaUserEdit, FaChartBar } from 'react-icons/fa';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState(null);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
    }
    fetchUsers();
    fetchStatistics();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Greška pri dohvatanju korisnika.');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/statistics', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Greška pri dohvatanju statistike.');
      const data = await response.json();
      setStatistics(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await fetch(`http://localhost:8000/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });
      fetchUsers();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='page-container'>
        <div className="admin-dashboard-container">
            <h1>Admin Dashboard</h1>
            {loading ? (
                <p>Učitavanje...</p>
            ) : (
                <>
                {statistics ? (
        <>
        <div className='stats-container'>
        
        <div className="stats-section">
            <h2>Broj korisnika po ulozi</h2>
            <Pie
              data={{
                labels: statistics.userRoles.map((r) => r.role),
                datasets: [
                  {
                    data: statistics.userRoles.map((r) => r.count),
                    backgroundColor: ['#ff9800', '#03a9f4'],
                  },
                ],
              }}
            />
          </div>

          <div className="stats-section">
            <h2>Broj dostupnih i nedostupnih proizvoda</h2>
            <Pie
              data={{
                labels: ['Dostupni', 'Nedostupni'],
                datasets: [
                  {
                    data: [statistics.availableProducts, statistics.unavailableProducts],
                    backgroundColor: ['#4caf50', '#f44336'],
                  },
                ],
              }}
            />
          </div>

          <div className="stats-section">
            <h2>Broj proizvoda u svakoj kolekciji</h2>
            <Bar
              data={{
                labels: statistics.productsPerCollection.map((c) => c.naziv),
                datasets: [
                  {
                    label: 'Broj proizvoda',
                    data: statistics.productsPerCollection.map((c) => c.proizvodi_count),
                    backgroundColor: '#4caf50',
                  },
                ],
              }}
            />
          </div>

          <div className="stats-section">
            <h2>Kolekcije po mesecima</h2>
            <Line
              data={{
                labels: statistics.collectionsByMonth.map((m) => m.month),
                datasets: [
                  {
                    label: 'Broj kolekcija',
                    data: statistics.collectionsByMonth.map((m) => m.count),
                    backgroundColor: '#03a9f4',
                    borderColor: '#03a9f4',
                  },
                ],
              }}
            />
          </div>

          <div className="stats-section">
            <h2>Broj kolekcija</h2>
            <p>{statistics.totalCollections}</p>
          </div>

          <div className="stats-section">
            <h2>Ukupna vrednost svih proizvoda</h2>
            <p>{statistics.totalProductValue} RSD</p>
          </div>

        </div>
          
        </>
      ) : (
        <p>Učitavanje...</p>
      )}
                <div className="users-section">
                    <h2>Korisnici</h2>
                    <table>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Ime</th>
                        <th>Email</th>
                        <th>Uloga</th>
                        <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                            <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            </td>
                            <td>
                            <button className="edit-btn">
                                <FaUserEdit /> Izmeni
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </>
            )}
        </div>
    </div>
    
  );
};

export default AdminDashboard;
