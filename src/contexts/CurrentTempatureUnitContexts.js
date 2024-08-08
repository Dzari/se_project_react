import React from 'react';

const CurrentTemperatureUnitContext = React.createContext({
  currentTempatureUnit: '',
  handleToggleSwitchChange: () => {},
});

export { CurrentTemperatureUnitContext };
