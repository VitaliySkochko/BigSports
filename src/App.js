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
  const [showSplash, setShowSplash] = useState(true);
  const [hideSplash, setHideSplash] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeDone(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (minTimeDone && firstLoadDone) {
      setHideSplash(true);

      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 650);

      return () => clearTimeout(timer);
    }
  }, [minTimeDone, firstLoadDone]);

  return (
    <>
      {showSplash && <SplashScreen hide={hideSplash} />}

      {!showSplash && (
        <div className="App">
          <Header />
          <Main />
          <Footer />
        </div>
      )}
    </>
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
