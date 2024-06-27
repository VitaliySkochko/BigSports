/*Цей код представляє компонент PasswordModal на React, який відображає модальне вікно для введення пароля. */

import React, { useState } from 'react';


const PasswordModal = ({ isOpen, onClose, onPasswordSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPasswordSubmit(password);
    setPassword('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Введіть пароль</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Вхід</button>
        </form>
        <button onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
};

export default PasswordModal;

