import { useNews } from './NewsContext';
import Subsections from './Subsections';
import NewsListWithPagination from './NewsListWithPagination';

const Tournaments = () => {
  const { newsList } = useNews(); 
  const newsPerPage = 30;

  return (
    <div className='panel'>
      <h1>Турніри</h1>
      <Subsections category="Турніри" />
      {/* Компонент з іншими новинами і пагінацією */}
      <NewsListWithPagination newsList={newsList.slice(5)} newsPerPage={newsPerPage} />
    </div>
  );
};

export default Tournaments;
