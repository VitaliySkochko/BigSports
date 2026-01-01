import React, { useEffect, useMemo, useState } from 'react';
import { useNews } from '../components/NewsContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import '../styles/AuthorsRankingPage.css';

const AuthorsRankingPage = () => {
  const { newsList } = useNews();

  // username -> { id, createdAt }
  const [usersMap, setUsersMap] = useState({});

  /* 1) Завантажуємо користувачів */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const map = {};

        snapshot.forEach((d) => {
          const data = d.data();
          if (!data?.username) return;

          map[String(data.username).trim()] = {
            id: d.id,
            createdAt: data.createdAt || null,
          };
        });

        setUsersMap(map);
      } catch (error) {
        console.error('Помилка завантаження користувачів:', error);
      }
    };

    fetchUsers();
  }, []);

  /* 2) Рахуємо рейтинг */
  const ranking = useMemo(() => {
    const map = new Map();

    (newsList || []).forEach((news) => {
      if (!news?.author) return;

      const author = String(news.author).trim();
      if (!author) return;

      const views = Number(news.views || 0);

      if (!map.has(author)) {
        map.set(author, { author, articles: 0, views: 0 });
      }

      const row = map.get(author);
      row.articles += 1;
      row.views += views;
    });

    return Array.from(map.values())
      .map((r) => {
        const user = usersMap[r.author];
        return {
          ...r,
          points: r.articles * 1 + r.views * 3,
          userId: user?.id || null,
          createdAt: user?.createdAt || null,
        };
      })
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.views !== a.views) return b.views - a.views;
        return b.articles - a.articles;
      });
  }, [newsList, usersMap]);

  /* 3) Формат дати */
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

      {/* ✅ мобільна адаптація: обгортка зі скролом */}
      <div className="ranking-table-wrap">
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
                <td className="col-rank">{index + 1}</td>

                <td className="author-name">
                  {row.userId ? (
                    <Link to={`/profile/${row.userId}`} className="author-link">
                      {row.author}
                    </Link>
                  ) : (
                    row.author
                  )}
                </td>

                <td className="col-date">{formatDate(row.createdAt)}</td>
                <td className="col-num">{row.articles}</td>
                <td className="col-num">{row.views}</td>
                <td className="points col-num">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthorsRankingPage;
