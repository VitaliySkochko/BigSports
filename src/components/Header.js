/* Цей код представляє компонент Header на React, який відображає верхню частину веб-сторінки*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import PasswordModal from './PasswordModal';
import RegistrationModal from './RegistrationModal';
import { auth, db } from '../firebase';
import logo from '../img/logo.png';
import { doc, getDoc } from 'firebase/firestore';
import SearchBar from './SearchBar'; 
import '../styles/Header.css';

const Header = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          console.log('User data:', docSnap.data()); 
        } else {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePasswordModalOpen = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordModalClose = () => {
    setIsPasswordModalOpen(false);
  };

  const handleRegistrationModalOpen = () => {
    setIsRegistrationModalOpen(true);
  };

  const handleRegistrationModalClose = () => {
    setIsRegistrationModalOpen(false);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      alert('Ви вийшли з профілю');
      setUserData(null);
    }).catch((error) => {
      console.error('Помилка при виході: ', error);
    });
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Site logo" className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }} />
        <h1 className="site-title">BigSPORTS</h1>
      </div>
      <SearchBar /> {/* Добавляем компонент поиска */}
      {userData ? (
        <div>
          <span>{userData.username}</span>
          {userData.role === 'admin' && (
            <button className="admin-button" onClick={() => navigate('/admin')}>Адмінпанель</button>
          )}
          <button className='exit-button' onClick={handleLogout}>Вихід</button>
        </div>
      ) : (
        <div>
          <button className="login-button" onClick={handlePasswordModalOpen}>Вхід</button>
          <button className="register-button" onClick={handleRegistrationModalOpen}>Реєстрація</button>
        </div>
      )}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={handlePasswordModalClose}
        onLoginSuccess={() => navigate('/profile')}
      />
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={handleRegistrationModalClose}
      />
    </header>
  );
};

export default Header;






