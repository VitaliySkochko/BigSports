import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './pages/Main';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Menu from './pages/Menu';
import { NewsProvider } from './components/NewsContext'; 
import { UserProvider } from './components/UserContext'; 
import SplashScreen from './pages/SplashScreen';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const minDuration = 3000; // мінімум 3 сек
  const start = Date.now();

  // Імітація завантаження даних (замініть на свої проміси)
  const loadData = Promise.resolve(); // напр. Promise.all([fetchNews(), fetchUser()])

  loadData.finally(() => {
    const elapsed = Date.now() - start;
    const left = Math.max(0, minDuration - elapsed);
    const t = setTimeout(() => setLoading(false), left);
    return () => clearTimeout(t);
  });
}, []);


  return (
    <Router>
      <UserProvider>
        <NewsProvider>
          {loading && <SplashScreen />}
          <div className={`App ${loading ? 'hidden' : ''}`}>
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
