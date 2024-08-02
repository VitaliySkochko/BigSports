/* Цей код представляє компонент для редагування новин. */

import React, { useState } from 'react';

const EditNewsForm = ({ news, onEdit }) => {
  const [title, setTitle] = useState(news.title);
  const [content, setContent] = useState(news.content);
  const [category, setCategory] = useState(news.category);
  const [image, setImage] = useState(news.image);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNews = {
      ...news,
      title,
      content,
      category,
      image
    };
    onEdit(updatedNews); // Передача отредактированной новости для сохранения
  };

  const handleImageChange = (e) => {
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
        <option value="">Оберіть категорію</option>
        <option value="Футбол України">Футбол України</option>
        <option value="Світовий Футбол">Світовий Футбол</option>
        <option value="Бокс">Бокс</option>
        <option value="Теніс">Теніс</option>
        <option value="Біатлон">Біатлон</option>
      </select>
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Зберегти</button>
    </form>
  );
};

export default EditNewsForm;

