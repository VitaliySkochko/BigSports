import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TopNewsSlider.css'; // Стилі окремо
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Іконки для кнопок

const TopNewsSlider = ({ newsList }) => {
  const topNews = newsList.filter(news => news.topNews).slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % topNews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [topNews.length]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % topNews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + topNews.length) % topNews.length);
  };

  if (topNews.length === 0) {
    return <p className="no-top-news">Поки немає топових новин.</p>;
  }

  const news = topNews[currentIndex];

  return (
    <div className="top-slider-container">
      <div className="slider-wrapper">
        <Link to={`/news/${news.id}`} className="slider-link">
          <img src={news.image} alt={news.title} className="slider-image" />
          <div className="slider-overlay">
            <div className="slider-meta">
              <span>{news.day}.{news.month}.{news.year}</span>
              <span>{news.time}</span>
            </div>
            <h2 className="slider-title">{news.title}</h2>
          </div>
        </Link>
        <button className="slider-btn prev" onClick={handlePrev}><FiChevronLeft size={30} /></button>
        <button className="slider-btn next" onClick={handleNext}><FiChevronRight size={30} /></button>
      </div>
    </div>
  );
};

export default TopNewsSlider;

