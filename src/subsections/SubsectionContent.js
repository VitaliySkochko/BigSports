import React, { useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 24;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredNews = newsList.filter((news) =>
    Array.isArray(news.sections)
      ? news.sections.includes(section)
      : news.section?.trim() === section.trim()
  );

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  return (
    <div className="panel">
      <h1>{section}</h1>

      {/* Показуємо клуби тільки для УПЛ */}
      {section === 'УПЛ' && <UplClubs />}
      {section === 'Перша Ліга' && <FirstLeagueClubs />}
      {section === 'Друга Ліга' && <SecondLeagueClubs />}

      {/* Інформація про клуб (тільки якщо є) */}
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



