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
      <Link to="/world-football">Футбол Європи</Link>
      <Link to="/biathlon">Біатлон</Link>
      <Link to="/tournaments">Турніри</Link> 
      <Link to="/sports">Види спорту</Link> 
    </nav>
  );
};

export default Menu;


