import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import '../App.css'; // Импортируем стили для использования классов

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchArticles = async () => {
      const q = query(collection(db, 'news'));
      const querySnapshot = await getDocs(q);
      const articles = [];
      querySnapshot.forEach((doc) => {
        articles.push({ id: doc.id, ...doc.data() });
      });
      setResults(articles);
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    setSearchTerm(new URLSearchParams(location.search).get('q') || '');
  }, [location.search]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredResults(
        results.filter(article =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredResults(results);
    }
  }, [searchTerm, results]);

  return (
    <div className='search-results'>
      <h1>Результати пошуку для "{searchTerm}":</h1>
      {filteredResults.length > 0 ? (
        <div className='news-grid'>
          {filteredResults.map((article) => (
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


