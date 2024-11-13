
import React, { useState } from 'react';
import './Header.css';

function Header({ onSearch, onLanguageChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    onLanguageChange(event.target.value);
  };

  return (
    <div className="header">
      <img
        className="header__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
      />
      <input
        type="text"
        className="header__searchInput"
        placeholder="Search movies or TV shows"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select
        className="header__languageDropdown"
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
        <option value="pt">Portuguese</option>
        <option value="ja">Japanese</option>
        <option value="ko">Korean</option>
        <option value="hi">Hindi</option>
      </select>
    </div>
  );
}

export default Header;

