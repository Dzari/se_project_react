import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './app.css';
import Header from '../Header/Header';
import Main from '../Main/main.jsx';
import Profile from '../Profile/Profile.jsx';
import Footer from '../Footer/Footer';
import ItemModal from '../ItemModal/ItemModal.jsx';
import { getWeather, filterWeatherData } from '../../utils/weatherAPI.js';
import { APIKey, coordinates } from '../../utils/constants.js';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTempatureUnitContexts.js';
import AddItemModal from '../AddItemModal/AddItemModal.jsx';
import { deleteItem, getItems, postItem } from '../../utils/api.jsx';

export default function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 999 },
    city: '',
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [clothingItems, setClothingItems] = useState([]);

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const handleAddItemSubmit = (item) => {
    postItem(item)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
      })
      .catch(console.error);
    handleCloseModal();
  };

  const handleDeleteItem = (item) => {
    deleteItem(item).then(handleCloseModal).catch(console.error);
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

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, [clothingItems]);

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
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={handleCloseModal}
          onDelete={handleDeleteItem}
        />

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
