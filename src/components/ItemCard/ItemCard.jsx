import './itemCard.css';

export default function ItemCard({ card, onClick }) {
  const handleCardClick = () => {
    onClick(card);
  };

  return (
    <li className="card">
      <h2 className="card__name">{card.name}</h2>
      <img
        className="card__image"
        src={card.imageUrl}
        alt={card.name}
        onClick={handleCardClick}
      />
    </li>
  );
}
