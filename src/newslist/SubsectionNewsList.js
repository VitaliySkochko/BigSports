import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SubsectionNewsList.css'; // Підключаємо стилі

const SubsectionNewsList = ({ newsList, newsPerPage, currentPage }) => {
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNewsList = newsList.slice(indexOfFirstNews, indexOfLastNews);

  return (
    <div className="subsection-news-container">
      {currentNewsList.map((news) => (
        <div key={news.id} className="subsection-news-card">
          <img src={news.image} alt={news.title} className="subsection-news-image" />
          <div className="subsection-news-content">
            <Link to={`/news/${news.id}`} className="subsection-news-title">
              {news.title}
            </Link>
            <div className="subsection-news-meta">
              <span className="subsection-news-date">
                {news.day}.{news.month}.{news.year} {news.time}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubsectionNewsList;
