/*цей компонент надає сторінку з новинами про Першу Лігу, 
де відображаються заголовок, опис та список новин у зворотньому порядку (новіші вгорі). */

import { useNews } from './NewsContext';
import Subsections from './Subsections';
import NewsListWithPagination from './NewsListWithPagination';

const FootballEurope = () => {
  const { newsList } = useNews();
  const newsPerPage = 30;

  return (
    <div className='panel'>
      <h1>ФУТБОЛ ЄВРОПИ</h1>
      <Subsections category="Футбол Європи" />
      {/* Компонент з іншими новинами і пагінацією */}
      <NewsListWithPagination newsList={newsList.slice(5)} newsPerPage={newsPerPage} />
    </div>
  );
};

export default FootballEurope;




















