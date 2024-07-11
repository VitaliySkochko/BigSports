import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
import UPL from './components/UPL';
import FirstLeague from './components/FirstLeague';
import SecondLeague from './components/SecondLeague';
import NationalTeam from './components/NationalTeam';
import EuroCups from './components/EuroCups';
import Menu from './components/Menu';
import Header from './components/Header';
import NewsDetails from './components/NewsDetails';
import { NewsProvider } from './components/NewsContext';
import Footer from './components/Footer';
import './App.css';
import logo from './img/logo.png';

const link = document.createElement('link');
link.rel = 'icon';
link.href = logo;
document.head.appendChild(link);

const Main = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upl" element={<UPL />} />
        <Route path="/first-league" element={<FirstLeague />} />
        <Route path="/second-league" element={<SecondLeague />} />
        <Route path="/national-team" element={<NationalTeam />} />
        <Route path="/euro-cups" element={<EuroCups />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/news/:id" element={<NewsDetails />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <NewsProvider>
        <div className="App">
          <Header />
          <Menu />
          <Main />
          <Footer />
        </div>
      </NewsProvider>
    </Router>
  );
};

export default App;




















