import React from 'react';
import './SearchResult.css';

const SearchResult = ({ weatherData }) => {
    return weatherData.temp ? <p>Weather Info: <span className="weather-info">{weatherData.temp}&deg;C ({weatherData.description})</span></p> : null
};

export default SearchResult;