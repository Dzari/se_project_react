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
import LoginModal from '../LoginModal/LoginModal.jsx';
import SignupModal from '../SignupModal/SignupModal.jsx';
import { LoggedInContext } from '../../contexts/LoggedInContext.js';

export default function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 999 },
    city: '',
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [loggedInStatus, setLoggedInStatus] = useState('false');
  const [clothingItems, setClothingItems] = useState([]);

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const handleLoginClick = () => {
    setActiveModal('login');
  };

  const handleSignupClick = () => {
    setActiveModal('signup');
  };

  const handleAddItemSubmit = (item) => {
    postItem(item)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
      })
      .then(handleCloseModal)
      .catch(console.error);
  };

  const handleDeleteItem = (deletedItem) => {
    deleteItem(deletedItem)
      .then(() => {
        setClothingItems((clothingItems) =>
          clothingItems.filter((item) => item._id !== deletedItem._id)
        );
      })
      .then(handleCloseModal)
      .catch(console.error);
  };

  const handleCloseModal = () => {
    setActiveModal('');
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  };

  const handleLoggedInStatus = () => {
    loggedInStatus === 'false'
      ? setLoggedInStatus('true')
      : setLoggedInStatus('false');
  };

  const handleLogin = (user) => {
    console.log(user);
    handleCloseModal();
  };

  const handleSignup = (user) => {
    console.log(user);
    handleCloseModal();
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
  }, []);

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <LoggedInContext.Provider
          value={{ loggedInStatus, handleLoggedInStatus }}
        >
          <div className="app__wrapper">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLoginClick={handleLoginClick}
              handleSignupClick={handleSignupClick}
            />

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
                    onCardClick={handleCardClick}
                    onAddClick={handleAddClick}
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
          {activeModal === 'login' && (
            <LoginModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === 'login'}
              handleLogin={handleLogin}
            />
          )}
          {activeModal === 'signup' && (
            <SignupModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === 'signup'}
              handleLogin={handleSignup}
            />
          )}
        </LoggedInContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
