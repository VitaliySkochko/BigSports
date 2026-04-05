import React from 'react';
import '../styles/AnimatedNewsBlock.css';

const AnimatedNewsBlock = ({ children, currentPage }) => {
  return (
    <div key={currentPage} className="animated-news-block">
      {children}
    </div>
  );
};

export default AnimatedNewsBlock;