import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Subsections.css';
import upl from '../img/upl.png';
import cupOfUkraineLogo from '../img/cupOfUkraineLogo.png';
import firstLeague from '../img/firstLeague.png';
import secondLeague from '../img/secondLeague.png';
import ukraine from '../img/ukraine.png';
import eplLogo from '../img/eplLogo.png'; 
import laLigaLogo from '../img/laLigaLogo.png'; 
import bundesligaLogo from '../img/bundesligaLogo.png'; 
import ligue1Logo from '../img/ligue1Logo.png'; 
import europeNewsLogo from '../img/europeNewsLogo.png';
import worldFootballLogo from '../img/worldFootballLogo.png'; 
import SeriaALogo from '../img/SeriaALogo.png';
import championsLeagueLogo from '../img/championsLeagueLogo.png'
import europaLeagueLogo from '../img/europaLeagueLogo.png'
import conferenceLeagueLogo from '../img/conferenceLeagueLogo.png'
import worldCupImage from '../img/worldCupImage.jpg'; 
import ibuCupImage from '../img/ibuCupImage.png'; 
import worldChampionshipImage from '../img/worldChampionshipImage.png'; 
import newsBiathlonImage from '../img/newsBiathlonImage.png'; 
import boxingImage from '../img/boxingImage.png'; 
import tennisImage from '../img/tennisImage.png'; 
import mmaImage from '../img/mmaImage.png'; 
import futsalImage from '../img/futsalImage.png'; 
import clubWorldCupImage from '../img/clubWorldCupImage.png' 


const footballUkraineSubsections =[
  { name: 'Українська Премєр Ліга', image: upl, link: '/football-ukraine/upl' },
  { name: 'Кубок України', image: cupOfUkraineLogo, link: '/football-ukraine/cup' },
  { name: 'Перша Ліга', image: firstLeague, link: '/football-ukraine/first-league' },
  { name: 'Друга Ліга', image: secondLeague, link: '/football-ukraine/second-league' },
  { name: 'Збірна України', image: ukraine, link: '/football-ukraine/zbirna' }
];

const championshipsSubsections = [
  { name: 'Європейські новини', image: europeNewsLogo, link: '/championships/europe-news' },
  { name: 'Світовий футбол', image: worldFootballLogo, link: '/world-football/global' },
  { name: 'Англійська Премʼєр-ліга', image: eplLogo, link: '/championships/epl' },
  { name: 'Іспанська Ла Ліга', image: laLigaLogo, link: '/championships/la-liga' },
  { name: 'Італійська Серія А', image: SeriaALogo, link: '/championships/seriaA' },
  { name: 'Німецька Бундесліга', image: bundesligaLogo, link: '/championships/bundesliga' },
  { name: 'Французька Ліга 1', image: ligue1Logo, link: '/championships/ligue1' }
];

const euroCupsSubsections = [
  { name: 'Ліга Чемпіонів', image: championsLeagueLogo, link: '/eurocups/champions-league' },
  { name: 'Ліга Європи', image: europaLeagueLogo, link: '/eurocups/europa-league' },
  { name: 'Ліга Конференцій', image: conferenceLeagueLogo, link: '/eurocups/conference-league' }
];


const biathlonSubsections = [
  { name: 'Новини', image: newsBiathlonImage, link: '/biathlon/news-biathlon' },
  { name: 'Кубок Світу', image: worldCupImage, link: '/biathlon/world-cup' },
  { name: 'Кубок IBU', image: ibuCupImage, link: '/biathlon/ibu-cup' },
  { name: 'Чемпіонат Світу', image: worldChampionshipImage, link: '/biathlon/world-championship' }
];

const sportsSubsections = [
  { name: 'Бокс', image: boxingImage, link: '/sports/boxing' },
  { name: 'Теніс', image: tennisImage, link: '/sports/tennis' },
  { name: 'MMA', image: mmaImage, link: '/sports/mma' },
  { name: 'Футзал', image: futsalImage, link: '/sports/futsal' },
];

const tournamentsSubsections = [
  { name: 'Клубний чемпіонат світу 2025', image: clubWorldCupImage, link: '/tournaments/club-world-cup-2025' },
];

const Subsections = ({category}) => {
  const categoryMap = {
    'Біатлон': biathlonSubsections,
    'Футбол України': footballUkraineSubsections,
    'Чемпіонати': championshipsSubsections,
    'Єврокубки': euroCupsSubsections,
    'Види спорту': sportsSubsections,
    'Турніри' : tournamentsSubsections,
  };
  
  const subsections = categoryMap[category] || [];
    
  return (
    <div className="subsections-container">
      {subsections.map((section) => (
        <Link to={section.link} key={section.name} className="subsection-item">
          <img src={section.image} alt={section.name} className="subsection-image" />
          <span className="subsection-title">{section.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Subsections;    
