// @flow
import React, { useState, useEffect } from 'react';
import { City, Search, Weather } from './components';
import { loadWeatherByCity } from './components/weather/WeatherService';

const App = () => {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    loadWeather('Vancouver', 'CA');
  });

  function onCityClick(city) {
    const { name, country } = city;
    setLoader(true);
    loadWeather(name, country);
  }

  function loadWeather(city, country) {
    loadWeatherByCity(city, country).then(data => {
      setData(data);
      setLoader(false);
    });
  }

  return (
    <div className="container pt-5">
      <Search />
      <City cityClick={onCityClick} loader={loader} />
      {!loader && (
        <Weather
          current={data.current}
          chart={data.chart}
          forecast={data.forecast}
        />
      )}
    </div>
  );
};

export default App;
