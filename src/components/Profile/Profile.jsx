import ClothesSection from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar';
import './profile.css';

const Profile = (clothingItems) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection clothingItems={clothingItems} />
    </div>
  );
};

export default Profile;
