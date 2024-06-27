/*Цей код є компонентом на React, який відображає навігаційне меню для сайту. 
Використовується бібліотека react-router-dom для роботи з маршрутизацією. */

import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="menu">
      <Link to="/">Головна</Link>
      <Link to="/upl">УПЛ</Link>
      <Link to="/first-league">Перша Ліга</Link>
      <Link to="/second-league">Друга Ліга</Link>
      <Link to="/national-team">Збірна</Link>
      <Link to="/euro-cups">Єврокубки</Link>
    </nav>
  );
};

export default Menu;


