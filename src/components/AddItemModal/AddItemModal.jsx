import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen, isLoading }) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
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
    onAddItem({ name, imageUrl, weather });
  };

  const buttonText = isLoading ? 'Saving...' : 'Add garment';

  return (
    <ModalWithForm
      title="New garment"
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
          required={true}
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image*{' '}
        <input
          type="url"
          id="imageURL"
          className="modal__input"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
          required={true}
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
            required={true}
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
            required={true}
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
            required={true}
          />
          Cold
        </label>
      </fieldset>
      <button disabled={false} type="submit" className="modal__submit-button">
        {buttonText}
      </button>
    </ModalWithForm>
  );
};

export default AddItemModal;
