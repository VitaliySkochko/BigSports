/* Цей код представляє компонент для редагування новин. */

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { storage } from '../firebase'; // Импортируйте ваш экземпляр Firebase Storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditNewsForm = ({ news, onEdit }) => {
  const [title, setTitle] = useState(news.title);
  const [content, setContent] = useState(news.content);
  const [category, setCategory] = useState(news.category);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(news.image);

  const extractKeywords = (title) => {
    return title.toLowerCase().split(' ').filter(word => word.length > 2); // Простейшая функция для извлечения ключевых слов
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedImageUrl = imageUrl;

    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      updatedImageUrl = await getDownloadURL(imageRef);
    }

    const updatedNews = {
      ...news,
      title,
      content,
      category,
      image: updatedImageUrl,
      keywords: extractKeywords(title) // Обновление ключевых слов при редактировании
    };
    onEdit(updatedNews); // Передача отредактированной новости для сохранения
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0])); // Обновляем локальный URL для предварительного просмотра
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
      <input type="file" onChange={handleImageChange} />
      {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: '100px', height: '100px' }} />}
      <button type="submit">Зберегти</button>
    </form>
  );
};

export default EditNewsForm;
