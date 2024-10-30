/*Цей код представляє компонент на React, який відображає головну сторінку веб-сайту з новинами про футбол. */

import React from 'react';
import { useNews } from './NewsContext';
import LatestNews from './LatestNews';
import NewsListWithPagination from './NewsListWithPagination';

const Home = () => {
  const { newsList } = useNews();
  const newsPerPage = 30;

  // Фільтрація останніх 4 новин для окремого блоку
  const latestNews = newsList.slice(0, 4);

  return (
    <div className='panel'>
      <h1>ОСТАННІ НОВИНИ</h1>
      
      {/* Компонент з 4 останніми новинами */}
      <LatestNews latestNews={latestNews} />

      {/* Компонент з іншими новинами і пагінацією */}
      <NewsListWithPagination newsList={newsList.slice(4)} newsPerPage={newsPerPage} />
    </div>
  );
};

export default Home;































