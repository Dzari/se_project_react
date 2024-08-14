import React, { useContext } from 'react';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTempatureUnitContexts';
import { weatherOptions } from '../../utils/constants';
import './weatherCard.css';

export default function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      weatherData.condition === option.condition &&
      weatherData.isDay === option.day
    );
  });
  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = {
      url: 'http://localhost:3000/src/assets/day/clearDay.svg',
    };
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}&deg;F
      </p>
      <img src={weatherOption.url} alt="" className="weather-card__image" />
    </section>
  );
}
