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
  const newsPerPage = 12;

  // 🔍 Пошук тільки по заголовках + сортування за датою (останні зверху)
  const filteredNews = newsList
    .filter(news => news.title?.toLowerCase().includes(searchTerm))
    .sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);

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




