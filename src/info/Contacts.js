import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/InfoPage.css';

const Contacts = () => {
  return (
    <div className="info-page">
      <Helmet>
        <title>Контакти | BigSport</title>
        <meta name="description" content="Контактна інформація сайту BigSport: email, соцмережі, зворотній зв'язок" />
      </Helmet>

      <h1>Контакти</h1>
      <p>Маєш запитання, пропозицію чи ідею для співпраці?</p>
      <p>Пиши нам на електронну пошту: <a href="mailto:bigsportssait@gmail.com">bigsportssait@gmail.com</a></p>
      <p>Ми також доступні у соцмережах — посилання розміщені у футері.</p>
    </div>
  );
};

export default Contacts;
