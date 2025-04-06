import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDocs, query, collection, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/RegistrationModal.css';
import amplitude from '../amplitude'; // ✅ Підключаємо Amplitude

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
      amplitude.track('registration_failed', {
        reason: 'passwords_do_not_match',
        username,
        email,
      });
      return;
    }

    if (password.length < 6) {
      setError('Пароль має містити мінімум 6 символів');
      amplitude.track('registration_failed', {
        reason: 'weak_password',
        username,
        email,
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Некоректний формат email');
      amplitude.track('registration_failed', {
        reason: 'invalid_email_format',
        username,
        email,
      });
      return;
    }

    try {
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError('Ім\'я користувача вже зайнято');
        amplitude.track('registration_failed', {
          reason: 'username_taken',
          username,
          email,
        });
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

      // ✅ Подія успішної реєстрації
      amplitude.track('user_registered', {
        userId: user.uid,
        username,
        email,
        country,
        city,
        time: new Date().toISOString(),
      });

      // Очистка полів
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

      // ❌ Подія помилки реєстрації
      amplitude.track('registration_failed', {
        reason: error.message,
        username,
        email,
      });
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



