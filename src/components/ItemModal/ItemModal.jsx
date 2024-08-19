import './itemModal.css';

export default function ItemModal({ activeModal, card, onClose, onDelete }) {
  const handleDelete = () => {
    onDelete(card);
  };

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
            className="modal__delete-button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
