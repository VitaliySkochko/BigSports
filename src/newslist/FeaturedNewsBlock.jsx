import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/FeaturedNewsBlock.css';

const FeaturedNewsBlock = ({ newsList }) => {
  const location = useLocation();

  const featuredNews = useMemo(() => {
    const safeList = Array.isArray(newsList) ? newsList : [];
    return safeList.filter((item) => item?.topNews && item?.id).slice(0, 5);
  }, [newsList]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!featuredNews.length) {
      setActiveIndex(0);
      return;
    }

    if (activeIndex >= featuredNews.length) {
      setActiveIndex(0);
    }
  }, [featuredNews, activeIndex]);

  useEffect(() => {
    if (featuredNews.length < 2) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredNews.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [featuredNews.length]);

  if (!featuredNews.length) {
    return <p className="featured-news-empty">Поки немає топових новин.</p>;
  }

  const activeNews = featuredNews[activeIndex];
  const sideNews = featuredNews.filter((_, index) => index !== activeIndex);

  return (
    <section className="featured-news-section">
      <div className="featured-news-header">
        
      </div>

      <div className="featured-news-layout">
        <Link
          to={`/news/${activeNews.id}`}
          state={{ from: location.pathname + location.search }}
          className="featured-main-card"
        >
          {activeNews.image && (
            <img
              src={activeNews.image}
              alt={activeNews.title}
              className="featured-main-image"
            />
          )}

          <div className="featured-main-overlay">
            <div className="featured-main-meta">
              <span>
                {activeNews.day}.{activeNews.month}.{activeNews.year}
              </span>
              {activeNews.time && <span>{activeNews.time}</span>}
            </div>

            <h3 className="featured-main-title">{activeNews.title}</h3>

            {activeNews.description && (
              <p className="featured-main-description">{activeNews.description}</p>
            )}

            <div className="featured-main-dots">
              {featuredNews.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`featured-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveIndex(index);
                  }}
                  aria-label={`Перейти до новини ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Link>

        <div className="featured-side-list">
          {sideNews.map((item) => {
            const originalIndex = featuredNews.findIndex((n) => n.id === item.id);

            return (
              <button
                key={item.id}
                type="button"
                className="featured-side-card"
                onClick={() => setActiveIndex(originalIndex)}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="featured-side-image"
                  />
                )}

                <div className="featured-side-overlay">
                  <h4 className="featured-side-title">{item.title}</h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNewsBlock;