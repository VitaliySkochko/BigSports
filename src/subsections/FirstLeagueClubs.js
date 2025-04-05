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
import metalist1925Logo from '../img/metalist1925Logo.png';
import metalistLogo from '../img/metalistLogo.png';
import nyvaLogo from '../img/nyvaLogo.png';
import fenixMariupolLogo from '../img/fenixMariupolLogo.png';
import metalurhLogo from '../img/metalurhLogo.png';
import prykarpattiaLogo from '../img/prykarpattiaLogo.png';
import dinazLogo from '../img/dinazLogo.png';
import minaiLogo from '../img/minaiLogo.png';

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
  
  { name: 'Металіст 1925', image: metalist1925Logo, link: '/football-ukraine/metalist1925' },
  { name: 'Металіст', image: metalistLogo, link: '/football-ukraine/metalist' },
  { name: 'Нива', image: nyvaLogo, link: '/football-ukraine/nyva' },
  { name: 'Фенікс-Маріуполь', image: fenixMariupolLogo, link: '/football-ukraine/fenix-mariupol' },
  { name: 'Металург', image: metalurhLogo, link: '/football-ukraine/metalurh' },
  { name: 'Прикарпаття', image: prykarpattiaLogo, link: '/football-ukraine/prykarpattia' },
  { name: 'Діназ', image: dinazLogo, link: '/football-ukraine/dinaz' },
  { name: 'Минай', image: minaiLogo, link: '/football-ukraine/minai' },
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
