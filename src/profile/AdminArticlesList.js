import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import '../styles/AdminArticlesList.css';

const AdminArticlesList = ({ username }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 40;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'news'), where('author', '==', username));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sorted = data.sort((a, b) => {
          const dateA = new Date(`${a.year}-${a.month}-${a.day} ${a.time}`);
          const dateB = new Date(`${b.year}-${b.month}-${b.day} ${b.time}`);
          return dateB - dateA;
        });

        setArticles(sorted);
        setCurrentPage(1); // ✅ якщо автор змінився — починаємо з 1 сторінки
      } catch (error) {
        console.error('Помилка при отриманні статей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [username]);

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ✅ Skeleton loader
  if (loading) {
    return (
      <div className="admin-articles">
        <h2>Написані новини</h2>

        <ul className="admin-articles-list">
          {Array.from({ length: 8 }).map((_, i) => (
            <li key={i} className="article-skeleton-item">
              <div className="sk-thumb" />
              <div className="sk-lines">
                <div className="sk-line sk-line--title" />
                <div className="sk-line sk-line--date" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (articles.length === 0) return <p>Адміністратор ще не написав жодної новини.</p>;

  return (
    <div className="admin-articles">
      <h2>Написані новини</h2>
      <ul className="admin-articles-list">
        {currentArticles.map((article) => (
          <li key={article.id}>
            <img
              src={article.image || '/default-thumb.jpg'}
              alt={article.title}
              className="article-thumb"
            />

            <div className="article-info">
              <Link to={`/news/${article.id}`} className="article-link">
                {article.title}
              </Link>
              <span className="article-date">
                {article.day}.{article.month}.{article.year}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AdminArticlesList;
