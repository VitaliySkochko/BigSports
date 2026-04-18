import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/HorizontalSectionNewsSlider.css';

const HorizontalSectionNewsSlider = ({ title, section, newsList }) => {
  const location = useLocation();

  const filteredNews = [...newsList]
    .filter(
      (news) => Array.isArray(news.sections) && news.sections.includes(section)
    )
    .sort((a, b) => {
      const aTime =
        a?.timestamp?.seconds
          ? a.timestamp.seconds
          : a?.timestamp instanceof Date
          ? a.timestamp.getTime() / 1000
          : 0;

      const bTime =
        b?.timestamp?.seconds
          ? b.timestamp.seconds
          : b?.timestamp instanceof Date
          ? b.timestamp.getTime() / 1000
          : 0;

      return bTime - aTime;
    })
    .slice(0, 12);

  if (filteredNews.length === 0) return null;

  return (
    <section className="horizontal-section-slider">
      <div className="horizontal-section-slider__inner">
        <div className="horizontal-section-slider__header">
          <div className="panel-news">
            <h1>{title}</h1>
          </div>
        </div>

        <div className="horizontal-section-slider__track">
          {filteredNews.map((news) => (
            <Link
              to={`/news/${news.id}`}
              state={{ from: location.pathname + location.search }}
              key={news.id}
              className="horizontal-section-slider__card"
            >
              <div className="horizontal-section-slider__image-wrap">
                <img
                  src={news.image}
                  alt={news.title}
                  className="horizontal-section-slider__image"
                />
              </div>

              <div className="horizontal-section-slider__content">
                <div className="horizontal-section-slider__date">
                  {news.day}.{news.month}.{news.year}
                  {news.time ? ` ${news.time}` : ''}
                </div>

                <h3 className="horizontal-section-slider__title">
                  {news.title}
                </h3>

                <div className="horizontal-section-slider__footer">
                  <span className="horizontal-section-slider__category">
                    {Array.isArray(news.sections) && news.sections.length > 0
                      ? news.sections[0]
                      : news.category}
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

export default HorizontalSectionNewsSlider;