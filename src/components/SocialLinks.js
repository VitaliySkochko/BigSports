import React from 'react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import '../styles/SocialLinks.css';

const SocialLinks = () => {
  return (
    <div className="social-links">
      <a 
        href="https://www.instagram.com/bigsport.com.ua/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon instagram"
        aria-label="Instagram"
      >
        <FaInstagram />
      </a>
      <a 
        href="https://www.youtube.com/@BigSport-TV1" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon youtube"
        aria-label="YouTube"
      >
        <FaYoutube />
      </a>
    </div>
  );
};

export default SocialLinks;

