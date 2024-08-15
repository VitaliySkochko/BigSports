//  Цей компонент показує деталей новини, де буде відображатися повна інформація про новину.

import React from 'react';
import { useParams } from 'react-router-dom';
import { useNews } from './NewsContext';
import Comments from './Comments';
import CommentForm from './CommentForm';

const NewsDetails = () => {
  const { newsList } = useNews();
  const { id } = useParams();
  const news = newsList.find(news => news.id === id);

  if (!news) {
    return <p>Новина не знайдена</p>;
  }

  return (
    <div className='news_details'>
      <div className='header-section'>
        <h2>{news.title}</h2>
        <p><strong>Категорія:</strong> {news.category}</p>
        <p><strong>Дата:</strong> {news.day}.{news.month}.{news.year}</p>
        {news.image ? (
          <img src={news.image} alt="news" />
        ) : (
          <div className="image-placeholder">Зображення відсутнє</div>
        )}
      </div>
      <div className="news-content">
        <div dangerouslySetInnerHTML={{ __html: news.content }} />
      </div>
      
      {/* Коментарі */}
      <Comments newsId={news.id} />
      
      {/* Форма для додавання коментарів */}
      <CommentForm newsId={news.id} />
    </div>
  );
};

export default NewsDetails;













