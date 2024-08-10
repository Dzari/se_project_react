import './sideBar.css';
import avatar from '../../assets/defaultAvatar.svg';
import { userName } from '../../utils/constants';

const SideBar = () => {
  return (
    <div className="sideBar__user">
      <img src={avatar} alt="User's Name" className="sideBar__avatar" />
      <p className="sideBar__username">{userName}</p>
    </div>
  );
};

export default SideBar;
