import WeatherCard from '../src/components/WeatherCard/weatherCard';
import { defaultClothingItems } from '../src/utils/constants';
import ItemCard from '../src/components/ItemCard/ItemCard';
import './main.css';

export default function Main({ weatherData, handleCardClick }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F} &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((card) => {
              return card.weather === weatherData.type;
            })
            .map((card) => {
              return (
                <ItemCard
                  key={card._id}
                  card={card}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
