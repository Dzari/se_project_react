import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/contexts';
import './itemModal.css';

export default function ItemModal({ activeModal, card, onClose, onDelete }) {
  const handleDelete = () => {
    onDelete(card);
  };

  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;

  return (
    <div className={`modal ${activeModal === 'preview' && 'modal_opened'}`}>
      <div className="modal__container_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-button_type_image"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__title">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            onClick={handleDelete}
            type="button"
            className={isOwn ? "modal__delete-button" : 'modal__delete-button_hidden'}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
