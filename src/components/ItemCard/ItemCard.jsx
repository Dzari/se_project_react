import { useContext } from 'react';
import './itemCard.css';
import { CurrentUserContext, LoggedInContext } from '../../contexts/contexts';

export default function ItemCard({ card, onClick, handleCardLike }) {
  const { isLoggedIn } = useContext(LoggedInContext);
  const { currentUser } = useContext(CurrentUserContext);

  let isLiked = card.likes.includes(currentUser._id);

  const handleCardClick = () => {
    onClick(card);
  };

  const handleLikeClick = () => {
    handleCardLike(card);
    isLiked = card.likes.includes(currentUser._id);
  };

  const likeClassName = `card__like ${isLiked ? 'card__like-active' : ''}`;

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{card.name}</h2>
        {isLoggedIn && (
          <button
            type="button"
            className={likeClassName}
            onClick={handleLikeClick}
          />
        )}
      </div>
      <img
        className="card__image"
        src={card.imageUrl}
        alt={card.name}
        onClick={handleCardClick}
      />
    </li>
  );
}
