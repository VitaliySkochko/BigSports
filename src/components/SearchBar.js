import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?q=${searchTerm}`);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Пошук новин на сайті"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Пошук</button>
    </div>
  );
};

export default SearchBar;
