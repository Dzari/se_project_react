import ClothesSection from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar';
import './profile.css';

const Profile = ({
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfileClick,
}) => {
  return (
    <div className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
      />
    </div>
  );
};

export default Profile;
