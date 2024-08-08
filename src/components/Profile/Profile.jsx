import ClothesSection from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar';
import './profile.css';

const Profile = () => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection />
    </div>
  );
};

export default Profile;
