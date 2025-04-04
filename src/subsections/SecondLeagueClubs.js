// Друга Ліга

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Subsections.css';
import chernihivLogo from '../img/chernihivLogo.png';
import hirnykLogo from '../img/hirnykLogo.png';

const secondLeagueClubs = [
  { name: 'Чернігів', image: chernihivLogo, link: '/football-ukraine/chernihiv' },
  { name: 'Гірник-Спорт', image: hirnykLogo, link: '/football-ukraine/hirnyk-sport' }
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