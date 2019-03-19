import React from 'react';
import Forecast from './forecast';
import Current from './Current';

/**
 * Weather component.
 */
const Weather = ({ forecast, current }) => (
  <div className="card">
    <div className="card-body">
      <Current data={current} />
      <Forecast data={forecast} />
    </div>
  </div>
);

export default Weather;
