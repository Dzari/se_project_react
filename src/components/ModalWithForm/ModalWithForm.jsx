import './modalWithForm.css';

export default function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen && 'modal_opened'}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close-button"
        />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button
            disabled={false}
            type="submit"
            className="modal__submit-button"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
