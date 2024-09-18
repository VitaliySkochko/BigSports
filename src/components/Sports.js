import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from './NewsContext';
import Pagination from './Pagination';
import Subsections from './Subsections';
import '../App.css'

const Sports = () => {
  const { newsList } = useNews();
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 20;

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  const filteredNews = newsList.filter((news) => news.category === 'Види спорту');
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNewsList = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  return (
    <div className='panel'>
      <h1>Спорт</h1>
      <Subsections category="Види спорту" />
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

export default Sports;
