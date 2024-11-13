
import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from 'axios';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, searchQuery, language }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let requestUrl = `https://api.themoviedb.org/3${fetchUrl}&language=${language}`;

    if (searchQuery && searchQuery.trim() !== '') {
      requestUrl = `https://api.themoviedb.org/3/search/movie?api_key=MyApikey&language=${language}&query=${searchQuery}`;
    }

    axios.get(requestUrl)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMovies([]);  
      });
  }, [fetchUrl, searchQuery, language]); 

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster row__posterLarge"
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name}
            />
          ))
        ) : (
          <p>No results found.</p> 
        )}
      </div>
    </div>
  );
}

export default Row;

