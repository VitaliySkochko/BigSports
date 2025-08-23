// pages/Archive.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Subsections.css';


import minaiLogo from '../img/minaiLogo.png';
import kreminLogo from '../img/kreminLogo.png';

const oldClubs = [
  { name: 'Минай', image: minaiLogo, link: '/football-ukraine/minai' },
  { name: 'Кремінь', image: kreminLogo, link: '/football-ukraine/kremin' },
];

const Archive = () => {
  return (
    <div className="subsections-container">
      {oldClubs.map((club) => (
        <Link to={club.link} key={club.name} className="subsection-item">
          <img src={club.image} alt={club.name} className="club-logo-small" />
          <span className="subsection-title">{club.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Archive;
