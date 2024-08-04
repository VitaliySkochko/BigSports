/*Цей код представляє компонент на React, який відображає головну сторінку веб-сайту з новинами про футбол. */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from './NewsContext';
import Pagination from './Pagination';
import '../App.css'

const Home = () => {
  const { newsList } = useNews();
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNewsList = newsList.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(newsList.length / newsPerPage);

  return (
    <div className='panel'>
      <h1>ОСТАННІ НОВИНИ</h1> 
      <div className='news-grid'>
        {currentNewsList.map((news) => (
          <div key={news.id} className='news-item'>
            <img src={news.image} alt={news.title} className='news-image' />
            <div className='news-details'>
              <span className='news-category'>{news.category}</span>
              <span className='news-date'>{news.day}.{news.month}.{news.year} {news.time}</span>
              <Link to={`/news/${news.id}`}>
                <h2 className='news-title'>{news.title}</h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {newsList.length > 10 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;





























