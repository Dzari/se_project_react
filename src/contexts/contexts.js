import React from 'react';

const CurrentUserContext = React.createContext({
  currentUser: '',
  handleCurrentUser: () => {},
});

const CurrentTemperatureUnitContext = React.createContext({
  currentTempatureUnit: '',
  handleToggleSwitchChange: () => {},
});

const LoggedInContext = React.createContext({
  LoggedInStatus: false,
  handleLoggedInStatus: () => {},
});

export { CurrentUserContext, CurrentTemperatureUnitContext, LoggedInContext };
