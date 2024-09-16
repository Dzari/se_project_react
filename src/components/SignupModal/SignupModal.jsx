import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const LoginModal = ({ handleCloseModal, handleSignup, isOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup({ email, password, name, avatarUrl });
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email*{' '}
        <input
          type="text"
          id="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required={true}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*{' '}
        <input
          type="text"
          id="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required={true}
        />
      </label>
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
        <label htmlFor="avatarUrl" className="modal__label">
          Avatar URL*{' '}
          <input
            type="url"
            id="avatarUrl"
            className="modal__input"
            placeholder="Avatar URL"
            value={avatarUrl}
            onChange={handleAvatarUrlChange}
            required={true}
          />
        </label>
      </label>
      <button type="submit" className="modal__submit-button" disabled={false}>
        Sign Up
      </button>
      <button type="button" className="modal__signup-button">
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
