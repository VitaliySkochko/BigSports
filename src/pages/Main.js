import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPanel from '../admin/AdminPanel';
import Home from '../sections/Home';
import FootballUkraine from '../sections/FootballUkraine'; 
import SubsectionContent from '../subsections/SubsectionContent';
import EuroCups from '../sections/EuroCups'
import Tournaments from '../sections/Tournaments';
import Sports from '../sections/Sports';
import Biathlon from '../sections/Biathlon';
import NewsDetails from '../news/NewsDetails';
import ProfilePage from '../profile/ProfilePage';
import SearchResults from '../components/SearchResults';
import RequireAuth from '../components/RequireAuth';
import Championships from '../sections/Championships';
import About from '../info/About';
import Contacts from '../info/Contacts';
import PrivacyPolicy from '../info/PrivacyPolicy';
import Archive from '../components/Archive';

const Main = () => { 
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/football-ukraine" element={<FootballUkraine />} />
          <Route path="/football-ukraine/upl" element={<SubsectionContent section="УПЛ" />} />
          <Route path="/football-ukraine/cup" element={<SubsectionContent section="Кубок України" />} />
          <Route path="/football-ukraine/zbirna" element={<SubsectionContent section="Збірна України" />} />
          <Route path="/football-ukraine/first-league" element={<SubsectionContent section="Перша Ліга" />} />
          <Route path="/football-ukraine/second-league" element={<SubsectionContent section="Друга Ліга" />} />
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
          <Route path="/football-ukraine/bukovyna" element={<SubsectionContent section="Буковина" />} />
          <Route path="/football-ukraine/viktoriya" element={<SubsectionContent section="Вікторія" />} />
          <Route path="/football-ukraine/agrobiznes" element={<SubsectionContent section="Агробізнес" />} />
          <Route path="/football-ukraine/epitsenter" element={<SubsectionContent section="Епіцентр" />} />
          <Route path="/football-ukraine/kremin" element={<SubsectionContent section="Кремінь" />} />
          <Route path="/football-ukraine/yuksa" element={<SubsectionContent section="ЮКСА" />} />
          <Route path="/football-ukraine/poltava" element={<SubsectionContent section="Полтава" />} />
          <Route path="/football-ukraine/kudrivka" element={<SubsectionContent section="Кудрівка" />} />
          <Route path="/football-ukraine/podillya" element={<SubsectionContent section="Поділля" />} />
          <Route path="/football-ukraine/metalist1925" element={<SubsectionContent section="Металіст 1925" />} />
          <Route path="/football-ukraine/metalist" element={<SubsectionContent section="Металіст" />} />
          <Route path="/football-ukraine/nyva" element={<SubsectionContent section="Нива" />} />
          <Route path="/football-ukraine/fenix-mariupol" element={<SubsectionContent section="Фенікс-Маріуполь" />} />
          <Route path="/football-ukraine/metalurh" element={<SubsectionContent section="Металург" />} />
          <Route path="/football-ukraine/prykarpattia" element={<SubsectionContent section="Прикарпаття" />} />
          <Route path="/football-ukraine/dinaz" element={<SubsectionContent section="Діназ" />} />
          <Route path="/football-ukraine/minai" element={<SubsectionContent section="Минай" />} />

          <Route path="/football-ukraine/chernihiv" element={<SubsectionContent section="Чернігів" />} />
          <Route path="/football-ukraine/hirnyk-sport" element={<SubsectionContent section="Гірник-Спорт" />} />
          <Route path="/football-ukraine/probiy" element={<SubsectionContent section="Пробій" />} />
          <Route path="/football-ukraine/real-pharma" element={<SubsectionContent section="Реал Фарма" />} />
          <Route path="/football-ukraine/lokomotiv" element={<SubsectionContent section="Локомотив" />} />
          <Route path="/football-ukraine/lisne" element={<SubsectionContent section="Лісне" />} />
          <Route path="/football-ukraine/skala-1911" element={<SubsectionContent section="Скала 1911" />} />
          <Route path="/football-ukraine/uzhorod" element={<SubsectionContent section="ФК Ужгород" />} />




          <Route path="/championships" element={<Championships />} />
            <Route path="/championships/europe-news" element={<SubsectionContent section="Європейські новини" />} />
            <Route path="/world-football/global" element={<SubsectionContent section="Світовий футбол" />} />
            <Route path="/championships/epl" element={<SubsectionContent section="Англійська Премʼєр-ліга" />} />
            <Route path="/championships/la-liga" element={<SubsectionContent section="Іспанська Ла Ліга" />} />
            <Route path="/championships/seriaA" element={<SubsectionContent section="Італійська Серія А" />} />
            <Route path="/championships/bundesliga" element={<SubsectionContent section="Німецька Бундесліга" />} />
            <Route path="/championships/ligue1" element={<SubsectionContent section="Французька Ліга 1" />} />

          <Route path="/eurocups" element={<EuroCups />} />
            <Route path="/eurocups/champions-league" element={<SubsectionContent section="Ліга Чемпіонів" />} />
            <Route path="/eurocups/europa-league" element={<SubsectionContent section="Ліга Європи" />} />
            <Route path="/eurocups/conference-league" element={<SubsectionContent section="Ліга Конференцій" />} />


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
            <Route path="/tournaments/club-world-cup-2025" element={<SubsectionContent section="Клубний чемпіонат світу 2025" />} />  


        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/search" element={<SearchResults />} /> 
        <Route path="/profile/:userId" element={<ProfilePage />} /> 

        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/archive" element={<Archive />} />

        <Route path="/admin" element={
          <RequireAuth adminOnly={true}>
            <AdminPanel />
          </RequireAuth>
        } />
      </Routes>
    </div>
  );
};

export default Main; 

