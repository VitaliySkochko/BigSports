/*Цей код є компонентом на React, який відображає навігаційне меню для сайту. 
Використовується бібліотека react-router-dom для роботи з маршрутизацією. */

import React from 'react';
import { NavLink } from 'react-router-dom'; // замість Link
import '../styles/Menu.css';

const Menu = () => {
  return (
    <nav className="menu">
      <NavLink to="/" end>ГОЛОВНА</NavLink>
      <NavLink to="/football-ukraine">ФУТБОЛ УКРАЇНИ</NavLink>
      <NavLink to="/championships">ЧЕМПІОНАТИ</NavLink> 
      <NavLink to="/eurocups">ЄВРОКУБКИ</NavLink> 
      <NavLink to="/biathlon">БІАТЛОН</NavLink>
      <NavLink to="/sports">ВИДИ СПОРТУ</NavLink>
      <NavLink to="/tournaments">ТУРНІРИ</NavLink>
    </nav>
  );
};

export default Menu;





