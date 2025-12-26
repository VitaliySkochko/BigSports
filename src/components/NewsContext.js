import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [newsList, setNewsList] = useState([]);

  // ✅ ключ для Splash: "перший запит завершився"
  const [firstLoadDone, setFirstLoadDone] = useState(false);

  // (не обов’язково, але корисно)
  const [newsError, setNewsError] = useState(null);

  useEffect(() => {
    let alive = true;

    const fetchNews = async () => {
      try {
        setNewsError(null);

        const newsCollection = collection(db, 'news');
        const newsSnapshot = await getDocs(newsCollection);

        const newsData = newsSnapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        }));

        // ✅ безпечне сортування (timestamp може бути undefined/null)
        newsData.sort((a, b) => {
          const at = a?.timestamp?.seconds ? a.timestamp.seconds : 0;
          const bt = b?.timestamp?.seconds ? b.timestamp.seconds : 0;
          return bt - at;
        });

        if (alive) setNewsList(newsData);
      } catch (err) {
        console.error('Error loading news:', err);
        if (alive) setNewsError(err);
      } finally {
        // ✅ навіть якщо новин 0 або була помилка — запит завершився
        if (alive) setFirstLoadDone(true);
      }
    };

    fetchNews();
    return () => { alive = false; };
  }, []);

  const addNews = async (newNews) => {
    try {
      const newsWithTimestamp = {
        ...newNews,
        timestamp: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'news'), newsWithTimestamp);

      // ⚠️ serverTimestamp() локально буде null, тому для UI ставимо "now"
      const optimistic = {
        id: docRef.id,
        ...newNews,
        timestamp: { seconds: Math.floor(Date.now() / 1000) }
      };

      setNewsList(prev => [optimistic, ...prev]);
    } catch (error) {
      console.error('Error adding news: ', error);
      throw error;
    }
  };

  const editNews = async (updatedNews) => {
    try {
      const { id, ...data } = updatedNews;
      const newsDoc = doc(db, 'news', id);

      await updateDoc(newsDoc, data);

      setNewsList(prev => {
        const next = prev.map(n => (n.id === id ? updatedNews : n));
        next.sort((a, b) => {
          const at = a?.timestamp?.seconds ? a.timestamp.seconds : 0;
          const bt = b?.timestamp?.seconds ? b.timestamp.seconds : 0;
          return bt - at;
        });
        return next;
      });
    } catch (error) {
      console.error('Error updating news: ', error);
      throw error;
    }
  };

  const deleteNews = async (id) => {
    try {
      await deleteDoc(doc(db, 'news', id));
      setNewsList(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting news: ', error);
      throw error;
    }
  };

  return (
    <NewsContext.Provider
      value={{
        newsList,
        firstLoadDone,   // ✅ додали
        newsError,       // ✅ опціонально
        addNews,
        deleteNews,
        editNews
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
