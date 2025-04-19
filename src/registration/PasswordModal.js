/*Цей код представляє компонент PasswordModal на React, який відображає модальне вікно для введення пароля. */

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import amplitude from '../amplitude';
import * as amplitudeLib from '@amplitude/analytics-browser'; // Додано для Identify

const PasswordModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Пошук користувача за username
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Користувача не знайдено');
        amplitude.track('login_failed', { reason: 'user_not_found', username });
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const email = userDoc.data().email;

      // Авторизація
      await signInWithEmailAndPassword(auth, email, password);

      // 🔄 Очистити guest-сесію
      amplitude.reset();

      // 🔐 Встановити нового користувача
      amplitude.setUserId(userDoc.id);

      const identify = new amplitudeLib.Identify()
        .set('username', userDoc.data().username)
        .set('email', email)
        .set('role', userDoc.data().role);

      amplitude.identify(identify);

      // 📩 Надіслати подію входу
      amplitude.track('user_logged_in', {
        userId: userDoc.id,
        username: userDoc.data().username,
        email: email,
        role: userDoc.data().role,
        time: new Date().toISOString(),
      });

      onLoginSuccess(userDoc.id);
      onClose();
      navigate('/');
    } catch (error) {
      setError(`Помилка входу: ${error.message}`);

      amplitude.track('login_failed', {
        username,
        error: error.message,
        time: new Date().toISOString(),
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Вхід</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Логін"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="profile-button">Увійти</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;




