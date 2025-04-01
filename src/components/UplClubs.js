// components/UplClubs.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Subsections.css';
import shakhtarLogo from '../img/shakhtarLogo.png';
import dynamoLogo from '../img/dynamoLogo.png';
import oleksandriyaLogo from '../img/oleksandriyaLogo.png';
import kryvbasLogo from '../img/kryvbasLogo.png';
import zoryaLogo from '../img/zoryaLogo.png';
import chornomoretsLogo from '../img/chornomoretsLogo.jpg';
import obolonLogo from '../img/obolonLogo.png';
import kolosLogo from '../img/kolosLogo.png';
import rukhLogo from '../img/rukhLogo.png';
import lnzLogo from '../img/lnzLogo.png';
import karpatyLogo from '../img/karpatyLogo.png';
import ingulecLogo from '../img/ingulecLogo.png';
import vorsklaLogo from '../img/vorsklaLogo.png';
import polissyaLogo from '../img/polissyaLogo.png';
import lberigLogo from '../img/lberigLogo.png';
import veresLogo from '../img/veresLogo.png';


const uplClubs = [
    { name: 'Шахтар', image: shakhtarLogo, link: '/football-ukraine/shakhtar' },
    { name: 'Динамо Київ', image: dynamoLogo, link: '/football-ukraine/dynamo' },
    { name: 'Олександрія', image: oleksandriyaLogo, link: '/football-ukraine/oleksandriya' },
    { name: 'Кривбас', image: kryvbasLogo, link: '/football-ukraine/kryvbas' },
    { name: 'Зоря', image: zoryaLogo, link: '/football-ukraine/zorya' },
    { name: 'Чорноморець', image: chornomoretsLogo, link: '/football-ukraine/chornomorets' },
    { name: 'Оболонь', image: obolonLogo, link: '/football-ukraine/obolon' },
    { name: 'Колос', image: kolosLogo, link: '/football-ukraine/kolos' },
    { name: 'Рух', image: rukhLogo, link: '/football-ukraine/rukh' },
    { name: 'ЛНЗ', image: lnzLogo, link: '/football-ukraine/lnz' },
    { name: 'Карпати', image: karpatyLogo, link: '/football-ukraine/karpaty' },
    { name: 'Інгулець', image: ingulecLogo, link: '/football-ukraine/ingulec' },
    { name: 'Ворскла', image: vorsklaLogo, link: '/football-ukraine/vorskla' },
    { name: 'Полісся', image: polissyaLogo, link: '/football-ukraine/polissya' },
    { name: 'Лівий Берег', image: lberigLogo, link: '/football-ukraine/lberig' },
    { name: 'Верес', image: veresLogo, link: '/football-ukraine/veres' }
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
