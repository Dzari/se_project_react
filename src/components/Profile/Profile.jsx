import ClothesSection from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar';
import './profile.css';

const Profile = ({
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfileClick,
  onLogoutClick,
  handleCardLike,
}) => {
  return (
    <div className="profile">
      <SideBar
        onEditProfileClick={onEditProfileClick}
        handleLogout={onLogoutClick}
      />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
        handleCardLike={handleCardLike}
      />
    </div>
  );
};

export default Profile;
