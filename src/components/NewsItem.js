/* Цей код представляє компонент NewsItem на React, який відображає окрему новину в адмін-панелі */

import React from 'react';
import '../styles/NewsItem.css'

const NewsItem = ({ news, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(news.id);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(news);
    }
  };

  return (
    <div className="news-item">
      <h3>{news.title}</h3>
      <p><strong>Категорія:</strong> {news.category}</p>
      <p>
        <strong>Дата:</strong> 
        {news.day}.{news.month}.{news.year} 
        {news.hours && ` ${news.hours}:${news.minutes}:${news.seconds}`}
      </p>
      {news.image && <img src={news.image} alt="news" />}
      <div className="news-content">
        {news.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {onDelete && <button onClick={handleDelete}>Видалити</button>}
      {onEdit && <button onClick={handleEdit}>Редагувати</button>}
    </div>
  ); 
};

export default NewsItem;





















