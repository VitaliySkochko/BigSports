/*Цей код представляє компонент на React, який відображає головну сторінку веб-сайту з новинами про футбол. */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from './NewsContext';
import Pagination from './Pagination';
import '../App.css'


const Home = () => {
  const { newsList } = useNews(); // для отримання списку новин
  const [currentPage, setCurrentPage] = useState(1); // визначає початкову сторінку для відображення.
  const newsPerPage = 10; // встановлено кількість новин на сторінку

  const handlePageChange = (page) => { //Змінює поточну сторінку при виборі нової сторінки в компоненті пагінації.
    setCurrentPage(page);
  };

  // Розрахунок новин, які мають бути відображені на поточній сторінці, і кількість сторінок для пагінації

  const indexOfLastNews = currentPage * newsPerPage; //Обчислює індекс останньої новини на поточній сторінці.
  const indexOfFirstNews = indexOfLastNews - newsPerPage; //Обчислює індекс першої новини на поточній сторінці.
  const currentNewsList = newsList.slice(indexOfFirstNews, indexOfLastNews); // Отримання новин для відображення на поточній сторінці.
  const totalPages = Math.ceil(newsList.length / newsPerPage); // Розрахунок загальної кількості сторінок для пагінації 

  return (
    <div className='panel'>
      <h1>Останні новини футболу України</h1>
      {currentNewsList.map((news) => (
        <div key={news.id}>
          <Link to={`/news/${news.id}`}>
            <h2>{news.title}</h2>
          </Link>
          <p>Дата: {news.day}.{news.month}.{news.year}</p>
        </div>
      ))}
      {newsList.length > 10 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;



























