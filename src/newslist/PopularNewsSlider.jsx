import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/PopularNewsSlider.css';

const PopularNewsSlider = ({ newsList }) => {
  const location = useLocation();

  const popularNews = [...newsList]
    .filter((news) => typeof news.views === 'number')
    .sort((a, b) => b.views - a.views)
    .slice(0, 20);

  if (popularNews.length === 0) return null;

  return (
    <section className="popular-slider-section">
      <div className="popular-slider-inner">
        <div className="popular-slider-header">
          <div className="panel-news">
            <h1>ПОПУЛЯРНІ НОВИНИ</h1>
          </div>
        </div>

        <div className="popular-slider-track">
          {popularNews.map((news) => (
            <Link
              to={`/news/${news.id}`}
              state={{ from: location.pathname + location.search }}
              key={news.id}
              className="popular-slider-card"
            >
              <div className="popular-slider-image-wrap">
                <img
                  src={news.image}
                  alt={news.title}
                  className="popular-slider-image"
                />
              </div>

              <div className="popular-slider-content">
                <div className="popular-slider-date">
                  {news.day}.{news.month}.{news.year} {news.time}
                </div>

                <h3 className="popular-slider-title">{news.title}</h3>

                <div className="popular-slider-footer">
                  <span className="popular-slider-category">
                    {Array.isArray(news.sections) && news.sections.length > 0
                      ? news.sections[0]
                      : news.category}
                  </span>

                  <span className="popular-slider-views">
                    {news.views} переглядів
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularNewsSlider;