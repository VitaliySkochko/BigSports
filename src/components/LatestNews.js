import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LatestNews.css'

const LatestNews = ({ latestNews }) => {
  return (
    <div className='latest-news-block'>
      <div className='large-news'>
        {/* Перша велика новина */}
        {latestNews[0] && (
          <div key={latestNews[0].id} className='news-item-large full-screen'>
            <img src={latestNews[0].image} alt={latestNews[0].title} className='news-image-large' />
            <div className='news-overlay-large'>
              <div className='news-details-large'>
                <span className='news-category-large'>{latestNews[0].category}</span>
                <span className='news-section-large'>{latestNews[0].section}</span>
                <span className='news-date-large'>
                  {latestNews[0].day}.{latestNews[0].month}.{latestNews[0].year} {latestNews[0].time}
                </span>
                <Link to={`/news/${latestNews[0].id}`}>
                  <h2 className='news-title-large'>{latestNews[0].title}</h2>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3 менших новини справа */}
      <div className='small-news'>
        {latestNews.slice(1, 4).map((news) => (
          <div key={news.id} className='news-item-small'>
            <img src={news.image} alt={news.title} className='news-image-small' />
            <div className='news-overlay-small'>
              <div className='news-details-small'>
                <span className='news-category-small'>{news.category}</span>
                <span className='news-section-small'>{news.section}</span>
                <span className='news-date-small'>
                  {news.day}.{news.month}.{news.year} {news.time}
                </span>
                <Link to={`/news/${news.id}`}>
                  <h2 className='news-title-small'>{news.title}</h2>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;

