// Друга Ліга

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Subsections.css';
import dinazLogo from '../img/dinazLogo.png';
import kreminLogo from '../img/kreminLogo.png';
import hirnykLogo from '../img/hirnykLogo.png';
import realPharmaLogo from '../img/realPharmaLogo.png'; 
import metalurhLogo from '../img/metalurhLogo.png';

const secondLeagueClubs = [
  { name: 'Металург', image: metalurhLogo, link: '/football-ukraine/metalurh' },
  { name: 'Діназ', image: dinazLogo, link: '/football-ukraine/dinaz' },
  { name: 'Кремінь', image: kreminLogo, link: '/football-ukraine/kremin' },
  { name: 'Гірник-Спорт', image: hirnykLogo, link: '/football-ukraine/hirnyk-sport' },
  { name: 'Реал Фарма', image: realPharmaLogo, link: '/football-ukraine/real-pharma' }
];

const SecondLeagueClubs = () => {
  return (
    <div className="subsections-container">
      {secondLeagueClubs.map(club => (
        <Link to={club.link} key={club.name} className="subsection-item"> 
          <img src={club.image} alt={club.name} className="club-logo-small" />
          <span className="subsection-title">{club.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default SecondLeagueClubs;
