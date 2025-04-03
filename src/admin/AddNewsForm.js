/* цей компонент надає інтерфейс для введення новинної інформації, 
включаючи заголовок, зміст, категорію та зображення, та передає цю інформацію у вигляді об'єкта новини через функцію onAdd.*/

import React, { useState, useEffect } from 'react';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/AddNewsForm.css';

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

  const sectionsByCategory = {
    'Футбол України': ['УПЛ', 'Кубок України', 'Збірна України', 'Перша Ліга', 'Друга Ліга', 'Шахтар', 'Динамо Київ', 'Олександрія', 
      'Кривбас', 'Зоря', 'Чорноморець', 'Оболонь', 'Колос', 'Рух', 'ЛНЗ', 'Карпати', 'Інгулець', 'Ворскла', 'Полісся', 'Лівий Берег', 
      'Верес', 'Буковина', 'Вікторія', 'Агробізнес', 'Епіцентр','Кремінь', 'Чернігів', 'Гірник-Спорт' ],
    'Чемпіонати': ['Європейські новини', 'Світовий футбол', 'Англійська Премʼєр-ліга', 'Іспанська Ла Ліга', 'Німецька Бундесліга', 
      'Французька Ліга 1', 'Італійська Серія А'],
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
    setSelectedSections([]); // Очистити вибрані при зміні категорії
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const time = now.toTimeString().slice(0, 5);

    const newNews = {
      title,
      content,
      category,
      sections: selectedSections,
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
              {category && sectionsByCategory[category] ? (
                sectionsByCategory[category].map(sec => (
                  <label key={sec} style={{ display: 'block', marginBottom: '5px' }}>
                    <input
                      type="checkbox"
                      value={sec}
                      checked={selectedSections.includes(sec)}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedSections(prev =>
                          prev.includes(value)
                            ? prev.filter(s => s !== value)
                            : [...prev, value]
                        );
                      }}
                    />
                    {sec}
                  </label>
                ))
              ) : (
                <p>Оберіть категорію</p>
              )}
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
              <button type="submit" className="profile-button">Додати новину</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default AddNewsForm;

