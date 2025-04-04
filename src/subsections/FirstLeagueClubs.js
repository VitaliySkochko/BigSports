// Перша Ліга
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Subsections.css';
import bukovynaLogo from '../img/bukovynaLogo.png'; 
import viktoriyaLogo from '../img/viktoriyaLogo.png';
import agrobiznesLogo from '../img/agrobiznesLogo.png';
import epitsenterLogo from '../img/epitsenterLogo.png';
import kreminLogo from '../img/kreminLogo.png';
import yuksaLogo from '../img/yuksaLogo.png';
import poltavaLogo from '../img/poltavaLogo.png';
import kudrivkaLogo from '../img/kudrivkaLogo.png';
import podillyaLogo from '../img/podillyaLogo.png';

const firstLeagueClubs = [
  { name: 'Буковина', image: bukovynaLogo, link: '/football-ukraine/bukovyna'},
  { name: 'Вікторія', image: viktoriyaLogo, link: '/football-ukraine/viktoriya'},
  { name: 'Агробізнес', image: agrobiznesLogo, link: '/football-ukraine/agrobiznes' },
  { name: 'Епіцентр', image: epitsenterLogo, link: '/football-ukraine/epitsenter' },
  { name: 'Кремінь', image: kreminLogo, link: '/football-ukraine/kremin' },
  { name: 'ЮКСА', image: yuksaLogo, link: '/football-ukraine/yuksa' },
  { name: 'Полтава', image: poltavaLogo, link: '/football-ukraine/poltava' },
  { name: 'Кудрівка', image: kudrivkaLogo, link: '/football-ukraine/kudrivka' },
  { name: 'Поділля', image: podillyaLogo, link: '/football-ukraine/podillya' },
];

const FirstLeagueClubs = () => {
  return (
    <div className="subsections-container">
      {firstLeagueClubs.map((club) => (
        <Link to={club.link} key={club.name} className="subsection-item subsection-item-small">
          <img src={club.image} alt={club.name} className="club-logo-small" />
          <span className="subsection-title">{club.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default FirstLeagueClubs; 
