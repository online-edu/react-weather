import React from 'react';

/**
 * ForecastDay component.
 */
const ForecastDay = ({ item, forecastClick }) => (
  <div className="col text-center rounded forecast__day">
    <button
      type="button"
      className="btn btn-link text-decoration-none"
      onClick={forecastClick}
      onKeyPress={forecastClick}
    >
      <div>
        <span className="text-muted">{item.day}</span>
      </div>
      <img src={item.icon} alt={item.alt} />
      <p className="text-muted text-center">
        <span className="mr-2">{item.maxTemp}&deg;C</span>
        <span>{item.minTemp}&deg;C</span>
      </p>
    </button>
  </div>
);

export default ForecastDay;
