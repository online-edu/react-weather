// @flow
import React, { Component } from 'react';
import { City, Footer, Header, Weather } from './components';
import { loadWeatherByCity } from './components/weather/WeatherService';

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      data: {},
      loader: true,
      err: { network: false, message: '' },
    };
    this.onCityClick = this.onCityClick.bind(this);
  }

  componentDidMount() {
    this.loadWeather('Vancouver', 'CA');
  }

  onCityClick(city) {
    const { name, country } = city;
    this.loadWeather(name, country);
  }

  loadWeather(name, country) {
    this.setState({ loader: true });
    loadWeatherByCity(name, country)
      .then(data => {
        this.setState({ data });
      })
      .catch(error => {
        this.setState({
          err: { network: true, message: error.message },
        });
      })
      .finally(() => this.setState({ loader: false }));
  }

  render() {
    const { data, loader, err } = this.state;
    return (
      <React.Fragment>
        <Header />
        <main>
          <div className="container py-4 weather">
            <City cityClick={this.onCityClick} loader={loader} />
            {!loader && !err.network && (
              <Weather
                current={data.current}
                chart={data.chart}
                forecast={data.forecast}
              />
            )}
            {err.network && (
              <div className="alert alert-danger" role="alert">
                {err.message}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
