/* Цей код створює контекст новин для зберігання та передавання списку новин, 
а також функцій для додавання, редагування та видалення новин*/

import React, { createContext, useContext, useState } from 'react'; // необхідні функції з React:

const NewsContext = createContext(); // Створення контексту NewsContext, для передачі даних і функцій, пов'язаних із новинами.

export const useNews = () => { // Є кастомним хуком, який дозволяє зручно використовувати контекст NewsContext у будь-якому компоненті. 
  return useContext(NewsContext);
};

export const NewsProvider = ({ children }) => { // NewsProvider є обгорткою, яка надає контекст новин своїм дочірнім компонентам. 
  const [newsList, setNewsList] = useState([]);

  const addNews = (newNews) => { // Додає нову новину в початок списку.
    setNewsList([newNews, ...newsList]);
  };

  const deleteNews = (id) => { //Видаляє новину за її id.
    setNewsList(newsList.filter(news => news.id !== id));
  };

  const editNews = (updatedNews) => { // Редагує новину
    setNewsList(newsList.map(news => news.id === updatedNews.id ? updatedNews : news));
  };

  return ( // Компонент NewsProvider обгортає свої дочірні компоненти (children) у NewsContext.Provider, передаючи в нього значення newsList та функції addNews, deleteNews, і editNews
    <NewsContext.Provider value={{ newsList, addNews, deleteNews, editNews }}>
      {children}
    </NewsContext.Provider>
  );
};



