import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

//***********************************Components ***********************************//

import './app.css';
import Header from '../Header/Header';
import Main from '../Main/main.jsx';
import Profile from '../Profile/Profile.jsx';
import Footer from '../Footer/Footer';

//*************************************Modals**************************************//

import ItemModal from '../ItemModal/ItemModal.jsx';
import LoginModal from '../LoginModal/LoginModal.jsx';
import AddItemModal from '../AddItemModal/AddItemModal.jsx';
import SignupModal from '../SignupModal/SignupModal.jsx';
import ProtectedRoute from '../ProtectedRoute/protectedRoute.jsx';
import EditProfileModal from '../EditProfileModal/EditProfileModal.jsx';

//*************************************API Calls***********************************//

//Item API calls
import {
  deleteItem,
  deleteLike,
  getItems,
  likeItem,
  postItem,
} from '../../utils/api.jsx';

//User API calls
import {
  getCurrentUser,
  login,
  signup,
  updateUser,
} from '../../utils/auth.jsx';

//**********************************Imported Misc**********************************//

import { APIKey, coordinates } from '../../utils/constants.js';
import { getWeather, filterWeatherData } from '../../utils/weatherAPI.js';
import {
  CurrentTemperatureUnitContext,
  CurrentUserContext,
  LoggedInContext,
} from '../../contexts/contexts.js';

//*************************************App*****************************************//
export default function App() {
  //******************************Application States*******************************//

  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 999 },
    city: '',
  });

  //Determines which modal is visable

  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});

  //Used to determine current temp & an array of clothing items which are used
  // to filter based on temp
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [clothingItems, setClothingItems] = useState([]);

  //Sets which user is logged in and a boolean if user is guest or user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  //Auth token used for authorization
  const token = localStorage.getItem('jwt');

  //Sets active modal
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

  const handleEditProfileClick = () => {
    setActiveModal('editProfile');
  };

  const handleCloseModal = () => {
    setActiveModal('');
  };

  //User click handlers
  const handleCardLike = (item) => {
    const id = item._id;
    if (item.likes.includes(currentUser._id)) {
      deleteLike(currentUser, id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      likeItem(currentUser, item._id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteItem = (deletedItem) => {
    deleteItem(deletedItem, token)
      .then(() => {
        setClothingItems((clothingItems) =>
          clothingItems.filter((item) => item._id !== deletedItem._id)
        );
      })
      .then(handleCloseModal)
      .catch(console.error);
  };

  //Submit handlers
  const handleAddItemSubmit = (item) => {
    postItem(item, token)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
      })
      .then(handleCloseModal)
      .catch(console.error);
  };

  const handleEditProfile = (data) => {
    updateUser(data, token)
      .then(getCurrentUser(token))
      .then((user) => handleCurrentUser(user))
      .catch((err) => console.log(err))
      .finally(handleCloseModal);
  };

  //Authentication and sign in handlers

  const handleLogin = (data) => {
    login(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setCurrentUser(res.user);
      })
      .then(handleIsLoggedIn)
      .catch((err) => console.log(err))
      .finally(handleCloseModal);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt', token);
    handleIsLoggedIn();
  };

  const handleSignup = ({ email, password, name, avatarUrl }) => {
    signup({ email, password, name, avatarUrl })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => console.log(err));
  };

  //Changes contexts

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  };

  const handleIsLoggedIn = () => {
    isLoggedIn === true ? setIsLoggedIn(false) : setIsLoggedIn(true);
  };

  const handleCurrentUser = (user) => {
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    }
  };

  //*********************************Initial Functions*****************************//

  //Pulls and sets weather data based on location
  // (location services still to be implemented)
  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((res) => {
        const filteredData = filterWeatherData(res);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  //Pulls all items and sets to clothingItems
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  //Pulls token if exists and sets auto logs in user
  useEffect(() => {
    if (!token) {
      return;
    }
    getCurrentUser(token).then((user) => handleCurrentUser(user));
  }, []);

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <LoggedInContext.Provider value={{ isLoggedIn, handleIsLoggedIn }}>
          <CurrentUserContext.Provider
            value={{ currentUser, handleCurrentUser }}
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
                      handleCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        clothingItems={clothingItems}
                        onCardClick={handleCardClick}
                        onAddClick={handleAddClick}
                        onEditProfileClick={handleEditProfileClick}
                        onLogoutClick={handleLogout}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/profile" replace />
                    ) : (
                      <Navigate to="/" replace />
                    )
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
                handleSignupClick={handleSignupClick}
              />
            )}
            {activeModal === 'signup' && (
              <SignupModal
                handleCloseModal={handleCloseModal}
                isOpen={activeModal === 'signup'}
                handleSignup={handleSignup}
                handleLoginClick={handleLoginClick}
              />
            )}
            {activeModal === 'editProfile' && (
              <EditProfileModal
                handleCloseModal={handleCloseModal}
                isOpen={activeModal === 'editProfile'}
                onSubmit={handleEditProfile}
                currentUser={currentUser}
              />
            )}
          </CurrentUserContext.Provider>
        </LoggedInContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
