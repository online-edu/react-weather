import { api, key, imageUrl } from '../../utils/config';
import { days, fullDay } from '../../utils/days';
import request from '../../utils/request';

const query = `units=metric&APPID=${key}`;
/**
 * Get date number from full date
 * @param {String} date - date
 * @returns {Number}
 */
const getDate = date => new Date(date).getDate();

/**
 * Get week day number from date
 * @param {String} date - date
 * @returns {Number}
 */
const getDay = date => new Date(date).getDay();

/**
 * Get weather forecast as an object
 * @param {Number} currentDate
 * @param {Number} dayNumber
 * @param {String} icon
 * @param {String} alt
 * @param {String} day
 * @param {Object} main
 * @returns {Object}
 */
const getWeatherForecast = (
  currentDate,
  dayNumber,
  icon,
  alt,
  day,
  { temp_min, temp_max },
) => ({
  date: currentDate,
  id: dayNumber,
  minTemp: Math.round(temp_min),
  maxTemp: Math.round(temp_max),
  icon: `${imageUrl}/${icon}.png`,
  alt,
  day,
});

/**
 * Get current weather as an object
 * @param {String} date
 * @param {Object} weather
 * @param {Object} main
 * @param {String} city
 * @param {Object[]} chart
 * @returns {Object}
 */
const getCurrentWeather = (
  date,
  weather,
  main,
  city,
  chart,
  iconReady = false,
) => ({
  day: fullDay[getDay(date)],
  weather: {
    ...weather,
    icon: iconReady ? weather.icon : `${imageUrl}/${weather.icon}.png`,
  },
  main,
  city,
  chart,
});

const getChartData = hours =>
  hours.map(({ dt_txt, main: { temp } }) => {
    let hours = new Date(dt_txt).getHours();
    const ampm = hours >= 12 ? ' pm' : ' am';
    hours = hours % 12;
    hours = (hours ? hours : 12) + ampm;
    return { hours, temp };
  });

/**
 * Retrieve all data from `sessionStorage`
 * @returns {Object[]}
 */
const getWeatherFromStorage = () => {
  const data = sessionStorage.getItem('data');
  return (data && JSON.parse(data)) || [];
};

/**
 * Retrieve city from `sessionStorage`
 * @returns {Object}
 */
const getCityFromStorage = () => {
  const city = sessionStorage.getItem('city');
  return (city && JSON.parse(city)) || {};
};

/**
 * Load weather by day
 * @param {Object} day
 * @returns {Object}
 */
const loadWeatherByDay = weather => {
  const data = getWeatherFromStorage();
  const city = getCityFromStorage();
  console.log(weather);
  const { date, day, maxTemp, alt } = weather;
  const key = `${date}_${day}`;
  const current = getCurrentWeather(
    new Date().setDate(date),
    { ...weather, main: alt },
    { temp: maxTemp },
    city,
    getChartData(data[key]),
    true,
  );

  return current;
};

/**
 * Load weather by city from server
 * @param {String} city - city name
 * @returns {Promise}
 */
const loadWeatherByCity = (city = 'London') =>
  request.get(`${api}/forecast?q=${city}&${query}`).then(({ city, list }) => {
    localStorage.setItem('weather', JSON.stringify(list));
    // Format data for chart for current day
    const tempInHours = getChartData(list.slice(0, 8));
    // Format data for next 5 days
    const tempInDays = [];
    let sortedList = {};
    list.reduce((prev, current) => {
      const {
        dt_txt,
        main,
        weather: [{ icon, main: alt }],
      } = current;
      const currentDate = getDate(dt_txt);
      const prevDate = getDate(prev.dt_txt);
      const dayNumber = getDay(dt_txt);
      const day = days(dayNumber);
      const key = `${currentDate}_${day}`;
      const existingItems = sortedList[key] || [];
      sortedList = {
        ...sortedList,
        [key]: [...existingItems, current],
      };
      if (currentDate !== prevDate) {
        tempInDays.push(
          getWeatherForecast(currentDate, dayNumber, icon, alt, day, main),
        );
      }
      return current;
    }, []);

    sessionStorage.setItem('data', JSON.stringify(sortedList));
    sessionStorage.setItem('city', JSON.stringify(city));

    const [
      {
        dt_txt,
        main,
        weather: [weather],
      },
    ] = list;

    return Promise.resolve({
      forecast: tempInDays,
      current: getCurrentWeather(dt_txt, weather, main, city, tempInHours),
    });
  });

export { loadWeatherByCity, loadWeatherByDay };
