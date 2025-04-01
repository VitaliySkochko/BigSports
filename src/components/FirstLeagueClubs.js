// Перша Ліга
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Subsections.css';
import bukovynaLogo from '../img/bukovynaLogo.png'; // додай логотипи у папку /img
import viktoriyaLogo from '../img/viktoriyaLogo.png';

const firstLeagueClubs = [
  { name: 'Буковина', image: bukovynaLogo, link: '/football-ukraine/bukovyna'},
  { name: 'Вікторія', image: viktoriyaLogo, link: '/football-ukraine/viktoriya'}
];

const FirstLeagueClubs = () => {
  return (
    <div className="subsections-container">
      {firstLeagueClubs.map((club) => (
        <Link to={club.link} key={club.name} className="subsection-item subsection-item-small">
          <img src={club.image} alt={club.name} className="subsection-image" />
          <span className="subsection-title">{club.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default FirstLeagueClubs;
