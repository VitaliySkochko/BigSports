import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import { useUser } from './UserContext';
import { format } from 'date-fns';
import '../styles/Comments.css';

const Comments = ({ newsId }) => {
  const [comments, setComments] = useState([]);
  const { user, userData } = useUser();
  
  useEffect(() => {
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('newsId', '==', newsId), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [newsId]);

  const handleDeleteComment = async (commentId) => {
    if (userData?.role !== 'admin') {
      alert('У вас нет прав для удаления этого комментария.');
      return;
    }
    try {
      await deleteDoc(doc(db, 'comments', commentId));
      alert('Коментар видалено.');
    } catch (error) {
      console.error('Помилка при видаленні коментаря: ', error);
    }
  };

  const handleLike = async (commentId) => {
    const commentRef = doc(db, 'comments', commentId);
    try {
      await updateDoc(commentRef, {
        likes: arrayUnion(user.uid),
        dislikes: arrayRemove(user.uid)
      });
    } catch (error) {
      console.error('Помилка при додаванні лайку: ', error);
    }
  };

  const handleDislike = async (commentId) => {
    const commentRef = doc(db, 'comments', commentId);
    try {
      await updateDoc(commentRef, {
        dislikes: arrayUnion(user.uid),
        likes: arrayRemove(user.uid)
      });
    } catch (error) {
      console.error('Помилка при додаванні дизлайку: ', error);
    }
  };

  const formatDate = (timestamp) => {
    if (timestamp?.toDate) {
      try {
        // Форматируем дату и время как дд.мм.гггг чч:мм
        return format(timestamp.toDate(), 'dd.MM.yyyy HH:mm');
      } catch (error) {
        console.error('Ошибка форматирования даты: ', error);
        return 'Невірна дата';
      }
    }
    return 'Невірна дата';
  };

  return (
    <div className="comments-container">
      <h3 className="comments-header">Коментарі ({comments.length})</h3>
      <ul className="comments-list">
        {comments.map(comment => (
          <li key={comment.id} className="comment-item">
            <div className="comment-header">
              <strong>{comment.username || 'Anonymous'}</strong> |
              {formatDate(comment.timestamp)}
            </div>
            <p className="comment-body">{comment.comment}</p>
            <div className="comment-actions">
              <button onClick={() => handleLike(comment.id)} className="like-button">
                👍 ({comment.likes?.length || 0})
              </button>
              <button onClick={() => handleDislike(comment.id)} className="dislike-button">
                👎 ({comment.dislikes?.length || 0})
              </button>
              {userData?.role === 'admin' && (
                <button onClick={() => handleDeleteComment(comment.id)}>Видалити</button>
              )}
            </div>
          </li>
        ))} 
      </ul>
    </div>
  );
};

export default Comments;








