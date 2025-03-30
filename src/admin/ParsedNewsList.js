import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import Pagination from "../components/Pagination";
import EditNewsForm from "../admin/EditNewsForm"; 
import "../styles/ParsedNewsList.css";

const ParsedNewsList = () => {
  const [parsedNews, setParsedNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 10;
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    const fetchParsedNews = async () => {
      const querySnapshot = await getDocs(collection(db, "parsed_news"));
      const newsArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setParsedNews(newsArray);
    };

    fetchParsedNews();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "parsed_news", id));
    setParsedNews(parsedNews.filter((news) => news.id !== id));
  };

  const handlePublish = async (news) => {
    const now = new Date();
  
    const publishedNews = {
      id: news.id,
      title: news.title || '',
      category: news.category || '',
      sections: news.sections || [],
      image: news.image || '',
      content: news.content || '',
      author: news.author || 'Невідомий автор',
      day: String(now.getDate()).padStart(2, '0'),
      month: String(now.getMonth() + 1).padStart(2, '0'),
      year: String(now.getFullYear()),
      time: now.toTimeString().slice(0, 5),
      timestamp: now,
      topNews: news.topNews || false,
      status: "Опубліковано",
    };
  
    try {
      await setDoc(doc(db, "news", news.id), publishedNews);
      await deleteDoc(doc(db, "parsed_news", news.id));
      setParsedNews(parsedNews.filter((item) => item.id !== news.id));
      alert("Новину опубліковано!");
    } catch (error) {
      console.error("Помилка при публікації новини:", error);
      alert("Сталася помилка при публікації.");
    }
  };
  
  const handleEditClick = (news) => {
    setEditingNews(news);
  };

  const handleSaveEdit = async (updatedNews) => {
    await updateDoc(doc(db, "parsed_news", updatedNews.id), updatedNews);

    setParsedNews((prev) =>
      prev.map((news) =>
        news.id === updatedNews.id ? updatedNews : news
      )
    );

    setEditingNews(null);
  };

  const handleCloseEdit = () => {
    setEditingNews(null);
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNewsList = parsedNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(parsedNews.length / newsPerPage);

  return (
    <div className="parsed-news-container">
      <div className="panel">
            <h1>Парсинговані новини</h1>
            </div>
      {editingNews && (
        <EditNewsForm news={editingNews} onEdit={handleSaveEdit} onClose={handleCloseEdit} />
      )}

      <table className="news-table">
        <thead>
          <tr>
            <th>Заголовок</th>
            <th>Категорія</th>
            <th>Розділи</th>
            <th>Дата</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {currentNewsList.map((news) => (
            <tr key={news.id}>
              <td>{news.title}</td>
              <td>{news.category || "Немає категорії"}</td>
              <td>{Array.isArray(news.sections) ? news.sections.join(', ') : "Немає розділів"}</td>
              <td>{`${news.day}.${news.month}.${news.year} ${news.time}`}</td>
              <td>
                <button className="button edit-button" onClick={() => handleEditClick(news)}>Редагувати</button>
                <button className="button add-button" onClick={() => handlePublish(news)}>Опублікувати</button>
                <button className="button delete-button" onClick={() => handleDelete(news.id)}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {parsedNews.length > newsPerPage && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
};

export default ParsedNewsList;


