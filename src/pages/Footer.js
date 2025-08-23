// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import SocialLinks from '../components/SocialLinks';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Логотип */}
        <div className="footer-logo">
          <img src={logo} alt="BigSports Logo" />
        </div>

        {/* Навігація */}
        <div className="footer-links">
          <Link to="/">Головна</Link>
          <Link to="/football-ukraine">Футбол України</Link>
          <Link to="/championships">Чемпіонати</Link>
          <Link to="/eurocups">Єврокубки</Link>
          <Link to="/biathlon">Біатлон</Link>
          <Link to="/sports">Види спорту</Link>
          <Link to="/tournaments">Турніри</Link> 
          <Link to="/archive">Архів</Link> {/* ✅ Додано */}
        </div>

        {/* Соцмережі */}
        <div className="footer-social">
          <p>Соціальні мережі:</p>
          <SocialLinks />
        </div>

        <div className='footer-links'>
          <Link to="/about">Про сайт</Link>
          <Link to="/contacts">Контакти</Link>
          <Link to="/privacy-policy">Політика конфіденційності</Link>
        </div>

        {/* Контакти */}
        <div className="footer-contact">
          <p>Пишіть нам: <a href="mailto:bigsportssait@gmail.com">bigsportssait@gmail.com</a></p>
          <p>&copy; BigSport {new Date().getFullYear()}</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
