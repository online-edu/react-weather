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
          <img src={current.weather.icon} alt={current.weather.name} />
          {Math.round(current.main.temp)}&deg;C {current.weather.main}
          &#x2c;&nbsp;
          {current.city.name} &ndash; {current.city.country}&#x2c;&nbsp;
          {current.day}
        </h5>
      </div>
    </div>
    <Chart data={current.chart} />
  </React.Fragment>
);

export default Current;
