import React from 'react';
import ForecastDay from './ForecastDay';

/**
 * Forecast component.
 */
const Forecast = ({ data: forecast }) => (
  <div className="row">
    {forecast && forecast.map((item, i) => <ForecastDay item={item} key={i} />)}
  </div>
);

export default Forecast;
