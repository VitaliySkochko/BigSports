import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/GeneralNewsList.css';

const GeneralNewsList = ({ newsList, newsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNewsList = newsList.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(newsList.length / newsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="news-container-general">
      {currentNewsList.map((news) => (
        <div key={news.id} className="news-card-general">
          <img src={news.image} alt={news.title} className="news-image-general" />
          <div className="news-content-general">

            <Link to={`/news/${news.id}`} className="news-title-general">
              {news.title}
            </Link>
            <div className="news-meta-general">
              <span className="news-date-general">{news.day}.{news.month}.{news.year} {news.time}</span>
              <span className="news-category-general">
                {Array.isArray(news.sections) && news.sections.length > 0
                  ? news.sections[0]
                  : news.category}
              </span>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeneralNewsList;


