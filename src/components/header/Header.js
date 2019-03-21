import React from 'react';
import Search from '../search';
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
    <form className="form-inline my-2 my-lg-0">
      <Search />
    </form>
  </nav>
);
export default Header;
