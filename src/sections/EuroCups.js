import React, { useState } from 'react';
import { useNews } from '../components/NewsContext';
import Pagination from '../components/Pagination';
import Subsections from '../subsections/Subsections';
import NewsList from '../newslist/NewsList'; // Новий компонент для списку новин
import '../App.css';

const EuroCups = () => {
  const { newsList } = useNews();
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 30;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Фільтруємо новини для розділу "Єврокубки"
  const filteredNews = newsList.filter((news) => news.category === 'Єврокубки');

  return (
    <div className="panel">
      <h1>ЄВРОКУБКИ</h1>
      <Subsections category="Єврокубки" />

      {/* Використовуємо NewsList для відображення новин */}
      <NewsList 
        newsList={filteredNews} 
        newsPerPage={newsPerPage} 
        currentPage={currentPage} 
      />

      {/* Додаємо пагінацію, якщо новин більше, ніж newsPerPage */}
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

export default EuroCups;


