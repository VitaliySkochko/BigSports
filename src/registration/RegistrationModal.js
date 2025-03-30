import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDocs, query, collection, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/RegistrationModal.css'; // Підключаємо стилі

const RegistrationModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordStrength('Пароль має містити мінімум 6 символів');
    } else {
      setPasswordStrength('');
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    if (password.length < 6) {
      setError('Пароль має містити мінімум 6 символів');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Некоректний формат email');
      return;
    }

    try {
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError('Ім\'я користувача вже зайнято');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        country,
        city,
        createdAt: new Date(),
        role: 'user',
      });

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
      setCountry('');
      setCity('');
      setError('');
      setPasswordStrength('');
      onClose();
      
      navigate('/');
    } catch (error) {
      console.error('Помилка при реєстрації: ', error);
      setError('Помилка при реєстрації: ' + error.message);
    }
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Реєстрація</h2>
        <form onSubmit={handleRegistration}>
          <input type="text" placeholder="Логін" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Пароль" value={password} onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value); }} required />
          <input type="password" placeholder="Повторіть пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <input type="text" placeholder="Країна" value={country} onChange={(e) => setCountry(e.target.value)} required />
          <input type="text" placeholder="Місто" value={city} onChange={(e) => setCity(e.target.value)} required />
          
          {passwordStrength && <p className="password-strength">{passwordStrength}</p>}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="register-button">Зареєструватися</button>
        </form>
      </div>
    </div>
  ) : null;
};

export default RegistrationModal;


