import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useUser } from './UserContext';

const CommentForm = ({ newsId }) => {
  const [comment, setComment] = useState('');
  const [user] = useAuthState(auth);
  const { userData } = useUser(); // Используем userData для получения имени пользователя

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === '') {
      alert('Коментар не може бути порожнім!');
      return;
    }

    try {
      await addDoc(collection(db, 'comments'), {
        newsId,
        userId: user.uid,
        username: userData?.username || 'Anonymous', // Используем имя из userData или "Anonymous"
        comment,
        timestamp: serverTimestamp(),
      });
      setComment('');
    } catch (error) {
      console.error('Помилка при додаванні коментаря: ', error);
    }
  };

  return user ? (
    <form onSubmit={handleCommentSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Напишіть ваш коментар..."
        rows="4"
      />
      <button type="submit">Додати коментар</button>
    </form>
  ) : (
    <p>Будь ласка, увійдіть, щоб залишити коментар.</p>
  );
};

export default CommentForm;
