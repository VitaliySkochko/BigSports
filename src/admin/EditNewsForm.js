import React, { useState, useEffect } from 'react';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/EditNewsForm.css';
import SectionSelector, { sectionsByCategory } from './SectionSelector';

const EditNewsForm = ({ news, onEdit, onClose }) => {
  const [title, setTitle] = useState(news.title);
  const [content, setContent] = useState(news.content);
  const [category, setCategory] = useState(news.category || '');
  const [sections, setSections] = useState(news.sections || []);
  const [topNews, setTopNews] = useState(news.topNews || false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(news.image);
  const [author, setAuthor] = useState(news.author || 'Невідомий автор');
  const [tagsInput, setTagsInput] = useState(
    Array.isArray(news.tags) ? news.tags.join(', ') : ''
  );

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

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
  };

  const handleImageChange = (e) => {
    if (!e.target.files[0]) return;
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

    const categories = Object.entries(sectionsByCategory)
      .map(([cat, secs]) => {
        const filtered = secs.filter((s) => sections.includes(s));
        return filtered.length ? { category: cat, sections: filtered } : null;
      })
      .filter(Boolean);

    const firstSection = sections[0];
    const mainCategory =
      Object.entries(sectionsByCategory).find(([_, secs]) =>
        secs.includes(firstSection)
      )?.[0] || '';

    const tags = [
      ...new Set(
        tagsInput
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      ),
    ];

    const updatedNews = {
      ...news,
      title,
      content,
      sections,
      categories,
      category: mainCategory,
      topNews,
      image: updatedImageUrl,
      author,
      tags,
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
            <td>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </td>
          </tr>

          <tr>
            <td><label>Категорія:</label></td>
            <td>
              <select value={category} onChange={handleCategoryChange} required>
                <option value="">Оберіть категорію</option>
                {Object.keys(sectionsByCategory).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </td>
          </tr>

          {category && (
            <>
              <tr>
                <td><label>Розділи:</label></td>
                <td>
                  <div
                    style={{
                      maxHeight: '200px',
                      overflowY: 'auto',
                      border: '1px solid #ccc',
                      padding: '5px',
                    }}
                  >
                    <SectionSelector
                      category={category}
                      selectedSections={sections}
                      setSelectedSections={setSections}
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td><strong>Вибрані розділи:</strong></td>
                <td>{sections.join(', ') || 'Жодного не вибрано'}</td>
              </tr>
            </>
          )}

          <tr>
            <td><label>Теги:</label></td>
            <td>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Наприклад: Рух, ЛНЗ, Віталій Пономарьов"
              />
              <small style={{ display: 'block', marginTop: '6px', color: '#666' }}>
                Вводь теги через кому
              </small>
            </td>
          </tr>

          <tr>
            <td><label>Зображення:</label></td>
            <td>
              <input type="file" onChange={handleImageChange} />
              {imageUrl && (
                <img src={imageUrl} alt="Preview" className="image-preview" />
              )}
            </td>
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
            <td>
              <input type="text" value={author} readOnly />
            </td>
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
              <button type="submit" className="profile-button">
                Зберегти зміни
              </button>
              <button
                type="button"
                className="exit-button"
                onClick={onClose}
              >
                Закрити
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default EditNewsForm;