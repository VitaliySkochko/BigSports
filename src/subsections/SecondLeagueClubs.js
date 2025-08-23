// Друга Ліга

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Subsections.css';
import dinazLogo from '../img/dinazLogo.png';
import hirnykLogo from '../img/hirnykLogo.png';
import realPharmaLogo from '../img/realPharmaLogo.png';
import lokomotivLogo from '../img/lokomotivLogo.png'; 
import lisneLogo from '../img/lisneLogo.png'; 
import skalaLogo from '../img/skala1911Logo.jpg'; 
import uzhorodLogo from '../img/uzhorodLogo.png';
 


const secondLeagueClubs = [
  { name: 'Діназ', image: dinazLogo, link: '/football-ukraine/dinaz' },
  { name: 'Гірник-Спорт', image: hirnykLogo, link: '/football-ukraine/hirnyk-sport' },
  { name: 'Реал Фарма', image: realPharmaLogo, link: '/football-ukraine/real-pharma' },
  { name: 'Локомотив', image: lokomotivLogo, link: '/football-ukraine/lokomotiv' },
  { name: 'Лісне', image: lisneLogo, link: '/football-ukraine/lisne' },
  { name: 'Скала 1911', image: skalaLogo, link: '/football-ukraine/skala-1911' },
   { name: 'ФК Ужгород', image: uzhorodLogo, link: '/football-ukraine/uzhorod' }   
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
