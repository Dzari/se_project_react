import { useContext } from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import './main.css';
import {
  CurrentTemperatureUnitContext,
  CurrentUserContext,
  LoggedInContext,
} from '../../contexts/contexts';

const Main = ({
  weatherData,
  handleCardClick,
  clothingItems,
  handleCardLike,
}) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { currentUser } = useContext(CurrentUserContext);
  const { isLoggedIn } = useContext(LoggedInContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{' '}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((card) => {
              return isLoggedIn
                ? card.owner === currentUser._id &&
                    card.weather === weatherData.type
                : card.weather === weatherData.type;
            })
            .map((card) => {
              return (
                <ItemCard
                  key={card._id}
                  card={card}
                  onClick={handleCardClick}
                  handleCardLike={handleCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
};

export default Main;
