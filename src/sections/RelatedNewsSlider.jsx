import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/RelatedNewsSlider.css';

const RelatedNewsSlider = ({ currentNews, newsList, title = 'Читайте також' }) => {
  const location = useLocation();

  const relatedNews = useMemo(() => {
    if (!currentNews || !Array.isArray(newsList)) return [];

    const currentTags = Array.isArray(currentNews.tags) ? currentNews.tags : [];
    const currentSections = Array.isArray(currentNews.sections) ? currentNews.sections : [];

    const scored = newsList
      .filter((item) => item.id !== currentNews.id)
      .map((item) => {
        let score = 0;

        if (item.category && item.category === currentNews.category) {
          score += 3;
        }

        if (Array.isArray(item.sections) && currentSections.length > 0) {
          const sharedSections = item.sections.filter((section) =>
            currentSections.includes(section)
          ).length;
          score += sharedSections * 4;
        }

        if (Array.isArray(item.tags) && currentTags.length > 0) {
          const sharedTags = item.tags.filter((tag) =>
            currentTags.includes(tag)
          ).length;
          score += sharedTags * 5;
        }

        return { ...item, _score: score };
      })
      .filter((item) => item._score > 0)
      .sort((a, b) => {
        if (b._score !== a._score) return b._score - a._score;

        const getTime = (n) => {
          if (n?.timestamp?.seconds) return n.timestamp.seconds * 1000;
          if (n?.timestamp instanceof Date) return n.timestamp.getTime();
          return 0;
        };

        return getTime(b) - getTime(a);
      })
      .slice(0, 8);

    if (scored.length >= 4) return scored;

    const fallback = newsList
      .filter((item) => item.id !== currentNews.id)
      .filter((item) => item.category === currentNews.category)
      .slice(0, 8);

    return fallback;
  }, [currentNews, newsList]);

  if (!relatedNews.length) return null;

  return (
    <div className="related-news-block">
      <div className="related-news-head">
        <h3>{title}</h3>
      </div>

      <div className="related-news-scroll">
        {relatedNews.map((item) => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            state={{ from: location.pathname + location.search }}
            className="related-news-card"
          >
            <div className="related-news-image-wrap">
              <img
                src={item.image}
                alt={item.title}
                className="related-news-image"
              />
            </div>

            <div className="related-news-content">
              <div className="related-news-date">
                {item.day}.{item.month}.{item.year} {item.time}
              </div>

              <div className="related-news-title">
                {item.title}
              </div>

              <div className="related-news-footer">
  <div className="related-news-category">
    {Array.isArray(item.sections) && item.sections.length > 0
      ? item.sections[0]
      : item.category}
  </div>
</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedNewsSlider;