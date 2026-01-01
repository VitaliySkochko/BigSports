import React, { useEffect, useMemo, useState } from 'react';
import { useNews } from '../components/NewsContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/AuthorsRankingPage.css';

const AuthorsRankingPage = () => {
  const { newsList } = useNews();
  const [usersMap, setUsersMap] = useState({}); // username -> createdAt

  /* ===============================
     1. Завантажуємо користувачів
     =============================== */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const map = {};

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.username && data.createdAt) {
            map[data.username] = data.createdAt;
          }
        });

        setUsersMap(map);
      } catch (error) {
        console.error('Помилка завантаження користувачів:', error);
      }
    };

    fetchUsers();
  }, []);

  /* ===============================
     2. Рахуємо рейтинг
     =============================== */
  const ranking = useMemo(() => {
    const map = new Map();

    (newsList || []).forEach((news) => {
      if (!news.author) return;

      const author = news.author.trim();
      const views = Number(news.views || 0);

      if (!map.has(author)) {
        map.set(author, {
          author,
          articles: 0,
          views: 0,
        });
      }

      const row = map.get(author);
      row.articles += 1;
      row.views += views;
    });

    return Array.from(map.values())
      .map((r) => ({
        ...r,
        points: r.articles * 1 + r.views * 3,
        createdAt: usersMap[r.author] || null,
      }))
      .sort((a, b) => b.points - a.points);
  }, [newsList, usersMap]);

  /* ===============================
     3. Формат дати
     =============================== */
  const formatDate = (ts) => {
    if (!ts?.seconds) return '—';
    const date = new Date(ts.seconds * 1000);
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="authors-ranking-page">
      <h1>🏆 Рейтинг авторів</h1>

     

      <table className="ranking-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Автор</th>
            <th>Початок роботи</th>
            <th>Статті</th>
            <th>Перегляди</th>
            <th>Очки</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((row, index) => (
            <tr key={row.author}>
              <td>{index + 1}</td>
              <td className="author-name">{row.author}</td>
              <td>{formatDate(row.createdAt)}</td>
              <td>{row.articles}</td>
              <td>{row.views}</td>
              <td className="points">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorsRankingPage;
