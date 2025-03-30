import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/NewsItem.css';

const NewsItemAdmin = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const docRef = doc(db, 'news', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNews(docSnap.data());
        } else {
          console.error('Новина не знайдена');
        }
      } catch (error) {
        console.error('Помилка завантаження новини:', error);
      }
    };

    fetchNews();
  }, [id]);

  if (!news) {
    return <p>Завантаження новини...</p>;
  }

  return (
    <div className="news-item-container">
      <h1>{news.title}</h1>
      <p><strong>Автор:</strong> {news.author}</p>
      <p><strong>Категорія:</strong> {news.category}</p>
      <p><strong>Розділ:</strong> {news.section}</p>
    </div>
  );
};

export default NewsItemAdmin;
























