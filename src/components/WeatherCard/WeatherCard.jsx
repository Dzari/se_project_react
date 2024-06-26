import { weatherOptions } from '../../utils/constants';
import './weatherCard.css';

export default function weatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      weatherData.condition === option.condition &&
      weatherData.isDay === option.day
    );
  });
  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = '';
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
      <img src={weatherOption.url} alt="" className="weather-card__image" />
    </section>
  );
}