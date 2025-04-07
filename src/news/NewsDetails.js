import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNews } from '../components/NewsContext';
import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Comments from './Comments';
import CommentForm from './CommentForm';
import '../styles/NewsDetails.css';
import defaultBackground from '../img/news-background.jpg';
import amplitude from '../amplitude';

const NewsDetails = () => {
  const { newsList } = useNews();
  const { id } = useParams();
  const [views, setViews] = useState(0);
  const news = newsList.find((n) => n.id === id);

  useEffect(() => {
    const logView = async () => {
      if (!news) return;

      // 1. Amplitude: запис події
      amplitude.track('News Viewed', {
        id: news.id,
        title: news.title,
        author: news.author,
        section: Array.isArray(news.sections) ? news.sections.join(', ') : news.section,
        date: `${news.day}.${news.month}.${news.year}`,
        time: news.time,
      });

      // 2. Firestore: інкремент лічильника переглядів
      const newsRef = doc(db, 'news', news.id);
      await updateDoc(newsRef, { views: increment(1) });

      // 3. Отримання актуального значення переглядів
      const updatedSnap = await getDoc(newsRef);
      if (updatedSnap.exists()) {
        const updatedData = updatedSnap.data();
        setViews(updatedData.views || 1);
      }
    };

    logView();
  }, [news]);

  if (!news) {
    return <p>Новина не знайдена</p>;
  }

  return (
    <div
      className="single-news-container"
      style={{ backgroundImage: `url(${defaultBackground})` }}
    >
      <div className="single-news-overlay">
        <h2 className="single-news-title">{news.title}</h2>
      </div>

      {news.image && (
        <div className="single-news-image-container">
          <img src={news.image} alt="news" className="single-news-article-image" />
        </div>
      )}

      <div className="single-news-content-wrapper">
        <div className="single-news-content" dangerouslySetInnerHTML={{ __html: news.content }} />

        <div className="single-news-meta">
          <span><strong>Автор:</strong> {news.author}</span>
          <span>{news.day}.{news.month}.{news.year} {news.time}</span>
          <span><strong>Переглядів:</strong> {views}</span>
        </div>
      </div>

      <CommentForm newsId={news.id} />
      <Comments newsId={news.id} />
    </div>
  );
};

export default NewsDetails;




















