/*Цей код є компонентом на React, який відображає навігаційне меню для сайту. 
Використовується бібліотека react-router-dom для роботи з маршрутизацією. */

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css'

const Menu = () => {
  return (
    <nav className="menu">
      <Link to="/">ГОЛОВНА</Link>
      <Link to="/football-ukraine">ФУТБОЛ УКРАЇНИ</Link>
      <Link to="/world-football">ФУТБОЛ ЄВРОПИ</Link>
      <Link to="/biathlon">БІАТЛОН</Link>
      <Link to="/tournaments">ТУРНІРИ</Link> 
      <Link to="/sports">ВИДИ СПОРТУ</Link> 
    </nav>
  );
};

export default Menu;


