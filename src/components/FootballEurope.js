/*цей компонент надає сторінку з новинами про Першу Лігу, 
де відображаються заголовок, опис та список новин у зворотньому порядку (новіші вгорі). */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from './NewsContext';
import Pagination from './Pagination';
import Subsections from './Subsections';
import '../App.css';

const FootballEurope = () => {
  const { newsList } = useNews();
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 20;

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  const filteredNews = newsList.filter((news) => news.category === 'Футбол Європи');
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNewsList = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  return (
    <div className='panel'>
      <h1>ФУТБОЛ ЄВРОПИ</h1>
      <Subsections category="Футбол Європи" />
      <div className='news-grid'>
        {currentNewsList.map((news) => (
          <div key={news.id} className='news-item'>
            <img src={news.image} alt={news.title} className='news-image' />
            <div className='news-details'>
              <span className='news-category'>{news.category}</span>
              <span className='news-section'>{news.section}</span>
              <span className='news-date'>{news.day}.{news.month}.{news.year} {news.time}</span>
              <Link to={`/news/${news.id}`}>
                <h2 className='news-title'>{news.title}</h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default FootballEurope;



















