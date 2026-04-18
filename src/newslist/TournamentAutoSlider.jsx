import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TournamentAutoSlider.css';

const TournamentAutoSlider = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="tournament-slider-box">
      <div className="panel">
        <h1>{title}</h1>
      </div>

      <div className="tournament-slider">
        <div className="tournament-track">
          {[...items, ...items].map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="tournament-item"
            >
              <img src={item.image} alt={item.name} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentAutoSlider;