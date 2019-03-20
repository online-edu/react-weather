import React from 'react';
import './Forecast.scss';
import ForecastDay from './ForecastDay';

/**
 * Forecast component.
 */
const Forecast = ({ data: forecast, forecastClick }) => (
  <div className="row">
    {forecast &&
      forecast.map((item, i) => (
        <ForecastDay
          forecastClick={() => forecastClick(item)}
          item={item}
          key={i}
        />
      ))}
  </div>
);

export default Forecast;
