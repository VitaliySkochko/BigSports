/* Цей код представляє компонент для редагування новин. */

import React, { useState, useEffect } from 'react';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/EditNewsForm.css';

const EditNewsForm = ({ news, onEdit, onClose }) => {
  const [title, setTitle] = useState(news.title);
  const [content, setContent] = useState(news.content);
  const [category, setCategory] = useState(news.category);
  const [sections, setSections] = useState(news.sections || []);
  const [topNews, setTopNews] = useState(news.topNews || false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(news.image);
  const [author, setAuthor] = useState(news.author || "Невідомий автор");

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setAuthor(userDoc.data().username || user.email);
        } else {
          setAuthor(user.email);
        }
      }
    };

    fetchUser();
  }, []);

  const sectionsByCategory = {
    'Футбол України': ['УПЛ', 'Кубок України', 'Збірна України', 'Перша Ліга', 'Друга Ліга', 'Шахтар', 'Динамо Київ', 'Олександрія', 'Кривбас', 'Зоря', 'Чорноморець', 'Оболонь', 'Колос', 'Рух', 'ЛНЗ', 'Карпати', 'Інгулець', 'Ворскла', 'Полісся', 'Лівий Берег', 'Верес', 'Буковина', 'Вікторія'],
    'Чемпіонати': ['Європейські новини', 'Світовий футбол', 'Англійська Премʼєр-ліга', 'Іспанська Ла Ліга', 'Німецька Бундесліга', 'Французька Ліга 1', 'Італійська Серія А'],
    'Єврокубки': ['Ліга Чемпіонів', 'Ліга Європи', 'Ліга Конференцій'],
    'Біатлон': ['Новини', 'Кубок Світу', 'Кубок IBU', 'Чемпіонат Світу'],
    'Види спорту': ['Бокс', 'Теніс', 'MMA', 'Футзал'],
    'Турніри': ['Клубний чемпіонат світу 2025'],
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'video'], // додаємо кнопку вставки відео
      ['clean']
    ]
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setSections([]); // скидаємо при зміні категорії
  };

  const handleSectionToggle = (sec) => {
    setSections((prev) =>
      prev.includes(sec)
        ? prev.filter((s) => s !== sec)
        : [...prev, sec]
    );
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
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
      sections,
      topNews,
      image: updatedImageUrl,
      author,
    };

    onEdit(updatedNews);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="panel">
                    <h1>Редагувати новину</h1>
                    </div>
      <table className="edit-news-table">
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
                {Object.keys(sectionsByCategory).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </td>
          </tr>

          {category && (
            <>
              <tr>
                <td><label>Розділи:</label></td>
                <td>
                  {sectionsByCategory[category].map((sec) => (
                    <label key={sec} style={{ display: 'block', marginBottom: '5px' }}>
                      <input
                        type="checkbox"
                        value={sec}
                        checked={sections.includes(sec)}
                        onChange={() => handleSectionToggle(sec)}
                      />
                      {sec}
                    </label>
                  ))}
                </td>
              </tr>
              <tr>
                <td><strong>Вибрані розділи:</strong></td>
                <td>{sections.join(', ') || 'Жодного розділу не вибрано'}</td>
              </tr>
            </>
          )}

          <tr>
            <td><label>Зображення:</label></td>
            <td>
              <input type="file" onChange={handleImageChange} />
              {imageUrl && <img src={imageUrl} alt="Preview" className="image-preview" />}
            </td>
          </tr>
          <tr>
            <td><label>Зміст статті:</label></td>
            <td>
                          <ReactQuill value={content} onChange={setContent} placeholder="Напишіть зміст статті..." required modules={quillModules} />
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
              <button type="submit" className="profile-button">Зберегти зміни</button>
              <button type="button" className="exit-button" onClick={onClose}>Закрити</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default EditNewsForm;







