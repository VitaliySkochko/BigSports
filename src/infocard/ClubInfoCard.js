import React from 'react';
import '../styles/ClubInfoCard.css';

const ClubInfoCard = ({ club }) => {
  if (!club) return null;

  return (
    <div className="club-info-card">
      <div className="club-logo-wrapper">
        <img src={club.logo} alt={club.name} className="club-logo" />
      </div>

      <div className="club-info-text">
        <h2>{club.name}</h2>
        <p><strong>Засновано:</strong> {club.founded}</p>
        <p><strong>Населений пункт:</strong> {club.city}</p>
        <p><strong>Стадіон:</strong> {club.stadium}</p>
        <p><strong>Президент:</strong> {club.president}</p>
        <p><strong>Головний тренер:</strong> {club.coach}</p>
        <p><strong>Вебсайт:</strong> <a href={club.website} target="_blank" rel="noopener noreferrer">{club.website}</a></p>
      </div>

      <div className="club-achievements" dangerouslySetInnerHTML={{ __html: club.achievements }} />
    </div>
  );
};

export default ClubInfoCard;


