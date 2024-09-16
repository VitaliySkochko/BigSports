import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
import FootballUkraine from './components/FootballUkraine'; 
import SubsectionContent from './components/SubsectionContent';
import FootballEurope from './components/FootballEurope';
import Tournaments from './components/Tournaments';
import Sports from './components/Sports';
import Biathlon from './components/Biathlon';
import Menu from './components/Menu';
import Header from './components/Header';
import NewsDetails from './components/NewsDetails';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults'; 
import { NewsProvider } from './components/NewsContext'; 
import { UserProvider } from './components/UserContext'; 
import RequireAuth from './components/RequireAuth'; 
import './App.css';
import './Responsive.css';
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
          <Route path="/football-ukraine/upl" element={<SubsectionContent section="УПЛ" />} />
          <Route path="/football-ukraine/zbirna" element={<SubsectionContent section="Збірна України" />} />
          <Route path="/football-ukraine/shakhtar" element={<SubsectionContent section="Шахтар" />} />
          <Route path="/football-ukraine/dynamo" element={<SubsectionContent section="Динамо Київ" />} />
          <Route path="/football-ukraine/oleksandriya" element={<SubsectionContent section="Олександрія" />} />
          <Route path="/football-ukraine/kryvbas" element={<SubsectionContent section="Кривбас" />} />
          <Route path="/football-ukraine/zorya" element={<SubsectionContent section="Зоря" />} />
          <Route path="/football-ukraine/chornomorets" element={<SubsectionContent section="Чорноморець" />} />
          <Route path="/football-ukraine/obolon" element={<SubsectionContent section="Оболонь" />} />
          <Route path="/football-ukraine/kolos" element={<SubsectionContent section="Колос" />} />
          <Route path="/football-ukraine/rukh" element={<SubsectionContent section="Рух" />} />
          <Route path="/football-ukraine/lnz" element={<SubsectionContent section="ЛНЗ" />} />
          <Route path="/football-ukraine/karpaty" element={<SubsectionContent section="Карпати" />} />
          <Route path="/football-ukraine/ingulec" element={<SubsectionContent section="Інгулець" />} />
          <Route path="/football-ukraine/vorskla" element={<SubsectionContent section="Ворскла" />} />
          <Route path="/football-ukraine/polissya" element={<SubsectionContent section="Полісся" />} />
          <Route path="/football-ukraine/lberig" element={<SubsectionContent section="Лівий Берег" />} />
          <Route path="/football-ukraine/veres" element={<SubsectionContent section="Верес" />} />

        <Route path="/world-football" element={<FootballEurope />} />
          <Route path="/world-football/europe-news" element={<SubsectionContent section="Європейські новини" />} />
          <Route path="/world-football/epl" element={<SubsectionContent section="Англійська Премʼєр-ліга" />} />
          <Route path="/world-football/la-liga" element={<SubsectionContent section="Іспанська Ла Ліга" />} />
          <Route path="/world-football/seriaA" element={<SubsectionContent section="Італійська Серія А" />} />
          <Route path="/world-football/bundesliga" element={<SubsectionContent section="Німецька Бундесліга" />} />
          <Route path="/world-football/ligue1" element={<SubsectionContent section="Французька Ліга 1" />} />

        <Route path="/biathlon" element={<Biathlon />} />
          <Route path="/biathlon/news-biathlon" element={<SubsectionContent section="Новини" />} />
          <Route path="/biathlon/world-cup" element={<SubsectionContent section="Кубок Світу" />} />
          <Route path="/biathlon/ibu-cup" element={<SubsectionContent section="Кубок IBU" />} />
          <Route path="/biathlon/world-championship" element={<SubsectionContent section="Чемпіонат Світу" />} />

        <Route path="/sports" element={<Sports />} />
          <Route path="/sports/boxing" element={<SubsectionContent section="Бокс" />} />  
          <Route path="/sports/tennis" element={<SubsectionContent section="Теніс" />} />  
          <Route path="/sports/mma" element={<SubsectionContent section="MMA" />} />  
          <Route path="/sports/futsal" element={<SubsectionContent section="Футзал" />} />  

        <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/tournaments/worldcup2024-futsal" element={<SubsectionContent section="Чемпіонат Світу 2024 з футзалу" />} />  

        <Route path="/admin" element={
          <RequireAuth adminOnly={true}>
            <AdminPanel />
          </RequireAuth>
        } />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/search" element={<SearchResults />} /> 
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
















