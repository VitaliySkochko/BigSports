// Друга Ліга

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Subsections.css';


//import someSecondClubLogo from '../img/someSecondClubLogo.png';


const secondLeagueClubs = [
  //{ name: 'Реал Фарма', image: someSecondClubLogo, link: '/football-ukraine/real-pharma' },
  //{ name: 'Нива Вінниця', image: someSecondClubLogo, link: '/football-ukraine/nyva-vinnytsia' },
];

const SecondLeagueClubs = () => (
  <div className="subsections-container">
    {secondLeagueClubs.map(club => (
      <Link to={club.link} key={club.name} className="subsection-item">
        <img src={club.image} alt={club.name} className="club-logo-small" />
        <span className="subsection-title">{club.name}</span>
      </Link>
    ))}
  </div>
);

export default SecondLeagueClubs;