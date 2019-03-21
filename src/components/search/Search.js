import React from 'react';

/**
 * Search component.
 */
const Search = () => (
  <div className="input-group input-group-lg mb-4">
    <input
      type="text"
      className="form-control"
      aria-label="Sizing example input"
      placeholder="Type a city name"
      aria-describedby="inputGroup-sizing-lg"
      disabled
    />
  </div>
);

export default Search;
