/*цей компонент надає сторінку з новинами про Українську Прем'єр Лігу, 
де відображаються заголовок, опис та список новин у зворотньому порядку (новіші вгорі). */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from './NewsContext';
import Pagination from './Pagination'; 

const FootballUkraine = () => {
  const { newsList } = useNews();
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredNews = newsList.filter((news) => news.category === 'Футбол України');
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNewsList = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  return (
    <div className='panel'>
      <h1>Футбол України</h1>
      {currentNewsList.map((news) => (
        <div key={news.id}>
          <Link to={`/news/${news.id}`}>
            <h2>{news.title}</h2>
          </Link>
          <p>Дата: {news.day}.{news.month}.{news.year}</p>
        </div>
      ))}
      {filteredNews.length > 10 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default FootballUkraine ;













