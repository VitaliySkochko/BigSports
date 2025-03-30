import React from 'react';
import { useParams } from 'react-router-dom';
import { useNews } from '../components/NewsContext';
import Comments from './Comments';
import CommentForm from './CommentForm';
import '../styles/NewsDetails.css';
import defaultBackground from '../img/news-background.jpg';

const NewsDetails = () => {
  const { newsList } = useNews();
  const { id } = useParams();
  const news = newsList.find(news => news.id === id);

  if (!news) {
    return <p>Новина не знайдена</p>;
  }

  return (
    <div 
      className="single-news-container"
      style={{ backgroundImage: `url(${defaultBackground})` }} // Фіксований фон
    >
      <div className="single-news-overlay">
        <h2 className="single-news-title">{news.title}</h2> 
      </div>

      {/* Зображення новини */}
      {news.image && (
        <div className="single-news-image-container">
          <img src={news.image} alt="news" className="single-news-article-image" />
        </div>
      )}

      {/* Контент новини з прокруткою */}
      <div className="single-news-content-wrapper">
        <div className="single-news-content" dangerouslySetInnerHTML={{ __html: news.content }} />
        <div className="single-news-meta">
         <span><strong>Автор:</strong> {news.author}</span>
         <span>{news.day}.{news.month}.{news.year} {news.time}</span>
        </div>
      </div>

      {/* Коментарі */}
      <CommentForm newsId={news.id} />
      <Comments newsId={news.id} />
    </div>
  );
};

export default NewsDetails;


















