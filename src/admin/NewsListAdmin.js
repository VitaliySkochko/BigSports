import React, { useState } from "react";
import NewsTitleAdmin from "./NewsTitleAdmin";
import Pagination from "../components/Pagination";
import '../styles/NewsListAdmin.css';

const NewsListAdmin = ({ newsList, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 20;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNewsList = newsList.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(newsList.length / newsPerPage);

  return (
    <div>
      <div className="panel">
            <h1>Список новин</h1>
            </div>
      <table className="news-table">
        <thead>
          <tr>
            <th>Заголовок</th>
            <th>Категорія</th>
            <th>Розділ</th>
            <th>Автор</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {currentNewsList.map((news) => (
            <tr key={news.id}>
              <td><NewsTitleAdmin news={news} /></td>
              <td>{news.category || "Немає категорії"}</td>
              <td>{news.sections && news.sections.length > 0 ? news.sections.join(', ') : "Немає розділу"}</td>

              <td>{news.author || "Невідомий"}</td>
              <td>
                <button className="button edit-button" onClick={() => onEdit(news)}>Редагувати</button>
                <button className="button delete-button" onClick={() => onDelete(news.id)}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default NewsListAdmin;

