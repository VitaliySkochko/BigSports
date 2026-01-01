import React, { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/AuthorsAdminPanel.css';

const AuthorsAdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setError('');
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'users'));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setUsers(list);
    } catch (e) {
      console.error(e);
      setError('Не вдалося завантажити користувачів');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const authors = useMemo(() => {
    // показуємо всіх, у кого є username (і бажано createdAt)
    return users
      .filter(u => u?.username)
      .sort((a, b) => String(a.username).localeCompare(String(b.username), 'uk'));
  }, [users]);

  const fireAuthor = async (userId) => {
    setError('');
    setBusyId(userId);
    try {
      await updateDoc(doc(db, 'users', userId), {
        role: 'user',
        endedAt: serverTimestamp(), // ✅ дата "звільнення"
      });
      await fetchUsers();
    } catch (e) {
      console.error(e);
      setError('Не вдалося звільнити автора');
    } finally {
      setBusyId(null);
    }
  };

  const restoreAuthor = async (userId) => {
    setError('');
    setBusyId(userId);
    try {
      await updateDoc(doc(db, 'users', userId), {
        role: 'admin',
        endedAt: null, // ✅ знову працює
      });
      await fetchUsers();
    } catch (e) {
      console.error(e);
      setError('Не вдалося повернути автора');
    } finally {
      setBusyId(null);
    }
  };

  const formatDate = (ts) => {
    if (!ts?.seconds) return '—';
    const d = new Date(ts.seconds * 1000);
    return d.toLocaleDateString('uk-UA', { year: 'numeric', month: 'short', day: 'numeric' });
    };

  if (loading) return <div className="authors-admin">Завантаження авторів...</div>;

  return (
    <div className="authors-admin">
      <div className="authors-admin-head">
        <h2>Автори / Доступ до адмінки</h2>
        <button className="authors-admin-refresh" onClick={fetchUsers}>
          Оновити
        </button>
      </div>

      {error && <div className="authors-admin-error">{error}</div>}

      <div className="authors-admin-table-wrap">
        <table className="authors-admin-table">
          <thead>
            <tr>
              <th>Автор</th>
              <th>Email</th>
              <th>Роль</th>
              <th>Початок</th>
              <th>Кінець</th>
              <th>Дія</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((u) => {
              const ended = u.endedAt ? formatDate(u.endedAt) : 'Працює';
              const isAdmin = u.role === 'admin';

              return (
                <tr key={u.id}>
                  <td className="col-author">{u.username}</td>
                  <td className="col-email">{u.email || '—'}</td>
                  <td className={isAdmin ? 'role-admin' : 'role-user'}>
                    {isAdmin ? 'admin' : 'user'}
                  </td>
                  <td>{formatDate(u.createdAt)}</td>
                  <td>{ended}</td>
                  <td>
                    {isAdmin ? (
                      <button
                        className="btn-fire"
                        onClick={() => fireAuthor(u.id)}
                        disabled={busyId === u.id}
                      >
                        {busyId === u.id ? '...' : 'Звільнити'}
                      </button>
                    ) : (
                      <button
                        className="btn-restore"
                        onClick={() => restoreAuthor(u.id)}
                        disabled={busyId === u.id}
                      >
                        {busyId === u.id ? '...' : 'Повернути'}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="authors-admin-hint">
        * “Звільнити” ставить <b>role=user</b> та <b>endedAt=поточна дата</b>. Статті автора не видаляються.
      </div>
    </div>
  );
};

export default AuthorsAdminPanel;
