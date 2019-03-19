import React from 'react';

/**
 * ForecastDay component.
 */
const ForecastDay = ({ item }) => (
  <div className="col text-center">
    <div>
      <span className="text-muted">{item.day}</span>
    </div>
    <img src={item.icon} alt={item.alt} />
    <p className="text-muted text-center">
      <span className="mr-2">{item.maxTemp}&deg;C</span>
      <span>{item.minTemp}&deg;C</span>
    </p>
  </div>
);

export default ForecastDay;
