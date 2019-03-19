import React from 'react';
import Chart from '../chart';

/**
 * Current component.
 */
const Current = ({ data: current }) => (
  <React.Fragment>
    <div className="row">
      <div className="col">
        <h5>
          {current.city.name}, {current.city.country} | {current.day}
        </h5>
        <h5>{current.weather.main}</h5>
      </div>
      <div className="col">
        <img src={current.weather.icon} alt={current.weather.name} />
        <h3>{Math.round(current.main.temp)}&deg;C</h3>
      </div>
    </div>
    <Chart data={current.chart} />
  </React.Fragment>
);

export default Current;
