/* Цей код представляє компонент для редагування новин. */

import React, { useState } from 'react';

const EditNewsForm = ({ news, onEdit }) => {
  const [title, setTitle] = useState(news.title);
  const [content, setContent] = useState(news.content);
  const [category, setCategory] = useState(news.category);
  const [image, setImage] = useState(news.image);

  const handleSubmit = (e) => { //Функція для обробки подання форми
    e.preventDefault();
    const updatedNews = {
      ...news,
      title,
      content,
      category,
      image
    };
    onEdit(updatedNews);
  };

  const handleImageChange = (e) => { // Функція для зміни зображення
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Зміст"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Виберіть категорію</option>
        <option value="УПЛ">УПЛ</option>
        <option value="Перша Ліга">Перша Ліга</option>
        <option value="Друга Ліга">Друга Ліга</option>
        <option value="Збірна">Збірна</option>
        <option value="Єврокубки">Єврокубки</option>
      </select>
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Зберегти</button>
    </form>
  );
};

export default EditNewsForm;

