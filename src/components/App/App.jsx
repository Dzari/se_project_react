import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './app.css';
import Header from '../Header/Header';
import Main from '../Main/main.jsx';
import Profile from '../Profile/Profile.jsx';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx';
import { getWeather, filterWeatherData } from '../../utils/weatherAPI.js';
import {
  APIKey,
  coordinates,
  defaultClothingItems,
} from '../../utils/constants.js';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTempatureUnitContexts.js';
import AddItemModal from '../AddItemModal/AddItemModal.jsx';

export default function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 999 },
    city: '',
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const handleAddItemSubmit = (values) => {
    setClothingItems([values, ...clothingItems]);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setActiveModal('');
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  };

  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((res) => {
        const filteredData = filterWeatherData(res);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app__wrapper">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route path="/profile" element={<Profile clothingItems={clothingItems}/>} />
          </Routes>

          <Footer />
        </div>
        {activeModal === 'add-garment' && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === 'add-garment'}
            onAddItem={handleAddItemSubmit}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
