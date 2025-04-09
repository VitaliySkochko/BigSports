import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SectionNewsFeed.css';

const SectionNewsFeed = ({ title, section, newsList }) => {
  const filteredNews = newsList
    .filter(news => Array.isArray(news.sections) && news.sections.includes(section))
    .sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds)
    .slice(0, 10); // 12 новин

  if (filteredNews.length === 0) return null;

  return (
    <div className="section-news-box">
      <div className="panel-news">
        <h1>{title}</h1>
      </div>

      <div className="section-news-grid">
        {filteredNews.map((news) => (
          <Link to={`/news/${news.id}`} key={news.id} className="section-news-card">
            <img src={news.image} alt={news.title} className="section-news-img" />
            <div className="section-news-content">
              <h3>{news.title}</h3>
              <span className="section-news-time">
                {news.day}.{news.month}.{news.year}, {news.time}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SectionNewsFeed;


