//  Цей компонент показує деталей новини, де буде відображатися повна інформація про новину.
import React from 'react';
import { useParams } from 'react-router-dom';
import { useNews } from './NewsContext';

const NewsDetails = () => {
  const { newsList } = useNews();
  const { id } = useParams();
  const news = newsList.find(news => news.id === id);

  if (!news) {
    return <p>Новина не знайдена</p>;
  }

  return (
    <div className='news_details'>
      <h2>{news.title}</h2>
      <p><strong>Категорія:</strong> {news.category}</p>
      <p><strong>Дата:</strong> {news.day}.{news.month}.{news.year}</p>
      {news.image && <img src={news.image} alt="news" />}
      <div className="news-content">
        {news.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default NewsDetails;












