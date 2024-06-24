import WeatherCard from '../WeatherCard/weatherCard';
import ItemCard from '../ItemCard/ItemCard';
import './main.css';

export default function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">Today is 75 &deg; F / You may want to wear:</p>
        <ItemCard />
      </section>
    </main>
  );
}
