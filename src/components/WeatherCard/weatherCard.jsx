import { weatherOptions } from '../../utils/constants';
import './weatherCard.css';

export default function weatherCard({ weatherData }) {
  const weatherOption = weatherOptions.filter((option) => {
    return (
      weatherData.condition === option.condition &&
      weatherData.isDay === option.day
    );
  });

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
      <img src={weatherOption[0].url} alt="" className="weather-card__image" />
    </section>
  );
}
