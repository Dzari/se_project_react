import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//***********************************Components ***********************************//

import Header from "../Header/Header";
import Main from "../Main/main.jsx";
import Profile from "../Profile/Profile.jsx";
import Footer from "../Footer/Footer";

//*************************************Modals**************************************//

import ItemModal from "../ItemModal/ItemModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import SignupModal from "../SignupModal/SignupModal.jsx";
import ProtectedRoute from "../ProtectedRoute/protectedRoute.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

//*************************************API Calls***********************************//

//Item API calls
import {
  deleteItem,
  deleteLike,
  getItems,
  likeItem,
  postItem,
} from "../../utils/api.jsx";

//User API calls
import {
  getCurrentUser,
  login,
  signup,
  updateUser,
} from "../../utils/auth.jsx";

//**********************************Imported Misc**********************************//

import { APIKey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI.js";
import {
  CurrentTemperatureUnitContext,
  CurrentUserContext,
  LoggedInContext,
} from "../../contexts/contexts.js";

//*************************************App*****************************************//
export default function App() {
  //******************************Application States*******************************//

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  //Determines which modal is visible
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //Temp unit + clothing items
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  //Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ _id: "" });

  //Auth token used for authorization
  const token = localStorage.getItem("jwt");

  //Sets active modal
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const handleLoginClick = () => setActiveModal("login");
  const handleSignupClick = () => setActiveModal("signup");
  const handleEditProfileClick = () => setActiveModal("editProfile");
  const handleCloseModal = () => setActiveModal("");

  //User click handlers
  const handleCardLike = (item) => {
    const id = item._id;

    if (item.likes.includes(currentUser._id)) {
      deleteLike(currentUser, id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((it) => (it._id === id ? updatedCard : it)),
          );
        })
        .catch((err) => console.log(err));
    } else {
      likeItem(currentUser, item._id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((it) => (it._id === id ? updatedCard : it)),
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteItem = (deletedItem) => {
    deleteItem(deletedItem, token)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== deletedItem._id),
        );
      })
      .then(handleCloseModal)
      .catch(console.error);
  };

  //Submit handlers
  const handleAddItemSubmit = (item) => {
    setIsLoading(true);

    postItem(item, token)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
      })
      .then(() => handleCloseModal())
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleEditProfile = (data) => {
    setIsLoading(true);

    updateUser(data, token)
      .then(() => getCurrentUser(token))
      .then((user) => handleCurrentUser(user))
      .then(() => handleCloseModal())
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  //Authentication handlers
  const handleLogin = (data) => {
    setIsLoading(true);

    login(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setCurrentUser(res.user);
      })
      .then(() => handleIsLoggedIn())
      .then(() => handleCloseModal())
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt", token);
    handleIsLoggedIn();
  };

  const handleSignup = ({ email, password, name, avatar }) => {
    setIsLoading(true);

    signup({ email, password, name, avatar })
      .then(() => handleLogin({ email, password }))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  //Context handlers
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
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

  function getUserLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
      );
    });
  }

  //*********************************Initial Functions*****************************//

  //Weather
  useEffect(() => {
    getUserLocation()
      .then((userLocation) => {
        const { latitude, longitude } = userLocation.coords;
        return getWeather({ latitude, longitude }, APIKey);
      })
      .then((res) => {
        const filteredData = filterWeatherData(res);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  //Items
  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch(console.error);
  }, []);

  //Auto-login if token exists
  useEffect(() => {
    if (!token) return;

    getCurrentUser(token)
      .then((user) => handleCurrentUser(user))
      .catch((err) => console.log(err));
  }, []);

  //Escape to close modals
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#492828] text-[#ECECEC]">
      {/* subtle site glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(132,147,74,0.18),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(101,109,63,0.14),transparent_60%)]" />
      <div className="relative min-h-screen animate-fade-up">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <LoggedInContext.Provider value={{ isLoggedIn, handleIsLoggedIn }}>
            <CurrentUserContext.Provider
              value={{ currentUser, handleCurrentUser }}
            >
              {/* Page shell */}
              <div className="min-h-screen flex flex-col">
                <Header
                  handleAddClick={handleAddClick}
                  weatherData={weatherData}
                  handleLoginClick={handleLoginClick}
                  handleSignupClick={handleSignupClick}
                />

                <div className="flex-1">
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
                            handleCardLike={handleCardLike}
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
                </div>

                <Footer />
              </div>

              {/* Modals */}
              <ItemModal
                activeModal={activeModal}
                card={selectedCard}
                onClose={handleCloseModal}
                onDelete={handleDeleteItem}
              />

              {activeModal === "add-garment" && (
                <AddItemModal
                  handleCloseModal={handleCloseModal}
                  isOpen={activeModal === "add-garment"}
                  onAddItem={handleAddItemSubmit}
                  isLoading={isLoading}
                />
              )}

              {activeModal === "login" && (
                <LoginModal
                  handleCloseModal={handleCloseModal}
                  isOpen={activeModal === "login"}
                  handleLogin={handleLogin}
                  handleSignupClick={handleSignupClick}
                  isLoading={isLoading}
                />
              )}

              {activeModal === "signup" && (
                <SignupModal
                  handleCloseModal={handleCloseModal}
                  isOpen={activeModal === "signup"}
                  handleSignup={handleSignup}
                  handleLoginClick={handleLoginClick}
                  isLoading={isLoading}
                />
              )}

              {activeModal === "editProfile" && (
                <EditProfileModal
                  handleCloseModal={handleCloseModal}
                  isOpen={activeModal === "editProfile"}
                  onSubmit={handleEditProfile}
                  isLoading={isLoading}
                />
              )}
            </CurrentUserContext.Provider>
          </LoggedInContext.Provider>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}
