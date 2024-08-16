export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
  }
  open() {
    this._modalElement.classList.add(".modal_opened");
    document.addEventListener("keyup", this._handleEscKey);
  }

  close() {
    this._modalElement.classList.remove(".modal_opened");
    document.removeEventListener("keyup", this._handleEscKey);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._modalElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
