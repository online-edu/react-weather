import { api, key, imageUrl } from '../../utils/config';
import { days, fullDay } from '../../utils/days';
import request from '../../utils/request';

const query = `units=metric&APPID=${key}`;

/**
 * Load weather by city from server
 * @param {String} city - city name
 * @returns {Promise}
 */
const loadWeatherByCity = (city = 'London') =>
  request.get(`${api}/forecast?q=${city}&${query}`).then(({ city, list }) => {
    // Format data for chart for current day
    let tempInHours = list.slice(0, 8);
    tempInHours = tempInHours.map(({ dt_txt, main: { temp } }) => {
      let hours = new Date(dt_txt).getHours();
      const ampm = hours >= 12 ? ' pm' : ' am';
      hours = hours % 12;
      hours = (hours ? hours : 12) + ampm;
      return { hours, temp };
    });

    // Format data for next 5 days
    const tempInDays = [];
    list.reduce((prev, current) => {
      const {
        dt_txt,
        main,
        weather: [{ icon, main: alt }],
      } = current;
      const { dt_txt: prevDt } = prev;
      const dt = new Date(dt_txt);
      const currentDate = dt.getDate();
      const prevDate = new Date(prevDt).getDate();
      if (currentDate !== prevDate) {
        const dayNumber = dt.getDay();
        const day = days(dayNumber);
        const { temp_min: min, temp_max: max } = main;
        tempInDays.push({
          id: dayNumber,
          minTemp: Math.round(min),
          maxTemp: Math.round(max),
          icon: `${imageUrl}/${icon}.png`,
          alt,
          day,
        });
      }
      return current;
    }, []);

    const [
      {
        dt_txt,
        main,
        weather: [weather],
      },
    ] = list;

    const current = {
      day: fullDay[new Date(dt_txt).getDay()],
      weather: { ...weather, icon: `${imageUrl}/${weather.icon}.png` },
      main,
      city,
      chart: tempInHours,
    };
    return Promise.resolve({
      forecast: tempInDays,
      current,
    });
  });

export { loadWeatherByCity };
