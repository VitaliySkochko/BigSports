import React from 'react';
import { useNews } from '../components/NewsContext';
import GeneralNewsList from '../newslist/GeneralNewsList';
import TopNewsSlider from '../newslist/TopNewsSlider';
import SportNewsFeed from '../newslist/SportNewsFeed';
import SectionNewsFeed from '../newslist/SectionNewsFeed';
import PopularNewsFeed from '../newslist/PopularNewsFeed';
import '../styles/Home.css';

const Home = () => {
  const { newsList } = useNews();
  const newsPerPage = 31;

  return (
    <div className="home-container">
      <div className="home-layout">

        {/* LEFT — Останні новини */}
        <div className="home-column home-column-left">
          <div className="panel">
            <h1>ОСТАННІ НОВИНИ</h1>
          </div>
          <GeneralNewsList newsList={newsList} newsPerPage={newsPerPage} />
        </div>

        {/* RIGHT — TopNews + 2 колонки: Sport + Section */}
        <div className="home-column home-column-right">
          <div className="top-slider-block">
            <TopNewsSlider newsList={newsList} />
          </div>

          <div className="double-blocks-grid">
            <div className="sport-column">
              <SportNewsFeed 
                title="Футбол України" 
                category="Футбол України" 
                newsList={newsList} 
              />
              {/* Інші розділи під цим */}
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
              
              <SectionNewsFeed 
                title="Клубний чемпіонат світу 2025" 
                section="Клубний чемпіонат світу 2025" 
                newsList={newsList} 
              />
              <PopularNewsFeed newsList={newsList} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;









































