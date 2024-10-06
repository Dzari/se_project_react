import { useContext, useEffect, useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { CurrentUserContext } from '../../contexts/contexts';

const EditProfileModal = ({
  handleCloseModal,
  onSubmit,
  isOpen,
  isLoading,
}) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const { currentUser } = useContext(CurrentUserContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar });
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || '');
      setAvatar(currentUser.avatar || '');
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
      <label htmlFor="avatar" className="modal__label">
        Avatar*{' '}
        <input
          type="url"
          id="avatar"
          className="modal__input"
          placeholder={'url'}
          value={avatar}
          onChange={handleAvatarChange}
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
