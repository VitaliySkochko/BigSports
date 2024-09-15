/*Цей код представляє компонент PasswordModal на React, який відображає модальне вікно для введення пароля. */

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 
import '../styles/PasswordModal.css'

const PasswordModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Создаем экземпляр navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Найти пользователя по имени
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setError('Пользователь не найден');
        return;
      }
      
      // Получить email из базы данных
      const userDoc = querySnapshot.docs[0];
      const email = userDoc.data().email;

      // Попробовать войти по email и паролю
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(userDoc.id); // id пользователя
      onClose();
      navigate('/'); // Перенаправляем на главную страницу
    } catch (error) {
      setError(`Ошибка при входе: ${error.message}`);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
          <button type="submit">Увійти</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
};

export default PasswordModal;

