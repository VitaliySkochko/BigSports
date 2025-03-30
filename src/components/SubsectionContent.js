import React, { useState } from 'react';
import { useNews } from './NewsContext';
import Pagination from './Pagination';
import SubsectionNewsList from '../newslist/SubsectionNewsList';
import '../styles/SubsectionContent.css';
import ClubInfoCard from '../infocard/ClubInfoCard';
import { ClubInfoMap } from '../infocard/ClubInfoMap'; 

const SubsectionContent = ({ section }) => {
  const { newsList } = useNews();
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 24;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Фільтрація новин за підрозділом
  const filteredNews = newsList.filter((news) => {
    if (Array.isArray(news.sections)) {
      return news.sections.includes(section);
    }
    return news.section?.trim() === section.trim();
  });

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  return (
    <div className="panel">
      <h1>{section}</h1>

      {/* Інформаційна картка клубу (якщо є) */}
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


