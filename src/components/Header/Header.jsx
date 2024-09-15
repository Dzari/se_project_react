import React, { useContext } from 'react';

import './header.css';
import avatar from '../../assets/defaultAvatar.svg';
import logo from '../../assets/wtwrLogo.svg';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { userName } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { LoggedInContext } from '../../contexts/LoggedInContext';

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

  const { loggedInStatus } = useContext(LoggedInContext);

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
          onClick={
            loggedInStatus === 'false' ? handleLoginClick : handleAddClick
          }
          type="button"
          className="header__add-clothes"
        >
          {loggedInStatus === 'false' ? 'Log in' : '+Add Clothes'}
        </button>
        {loggedInStatus === 'false' ? (
          <button
            onClick={handleSignupClick}
            type="button"
            className="header__add-clothes"
          >
            Sign Up
          </button>
        ) : (
          <div className="header__user">
            <p className="header__username">{userName}</p>
            <Link to="/profile">
              <img src={avatar} alt="User's Name" className="header__avatar" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
