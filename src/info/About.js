import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/InfoPage.css';

const About = () => {
  return (
    <div className="info-page">
      <Helmet>
        <title>Про сайт | BigSport</title>
        <meta name="description" content="Інформація про спортивний сайт BigSport та його місію" />
      </Helmet>

      <h1>Про сайт</h1>
      <p><strong>BigSport</strong> — це сучасна спортивна платформа, яка оперативно публікує новини з українського та світового спорту.</p>
      <p>Ми висвітлюємо події у футболі, біатлоні, боксі, тенісі, ММА та інших видах спорту. Нашою метою є розвиток спортивної культури, аналітика подій, інтерв’ю, та інформування фанатів спорту.</p>
      <p>Проєкт створено з любов’ю до спорту. Автор: Віталій Скочко</p>
    </div>
  );
};

export default About;

