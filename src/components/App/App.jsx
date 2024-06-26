import { useEffect, useState } from 'react';

import './app.css';
import Header from '../Header/Header';
import Main from '../../../Main/main.jsx';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx';
import { getWeather, filterWeatherData } from '../../utils/weatherAPI.js';
import { APIKey, coordinates } from '../../utils/constants.js';

export default function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 999 },
    city: '',
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const closeModal = () => {
    setActiveModal('');
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
      <div className="app__wrapper">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{' '}
          <input
            type="text"
            id="name"
            className="modal__input"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageURL" className="modal__label">
          Image{' '}
          <input
            type="url"
            id="imageURL"
            className="modal__input"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type-radio">
            <input type="radio" id="hot" className="modal__radio-input" />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type-radio"
          >
            <input type="radio" id="warm" className="modal__radio-input" />
            Warm
          </label>
          <label htmlFor="hot" className="modal__label modal__label_type-radio">
            <input type="radio" id="cold" className="modal__radio-input" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeModal}
      />
    </div>
  );
}
