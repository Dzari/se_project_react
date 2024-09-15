import React from 'react';

const LoggedInContext = React.createContext({
  LoggedInStatus: '',
  handleLoggedInStatus: () => {},
});

export { LoggedInContext };