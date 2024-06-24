import './itemCard.css';

export default function itemCard({ card }) {
  return (
    <li className="card">
      <h2 className="card__name">{card.name}</h2>
      <img className="card__image" src={card.link} alt={card.name} />
    </li>
  );
}
