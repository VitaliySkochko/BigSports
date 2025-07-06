import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/InfoPage.css';

const PrivacyPolicy = () => {
  return (
    <div className="info-page">
      <Helmet>
        <title>Політика конфіденційності | BigSport</title>
        <meta name="description" content="Політика конфіденційності сайту BigSport. Збір даних, cookies, реклама, права користувачів." />
      </Helmet>

      <h1>Політика конфіденційності</h1>
      <p>Цей сайт використовує cookie-файли та аналітичні інструменти для покращення користувацького досвіду.</p>
      <p>Ми співпрацюємо з Google AdSense. Це означає, що треті сторони можуть використовувати кукі для персоналізованої реклами.</p>
      <p>Користувач може змінити налаштування реклами у <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>
      <p>Ми не збираємо персональні дані без вашої згоди. Якщо маєте питання — звертайтесь через <a href="/contacts">сторінку контактів</a>.</p>
    </div>
  );
};

export default PrivacyPolicy;

