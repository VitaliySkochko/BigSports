/*цей компонент забезпечує інтерфейс для адміністратора, для управління новинами. Компонент дозволяє додавати,
 редагувати та видаляти новини, а також використовує пагінацію для відображення новин у зручному форматі.*/ 

 import React, { useState } from "react";
 import AddNewsForm from "./AddNewsForm";
 import EditNewsForm from "./EditNewsForm";
 import NewsItem from "./NewsItem";
 import Pagination from "./Pagination";
 import { useNews } from "./NewsContext";
 
 const AdminPanel = () => {
   const { newsList, addNews, deleteNews, editNews } = useNews();
   const [editingNews, setEditingNews] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const newsPerPage = 10;
 
   const handleEditClick = (news) => {
     setEditingNews(news);
   };
 
   const handleEditNews = (updatedNews) => {
     editNews(updatedNews);
     setEditingNews(null); // Сбрасываем состояние редактирования
   };
 
   const handleDeleteNews = (id) => {
     deleteNews(id);
     // После удаления новости, проверяем, была ли удалена редактируемая новость
     if (editingNews && editingNews.id === id) {
       setEditingNews(null); // Сбрасываем состояние редактирования, если удалена текущая новость
     }
   };
 
   const handlePageChange = (page) => {
     setCurrentPage(page);
   };
 
   const indexOfLastNews = currentPage * newsPerPage;
   const indexOfFirstNews = indexOfLastNews - newsPerPage;
   const currentNewsList = newsList.slice(indexOfFirstNews, indexOfLastNews);
   const totalPages = Math.ceil(newsList.length / newsPerPage);
 
   return (
     <div className="admin_panel">
       <h2>Добавити новину</h2>
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
 



























