import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import SocialLinks from '../components/SocialLinks';
import '../styles/Footer.css';

const Footer = () => {
  const startYear = 2025;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Логотип */}
        <div className="footer-logo">
          <img src={logo} alt="BigSport Logo" />
        </div>

        {/* Основна навігація */}
        <div className="footer-links">
          <Link to="/">Головна</Link>
          <Link to="/football-ukraine">Футбол України</Link>
          <Link to="/championships">Чемпіонати</Link>
          <Link to="/eurocups">Єврокубки</Link>
          <Link to="/biathlon">Біатлон</Link>
          <Link to="/sports">Види спорту</Link>
          <Link to="/tournaments">Турніри</Link>
        </div>

        {/* Соціальні мережі (Instagram / YouTube / LinkedIn) */}
        <div className="footer-social">
          <p>Соціальні мережі:</p>
          <SocialLinks />
        </div>

        {/* Інформаційні сторінки */}
        <div className="footer-links">
          <Link to="/about">Про сайт</Link>
          <Link to="/authors-ranking" className="footer-ranking-btn">
            Рейтинг авторів
          </Link>
          <Link to="/archive">Архів</Link>
          <Link to="/contacts">Контакти</Link>
          <Link to="/privacy-policy">Політика конфіденційності</Link>
        </div>

        {/* Контакти та копірайт */}
        <div className="footer-contact">
          <p>
            Пишіть нам:{' '}
            <a href="mailto:bigsportssait@gmail.com">
              bigsportssait@gmail.com
            </a>
          </p>

          <p>
            &copy; BigSport {startYear}
            {currentYear > startYear && `–${currentYear}`}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
