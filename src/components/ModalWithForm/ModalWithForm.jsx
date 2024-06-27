import './modalWithForm.css';

export default function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  isOpen
}) {
  return (
    <div className={`modal ${activeModal === isOpen && 'modal_opened'}`}>
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
