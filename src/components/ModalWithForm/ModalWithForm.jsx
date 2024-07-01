import './modalWithForm.css';

export default function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
}) {
  return (
    <div className={`modal ${isOpen === 'add-garment' && 'modal_opened'}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close-button"
        />
        <form action="" className="modal__form">
          {children}
          <button type="button" className="modal__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
