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

const App = () => {
  useEffect(() => {
    const trackVisit = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          // Встановити userId
          amplitude.setUserId(user.uid);

          // Встановити додаткові атрибути користувача
          amplitude.identify({
            user_id: user.uid,
            username: userData.username,
            email: userData.email,
            role: userData.role,
            country: userData.country,
            city: userData.city,
          });

          // Подія перегляду сайту з ідентифікованим користувачем
          amplitude.track('site_visited', {
            user_id: user.uid,
            role: userData.role,
          });
        }
      } else {
        // Подія перегляду сайту для анонімного користувача
        amplitude.track('site_visited', {
          user_id: 'guest',
        });
      }
    };

    trackVisit();
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



















