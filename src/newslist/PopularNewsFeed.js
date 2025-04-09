import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PopularNewsFeed.css';

const PopularNewsFeed = ({ newsList }) => {
  const popularNews = [...newsList]
    .filter(news => typeof news.views === 'number')
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

  if (popularNews.length === 0) return null;

  return (
    <div className="popular-news-box">
      <div className="panel">
        <h1>Популярні новини</h1>
      </div>

      <div className="popular-news-list">
        {popularNews.map((news) => (
          <Link to={`/news/${news.id}`} key={news.id} className="popular-news-item">
            <img src={news.image} alt={news.title} className="popular-news-image" />
            <div className="popular-news-info">
              <h3 className="popular-news-title">{news.title}</h3>
              <span className="popular-news-meta">
                {news.day}.{news.month}.{news.year}, {news.time} — {news.views} переглядів
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularNewsFeed;

