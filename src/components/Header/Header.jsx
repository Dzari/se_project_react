import './header.css';
import avatar from '../../assets/defaultAvatar.svg';
import logo from '../../assets/wtwrLogo.svg';

export default function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <img src={logo} alt="WTWR Logo" className="header__logo" />
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes"
      >
        + Add clothes
      </button>
      <div className="header__user">
        <p className="header__username">First Last</p>
        <img src={avatar} alt="User's Name" className="header__avatar" />
      </div>
    </header>
  );
}
