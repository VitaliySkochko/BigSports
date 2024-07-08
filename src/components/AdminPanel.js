/*цей компонент забезпечує інтерфейс для адміністратора, для управління новинами. Компонент дозволяє додавати,
 редагувати та видаляти новини, а також використовує пагінацію для відображення новин у зручному форматі.*/ 

 import React, { useState } from "react";
 import AddNewsForm from "./AddNewsForm";
 import EditNewsForm from "./EditNewsForm";
 import NewsItem from "./NewsItem";
 import Pagination from "./Pagination";
 import { useNews } from "./NewsContext"; 
 
 const AdminPanel = () => {
   const { newsList, addNews, deleteNews, editNews } = useNews(); // Получение списка новостей и функций для управления из контекста
   const [editingNews, setEditingNews] = useState(null); // Для хранения новости, которая редактируется
   const [currentPage, setCurrentPage] = useState(1); // Для хранения текущей страницы пагинации
   const newsPerPage = 10;
 
   // Функции обработчики
 
   const handleEditClick = (news) => {
     setEditingNews(news);
   };
 
   const handleEditNews = (updatedNews) => {
     editNews(updatedNews);
     setEditingNews(null);
   };
 
   const handleDeleteNews = (id) => {
     deleteNews(id);
   };
 
   const handlePageChange = (page) => {
     setCurrentPage(page);
   };
 
   // Расчет новостей для отображения на текущей странице и количество страниц для пагинации
 
   const indexOfLastNews = currentPage * newsPerPage;
   const indexOfFirstNews = indexOfLastNews - newsPerPage;
   const currentNewsList = newsList.slice(indexOfFirstNews, indexOfLastNews);
   const totalPages = Math.ceil(newsList.length / newsPerPage);
 
   return (
     <div className="admin_panel">
       <h2>Добавить новость</h2>
       <AddNewsForm onAdd={addNews} />
 
       {editingNews && (
         <>
           <h2>Редактировать новость</h2>
           <EditNewsForm news={editingNews} onEdit={handleEditNews} />
         </>
       )}
 
       <h2>Список новостей</h2>
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
 



























