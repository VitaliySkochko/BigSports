import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNews } from '../components/NewsContext';
import Pagination from '../components/Pagination';
import NewsList from '../newslist/NewsList';
import AnimatedNewsBlock from '../components/AnimatedNewsBlock';
import '../App.css';

const AllNewsPage = () => {
  const { newsList } = useNews();
  const [searchParams, setSearchParams] = useSearchParams();

  const newsPerPage = 30;
  const currentPage = Number(searchParams.get('page')) || 1;

  const totalPages = Math.ceil(newsList.length / newsPerPage);

  const handlePageChange = (page) => {
    setSearchParams({ page: String(page) });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="panel panel--spaced">
      <h1>ВСІ НОВИНИ</h1>

      <AnimatedNewsBlock currentPage={currentPage}>
        <NewsList
          newsList={newsList}
          newsPerPage={newsPerPage}
          currentPage={currentPage}
        />
      </AnimatedNewsBlock>

      {newsList.length > newsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AllNewsPage;