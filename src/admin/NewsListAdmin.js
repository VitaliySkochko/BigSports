import React, { useState } from "react";
import NewsTitleAdmin from "./NewsTitleAdmin";
import Pagination from "../components/Pagination";
import '../styles/NewsListAdmin.css';

const NewsListAdmin = ({ newsList, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 20;

  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNewsList = newsList.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(newsList.length / newsPerPage);

  // Форматер дати
  const getDateParts = (news) => {
    if (news?.day && news?.month && news?.year) {
      const pad = (n) => String(n).padStart(2, '0');
      return {
        date: `${pad(news.day)}.${pad(news.month)}.${news.year}`,
        time: news.time || ''
      };
    }

    let d = null;
    if (news?.createdAt) {
      try {
        if (typeof news.createdAt.toDate === 'function') {
          d = news.createdAt.toDate();
        } else if (typeof news.createdAt === 'number') {
          d = new Date(news.createdAt);
        } else if (news.createdAt?.seconds) {
          d = new Date(news.createdAt.seconds * 1000);
        }
      } catch (_) {}
    }

    if (!d && news?.date) {
      const tryDate = new Date(news.date);
      if (!isNaN(tryDate)) d = tryDate;
    }

    if (!d || isNaN(d)) return { date: '', time: '' };

    const pad = (n) => String(n).padStart(2, '0');
    return {
      date: `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`,
      time: `${pad(d.getHours())}:${pad(d.getMinutes())}`
    };
  };

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
            <th>Дата</th>
            <th>Час</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {currentNewsList.map((news) => {
            const { date, time } = getDateParts(news);
            return (
              <tr key={news.id}>
                <td><NewsTitleAdmin news={news} /></td>
                <td>{news.category || "Немає категорії"}</td>
                <td>
                  {Array.isArray(news.sections) && news.sections.length > 0
                    ? news.sections.join(", ")
                    : "Немає розділу"}
                </td>
                <td>{news.author || "Невідомий"}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td>
                  <button className="button edit-button" onClick={() => onEdit(news)}>Редагувати</button>
                  <button className="button delete-button" onClick={() => onDelete(news.id)}>Видалити</button>
                </td>
              </tr>
            );
          })}
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
