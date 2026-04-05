import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNews } from './NewsContext';
import NewsList from '../newslist/NewsList';
import Pagination from './Pagination';

const SearchResults = () => {
  const { newsList } = useNews();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('q')?.toLowerCase().trim() || '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const newsPerPage = 30;

  const getMillis = (ts) =>
    ts?.toMillis?.() ??
    (typeof ts?.seconds === 'number' ? ts.seconds * 1000 : null) ??
    (ts instanceof Date ? ts.getTime() : typeof ts === 'number' ? ts : 0);

  const filteredNews = newsList
    .filter((news) => {
      if (!searchTerm) return false;

      const tags = Array.isArray(news.tags)
        ? news.tags.map((tag) => String(tag).toLowerCase().trim())
        : [];

      return tags.some((tag) => tag.includes(searchTerm));
    })
    .sort((a, b) => getMillis(b.timestamp) - getMillis(a.timestamp));

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  const handlePageChange = (page) => {
    setSearchParams({
      q: searchTerm,
      page: String(page),
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="panel panel--spaced">
      <h1>Результати пошуку</h1>

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
              onPageChange={handlePageChange}
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