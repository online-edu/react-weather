import React from 'react';
import Chart from '../chart';

/**
 * Current component.
 */
const Current = ({ data: current }) => (
  <React.Fragment>
    <h5 className="card-title">
      {current.city.name} &ndash; {current.city.country}&nbsp;&nbsp;&nbsp;|
      <img src={current.weather.icon} alt={current.weather.name} />
      {Math.round(current.main.temp)}&deg;C {current.weather.main}
      &nbsp;({current.day})
    </h5>
    <Chart data={current.chart} />
  </React.Fragment>
);

export default Current;
