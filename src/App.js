import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
import FootballUkraine from './components/FootballUkraine'; 
import WorldFootball from './components/WorldFootball';
import Boxing from './components/Boxing';
import Tennis from './components/Tennis';
import Biathlon from './components/Biathlon';
import Menu from './components/Menu';
import Header from './components/Header';
import NewsDetails from './components/NewsDetails';
import Footer from './components/Footer';
import { NewsProvider } from './components/NewsContext'; 
import { UserProvider } from './components/UserContext'; 
import RequireAuth from './components/RequireAuth'; 
import './App.css';
import logo from './img/logo.png';

// Установка иконки сайта
const link = document.createElement('link');
link.rel = 'icon';
link.href = logo;
document.head.appendChild(link);

const Main = () => { 
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/football-ukraine" element={<FootballUkraine />} />
        <Route path="/world-football" element={<WorldFootball />} />
        <Route path="/boxing" element={<Boxing />} />
        <Route path="/tennis" element={<Tennis />} />
        <Route path="/biathlon" element={<Biathlon />} />
        <Route path="/admin" element={
          <RequireAuth adminOnly={true}>
            <AdminPanel />
          </RequireAuth>
        } />
        <Route path="/news/:id" element={<NewsDetails />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <UserProvider> {/* Оборачиваем UserProvider */}
        <NewsProvider> {/* Оборачиваем NewsProvider */}
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
















