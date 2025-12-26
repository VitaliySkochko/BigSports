import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNews } from './NewsContext';
import NewsList from '../newslist/NewsList';
import Pagination from './Pagination';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('q')?.toLowerCase() || '';
  const { newsList } = useNews();
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 30;

  // допоміжна функція для коректного отримання мілісекунд з Firestore Timestamp або Date
  const getMillis = (ts) =>
    ts?.toMillis?.() ??
    (typeof ts?.seconds === 'number' ? ts.seconds * 1000 : null) ??
    (ts instanceof Date ? ts.getTime() : (typeof ts === 'number' ? ts : 0));

  // 🔍 Пошук по title + description + content (якщо є)
  const filteredNews = newsList
    .filter((n) => {
      const t = n.title?.toLowerCase() || '';
      const d = n.description?.toLowerCase() || '';
      const c = n.content?.toLowerCase() || '';
      return (
        t.includes(searchTerm) ||
        d.includes(searchTerm) ||
        c.includes(searchTerm)
      );
    })
    .sort((a, b) => getMillis(b.timestamp) - getMillis(a.timestamp));

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  return (
    <div className="panel">
      <h1>Результати пошуку: «{searchTerm}»</h1>
      {filteredNews.length > 0 ? (
        <>
          <NewsList
            newsList={filteredNews}
            newsPerPage={newsPerPage}
            currentPage={currentPage}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <p>Нічого не знайдено.</p>
      )}
    </div>
  );
};

export default SearchResults;
