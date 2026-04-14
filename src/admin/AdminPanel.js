import React, { useState } from "react";
import AddNewsForm from "./AddNewsForm";
import EditNewsForm from "./EditNewsForm";
import NewsListAdmin from "./NewsListAdmin";
import ParsedNewsList from "./ParsedNewsList";
import AuthorsAdminPanel from "./AuthorsAdminPanel";
import { useNews } from "../components/NewsContext";
import "../styles/AdminPanel.css";

const TABS = {
  ADD_NEWS: "add_news",
  AUTHORS: "authors",
  SITE_NEWS: "site_news",
  PARSED_NEWS: "parsed_news",
};

const AdminPanel = () => {
  const { newsList, addNews, deleteNews, editNews } = useNews();

  const [parsedNews, setParsedNews] = useState([]);
  const [editingNews, setEditingNews] = useState(null);
  const [activeTab, setActiveTab] = useState(TABS.ADD_NEWS);

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
    addNews(news);
    setParsedNews(parsedNews.filter((item) => item.id !== news.id));
    setActiveTab(TABS.SITE_NEWS);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.ADD_NEWS:
        return <AddNewsForm onAdd={addNews} />;

      case TABS.AUTHORS:
        return <AuthorsAdminPanel />;

      case TABS.SITE_NEWS:
        return (
          <NewsListAdmin
            newsList={newsList}
            onEdit={handleEditClick}
            onDelete={handleDeleteNews}
          />
        );

      case TABS.PARSED_NEWS:
        return (
          <ParsedNewsList
            parsedNews={parsedNews}
            onEdit={handleEditClick}
            onDelete={handleDeleteParsedNews}
            onAddToSite={handleAddParsedNewsToSite}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-panel-page">
      <div className="admin-panel-header">
        <h1 className="admin-panel-title">Адмін-панель BigSport</h1>       
      </div>

      <div className="admin-tabs-wrap">
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === TABS.ADD_NEWS ? "active" : ""}`}
            onClick={() => setActiveTab(TABS.ADD_NEWS)}
          >
            Додати новину
          </button>

          <button
            className={`admin-tab ${activeTab === TABS.AUTHORS ? "active" : ""}`}
            onClick={() => setActiveTab(TABS.AUTHORS)}
          >
            Автори
          </button>

          <button
            className={`admin-tab ${activeTab === TABS.SITE_NEWS ? "active" : ""}`}
            onClick={() => setActiveTab(TABS.SITE_NEWS)}
          >
            Новини сайту
          </button>

          <button
            className={`admin-tab ${activeTab === TABS.PARSED_NEWS ? "active" : ""}`}
            onClick={() => setActiveTab(TABS.PARSED_NEWS)}
          >
            Парсинговані новини
          </button>
        </div>
      </div>

      <div className="admin-tab-content">
        {renderTabContent()}
      </div>

      {editingNews && (
        <EditNewsForm
          news={editingNews}
          onEdit={handleEditNews}
          onClose={handleCloseEdit}
        />
      )}
    </div>
  );
};

export default AdminPanel;