import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useUser } from '../components/UserContext';
import '../styles/CommentForm.css';
import { IoSend } from 'react-icons/io5';

const CommentForm = ({ newsId }) => {
  const [comment, setComment] = useState('');
  const [user] = useAuthState(auth);
  const { userData } = useUser();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;

    try {
      await addDoc(collection(db, 'comments'), {
        newsId,
        userId: user.uid,
        username: userData?.username || 'Anonymous',
        comment,
        timestamp: serverTimestamp(),
      });
      setComment('');
    } catch (error) {
      console.error('Помилка при додаванні коментаря: ', error);
    }
  };

  return user ? (
    <form onSubmit={handleCommentSubmit} className="comment-form">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Написати коментар..."
        className="comment-input"
      />
      <button type="submit" className="comment-submit-btn">
        <IoSend className="send-icon" />
      </button>
    </form>
  ) : (
    <p className="comment-login-message">Будь ласка, увійдіть, щоб залишити коментар.</p>
  );
};

export default CommentForm;

