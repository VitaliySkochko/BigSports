import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import '../styles/Footer.css';

// Импортируйте иконки FontAwesome
import { FaInstagram, FaYoutube } from 'react-icons/fa'; // Додано іконку YouTube

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="BigSports Logo" />
        </div>
        <div className="footer-links">
          <Link to="/football-ukraine">Футбол України</Link>
          <Link to="/world-football">Футбол Європи</Link>
          <Link to="/biathlon">Біатлон</Link>
          <Link to="/sports">Спортивні новини</Link>
          <Link to="/tournaments">Турніри</Link>
        </div>
        <div className="footer-social">
          <p>Соціальні мережі:</p>
          <a href="https://www.instagram.com/bigsports_uk/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/@BigSPORTSTV" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube /> {/* Іконка YouTube */}
          </a>
        </div>
        <div className="footer-contact">
          <p>Пишіть нам: bigsportssait@gmail.com</p>
          <p>&copy; BigSports {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




