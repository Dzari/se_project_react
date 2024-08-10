import './clothesSection.css';
import { defaultClothingItems } from '../../utils/constants';
import ItemCard from '../ItemCard/ItemCard';

const ClothesSection = () => {
  return (
    <div className="clothesSection">
      <div className="clothesSection__header">
        <p className="clothesSection__title">Your Items</p>
        <button className="clothesSection_addItem-button">+ Add new</button>
      </div>
      <div className="clothesSection__cards">
        {defaultClothingItems.map((card) => {
          return (
            <ItemCard
              key={card._id}
              card={card}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesSection;
