import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
import FootballUkraine from './components/FootballUkraine'; 
import WorldFootball  from './components/WorldFootball';
import Boxing from './components/Boxing';
import Tennis from './components/Tennis';
import Biathlon  from './components/Biathlon';
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
        <Route path="/football-ukraine" element={<FootballUkraine  />} />
        <Route path="/world-football" element={<WorldFootball  />} />
        <Route path="/boxing" element={<Boxing />} />
        <Route path="/tennis" element={<Tennis />} />
        <Route path="/biathlon" element={<Biathlon  />} />
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




















