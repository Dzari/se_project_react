import React, { useContext, useEffect, useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { CurrentUserContext } from '../../contexts/contexts';

const EditProfileModal = ({
  handleCloseModal,
  onSubmit,
  isOpen,
  isLoading,
}) => {
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const { currentUser } = useContext(CurrentUserContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatarUrl });
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || '');
      setAvatarUrl(currentUser.avatarUrl || '');
    }
  }, [isOpen, currentUser]);

  const buttonText = isLoading ? 'Saving...' : 'Save changes';

  return (
    <ModalWithForm
      title="Change Profile data"
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
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar*{' '}
        <input
          type="url"
          id="avatarUrl"
          className="modal__input"
          placeholder={'url'}
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
          required={true}
        />
      </label>
      <button disabled={false} type="submit" className="modal__submit-button">
        {buttonText}
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
