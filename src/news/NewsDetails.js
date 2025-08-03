import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNews } from '../components/NewsContext';
import {
  doc,
  updateDoc,
  increment,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
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
  const [authorId, setAuthorId] = useState(null);
  const news = newsList.find((n) => n.id === id);

  useEffect(() => {
    const logView = async () => {
      if (!news) return;

      // Amplitude: лог події
      amplitude.track('News Viewed', {
        id: news.id,
        title: news.title,
        author: news.author,
        section: Array.isArray(news.sections) ? news.sections.join(', ') : news.section,
        date: `${news.day}.${news.month}.${news.year}`,
        time: news.time,
      });

      // Firestore: збільшення лічильника переглядів
      const newsRef = doc(db, 'news', news.id);
      await updateDoc(newsRef, { views: increment(1) });

      // Оновлення кількості переглядів
      const updatedSnap = await getDoc(newsRef);
      if (updatedSnap.exists()) {
        const updatedData = updatedSnap.data();
        setViews(updatedData.views || 1);
      }
    };

    logView();
  }, [news]);

  useEffect(() => {
    const fetchAuthorId = async () => {
      if (!news || !news.author) return;

      try {
        const q = query(collection(db, 'users'), where('username', '==', news.author));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setAuthorId(snapshot.docs[0].id);
        }
      } catch (error) {
        console.error('Помилка при пошуку автора:', error);
      }
    };

    fetchAuthorId();
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

      <div className="single-news-content-wrapper">
        <div className="single-news-content">
          {news.image && (
            <img
              src={news.image}
              alt="news"
              className="floating-news-image"
            />
          )}
          <div
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>

        <div className="single-news-meta">
          <span>
            <strong>Автор:</strong>{' '}
            {authorId ? (
              <Link to={`/profile/${authorId}`} className="author-link">
                {news.author}
              </Link>
            ) : (
              news.author
            )}
          </span>
          <span>
            {news.day}.{news.month}.{news.year} {news.time}
          </span>
          <span>
            <strong>Переглядів:</strong> {views}
          </span>
        </div>
      </div>

      <CommentForm newsId={news.id} />
      <Comments newsId={news.id} /> 
    </div>
  );
};

export default NewsDetails;























