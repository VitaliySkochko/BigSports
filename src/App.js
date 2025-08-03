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
    // Імітація завантаження — можна замінити на фактичні запити
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // 2.5 секунди
    return () => clearTimeout(timer);
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
