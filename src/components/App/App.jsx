import { useState } from 'react';

import './app.css';
import Header from '../Header/header';
import Main from '../Main/main';

export default function App() {
  const [weatherData, setWeatherData] = useState({ type: 'cold' });

  return (
    <div className="app">
      <div className="app__wrapper">
        <Header />
        <Main weatherData={weatherData} />
      </div>
    </div>
  );
}
