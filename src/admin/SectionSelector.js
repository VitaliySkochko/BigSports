// Категорії та та логіка відображення чекбоксів 
import React from 'react';

const sectionsByCategory = {
  'Футбол України': ['Кубок України', 'Збірна України', 'УПЛ', 'Шахтар', 'Динамо Київ', 'Олександрія', 'Кривбас', 'Зоря', 'Оболонь','Колос', 'Рух', 'ЛНЗ', 'Карпати', 'Полісся', 'Верес',
    'Епіцентр', 'Полтава', 'Кудрівка', 'Металіст 1925', 'Перша Ліга', 'Лівий Берег', 'Інгулець', 'Ворскла', 'Чорноморець', 'Буковина', 'Вікторія', 'Агробізнес', 'ЮКСА', 'Поділля',
    'Металіст', 'Нива', 'Фенікс-Маріуполь', 'Прикарпаття', 'Пробій', 'Чернігів', 'Металург', 'Друга Ліга', 'Гірник-Спорт', 'Діназ', 'Реал Фарма', 'Лісне','Локомотив','Скала 1911','ФК Ужгород'],
  'Чемпіонати': ['Європейські новини', 'Світовий футбол', 'Англійська Премʼєр-ліга', 'Іспанська Ла Ліга', 'Німецька Бундесліга', 'Французька Ліга 1', 'Італійська Серія А'],
  'Єврокубки': ['Ліга Чемпіонів', 'Ліга Європи', 'Ліга Конференцій'],
  'Біатлон': ['Новини', 'Кубок Світу', 'Кубок IBU', 'Чемпіонат Світу'],
  'Види спорту': ['Бокс', 'Теніс', 'MMA', 'Футзал'],
  'Турніри': ['Клубний чемпіонат світу 2025', 'Чемпіонат світу 2026'],
};

const SectionSelector = ({ category, selectedSections, setSelectedSections }) => {
  const handleToggleSection = (section) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  if (!category || !sectionsByCategory[category]) {
    return <p>Оберіть категорію</p>;
  }

  return (
    <>
      {sectionsByCategory[category].map((section) => (
        <label key={section} style={{ display: 'block', marginBottom: '5px' }}>
          <input
            type="checkbox"
            value={section}
            checked={selectedSections.includes(section)}
            onChange={() => handleToggleSection(section)}
          />
          {section}
        </label>
      ))}
    </>
  );
};

export { sectionsByCategory };
export default SectionSelector;
