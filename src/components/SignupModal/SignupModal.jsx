import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const LoginModal = ({
  handleCloseModal,
  handleSignup,
  isOpen,
  handleLoginClick,
  isLoading,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup({ email, password, name, avatar });
  };

  const buttonText = isLoading ? 'Signing up...' : 'Sign up';

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
          type="password"
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
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL*{' '}
        <input
          type="url"
          id="avatar"
          className="modal__input"
          placeholder="Avatar"
          value={avatar}
          onChange={handleAvatarChange}
          required={true}
        />
      </label>
      <button type="submit" className="modal__submit-button" disabled={false}>
        {buttonText}
      </button>
      <button
        type="button"
        className="modal__signup-button"
        onClick={handleLoginClick}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
