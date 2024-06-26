import './itemCard.css';

export default function itemCard({ card, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(card);
  };

  return (
    <li className="card">
      <h2 className="card__name">{card.name}</h2>
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
    </li>
  );
}
