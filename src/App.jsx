

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Row from './components/Row';
import Banner from './components/Banner';
import Header from './components/Header';
import { debounce } from 'lodash';
import requests from './requests';

function App() {
  const [movies, setMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('en');

  
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3${requests.fetchTrending}&language=${language}`)
      .then((response) => {
        setBannerMovie(
          response.data.results[
            Math.floor(Math.random() * response.data.results.length)
          ]
        );
      })
      .catch((error) => console.log(error));

    const fetchMovies = () => {
      const searchUrl = searchQuery ? `&query=${searchQuery}` : '';
      axios.get(`https://api.themoviedb.org/3${requests.fetchTrending}&language=${language}${searchUrl}`)
        .then((response) => setMovies(response.data.results))
        .catch((error) => console.log(error));
    };

    fetchMovies();
  }, [searchQuery, language]);  
 
  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);  
  }, 500);  


  const handleSearch = (query) => {
    debouncedSearch(query);  
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);  
  };

  return (
    <div className="App">
      
      <Header onSearch={handleSearch} onLanguageChange={handleLanguageChange} />

     
      <Banner movie={bannerMovie} />


      <Row title="Trending Now" fetchUrl={requests.fetchTrending} searchQuery={searchQuery} language={language} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} searchQuery={searchQuery} language={language} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} searchQuery={searchQuery} language={language} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} searchQuery={searchQuery} language={language} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} searchQuery={searchQuery} language={language} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} searchQuery={searchQuery} language={language} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} searchQuery={searchQuery} language={language} />
    </div>
  );
}

export default App;
