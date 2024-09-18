import React, { useContext } from 'react';

import './header.css';
import logo from '../../assets/wtwrLogo.svg';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { Link } from 'react-router-dom';
import { CurrentUserContext, LoggedInContext } from '../../contexts/contexts';
import { getInitials } from '../../utils/constants';

export default function Header({
  handleAddClick,
  weatherData,
  handleLoginClick,
  handleSignupClick,
}) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  const { isLoggedIn } = useContext(LoggedInContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="WTWR Logo" className="header__logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__profile">
        <ToggleSwitch />
        <button
          onClick={isLoggedIn ? handleAddClick : handleLoginClick}
          type="button"
          className="header__add-clothes"
        >
          {isLoggedIn ? '+Add Clothes' : 'Login'}
        </button>
        {isLoggedIn ? (
          <div className="header__user">
            <p className="header__username">{currentUser.name}</p>
            <Link to="/profile">
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
            </Link>
          </div>
        ) : (
          <button
            onClick={handleSignupClick}
            type="button"
            className="header__add-clothes"
          >
            Sign Up
          </button>
        )}
      </div>
    </header>
  );
}
