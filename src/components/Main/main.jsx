import WeatherCard from '../WeatherCard/weatherCard';
import { defaultClothingItems } from '../../utils/constants';
import ItemCard from '../ItemCard/ItemCard';
import './main.css';

export default function Main({ weatherData }) {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">Today is 75 &deg; F / You may want to wear:</p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((card) => {
              return card.weather === weatherData.type;
            })
            .map((card) => {
              return <ItemCard key={card._id} card={card} />;
            })}
        </ul>
      </section>
    </main>
  );
}
