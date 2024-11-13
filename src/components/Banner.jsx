
import React, {useState} from 'react';
import './Banner.css';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Banner({ movie }) {
    const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <header className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">SignIn</button>
          <button className="banner__button">Subscribe</button>
        </div>
        <p
  className={`banner__description ${isExpanded ? 'expanded' : ''}`}
>
  {isExpanded ? movie?.overview : `${movie?.overview?.substring(0, 200)}...`}
  <span
    className="banner__read-more"
    onClick={toggleDescription}
  >
    {isExpanded ? " Show Less" : " Read More"}
  </span>
</p>

      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
