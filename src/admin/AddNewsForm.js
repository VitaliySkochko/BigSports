/* цей компонент надає інтерфейс для введення новинної інформації, 
включаючи заголовок, зміст, категорію та зображення, та передає цю інформацію у вигляді об'єкта новини через функцію onAdd.*/

import React, { useState, useEffect } from 'react';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/AddNewsForm.css';
import SectionSelector, { sectionsByCategory } from './SectionSelector';

const AddNewsForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [selectedSections, setSelectedSections] = useState([]);
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState('');
  const [topNews, setTopNews] = useState(false);

  useEffect(() => { 
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setAuthor(userDoc.data().username);
        } else {
          setAuthor(user.email);
        }
      }
    };

    fetchUser();
  }, []);

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

 const handleCategoryChange = (e) => {
  const newCategory = e.target.value;
  setCategory(newCategory);
  // НЕ очищаємо selectedSections — залишаємо обрані раніше
};


 const handleSubmit = async (e) => {
  e.preventDefault();

  let imageUrl = '';
  if (image) {
    const imageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(imageRef, image);
    imageUrl = await getDownloadURL(imageRef);
  }

  // ⬇️ Групуємо вибрані секції по категоріях
  const categories = Object.entries(sectionsByCategory)
    .map(([cat, secs]) => {
      const filtered = secs.filter((s) => selectedSections.includes(s));
      return filtered.length ? { category: cat, sections: filtered } : null;
    })
    .filter(Boolean);

  // Основна категорія — та, з якої обраний перший розділ
  const firstSection = selectedSections[0];
  const mainCategory = Object.entries(sectionsByCategory).find(([_, secs]) =>
    secs.includes(firstSection)
  )?.[0] || '';

  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const time = now.toTimeString().slice(0, 5);

  const newNews = {
    title,
    content,
    category: mainCategory,       // ✅ головна категорія
    sections: selectedSections,   // ✅ всі вибрані розділи
    categories,                   // ✅ всі категорії з групами
    image: imageUrl,
    author,
    day,
    month,
    year,
    time,
    timestamp: now,
    topNews,
  };

  onAdd(newNews);

  setTitle('');
  setContent('');
  setCategory('');
  setSelectedSections([]);
  setImage(null);
  setTopNews(false);
};

  return (
    <form onSubmit={handleSubmit}>
      <div className="panel">
        <h1>Додати новину</h1>
      </div>
      <table className="add-news-table">
        <tbody>
          <tr>
            <td><label>Заголовок:</label></td>
            <td><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /></td>
          </tr>
          <tr>
            <td><label>Категорія:</label></td>
            <td>
              <select value={category} onChange={handleCategoryChange} required>
                <option value="">Оберіть категорію</option>
                {Object.keys(sectionsByCategory).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td><label>Розділи:</label></td>
            <td>
              <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '5px' }}>
                <SectionSelector
                  category={category}
                  selectedSections={selectedSections}
                  setSelectedSections={setSelectedSections}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td><strong>Вибрані розділи:</strong></td>
            <td>{selectedSections.join(', ') || 'Жодного розділу не вибрано'}</td>
          </tr>
          <tr>
            <td><label>Зображення:</label></td>
            <td><input type="file" onChange={(e) => setImage(e.target.files[0])} required /></td>
          </tr>
          <tr>
            <td><label>Зміст статті:</label></td>
            <td>
              <ReactQuill
                value={content}
                onChange={setContent}
                placeholder="Напишіть зміст статті..."
                required
                modules={quillModules}
              />
            </td>
          </tr>
          <tr>
            <td><label>Автор:</label></td>
            <td><input type="text" value={author} readOnly /></td>
          </tr>
          <tr>
            <td colSpan="2">
              <label>
                <input
                  type="checkbox"
                  checked={topNews}
                  onChange={() => setTopNews(!topNews)}
                />
                Додати в топ-новини
              </label>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="table-submit-cell">
              <button type="submit" className="profile-button">Додати новину</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default AddNewsForm;
