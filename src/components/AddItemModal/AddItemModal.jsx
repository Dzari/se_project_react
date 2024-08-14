import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState('');
  const [link, setImageUrl] = useState('');
  const [weather, setWeather] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, weather });
  };


  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name*{' '}
        <input
          type="text"
          id="name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image*{' '}
        <input
          type="url"
          id="imageURL"
          className="modal__input"
          placeholder="Image URL"
          value={link}
          onChange={handleImageUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:*</legend>
        <label htmlFor="hot" className="modal__label modal__label_type-radio">
          <input
            type="radio"
            name="modal__label_type-radio"
            id="hot"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type-radio">
          <input
            type="radio"
            name="modal__label_type-radio"
            id="warm"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type-radio">
          <input
            type="radio"
            name="modal__label_type-radio"
            id="cold"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;