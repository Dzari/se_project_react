import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const LoginModal = ({ handleCloseModal, handleLogin, isOpen, handleSignupClick, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  const buttonText = isLoading ? 'Logging in...' : 'Login'

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
      <button type="submit" className="modal__submit-button" disabled={false}>
        {buttonText}
      </button>
      <button type="button" className="modal__signup-button" onClick={handleSignupClick}>
        or Sign up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
