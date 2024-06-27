/*цей компонент забезпечує інтерфейс для адміністратора, для управління новинами. Компонент дозволяє додавати,
 редагувати та видаляти новини, а також використовує пагінацію для відображення новин у зручному форматі.*/ 

import React, { useState } from 'react';
import AddNewsForm from './AddNewsForm';
import EditNewsForm from './EditNewsForm';
import NewsItem from './NewsItem'; // Відображення окремої новини в адмінпанелі
import Pagination from './Pagination';
import { useNews } from './NewsContext'; 

const AdminPanel = () => {
  const { newsList, addNews, deleteNews, editNews } = useNews(); // Отримання списку новин і функцій для їх управління з контексту новин
  const [editingNews, setEditingNews] = useState(null); // Для зберігання новини, яка в даний момент редагується
  const [currentPage, setCurrentPage] = useState(1); // Для зберігання поточної сторінки пагінації.
  const newsPerPage = 10;

  // Фунуції обробки

  const handleEditClick = (news) => { //встановлює новину, яка буде редагуватися.
    setEditingNews(news);
  };

  const handleEditNews = (updatedNews) => { //викликає функцію редагування новини і очищає стан редагування.
    editNews(updatedNews);
    setEditingNews(null);
  };

  const handleDeleteNews = (id) => { //видаляє новину за допомогою її id.
    deleteNews(id);
  };

  const handlePageChange = (page) => { //змінює поточну сторінку.
    setCurrentPage(page);
  };

  // Розрахунок новин, які мають бути відображені на поточній сторінці, і кількість сторінок для пагінації

  const indexOfLastNews = currentPage * newsPerPage; //Обчислює індекс останньої новини на поточній сторінці.
  const indexOfFirstNews = indexOfLastNews - newsPerPage; //Обчислює індекс першої новини на поточній сторінці.
  const currentNewsList = newsList.slice(indexOfFirstNews, indexOfLastNews); // Отримання новин для відображення на поточній сторінці.
  const totalPages = Math.ceil(newsList.length / newsPerPage); // Розрахунок загальної кількості сторінок для пагінації 

  return (
    <div className='admin_panel'>
      <h2>Додати новину</h2>
      <AddNewsForm onAdd={addNews} />

      {editingNews && (
        <>
          <h2>Редагувати новину</h2>
          <EditNewsForm news={editingNews} onEdit={handleEditNews} />
        </>
      )}

      <h2>Список новин</h2>
      {currentNewsList.map((news) => (
        <NewsItem key={news.id} news={news} onDelete={handleDeleteNews} onEdit={handleEditClick} />
      ))}

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

export default AdminPanel;



























