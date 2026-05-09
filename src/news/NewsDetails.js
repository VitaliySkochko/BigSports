import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
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
import RelatedNewsSlider from '../sections/RelatedNewsSlider';
import '../styles/NewsDetails.css';
import defaultBackground from '../img/news-background.jpg';
import { trackEvent } from '../amplitude';

const NewsDetails = () => {
  const { newsList } = useNews();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [views, setViews] = useState(0);
  const [authorId, setAuthorId] = useState(null);
  const trackedNewsIdRef = useRef(null);

  const news = newsList.find((n) => n.id === id);

  useEffect(() => {
  const logView = async () => {
    if (!news) return;

    if (trackedNewsIdRef.current === news.id) return;
    trackedNewsIdRef.current = news.id;

    try {
      trackEvent('news_view', {
        news_id: news.id,
        title: news.title,
        author: news.author,
        category: news.category,
        section: news.section || null,
        publish_date: `${news.day}.${news.month}.${news.year}`,
        publish_time: news.time,
      });

      const newsRef = doc(db, 'news', news.id);
      await updateDoc(newsRef, { views: increment(1) });

      const updatedSnap = await getDoc(newsRef);
      if (updatedSnap.exists()) {
        const updatedData = updatedSnap.data();
        setViews(updatedData.views || 1);
      }
    } catch (error) {
      console.error('Помилка при оновленні переглядів:', error);
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

  const handleTagClick = (tag) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };

  const getCategoryLink = (category) => {
    switch (category) {
      case 'Футбол України':
        return '/football-ukraine';
      case 'Єврокубки':
        return '/eurocups';
      case 'Чемпіонати':
        return '/championships';
      case 'Біатлон':
        return '/biathlon';
      case 'Види спорту':
        return '/sports';
      case 'Турніри':
        return '/tournaments';
      default:
        return null;
    }
  };

  const categoryLink = getCategoryLink(news.category);

  return (
    <div
      className="single-news-container"
      style={{ backgroundImage: `url(${defaultBackground})` }}
    >
      <div className="single-news-overlay">
        <button
          type="button"
          onClick={handleGoBack}
          className="back-button"
        >
          ← Назад
        </button>

        <h2 className="single-news-title">{news.title}</h2>
      </div>

      <div className="single-news-content-wrapper">
        <div className="single-news-content">
          {news.image && (
            <img
              src={news.image}
              alt={news.title}
              className="floating-news-image"
            />
          )}

          <div dangerouslySetInnerHTML={{ __html: news.content }} />

          {Array.isArray(news.tags) && news.tags.length > 0 && (
            <div className="news-tags-block">
              <div className="news-tags">
                {news.tags.map((tag, index) => (
                  <button
                    key={index}
                    className="news-tag"
                    onClick={() => handleTagClick(tag)}
                    type="button"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="single-news-meta">
          <span>
            <strong>Дата:</strong> {news.day}.{news.month}.{news.year} {news.time}
          </span>

          <span>
            <strong>Категорія:</strong>{' '}
            {categoryLink ? (
              <Link to={categoryLink} className="meta-link">
                {news.category}
              </Link>
            ) : (
              news.category || '—'
            )}
          </span>

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
            <strong>Перегляди:</strong> {views}
          </span>
        </div>
      </div>

      <RelatedNewsSlider currentNews={news} newsList={newsList} />

      <CommentForm newsId={news.id} />
      <Comments newsId={news.id} />
    </div>
  );
};

export default NewsDetails;