import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

/**
 * Weather props types.
 */
Weather.propTypes = {
  /** Forecast data */
  forecast: PropTypes.array.isRequired,
  /** Current weather data */
  current: PropTypes.shape({ day: PropTypes.string }).isRequired,
};
export default Weather;
