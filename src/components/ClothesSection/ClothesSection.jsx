import './clothesSection.css';
import ItemCard from '../ItemCard/ItemCard';

const ClothesSection = ({ clothingItems, handleCardClick }) => {
  return (
    <div className="clothesSection">
      <div className="clothesSection__header">
        <p className="clothesSection__title">Your Items</p>
        <button className="clothesSection_addItem-button">+ Add new</button>
      </div>
      <div className="clothesSection__cards">
        {clothingItems.map((card) => {
          return (
            <ItemCard key={card._id} card={card} onClick={handleCardClick} />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesSection;
