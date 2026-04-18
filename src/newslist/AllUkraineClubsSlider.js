import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AllUkraineClubsSlider.css';

const AllUkraineClubsSlider = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="all-clubs-slider-section">
      <div className="all-clubs-slider-inner">
        

        <div className="all-clubs-slider-track">
          {[...items, ...items].map((club, index) => (
            <Link
              to={club.link}
              key={`${club.name}-${index}`}
              className="all-clubs-slider-card"
            >
              <div className="all-clubs-slider-image-wrap">
                <img
                  src={club.image}
                  alt={club.name}
                  className="all-clubs-slider-image"
                />
              </div>
              <div className="all-clubs-slider-name">{club.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllUkraineClubsSlider;