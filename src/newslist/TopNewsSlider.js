import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TopNewsSlider.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TopNewsSlider = ({ newsList }) => {
  // 1) Безпечний вхід
  const safeList = Array.isArray(newsList) ? newsList : [];

  // 2) Обчислюємо topNews один раз на зміни вхідних даних
  const topNews = useMemo(
    () => safeList.filter(n => n?.topNews).slice(0, 6),
    [safeList]
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  // 3) Коли topNews змінюється, нормалізуємо currentIndex
  useEffect(() => {
    if (topNews.length === 0) {
      setCurrentIndex(0);
      return;
    }
    // якщо індекс вийшов за межі — повертаємо в діапазон
    if (currentIndex >= topNews.length) {
      setCurrentIndex(topNews.length - 1);
    }
  }, [topNews.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // 4) Автоперемикання тільки якщо є що гортати
  useEffect(() => {
    if (topNews.length < 2) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % topNews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [topNews.length]);

  const handleNext = () => {
    if (topNews.length === 0) return;
    setCurrentIndex(prev => (prev + 1) % topNews.length);
  };

  const handlePrev = () => {
    if (topNews.length === 0) return;
    setCurrentIndex(prev => (prev - 1 + topNews.length) % topNews.length);
  };

  if (topNews.length === 0) {
    return <p className="no-top-news">Поки немає топових новин.</p>;
  }

  const news = topNews[currentIndex];

  // 5) Додаткова перевірка, якщо раптом елемент відсутній або без id
  if (!news || !news.id) {
    return <p className="no-top-news">Дані топ-новин тимчасово недоступні.</p>;
  }

  return (
    <div className="top-slider-container">
      <div className="slider-wrapper">
        <Link to={`/news/${news.id}`} className="slider-link">
          {news.image ? (
            <img src={news.image} alt={news.title || 'news'} className="slider-image" />
          ) : null}
          <div className="slider-overlay">
            <div className="slider-meta">
              <span>{[news.day, news.month, news.year].filter(Boolean).join('.')}</span>
              {news.time ? <span>{news.time}</span> : null}
            </div>
            <h2 className="slider-title">{news.title || 'Без назви'}</h2>
          </div>
        </Link>

        {topNews.length > 1 && (
          <>
            <button className="slider-btn prev" onClick={handlePrev}>
              <FiChevronLeft size={30} />
            </button>
            <button className="slider-btn next" onClick={handleNext}>
              <FiChevronRight size={30} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TopNewsSlider;
