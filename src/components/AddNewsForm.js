/* цей компонент надає інтерфейс для введення новинної інформації, 
включаючи заголовок, зміст, категорію та зображення, та передає цю інформацію у вигляді об'єкта новини через функцію onAdd.*/

import React, { useState } from 'react';

const AddNewsForm = ({ onAdd }) => {
  const [title, setTitle] = useState(''); // Состояние для заголовка
  const [content, setContent] = useState(''); // Состояние для содержимого
  const [category, setCategory] = useState(''); // Состояние для категории
  const [image, setImage] = useState(null); // Состояние для изображения

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    return { year, month, day };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { year, month, day } = getCurrentDate();
    const newNews = {
      title,
      content,
      category,
      image,
      year,
      month,
      day
    };
    onAdd(newNews); // Передача новости для добавления
    setTitle(''); // Сброс полей формы после добавления
    setContent('');
    setCategory('');
    setImage(null);
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
        placeholder="Содержимое"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Выберите категорию</option>
        <option value="УПЛ">УПЛ</option>
        <option value="Перша Ліга">Перша Ліга</option>
        <option value="Друга Ліга">Друга Ліга</option>
        <option value="Збірна">Збірна</option>
        <option value="Єврокубки">Єврокубки</option>
      </select>
      <input type="file" onChange={handleImageChange} required />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddNewsForm;











