

import React, { useState } from 'react';
import { useNews } from '../components/NewsContext';
import Pagination from '../components/Pagination';
import Subsections from '../subsections/Subsections';
import NewsList from '../newslist/NewsList'; // Підключаємо NewsList
import '../App.css';

const Championships = () => {
  const { newsList } = useNews();
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 30;

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  const filteredNews = newsList.filter((news) => news.category === 'Чемпіонати');

  return (
    <div className='panel'>
      <h1>ЧЕМПІОНАТИ</h1>
      <Subsections category="Чемпіонати" />

      {/* Використовуємо NewsList для відображення новин */}
      <NewsList 
        newsList={filteredNews} 
        newsPerPage={newsPerPage} 
        currentPage={currentPage} 
      />

      {/* Пагінація */}
      {filteredNews.length > newsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredNews.length / newsPerPage)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Championships;























