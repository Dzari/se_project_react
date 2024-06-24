import image from '../../assets/weathercard.svg';
import './weatherCard.css';

export default function weatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img src={image} alt="" className="weather-card__image" />
    </section>
  );
}
