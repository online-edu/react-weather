import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner';
import './City.scss';

const cities = [
  { name: 'Vancouver', country: 'CA', aria: 'Flag: Canada', icon: '🇨🇦' },
  { name: 'Chicago', country: 'US', aria: 'Flag: United States', icon: '🇺🇸' },
  { name: 'Mumbai', country: 'IN', aria: 'Flag: India', icon: '🇮🇳' },
  { name: 'Berlin', country: 'DE', aria: 'Flag: Germany', icon: '🇩🇪' },
  { name: 'Tokyo', country: 'JP', aria: 'Flag: Japan', icon: '🇯🇵' },
  { name: 'London', country: 'GB', aria: 'Flag: United Kingdom', icon: '🇬🇧' },
];

/**
 * City component.
 */
const City = ({ cityClick, loader }) => (
  <div className="card mb-4">
    <div className="card-body">
      <h5 className="card-title">
        Popular Cities
        {loader && (
          <div className="float-right">
            <Spinner />
          </div>
        )}
      </h5>
      <div className="row">
        {cities &&
          cities.map((city, i) => (
            <div className="col text-center" key={i}>
              <button
                type="button"
                className="btn btn-link text-decoration-none city__btn"
                onClick={() => cityClick(city)}
                onKeyPress={() => cityClick(city)}
              >
                <div>
                  <span className="text-muted">{city.name}</span>
                </div>
                <span
                  className="city__btn--country-icon"
                  role="img"
                  aria-label={city.aria}
                >
                  {city.icon}
                </span>
              </button>
            </div>
          ))}
      </div>
    </div>
  </div>
);

/**
 * City props types.
 */
City.propTypes = {
  /** Toggle spinner */
  loader: PropTypes.bool,
  /** Gets called when the city button is clicked. */
  cityClick: PropTypes.func.isRequired,
};
export default City;
