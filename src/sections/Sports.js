import React, { useState } from 'react';
import { useNews } from '../components/NewsContext';
import Pagination from '../components/Pagination';
import Subsections from '../subsections/Subsections';
import NewsList from '../newslist/NewsList'; // Додаємо NewsList
import '../App.css';

const Sports = () => {
  const { newsList } = useNews();
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 30;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredNews = newsList.filter((news) => news.category === 'Види спорту');

  return (
    <div className='panel'>
      <h1>СПОРТ</h1>
      <Subsections category="Види спорту" />

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

export default Sports;



