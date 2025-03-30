import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NewsList.css'; // Стилі для компонента

const NewsList = ({ newsList, newsPerPage, currentPage }) => {
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNewsList = newsList.slice(indexOfFirstNews, indexOfLastNews);

  return (
    <div className="news-container">
      {currentNewsList.map((news) => (
        <div key={news.id} className="news-card">
          <img src={news.image} alt={news.title} className="news-image" />
          <div className="news-content">
            <Link to={`/news/${news.id}`} className="news-title">
              {news.title}
            </Link>
            <div className="news-meta">
              <span className="news-date">{news.day}.{news.month}.{news.year} {news.time}</span>
              <span className="news-section">
                {Array.isArray(news.sections)
                ? news.sections[0]
                : news.section}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
