import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './pages/Main';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Menu from './pages/Menu';
import { NewsProvider, useNews } from './components/NewsContext';
import { UserProvider } from './components/UserContext';
import SplashScreen from './pages/SplashScreen';
import './App.css';

function AppInner() {
  const { firstLoadDone } = useNews();
  const [minTimeDone, setMinTimeDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMinTimeDone(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const showSplash = !(minTimeDone && firstLoadDone);
  if (showSplash) return <SplashScreen />;

  return (
    <div className="App">
      <Header />
      <Menu />
      <Main />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <UserProvider>
        <NewsProvider>
          <AppInner />
        </NewsProvider>
      </UserProvider>
    </Router>
  );
}
