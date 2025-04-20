import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './pages/Main';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Menu from './pages/Menu';
import { NewsProvider } from './components/NewsContext'; 
import { UserProvider } from './components/UserContext'; 
import './App.css';

const App = () => (
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

export default App;





























