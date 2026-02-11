import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

const Profile = ({
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfileClick,
  onLogoutClick,
  handleCardLike,
}) => {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
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
    </div>
  );
};

export default Profile;
