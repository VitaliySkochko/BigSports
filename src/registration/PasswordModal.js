import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import amplitude from '../amplitude';
import * as amplitudeLib from '@amplitude/analytics-browser';
import logo from '../img/logo.png';
import '../styles/RegistrationModal.css';

const PasswordModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setError('');
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const getFirebaseLoginError = (code) => {
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
        return 'Невірний логін або пароль';
      case 'auth/too-many-requests':
        return 'Забагато спроб входу. Спробуй пізніше';
      case 'auth/network-request-failed':
        return 'Помилка мережі. Перевір підключення до інтернету';
      default:
        return 'Не вдалося увійти. Спробуй ще раз';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password) {
      setError('Будь ласка, заповни всі поля');
      return;
    }

    try {
      setIsLoading(true);

      const q = query(collection(db, 'users'), where('username', '==', trimmedUsername));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Користувача не знайдено');
        amplitude.track('login_failed', {
          reason: 'user_not_found',
          username: trimmedUsername,
          time: new Date().toISOString(),
        });
        setIsLoading(false);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const email = userData.email;

      await signInWithEmailAndPassword(auth, email, password);

      amplitude.reset();
      amplitude.setUserId(userData.username);

      const identify = new amplitudeLib.Identify()
        .set('username', userData.username)
        .set('email', email)
        .set('role', userData.role);

      amplitude.identify(identify);

      amplitude.track('user_logged_in', {
        userId: userData.username,
        username: userData.username,
        email,
        role: userData.role,
        time: new Date().toISOString(),
      });

      if (onLoginSuccess) {
        onLoginSuccess(userDoc.id);
      }

      resetForm();
      onClose();
      navigate('/');
    } catch (error) {
      console.error('Помилка входу:', error);

      const readableMessage = getFirebaseLoginError(error.code);
      setError(readableMessage);

      amplitude.track('login_failed', {
        username: trimmedUsername,
        error: error.code || error.message,
        time: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="registration-modal-overlay" onClick={handleClose}>
      <div className="registration-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="registration-close-button"
          onClick={handleClose}
          aria-label="Закрити модальне вікно"
        >
          ×
        </button>

        <div className="registration-modal-header">
          <img src={logo} alt="BigSport" className="registration-logo" />
          <h2>Вхід</h2>
          <p>Увійди у свій акаунт BigSport, щоб перейти до профілю</p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="registration-input-group">
            <input
              type="text"
              placeholder="Логін"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="registration-input-group">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <div className="registration-message error">{error}</div>}

          <button
            type="submit"
            className={`register-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Вхід...' : 'Увійти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;