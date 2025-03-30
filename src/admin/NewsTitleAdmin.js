import React from 'react';
import { Link } from 'react-router-dom';
//import '../styles/NewsTitleAdmin.css';

const NewsTitleAdmin = ({ news }) => {
  return (
    <div className="news-title">
      <Link to={`/news/${news.id}`} className="news-title-link">
        {news.title}
      </Link>
    </div>
  );
};

export default NewsTitleAdmin;