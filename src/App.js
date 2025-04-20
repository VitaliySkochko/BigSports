import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './pages/Main';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Menu from './pages/Menu';
import { NewsProvider } from './components/NewsContext'; 
import { UserProvider, useUser } from './components/UserContext'; 
import './App.css';

import amplitude from './amplitude';
import * as amplitudeLib from '@amplitude/analytics-browser';

const AppContent = () => {
  const { user, userData } = useUser();

  useEffect(() => {
    if (user === undefined) return; // ще не готово

    const referrer = document.referrer;
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');

    let trafficSource = 'direct';
    if (utmSource) {
      trafficSource = utmSource;
    } else if (referrer.includes('google.')) {
      trafficSource = 'google';
    } else if (referrer.includes('youtube.com')) {
      trafficSource = 'youtube';
    } else if (referrer.includes('instagram.com')) {
      trafficSource = 'instagram';
    }

    if (user && userData) {
      amplitude.setUserId(userData.username);

      const identify = new amplitudeLib.Identify()
        .set('username', userData.username)
        .set('email', userData.email)
        .set('role', userData.role);

      amplitude.identify(identify);

      amplitude.track('site_visited', {
        user_id: userData.username,
        role: userData.role,
        traffic_source: trafficSource,
      });
    } else {
      let guestId = localStorage.getItem('guestId');
      if (!guestId) {
        guestId = 'guest_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('guestId', guestId);
      }

      amplitude.setUserId(guestId);

      const identify = new amplitudeLib.Identify().set('role', 'guest');
      amplitude.identify(identify);

      amplitude.track('site_visited', {
        user_id: guestId,
        role: 'guest',
        traffic_source: trafficSource,
      });
    }
  }, [user, userData]);

  return (
    <div className="App">
      <Header />
      <Menu />
      <Main />
      <Footer />
    </div>
  );
};

const App = () => (
  <Router>
    <UserProvider>
      <NewsProvider>
        <AppContent />
      </NewsProvider>
    </UserProvider>
  </Router>
);

export default App;

























