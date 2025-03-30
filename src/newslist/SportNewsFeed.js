import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SportNewsFeed.css';

const SportNewsFeed = ({ title, category, section, newsList }) => {
  const filteredNews = newsList
    .filter(news => {
      if (section) {
        return news.section?.toLowerCase() === section.toLowerCase();
      }
      return news.category === category;
    })
    .sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds)
    .slice(0, 7);

  if (filteredNews.length === 0) return null;

  const firstNews = filteredNews[0];
  const restNews = filteredNews.slice(1);

  return (
    <div className="ukraine-news-box">
      <div className="panel">
        <h1>{title}</h1>
      </div>

      <Link to={`/news/${firstNews.id}`} className="main-ukraine-news">
        <img src={firstNews.image} alt={firstNews.title} />
        <h3>{firstNews.title}</h3>
        <span className="ukraine-news-time">
          {firstNews.day}.{firstNews.month}.{firstNews.year}, {firstNews.time}
        </span>
      </Link>

      <ul className="ukraine-news-list">
        {restNews.map((news) => (
          <li key={news.id}>
            <Link to={`/news/${news.id}`}>
              {news.title}
              <span className="ukraine-news-time">
                {news.day}.{news.month}.{news.year}, {news.time}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SportNewsFeed;


