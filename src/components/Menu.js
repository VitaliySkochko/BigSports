/*Цей код є компонентом на React, який відображає навігаційне меню для сайту. 
Використовується бібліотека react-router-dom для роботи з маршрутизацією. */

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css'

const Menu = () => {
  return (
    <nav className="menu">
      <Link to="/">Головна</Link>
      <Link to="/football-ukraine">Футбол України</Link>
      <Link to="/world-football">Світовий Футбол</Link>
      <Link to="/boxing">Бокс</Link>
      <Link to="/tennis">Теніс</Link>
      <Link to="/biathlon">Біатлон</Link>
    </nav>
  );
};

export default Menu;


