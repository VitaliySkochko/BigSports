// components/UplClubs.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Subsections.css';
import shakhtarLogo from '../img/shakhtarLogo.png';
import dynamoLogo from '../img/dynamoLogo.png';
import oleksandriyaLogo from '../img/oleksandriyaLogo.png';
import kryvbasLogo from '../img/kryvbasLogo.png';
import zoryaLogo from '../img/zoryaLogo.png';
import obolonLogo from '../img/obolonLogo.png';
import kolosLogo from '../img/kolosLogo.png';
import rukhLogo from '../img/rukhLogo.png';
import lnzLogo from '../img/lnzLogo.png';
import karpatyLogo from '../img/karpatyLogo.png';
import polissyaLogo from '../img/polissyaLogo.png';
import veresLogo from '../img/veresLogo.png';
import epitsenterLogo from '../img/epitsenterLogo.png';
import poltavaLogo from '../img/poltavaLogo.png';
import kudrivkaLogo from '../img/kudrivkaLogo.png';
import metalist1925Logo from '../img/metalist1925Logo.png';


const uplClubs = [
    { name: 'Динамо Київ', image: dynamoLogo, link: '/football-ukraine/dynamo' },
    { name: 'Олександрія', image: oleksandriyaLogo, link: '/football-ukraine/oleksandriya' },   
    { name: 'Шахтар', image: shakhtarLogo, link: '/football-ukraine/shakhtar' },
    { name: 'Полісся', image: polissyaLogo, link: '/football-ukraine/polissya' },    
    { name: 'Кривбас', image: kryvbasLogo, link: '/football-ukraine/kryvbas' },
    { name: 'Карпати', image: karpatyLogo, link: '/football-ukraine/karpaty' },
    { name: 'Зоря', image: zoryaLogo, link: '/football-ukraine/zorya' },
    { name: 'Рух', image: rukhLogo, link: '/football-ukraine/rukh' },
    { name: 'Верес', image: veresLogo, link: '/football-ukraine/veres' },
    { name: 'Колос', image: kolosLogo, link: '/football-ukraine/kolos' },
    { name: 'Оболонь', image: obolonLogo, link: '/football-ukraine/obolon' },
    { name: 'ЛНЗ', image: lnzLogo, link: '/football-ukraine/lnz' },
    { name: 'Епіцентр', image: epitsenterLogo, link: '/football-ukraine/epitsenter' },
    { name: 'Полтава', image: poltavaLogo, link: '/football-ukraine/poltava' },
    { name: 'Металіст 1925', image: metalist1925Logo, link: '/football-ukraine/metalist1925' },
    { name: 'Кудрівка', image: kudrivkaLogo, link: '/football-ukraine/kudrivka' }, 
];

const UplClubs = () => {
  return (
    <div className="subsections-container">
      {uplClubs.map((club) => (
        <Link to={club.link} key={club.name} className="subsection-item">
          <img src={club.image} alt={club.name} className="club-logo-small" />
          <span className="subsection-title">{club.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default UplClubs;
