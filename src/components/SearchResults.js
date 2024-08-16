import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../App.css'; // Импортируем стили для использования классов

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const searchArticles = async () => {
      if (searchTerm) {
        const q = query(
          collection(db, 'news'),
          where('keywords', 'array-contains', searchTerm.toLowerCase())
        );
        const querySnapshot = await getDocs(q);
        const articles = [];
        querySnapshot.forEach((doc) => {
          articles.push({ id: doc.id, ...doc.data() });
        });
        setResults(articles);
      }
    };

    searchArticles();
  }, [searchTerm]);

  return (
    <div className='search-results'>
      <h1>Результати пошуку для "{searchTerm}":</h1>
      {results.length > 0 ? (
        <div className='news-grid'>
          {results.map((article) => (
            <div key={article.id} className='news-item'>
              <img src={article.image} alt={article.title} className='news-image' />
              <div className='news-details'>
                <span className='news-category'>{article.category}</span>
                <span className='news-date'>{article.day}.{article.month}.{article.year} {article.time}</span>
                <Link to={`/news/${article.id}`}>
                  <h2 className='news-title'>{article.title}</h2>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Нічого не знайдено.</p>
      )}
    </div>
  );
};

export default SearchResults;


