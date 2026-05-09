import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDocs, query, collection, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { identifyUser, trackEvent } from '../amplitude';
import logo from '../img/logo.png';
import '../styles/RegistrationModal.css';

const RegistrationModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUsername('');
    setCountry('');
    setCity('');
    setError('');
    setPasswordStrength('');
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validatePassword = (value) => {
    if (value.length === 0) {
      setPasswordStrength('');
      return;
    }

    if (value.length < 6) {
      setPasswordStrength('Пароль має містити мінімум 6 символів');
      return;
    }

    if (value.length < 8) {
      setPasswordStrength('Середній пароль. Для кращого захисту додай більше символів');
      return;
    }

    setPasswordStrength('Надійний пароль');
  };

  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Цей email уже використовується';
      case 'auth/invalid-email':
        return 'Некоректний формат email';
      case 'auth/weak-password':
        return 'Пароль занадто слабкий';
      case 'auth/network-request-failed':
        return 'Помилка мережі. Перевір підключення до інтернету';
      default:
        return 'Не вдалося завершити реєстрацію. Спробуй ще раз';
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedCountry = country.trim();
    const trimmedCity = city.trim();

    if (!trimmedUsername || !trimmedEmail || !password || !confirmPassword || !trimmedCountry || !trimmedCity) {
      setError('Будь ласка, заповни всі поля');
      return;
    }

    if (trimmedUsername.length < 3) {
      setError('Логін має містити мінімум 3 символи');
      return;
    }

    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      trackEvent('registration_failed', {
        reason: 'passwords_do_not_match',
        username: trimmedUsername,
        email: trimmedEmail,
      });
      return;
    }

    if (password.length < 6) {
      setError('Пароль має містити мінімум 6 символів');
      trackEvent('registration_failed', {
        reason: 'weak_password',
        username: trimmedUsername,
        email: trimmedEmail,
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setError('Некоректний формат email');
      trackEvent('registration_failed', {
        reason: 'invalid_email_format',
        username: trimmedUsername,
        email: trimmedEmail,
      });
      return;
    }

    try {
      setIsLoading(true);

      const q = query(collection(db, 'users'), where('username', '==', trimmedUsername));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError("Ім'я користувача вже зайнято");
        trackEvent('registration_failed', {
          reason: 'username_taken',
          username: trimmedUsername,
          email: trimmedEmail,
        });
        setIsLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        username: trimmedUsername,
        email: trimmedEmail,
        country: trimmedCountry,
        city: trimmedCity,
        createdAt: new Date(),
        role: 'user',
      });

      identifyUser(user.uid, {
  username: trimmedUsername,
  country: trimmedCountry,
  city: trimmedCity,
  role: 'user',
});

      trackEvent('user_registered', {
        userId: user.uid,
        username: trimmedUsername,
        email: trimmedEmail,
        country: trimmedCountry,
        city: trimmedCity,
        time: new Date().toISOString(),
      });

      resetForm();
      onClose();
      navigate('/');
    } catch (error) {
      console.error('Помилка при реєстрації:', error);

      const readableMessage = getFirebaseErrorMessage(error.code);
      setError(readableMessage);

      trackEvent('registration_failed', {
        reason: error.code || error.message,
        username: trimmedUsername,
        email: trimmedEmail,
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
          <h2>Створити акаунт</h2>
          <p>Приєднуйся до BigSport та отримай доступ до персонального профілю</p>
        </div>

        <form className="registration-form" onSubmit={handleRegistration}>
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="registration-input-group">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="registration-input-group">
            <input
              type="password"
              placeholder="Повторіть пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="registration-row">
            <div className="registration-input-group">
              <input
                type="text"
                placeholder="Країна"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                autoComplete="country-name"
                required
              />
            </div>

            <div className="registration-input-group">
              <input
                type="text"
                placeholder="Місто"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoComplete="address-level2"
                required
              />
            </div>
          </div>

          {passwordStrength && (
            <div
              className={`registration-message ${
                passwordStrength === 'Надійний пароль' ? 'success' : 'warning'
              }`}
            >
              {passwordStrength}
            </div>
          )}

          {error && <div className="registration-message error">{error}</div>}

          <button
            type="submit"
            className={`register-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;