import './clothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/contexts';

const ClothesSection = ({
  clothingItems,
  onCardClick,
  onAddClick,
  handleCardLike,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );
  return (
    <div className="clothesSection">
      <div className="clothesSection__header">
        <p className="clothesSection__title">Your Items</p>
        <button onClick={onAddClick} className="clothesSection_addItem-button">
          + Add new
        </button>
      </div>
      <div className="clothesSection__cards">
        {userItems.map((card) => {
          return (
            <ItemCard
              key={card._id}
              card={card}
              onClick={onCardClick}
              handleCardLike={handleCardLike}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesSection;
