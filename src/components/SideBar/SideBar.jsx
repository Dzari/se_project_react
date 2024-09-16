import './sideBar.css';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/contexts';

const SideBar = ({ onEditProfileClick }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sideBar">
      <div className="sideBar__user">
        {currentUser.avatarUrl ? (
          <img
            src={currentUser.avatarUrl}
            alt="Avatar"
            className="header__avatar"
          />
        ) : (
          <div className="header__avatar-placeholder">
            {getInitials(currentUser.name)}
          </div>
        )}
        <p className="sideBar__username">{currentUser.name}</p>
      </div>
      <div className="sideBar__buttons">
        <button
          className="sideBar__button"
          type="button"
          onClick={onEditProfileClick}
        >
          Change profile data
        </button>
        <button className="sideBar__button" type="button">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
