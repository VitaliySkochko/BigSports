/* цей компонент надає інтерфейс для введення новинної інформації, 
включаючи заголовок, зміст, категорію та зображення, та передає цю інформацію у вигляді об'єкта новини через функцію onAdd.*/

import React, { useState } from 'react';

const AddNewsForm = ({ onAdd }) => {
  const [title, setTitle] = useState(''); // Відображення стану заголовка
  const [content, setContent] = useState(''); // Відображення стану змісту
  const [category, setCategory] = useState(''); // Відображення стану категорії
  const [image, setImage] = useState(null); // Відображення стану зображення

  const getCurrentDate = () => { // Функція для отримання поточної дати
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    return { year, month, day };
  };

  const handleSubmit = (e) => { // Функція, яка викликається при поданні форми
    e.preventDefault();
    const { year, month, day } = getCurrentDate();
    const newNews = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      category,
      image,
      year,
      month,
      day
    };
    onAdd(newNews);
    setTitle('');
    setContent('');
    setCategory('');
    setImage(null);
  };

  const handleImageChange = (e) => { // Функція, яка викликається при виборі файлу для зображення
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
      <input type="file" onChange={handleImageChange} required />
      <button type="submit">Додати</button>
    </form>
  );
};

export default AddNewsForm;









