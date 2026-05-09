import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNews } from './NewsContext';
import NewsList from '../newslist/NewsList';
import Pagination from './Pagination';
import { trackEvent } from '../amplitude';

const SearchResults = () => {
  const { newsList } = useNews();
  const [searchParams, setSearchParams] = useSearchParams();

  const rawSearchTerm = searchParams.get('q')?.trim() || '';
  const searchTerm = rawSearchTerm.toLowerCase();
  const currentPage = Number(searchParams.get('page')) || 1;
  const newsPerPage = 30;
  const trackedSearchRef = useRef(null);

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
      q: rawSearchTerm,
      page: String(page),
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
  if (!searchTerm) return;

  if (trackedSearchRef.current === searchTerm) return;

  trackedSearchRef.current = searchTerm;

  trackEvent('search', {
    query: searchTerm,
    results_count: filteredNews.length,
    source: 'tag_search',
  });
}, [searchTerm, filteredNews.length]);

  return (
    <div className="panel panel--spaced">
      <h1>
        {rawSearchTerm ? `${rawSearchTerm} - останні новини` : 'Результати пошуку'}
      </h1>

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
        <p>
          {rawSearchTerm
            ? `За тегом "${rawSearchTerm}" нічого не знайдено.`
            : 'Нічого не знайдено.'}
        </p>
      )}
    </div>
  );
};

export default SearchResults;