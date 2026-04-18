import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LeagueNewsFeed.css';

const LeagueNewsFeed = ({ title, image, link, section, newsList }) => {
  const getMillis = (ts) =>
    ts?.toMillis?.() ??
    (typeof ts?.seconds === 'number' ? ts.seconds * 1000 : 0) ??
    (ts instanceof Date ? ts.getTime() : 0);

  const filteredNews = (newsList || [])
    .filter((news) => Array.isArray(news.sections) && news.sections.includes(section))
    .sort((a, b) => getMillis(b.timestamp) - getMillis(a.timestamp))
    .slice(0, 8);

  if (filteredNews.length === 0) return null;

  return (
    <div className="league-news-feed">
      <Link to={link} className="league-news-feed__head">
        <div className="league-news-feed__logo-wrap">
          <img src={image} alt={title} className="league-news-feed__logo" />
        </div>

        <div className="league-news-feed__title-wrap">
          <h2 className="league-news-feed__title">{title}</h2>
        </div>
      </Link>

      <div className="league-news-feed__list">
        {filteredNews.map((news) => (
          <Link
            to={`/news/${news.id}`}
            key={news.id}
            className="league-news-feed__item"
          >
            <img
              src={news.image}
              alt={news.title}
              className="league-news-feed__image"
            />

            <div className="league-news-feed__content">
              <h3 className="league-news-feed__item-title">{news.title}</h3>
              <span className="league-news-feed__time">
                {news.day}.{news.month}.{news.year}, {news.time}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeagueNewsFeed;