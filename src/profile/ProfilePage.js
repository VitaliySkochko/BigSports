// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';
import '../styles/ProfilePage.css';
import AdminArticlesList from './AdminArticlesList';

const ProfilePage = () => {
  const { userId } = useParams();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [articlesCount, setArticlesCount] = useState(0);

  // ✅ хто зараз залогінений
  const [currentUid, setCurrentUid] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // edit state
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ username: '', city: '', country: '' });

  // ui state
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ✅ слухаємо авторизацію
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUid(user ? user.uid : null);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // ✅ чи може редагувати (тільки власник)
  const canEdit = !!currentUid && currentUid === userId;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.log('Користувач не знайдений');
          setUserData(null);
          return;
        }

        const user = docSnap.data();
        setUserData(user);

        // fill form
        setForm({
          username: user.username || '',
          city: user.city || '',
          country: user.country || '',
        });

        // count articles for any author (admin or not)
if (user.username) {
  const q1 = query(collection(db, 'news'), where('author', '==', user.username));
  const snap1 = await getDocs(q1);
  setArticlesCount(snap1.size);
} else {
  setArticlesCount(0);
}

      } catch (e) {
        console.error('Помилка завантаження профілю:', e);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    setIsEditing(false);
    setError('');
    setSuccess('');
    fetchUserData();
  }, [userId]);

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return 'Дата невідома';
  };

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const startEdit = () => {
    setError('');
    setSuccess('');
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setError('');
    setSuccess('');
    setForm({
      username: userData?.username || '',
      city: userData?.city || '',
      country: userData?.country || '',
    });
    setIsEditing(false);
  };

  const validate = () => {
    const u = form.username.trim();
    if (!u) return "Ім'я користувача не може бути порожнім";
    if (u.length < 3) return "Ім'я користувача має бути мінімум 3 символи";
    if (u.length > 30) return "Ім'я користувача має бути максимум 30 символів";
    return '';
  };

  // ✅ якщо адмін змінив username — оновлюємо всі news.author зі старого на новий
  const migrateAdminAuthorName = async (oldUsername, newUsername) => {
    if (!oldUsername || !newUsername || oldUsername === newUsername) return;

    const qNews = query(collection(db, 'news'), where('author', '==', oldUsername));
    const snap = await getDocs(qNews);
    if (snap.empty) return;

    const docs = snap.docs;
    let i = 0;

    while (i < docs.length) {
      const batch = writeBatch(db);
      const chunk = docs.slice(i, i + 500);

      chunk.forEach((d) => {
        batch.update(d.ref, { author: newUsername });
      });

      await batch.commit();
      i += 500;
    }
  };

  const saveProfile = async () => {
    setError('');
    setSuccess('');

    // ✅ додатковий захист
    if (!canEdit) {
      setError('Ви не можете редагувати чужий профіль.');
      return;
    }

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSaving(true);
    try {
      const oldUsername = userData?.username || '';
      const newUsername = form.username.trim();

      const payload = {
        username: newUsername,
        city: form.city.trim(),
        country: form.country.trim(),
      };

      // 1) update user
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, payload);

      // 2) if admin and username changed => update all news.author
      if (userData?.role === 'admin' && oldUsername && newUsername && oldUsername !== newUsername) {
        await migrateAdminAuthorName(oldUsername, newUsername);
      }

      // 3) update local state
      setUserData((prev) => ({ ...prev, ...payload }));
      setIsEditing(false);
      setSuccess('Профіль успішно оновлено ✅');

      // 4) recount articles (by new username)
      if (userData?.role === 'admin') {
        const q2 = query(collection(db, 'news'), where('author', '==', newUsername));
        const snap2 = await getDocs(q2);
        setArticlesCount(snap2.size);
      }
    } catch (e) {
      console.error('Помилка збереження профілю:', e);
      setError('Не вдалося зберегти зміни. Спробуйте ще раз.');
    } finally {
      setSaving(false);
    }
  };

  // ✅ Loader (чекаємо і auth, і профіль)
  if (loading || authLoading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-loading">
            <div className="spinner" />
            <div className="loading-text">Завантажуємо профіль...</div>

            <div className="profile-skeleton">
              <div className="sk-row" />
              <div className="sk-row" />
              <div className="sk-row" />
              <div className="sk-row" />
              <div className="sk-row" />
              <div className="sk-row" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) return <p>Користувач не знайдений</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Профіль користувача</h1>

        {(error || success) && (
          <div className={`profile-alert ${error ? 'error' : 'success'}`}>
            {error || success}
          </div>
        )}

        {/* ✅ кнопки редагування тільки для власника профілю */}
        {canEdit && (
          <div className="profile-actions">
            {!isEditing ? (
              <button className="profile-btn" onClick={startEdit}>
                Редагувати
              </button>
            ) : (
              <>
                <button className="profile-btn primary" onClick={saveProfile} disabled={saving}>
                  {saving ? 'Збереження...' : 'Зберегти'}
                </button>
                <button className="profile-btn" onClick={cancelEdit} disabled={saving}>
                  Скасувати
                </button>
              </>
            )}
          </div>
        )}

        <table className="profile-table">
          <tbody>
            <tr>
              <th>Ім'я користувача</th>
              <td>
                {!isEditing ? (
                  userData.username
                ) : (
                  <input
                    className="profile-input"
                    value={form.username}
                    onChange={onChange('username')}
                    placeholder="Введіть ім'я користувача"
                    disabled={saving}
                  />
                )}
              </td>
            </tr>

            <tr>
              <th>Email</th>
              <td>{userData.email}</td>
            </tr>

            <tr>
              <th>Дата реєстрації</th>
              <td>{formatDate(userData.createdAt)}</td>
            </tr>

            <tr>
              <th>Місто</th>
              <td>
                {!isEditing ? (
                  userData.city || '—'
                ) : (
                  <input
                    className="profile-input"
                    value={form.city}
                    onChange={onChange('city')}
                    placeholder="Наприклад: Київ"
                    disabled={saving}
                  />
                )}
              </td>
            </tr>

            <tr>
              <th>Країна</th>
              <td>
                {!isEditing ? (
                  userData.country || '—'
                ) : (
                  <input
                    className="profile-input"
                    value={form.country}
                    onChange={onChange('country')}
                    placeholder="Наприклад: Україна"
                    disabled={saving}
                  />
                )}
              </td>
            </tr>

            <tr>
              <th>Роль</th>
              <td className={userData.role === 'admin' ? 'role-admin' : 'role-user'}>
                {userData.role === 'admin' ? 'Адміністратор' : 'Користувач'}
              </td>
            </tr>

            {userData.role === 'admin' && (
              <tr>
                <th>Кількість написаних новин</th>
                <td>{articlesCount}</td>
              </tr>
            )}
          </tbody>
        </table>

        <tr>
  <th>Кількість написаних новин</th>
  <td>{articlesCount}</td>
</tr>
{userData?.username && <AdminArticlesList username={userData.username} />}

      </div>
    </div>
  );
};

export default ProfilePage;
