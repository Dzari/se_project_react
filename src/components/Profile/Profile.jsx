import ClothesSection from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar';
import './profile.css';

const Profile = ({
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfileClick,
  onLogoutClick
}) => {
  return (
    <div className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} handleLogout={onLogoutClick} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
      />
    </div>
  );
};

export default Profile;
