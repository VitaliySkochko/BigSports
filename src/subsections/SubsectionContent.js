import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNews } from '../components/NewsContext';
import Pagination from '../components/Pagination';
import SubsectionNewsList from '../newslist/SubsectionNewsList';
import UplClubs from './UplClubs';
import '../styles/SubsectionContent.css';
import ClubInfoCard from '../infocard/ClubInfoCard';
import { ClubInfoMap } from '../infocard/ClubInfoMap';
import FirstLeagueClubs from './FirstLeagueClubs';
import SecondLeagueClubs from './SecondLeagueClubs';

const SubsectionContent = ({ section }) => {
  const { newsList } = useNews();
  const [searchParams, setSearchParams] = useSearchParams();

  const newsPerPage = 24;
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (page) => {
    setSearchParams({ page: String(page) });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const filteredNews = newsList.filter((news) =>
    Array.isArray(news.sections)
      ? news.sections.includes(section)
      : news.section?.trim() === section.trim()
  );

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  return (
    <div className="panel panel--spaced">
      <h1>{section}</h1>

      {section === 'УПЛ' && <UplClubs />}
      {section === 'Перша Ліга' && <FirstLeagueClubs />}
      {section === 'Друга Ліга' && <SecondLeagueClubs />}

      {ClubInfoMap[section] && <ClubInfoCard club={ClubInfoMap[section]} />}

      <SubsectionNewsList
        newsList={filteredNews}
        newsPerPage={newsPerPage}
        currentPage={currentPage}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SubsectionContent;