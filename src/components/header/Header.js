import React from 'react';
import './Header.scss';

/**
 * Header component.
 */
const Header = () => (
  <nav className="navbar sticky-top weather-header">
    <button
      type="button"
      className="navbar-brand btn-link btn weather-header__brand"
    >
      Wether App
      <span role="img" aria-label="Weather">
        ☁️
      </span>
    </button>
  </nav>
);
export default Header;
