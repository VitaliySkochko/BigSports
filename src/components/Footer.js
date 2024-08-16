import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="BigSports Logo" />
        </div>
        <div className="footer-links">
          <Link to="/football-ukraine">Футбол України</Link>
          <Link to="/world-football">Світовий футбол</Link>
          <Link to="/boxing">Бокс</Link>
          <Link to="/tennis">Теніс</Link>
          <Link to="/biathlon">Біатлон</Link>
        </div>
        <div className="footer-contact">
          <p>Пишіть нам: bigsportssait@gmail.com</p>
          <p>Всі права на матеріали, що знаходяться на сайті охороняються відповідно до законодавства України.</p>
          <p>&copy; BigSports {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


