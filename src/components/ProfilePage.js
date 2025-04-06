import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [articlesCount, setArticlesCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const user = docSnap.data();
          setUserData(user);

          // Якщо адміністратор — підраховуємо новини
          if (user.role === 'admin') {
            const q = query(
              collection(db, 'news'),
              where('author', '==', user.username)
            );

            const querySnapshot = await getDocs(q);
            setArticlesCount(querySnapshot.size);
          }
        } else {
          console.log('Користувач не знайдений');
        }
      } catch (error) {
        console.error('Помилка завантаження профілю:', error);
      } finally {
        setLoading(false);
      }
    };

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

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (!userData) {
    return <p>Користувач не знайдений</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Профіль користувача</h1>
        <table className="profile-table">
          <tbody>
            <tr>
              <th>Ім'я користувача</th>
              <td>{userData.username}</td>
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
              <td>{userData.city}</td>
            </tr>
            <tr>
              <th>Країна</th>
              <td>{userData.country}</td>
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
      </div>
    </div>
  );
};

export default ProfilePage;







