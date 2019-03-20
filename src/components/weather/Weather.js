import React, { useState } from 'react';
import Forecast from './forecast';
import Current from './Current';
import { loadWeatherByDay } from './WeatherService';

/**
 * Weather component.
 */
const Weather = ({ forecast, current }) => {
  const [currentWeather, setCurrentWeather] = useState(current);

  function onForecastClick(day) {
    setCurrentWeather(loadWeatherByDay(day));
  }

  return (
    <div className="card">
      <div className="card-body">
        <Current data={currentWeather} />
        <div className="dropdown-divider" />
        <Forecast data={forecast} forecastClick={onForecastClick} />
      </div>
    </div>
  );
};

export default Weather;
