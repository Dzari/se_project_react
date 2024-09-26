const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.wtwr.apps.dj'
    : 'http://localhost:3001';

const weatherOptions = [
  {
    day: true,
    condition: 'clear',
    url: new URL('../assets/day/clearDay.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'atmosphere',
    url: new URL('../assets/day/atmosphereDay.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'clouds',
    url: new URL('../assets/day/cloudsDay.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'rain',
    url: new URL('../assets/day/rainDay.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'snow',
    url: new URL('../assets/day/snowDay.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'thunderstorm',
    url: new URL('../assets/day/thunderstormDay.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'clear',
    url: new URL('../assets/night/clearNight.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'atmosphere',
    url: new URL('../assets/night/atmosphereNight.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'clouds',
    url: new URL('../assets/night/cloudsNight.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'rain',
    url: new URL('../assets/night/rainNight.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'snow',
    url: new URL('../assets/night/snowNight.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'thunderstorm',
    url: new URL('../assets/night/thunderstormNight.svg', import.meta.url).href,
  },
];

const defaultWeatherOptions = {
  day: {
    day: true,
    condition: 'clear',
    url: new URL('../assets/day/clearDay.svg', import.meta.url).href,
  },
  night: {
    day: false,
    condition: 'clear',
    url: new URL('../assets/night/clearNight.svg', import.meta.url).href,
  },
};

const coordinates = {
  latitude: 38.81271,
  longitude: -77.637543,
};

const APIKey = 'a63cf73b18c7fcc3512e24fed7ae4d58';

const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
};

export {
  getInitials,
  APIKey,
  coordinates,
  weatherOptions,
  baseUrl,
  defaultWeatherOptions,
};
