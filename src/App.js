// @flow
import React, { Component } from 'react';
import { Search, Weather } from './components';
import { loadWeatherByCity } from './components/weather/WeatherService';

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      data: {},
      loader: true,
    };
  }

  componentDidMount() {
    loadWeatherByCity().then(data => {
      this.setState({ loader: false, data });
    });
  }

  render() {
    const { data, loader } = this.state;
    console.log(data);
    return (
      <div className="container pt-5">
        <Search />
        {!loader && (
          <Weather
            current={data.current}
            chart={data.chart}
            forecast={data.forecast}
          />
        )}
      </div>
    );
  }
}

export default App;
