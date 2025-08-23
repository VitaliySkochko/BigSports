// Перша Ліга
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Subsections.css';
import bukovynaLogo from '../img/bukovynaLogo.png'; 
import viktoriyaLogo from '../img/viktoriyaLogo.png';
import agrobiznesLogo from '../img/agrobiznesLogo.png';
import lberigLogo from '../img/lberigLogo.png';
import yuksaLogo from '../img/yuksaLogo.png';
import ingulecLogo from '../img/ingulecLogo.png';
import vorsklaLogo from '../img/vorsklaLogo.png';
import podillyaLogo from '../img/podillyaLogo.png';
import chornomoretsLogo from '../img/chornomoretsLogo.jpg';
import metalistLogo from '../img/metalistLogo.png';
import nyvaLogo from '../img/nyvaLogo.png';
import fenixMariupolLogo from '../img/fenixMariupolLogo.png';
import probiyLogo from '../img/probiyLogo.jpeg'; 
import prykarpattiaLogo from '../img/prykarpattiaLogo.png';
import chernihivLogo from '../img/chernihivLogo.png';
import metalurhLogo from '../img/metalurhLogo.png';

const firstLeagueClubs = [
    { name: 'Ворскла', image: vorsklaLogo, link: '/football-ukraine/vorskla' },
    { name: 'Лівий Берег', image: lberigLogo, link: '/football-ukraine/lberig' },
    { name: 'Інгулець', image: ingulecLogo, link: '/football-ukraine/ingulec' },
    { name: 'Чорноморець', image: chornomoretsLogo, link: '/football-ukraine/chornomorets' },
    { name: 'Агробізнес', image: agrobiznesLogo, link: '/football-ukraine/agrobiznes' },
    { name: 'Металіст', image: metalistLogo, link: '/football-ukraine/metalist' },
    { name: 'Буковина', image: bukovynaLogo, link: '/football-ukraine/bukovyna'},
    { name: 'ЮКСА', image: yuksaLogo, link: '/football-ukraine/yuksa' },
    { name: 'Вікторія', image: viktoriyaLogo, link: '/football-ukraine/viktoriya'},
    { name: 'Прикарпаття', image: prykarpattiaLogo, link: '/football-ukraine/prykarpattia' },
    { name: 'Нива', image: nyvaLogo, link: '/football-ukraine/nyva' },
    { name: 'Фенікс-Маріуполь', image: fenixMariupolLogo, link: '/football-ukraine/fenix-mariupol' },
    { name: 'Поділля', image: podillyaLogo, link: '/football-ukraine/podillya' },
    { name: 'Пробій', image: probiyLogo, link: '/football-ukraine/probiy' },
    { name: 'Чернігів', image: chernihivLogo, link: '/football-ukraine/chernihiv' },
    { name: 'Металург', image: metalurhLogo, link: '/football-ukraine/metalurh' },
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
