/* цей компонент надає інтерфейс для введення новинної інформації, 
включаючи заголовок, зміст, категорію та зображення, та передає цю інформацію у вигляді об'єкта новини через функцію onAdd.*/

import React, { useState } from 'react';
import { storage } from '../firebase'; // импортируйте ваш экземпляр Firebase Storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
      seconds: ('0' + currentDate.getSeconds()).slice(-2),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { year, month, day, hours, minutes, seconds } = getCurrentDateTime();

    let imageUrl = '';
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newNews = {
      title,
      content,
      category,
      image: imageUrl,
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      timestamp: new Date(),
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
      <input type="file" onChange={handleImageChange} required />
      <button type="submit">Додати</button>
    </form>
  );
};

export default AddNewsForm;










