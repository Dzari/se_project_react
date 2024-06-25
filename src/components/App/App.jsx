import { useState } from 'react';

import './app.css';
import Header from '../Header/header';
import Main from '../Main/main';
import Footer from '../Footer/footer';
import ModalWithForm from '../ModalWithForm/modalWithForm.jsx';

export default function App() {
  const [weatherData, setWeatherData] = useState({ type: 'cold' });
  const [activeModal, setActiveModal] = useState('');

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const closeModal = () => {
    setActiveModal('');
  };

  return (
    <div className="app">
      <div className="app__wrapper">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
      <ModalWithForm title="New garment" buttonText="Add garment" activeModal={activeModal} handleCloseClick={closeModal}>
        <label htmlFor="name" className="modal__label">
          Name <input type="text" id="name" className="modal__input" placeholder="Name" />
        </label>
        <label htmlFor="imageURL" className="modal__label">
          Image <input type="url" id="imageURL" className="modal__input" placeholder="Image URL" />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type-radio">
            <input type="radio" id="hot" className="modal__radio-input" />
            Hot
          </label>
          <label htmlFor="warm" className="modal__label modal__label_type-radio">
            <input type="radio" id="warm" className="modal__radio-input" />
            Warm
          </label>
          <label htmlFor="hot" className="modal__label modal__label_type-radio">
            <input type="radio" id="cold" className="modal__radio-input" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}
