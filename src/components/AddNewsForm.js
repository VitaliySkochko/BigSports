/* цей компонент надає інтерфейс для введення новинної інформації, 
включаючи заголовок, зміст, категорію та зображення, та передає цю інформацію у вигляді об'єкта новини через функцію onAdd.*/

import React, { useState } from 'react';
import { storage } from '../firebase'; // импортируйте ваш экземпляр Firebase Storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // импортируйте стиль Quill

const AddNewsForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    return {
      year: currentDate.getFullYear(),
      month: ('0' + (currentDate.getMonth() + 1)).slice(-2),
      day: ('0' + currentDate.getDate()).slice(-2),
      hours: ('0' + currentDate.getHours()).slice(-2),
      minutes: ('0' + currentDate.getMinutes()).slice(-2),
    };
  };

  const extractKeywords = (title) => {
    return title.toLowerCase().split(' ').filter(word => word.length > 2); // Простейшая функция для извлечения ключевых слов
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { year, month, day, hours, minutes } = getCurrentDateTime();

    let imageUrl = '';
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const keywords = extractKeywords(title); // Генерация ключевых слов из заголовка

    const newNews = {
      title,
      content,
      category,
      image: imageUrl,
      year,
      month,
      day,
      time: `${hours}:${minutes}`, 
      timestamp: new Date(),
      keywords // Добавление ключевых слов
    };

    onAdd(newNews);
    setTitle('');
    setContent('');
    setCategory('');
    setImage(null);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
      <ReactQuill
        value={content}
        onChange={setContent}
        placeholder="Зміст"
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
      <input type="file" onChange={handleImageChange} required />
      <button type="submit">Додати</button>
    </form>
  );
};

export default AddNewsForm;












