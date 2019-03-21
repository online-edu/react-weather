import axios from 'axios';
/**
 * Request service for network calls.
 */
export default {
  /**
   * Get request
   *
   * @param {string} url - network request url
   * @param {Object} request - request configuration
   */
  get(url, request) {
    return axios
      .get(url, request)
      .then(resp => Promise.resolve(resp.data))
      .catch(error => Promise.reject(error.response.data));
  },
};
