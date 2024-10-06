import { useContext } from 'react';
import './toggleSwitch.css';
import { CurrentTemperatureUnitContext } from '../../contexts/contexts';

const ToggleSwitch = () => {

  const {currentTemperatureUnit, handleToggleSwitchChange} = useContext(CurrentTemperatureUnitContext)

  return (
    <label
      className={currentTemperatureUnit === 'C' ? 'switch switch-C' : 'switch'}
    >
      <input type="checkbox" className="switch__box" onChange={handleToggleSwitchChange} />
      <span className="switch__slider"></span>
      <p
        className={`switch__letter switch__unit-F
            ${currentTemperatureUnit === 'C' ? 'switch__unit-inactive' : ''}
          `}
      >
        F
      </p>
      <p
        className={`switch__letter switch__unit-C
          ${currentTemperatureUnit === 'F' ? 'switch__unit-inactive' : ''}
        `}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
