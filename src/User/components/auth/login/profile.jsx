// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Ensure to style it
import Navigation from '../../HomePage/Navbar/Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState('Account Settings');
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          withCredentials: true,
        });
        console.log(response.data);
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data || 'Failed to fetch user profile'); // Display error message
      }
    };

    fetchUserProfile();
  }, []);


  const handleEditClick = (field) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const renderSection = () => {

    switch (selectedSection) {
      case 'Account Settings':
        return (
          <>

            <div className="dashboard-content">
              <h2>Hello, {user ? user.name : 'User'}!</h2>
              <form className="user-form">
                <div>
                  <label>Name:</label>
                  <input type="text" value={user?.name || ''} readOnly />
                </div>
                <div>
                  <label>Email:</label>
                  <input type="email" value={user?.email || ''} readOnly />
                </div>
                <div>
                  <label>Phone:</label>
                  <input type="text" value={user?.phone || ''} readOnly />
                </div>
                <button type="button" className="edit-profile-btn">Edit Profile</button>
              </form>
            </div>
          </>
        );
      case 'My Orders':
        return <div>My Orders Section</div>;
      case 'Wishlist':
        return <div>Wishlist Section</div>;
      case 'Payments':
        return <div>Payments Section</div>;
      case 'Logout':
        return <button className="logout-btn" onClick={() => {/* handle logout */ }}>Logout</button>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="profile page">
        <Navigation />
        <div className="profile-container">
          <aside className="sidebar">
            <ul>
              <li onClick={() => setSelectedSection('Account Settings')}>Account Settings</li>
              <li onClick={() => setSelectedSection('My Orders')}>My Orders</li>
              <li onClick={() => setSelectedSection('Wishlist')}>Wishlist</li>
              <li onClick={() => setSelectedSection('Payments')}>Payments</li>
              <li onClick={() => setSelectedSection('Logout')}>Logout</li>
            </ul>
          </aside>
          <main className="dashboard">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {renderSection()}
          </main>
        </div>
      </div>
    </>
  );
};

export default Profile;
