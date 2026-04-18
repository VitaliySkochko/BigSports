import React from 'react';
import { useNews } from '../components/NewsContext';
import GeneralNewsList from '../newslist/GeneralNewsList';
import FeaturedNewsBlock from '../newslist/FeaturedNewsBlock';
import SportNewsFeed from '../newslist/SportNewsFeed';
import PopularNewsSlider from '../newslist/PopularNewsSlider';
import TournamentAutoSlider from '../newslist/TournamentAutoSlider';
import AllUkraineClubsSlider from '../newslist/AllUkraineClubsSlider';
import HorizontalSectionNewsSlider from '../newslist/HorizontalSectionNewsSlider';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

import LeagueNewsFeed from '../newslist/LeagueNewsFeed';

import eplLogo from '../img/eplLogo.png';
import laLigaLogo from '../img/laLigaLogo.png';
import bundesligaLogo from '../img/bundesligaLogo.png';
import ligue1Logo from '../img/ligue1Logo.png';
import SeriaALogo from '../img/SeriaALogo.png';

import WorldCup2026Image from '../img/WorldCup2026Image.png';
import FutsalEuro2026Image from '../img/futsalEuro2026.png';
import clubWorldCupImage from '../img/clubWorldCupImage.png';

/* UPL */
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

/* First League */
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

/* Second League */
import dinazLogo from '../img/dinazLogo.png';
import hirnykLogo from '../img/hirnykLogo.png';
import realPharmaLogo from '../img/realPharmaLogo.png';
import lokomotivLogo from '../img/lokomotivLogo.png';
import lisneLogo from '../img/lisneLogo.png';
import skalaLogo from '../img/skala1911Logo.jpg';
import uzhorodLogo from '../img/uzhorodLogo.png';

const tournamentsSubsections = [
  { name: 'Чемпіонат світу 2026', image: WorldCup2026Image, link: '/tournaments/world-cup-2026' },
  { name: 'Чемпіонат Європи з футзалу 2026', image: FutsalEuro2026Image, link: '/tournaments/futsal-euro-2026' },
  { name: 'Клубний чемпіонат світу 2025', image: clubWorldCupImage, link: '/tournaments/club-world-cup-2025' },
];

const allUkraineClubs = [
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

  { name: 'Ворскла', image: vorsklaLogo, link: '/football-ukraine/vorskla' },
  { name: 'Лівий Берег', image: lberigLogo, link: '/football-ukraine/lberig' },
  { name: 'Інгулець', image: ingulecLogo, link: '/football-ukraine/ingulec' },
  { name: 'Чорноморець', image: chornomoretsLogo, link: '/football-ukraine/chornomorets' },
  { name: 'Агробізнес', image: agrobiznesLogo, link: '/football-ukraine/agrobiznes' },
  { name: 'Металіст', image: metalistLogo, link: '/football-ukraine/metalist' },
  { name: 'Буковина', image: bukovynaLogo, link: '/football-ukraine/bukovyna' },
  { name: 'ЮКСА', image: yuksaLogo, link: '/football-ukraine/yuksa' },
  { name: 'Вікторія', image: viktoriyaLogo, link: '/football-ukraine/viktoriya' },
  { name: 'Прикарпаття', image: prykarpattiaLogo, link: '/football-ukraine/prykarpattia' },
  { name: 'Нива', image: nyvaLogo, link: '/football-ukraine/nyva' },
  { name: 'Фенікс-Маріуполь', image: fenixMariupolLogo, link: '/football-ukraine/fenix-mariupol' },
  { name: 'Поділля', image: podillyaLogo, link: '/football-ukraine/podillya' },
  { name: 'Пробій', image: probiyLogo, link: '/football-ukraine/probiy' },
  { name: 'Чернігів', image: chernihivLogo, link: '/football-ukraine/chernihiv' },
  { name: 'Металург', image: metalurhLogo, link: '/football-ukraine/metalurh' },

  { name: 'Діназ', image: dinazLogo, link: '/football-ukraine/dinaz' },
  { name: 'Гірник-Спорт', image: hirnykLogo, link: '/football-ukraine/hirnyk-sport' },
  { name: 'Реал Фарма', image: realPharmaLogo, link: '/football-ukraine/real-pharma' },
  { name: 'Локомотив', image: lokomotivLogo, link: '/football-ukraine/lokomotiv' },
  { name: 'Лісне', image: lisneLogo, link: '/football-ukraine/lisne' },
  { name: 'Скала 1911', image: skalaLogo, link: '/football-ukraine/skala-1911' },
  { name: 'ФК Ужгород', image: uzhorodLogo, link: '/football-ukraine/uzhorod' },
];

const Home = () => {
  const { newsList } = useNews();
  const newsPerPage = 31;

  return (
    <div className="home-container">
      <AllUkraineClubsSlider
        title="Клуби України"
        items={allUkraineClubs}
      />

      <FeaturedNewsBlock newsList={newsList} />

      <HorizontalSectionNewsSlider
        title="Чемпіонат світу 2026"
        section="Чемпіонат світу 2026"
        newsList={newsList}
      />

      <div className="home-layout">
        <div className="home-column home-column-left">
          <div className="panel">
            <h1>ОСТАННІ НОВИНИ</h1>
          </div>

          <GeneralNewsList newsList={newsList} newsPerPage={newsPerPage} />

          <div className="all-news-button-wrap">
            <Link to="/news" className="all-news-button">
              Всі новини →
            </Link>
          </div>
        </div>

        <div className="home-column home-column-right">
          <div className="double-blocks-grid">
            <div className="sport-column">
              <SportNewsFeed
                title="Футбол України"
                category="Футбол України"
                newsList={newsList}
              />

              <SportNewsFeed
                title="Єврокубки"
                category="Єврокубки"
                newsList={newsList}
              />

              <SportNewsFeed
                title="Бокс"
                category="Види спорту"
                section="Бокс"
                newsList={newsList}
              />

              <SportNewsFeed
                title="Біатлон"
                category="Біатлон"
                newsList={newsList}
              />

              <SportNewsFeed
                title="Теніс"
                category="Види спорту"
                section="Теніс"
                newsList={newsList}
              />

              <SportNewsFeed
                title="MMA"
                category="Види спорту"
                section="MMA"
                newsList={newsList}
              />
            </div>

            <div className="section-column">
              <TournamentAutoSlider
                title="Турніри"
                items={tournamentsSubsections}
              />

              <LeagueNewsFeed
  title="Англійська Премʼєр-ліга"
  image={eplLogo}
  link="/championships/epl"
  section="Англійська Премʼєр-ліга"
  newsList={newsList}
/>

<LeagueNewsFeed
  title="Іспанська Ла Ліга"
  image={laLigaLogo}
  link="/championships/la-liga"
  section="Іспанська Ла Ліга"
  newsList={newsList}
/>

<LeagueNewsFeed
  title="Італійська Серія А"
  image={SeriaALogo}
  link="/championships/seriaA"
  section="Італійська Серія А"
  newsList={newsList}
/>

<LeagueNewsFeed
  title="Німецька Бундесліга"
  image={bundesligaLogo}
  link="/championships/bundesliga"
  section="Німецька Бундесліга"
  newsList={newsList}
/>

<LeagueNewsFeed
  title="Французька Ліга 1"
  image={ligue1Logo}
  link="/championships/ligue1"
  section="Французька Ліга 1"
  newsList={newsList}
/>
            </div>

            
          </div>
        </div>
      </div>

      <PopularNewsSlider newsList={newsList} />
    </div>
  );
};

export default Home;