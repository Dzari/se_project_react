const validateFetch = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};


export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    return validateFetch(res);
  });
};

export const filterWeatherData = (data) => {
  const result = {};

  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  if (now <= sunset * 1000 && now >= sunrise * 1000) {
    return true;
  } else return false;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return 'hot';
  } else if (temperature >= 66) {
    return 'warm';
  } else {
    return 'cold';
  }
};

export { validateFetch };
