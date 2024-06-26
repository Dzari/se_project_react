import './itemModal.css';

export default function ItemModal({ activeModal, card, onClose }) {
  return (
    <div className={`modal ${activeModal === 'preview' && 'modal_opened'}`}>
      <div className="modal__container_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-button_type_image"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__title">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
