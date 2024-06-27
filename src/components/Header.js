/* Цей код представляє компонент Header на React, який відображає верхню частину веб-сторінки*/

import React, { useState } from 'react';
import PasswordModal from './PasswordModal';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePasswordSubmit = (password) => {
    if (password === 'Admin') {
      navigate('/admin');
    } else {
      alert('Неправильний пароль');
    }
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Site logo" className="logo" />
        <h1 className="site-title">UKRAINIANFOOTBALL</h1>
      </div>
      <button className="admin-button" onClick={handleAdminClick}>ADMIN</button>
      <PasswordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPasswordSubmit={handlePasswordSubmit}
      />
    </header>
  );
};

export default Header;






