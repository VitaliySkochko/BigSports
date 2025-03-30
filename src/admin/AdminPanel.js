import React, { useState } from "react";
import AddNewsForm from "./AddNewsForm";
import EditNewsForm from "./EditNewsForm";
import NewsListAdmin from "./NewsListAdmin";
import ParsedNewsList from "./ParsedNewsList"; // Додаємо новий компонент
import { useNews } from "../components/NewsContext";
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const { newsList, addNews, deleteNews, editNews } = useNews();
  const [parsedNews, setParsedNews] = useState([]); // Список новин з парсингу
  const [editingNews, setEditingNews] = useState(null);

  const handleEditClick = (news) => {
    setEditingNews(news);
  };

  const handleCloseEdit = () => {
    setEditingNews(null);
  };

  const handleEditNews = (updatedNews) => {
    editNews(updatedNews);
    setEditingNews(null);
  };

  const handleDeleteNews = (id) => {
    deleteNews(id);
    if (editingNews && editingNews.id === id) {
      setEditingNews(null);
    }
  };

  const handleDeleteParsedNews = (id) => {
    setParsedNews(parsedNews.filter((news) => news.id !== id));
  };

  const handleAddParsedNewsToSite = (news) => {
    addNews(news); // Додаємо новину до сайту
    setParsedNews(parsedNews.filter((item) => item.id !== news.id)); // Видаляємо з парсингованих
  };

  return (
    <div className="admin_panel">
      <AddNewsForm onAdd={addNews} />
      {editingNews && (
        <>
          <EditNewsForm news={editingNews} onEdit={handleEditNews} onClose={handleCloseEdit} />
        </>
      )}
      <NewsListAdmin newsList={newsList} onEdit={handleEditClick} onDelete={handleDeleteNews} />
      <ParsedNewsList
        parsedNews={parsedNews}
        onEdit={handleEditClick}
        onDelete={handleDeleteParsedNews}
        onAddToSite={handleAddParsedNewsToSite}
      />
    </div>
  );
};

export default AdminPanel;








 



























