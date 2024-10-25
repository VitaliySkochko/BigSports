import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import '../App.css'

const NewsListWithPagination = ({ newsList, newsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNewsList = newsList.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(newsList.length / newsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='news-grid'>
      {currentNewsList.map((news) => (
        <div key={news.id} className='news-item'>
          <img src={news.image} alt={news.title} className='news-image' />
          <div className='news-details'>
            <span className='news-category'>{news.category}</span>
            <span className='news-section'>{news.section}</span>
            <span className='news-date'>
              {news.day}.{news.month}.{news.year} {news.time}
            </span>
            <Link to={`/news/${news.id}`}>
              <h2 className='news-title'>{news.title}</h2>
            </Link>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default NewsListWithPagination;
