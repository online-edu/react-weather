// @flow
import React, { useState, useEffect } from 'react';
import { City, Footer, Header, Weather } from './components';
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
    <React.Fragment>
      <Header />
      <main>
        <div className="container py-4 weather">
          <City cityClick={onCityClick} loader={loader} />
          {!loader && (
            <Weather
              current={data.current}
              chart={data.chart}
              forecast={data.forecast}
            />
          )}
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default App;
