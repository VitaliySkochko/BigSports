/* цей компонент надає інтерфейс для введення новинної інформації, 
включаючи заголовок, зміст, категорію та зображення, та передає цю інформацію у вигляді об'єкта новини через функцію onAdd.*/

import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // импортируйте стиль Quill
import '../styles/AddNewsForm.css';

const AddNewsForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [section, setSection] = useState('');
  const [image, setImage] = useState(null);

  const sectionsByCategory = {
    'Футбол України': ['УПЛ', 'Збірна України', 'Шахтар', 'Динамо Київ', 'Олександрія', 'Кривбас', 'Зоря', 'Чорноморець', 'Оболонь', 'Колос', 'Рух', 'ЛНЗ', 'Карпати', 'Інгулець', 'Ворскла', 'Полісся', 'Лівий Берег', 'Верес'],
    'Футбол Європи': ['Англійська Премʼєр-ліга', 'Іспанська Ла Ліга', 'Німецька Бундесліга', 'Французька Ліга 1', 'Італійська Серія А', 'Європейські новини'],
    'Біатлон': ['Новини', 'Кубок Світу', 'Кубок IBU', 'Чемпіонат Світу'],
    'Види спорту': ['Бокс', 'Теніс', 'MMA', 'Футзал'],
    'Турніри': ['Чемпіонат Світу 2024 з футзалу'],
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image'],
      [{ 'table': 'insert-table' }], // Включаем вставку таблицы
      ['clean'], // Очистка форматирования
    ],
  };

  const formats = [
    'header', 'font', 'list', 'bullet',
    'bold', 'italic', 'underline', 'strike',
    'link', 'image', 'table',
  ];

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
    return title.toLowerCase().split(' ').filter(word => word.length > 2);
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

    const keywords = extractKeywords(title);

    const newNews = {
      title,
      content,
      category,
      section,
      image: imageUrl,
      year,
      month,
      day,
      time: `${hours}:${minutes}`,
      timestamp: new Date(),
      keywords,
    };

    onAdd(newNews);
    setTitle('');
    setContent('');
    setCategory('');
    setSection('');
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
        modules={modules}
        formats={formats}
        required
      />
      <select value={category} onChange={(e) => {
        setCategory(e.target.value);
        setSection('');
      }} required>
        <option value="">Оберіть категорію</option>
        {Object.keys(sectionsByCategory).map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      {category && (
        <select value={section} onChange={(e) => setSection(e.target.value)} required>
          <option value="">Оберіть розділ</option>
          {sectionsByCategory[category].map((sec) => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
      )}
      <input type="file" onChange={handleImageChange} required />
      <button type="submit">Додати</button>
    </form>
  );
};

export default AddNewsForm;
















