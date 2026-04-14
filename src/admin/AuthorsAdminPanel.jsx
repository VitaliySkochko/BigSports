import React, { useEffect, useMemo, useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
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
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
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

  const sortedUsers = useMemo(() => {
    return users
      .filter((u) => u?.username)
      .sort((a, b) =>
        String(a.username).localeCompare(String(b.username), 'uk')
      );
  }, [users]);

  const adminUsers = useMemo(() => {
    return sortedUsers.filter((u) => u.role === 'admin');
  }, [sortedUsers]);

  const regularUsers = useMemo(() => {
    return sortedUsers.filter((u) => u.role !== 'admin');
  }, [sortedUsers]);

  const fireAuthor = async (userId) => {
    setError('');
    setBusyId(userId);

    try {
      await updateDoc(doc(db, 'users', userId), {
        role: 'user',
        endedAt: serverTimestamp(),
      });

      await fetchUsers();
    } catch (e) {
      console.error(e);
      setError('Не вдалося звільнити автора');
    } finally {
      setBusyId(null);
    }
  };

  const hireAuthor = async (userId) => {
    setError('');
    setBusyId(userId);

    try {
      await updateDoc(doc(db, 'users', userId), {
        role: 'admin',
        endedAt: null,
        hiredAt: serverTimestamp(),
      });

      await fetchUsers();
    } catch (e) {
      console.error(e);
      setError('Не вдалося найняти автора');
    } finally {
      setBusyId(null);
    }
  };

  const formatDate = (ts) => {
    if (!ts?.seconds) return '—';

    const d = new Date(ts.seconds * 1000);
    return d.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderTable = ({ title, usersList, isAdminTable }) => (
    <div className="authors-admin-block">
      <div className="authors-admin-subhead">
        <h3>{title}</h3>
        <span className="authors-admin-count">{usersList.length}</span>
      </div>

      <div className="authors-admin-table-wrap">
        <table className="authors-admin-table">
          <thead>
            <tr>
              <th>Ім’я</th>
              <th>Email</th>
              <th>Роль</th>
              <th>Створено</th>
              <th>{isAdminTable ? 'Активний з' : 'Звільнений'}</th>
              <th>Дія</th>
            </tr>
          </thead>
          <tbody>
            {usersList.length === 0 ? (
              <tr>
                <td colSpan="6" className="authors-admin-empty">
                  Немає записів
                </td>
              </tr>
            ) : (
              usersList.map((u) => {
                const isBusy = busyId === u.id;

                return (
                  <tr key={u.id}>
                    <td className="col-author">{u.username}</td>
                    <td className="col-email">{u.email || '—'}</td>
                    <td className={u.role === 'admin' ? 'role-admin' : 'role-user'}>
                      {u.role || 'user'}
                    </td>
                    <td>{formatDate(u.createdAt)}</td>
                    <td>
                      {isAdminTable
                        ? formatDate(u.hiredAt || u.createdAt)
                        : formatDate(u.endedAt)}
                    </td>
                    <td>
                      {isAdminTable ? (
                        <button
                          className="btn-fire"
                          onClick={() => fireAuthor(u.id)}
                          disabled={isBusy}
                        >
                          {isBusy ? '...' : 'Звільнити'}
                        </button>
                      ) : (
                        <button
                          className="btn-restore"
                          onClick={() => hireAuthor(u.id)}
                          disabled={isBusy}
                        >
                          {isBusy ? '...' : 'Найняти'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return <div className="authors-admin">Завантаження користувачів...</div>;
  }

  return (
    <div className="authors-admin">
      <div className="authors-admin-head">
        <h2>Керування авторами</h2>
        <button className="authors-admin-refresh" onClick={fetchUsers}>
          Оновити
        </button>
      </div>

      {error && <div className="authors-admin-error">{error}</div>}

      {renderTable({
        title: 'Автори / Адміністратори',
        usersList: adminUsers,
        isAdminTable: true,
      })}

      {renderTable({
        title: 'Користувачі',
        usersList: regularUsers,
        isAdminTable: false,
      })}

      <div className="authors-admin-hint">
        * “Звільнити” переносить автора в таблицю користувачів і ставить
        <b> role=user</b>. <br />
        * “Найняти” переносить користувача в таблицю авторів і ставить
        <b> role=admin</b>.
      </div>
    </div>
  );
};

export default AuthorsAdminPanel;