import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNews } from '../components/NewsContext';
import Pagination from '../components/Pagination';
import Subsections from '../subsections/Subsections';
import NewsList from '../newslist/NewsList';
import AnimatedNewsBlock from '../components/AnimatedNewsBlock';
import '../App.css';

const Championships = () => {
  const { newsList } = useNews();
  const [searchParams, setSearchParams] = useSearchParams();

  const newsPerPage = 30;
  const currentPage = Number(searchParams.get('page')) || 1;

  const filteredNews = newsList.filter(
    (news) => news.category === 'Чемпіонати'
  );

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  const handlePageChange = (page) => {
    setSearchParams({ page: String(page) });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="panel panel--spaced">
      <h1>ЧЕМПІОНАТИ</h1>
      <Subsections category="Чемпіонати" />

      <AnimatedNewsBlock currentPage={currentPage}>
        <NewsList
          newsList={filteredNews}
          newsPerPage={newsPerPage}
          currentPage={currentPage}
        />
      </AnimatedNewsBlock>

      {filteredNews.length > newsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Championships;