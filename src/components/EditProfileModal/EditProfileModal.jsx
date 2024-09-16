import React, { useEffect, useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const EditProfileModal = ({
  handleCloseModal,
  onSubmit,
  isOpen,
  currentUser,
}) => {
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

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
        Save changes
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
