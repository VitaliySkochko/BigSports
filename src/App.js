import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './pages/Main';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Menu from './pages/Menu';
import { NewsProvider } from './components/NewsContext'; 
import { UserProvider } from './components/UserContext'; 
import './App.css';

import { auth } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

import amplitude from './amplitude';
import * as amplitudeLib from '@amplitude/analytics-browser';

const App = () => {
  useEffect(() => {
    const trackVisit = async (user) => {
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

      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();

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
          }
        } catch (error) {
          console.error('Помилка отримання даних користувача:', error);
        }
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
    };

    // 🔥 Чекаємо поки Firebase повністю визначить auth
    const unsubscribe = auth.onAuthStateChanged((user) => {
      trackVisit(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <UserProvider>
        <NewsProvider>
          <div className="App">
            <Header />
            <Menu />
            <Main />
            <Footer />
          </div>
        </NewsProvider>
      </UserProvider>
    </Router>
  );
};

export default App;























