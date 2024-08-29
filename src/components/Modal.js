export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._closeButton = this._modalElement.querySelector(".modal__close");
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscKey);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscKey);
  }

  _clickToClose(evt) {
    if (evt.target === this._closeButton || evt.target === this._modalElement) {
      this.close();
    }
  }

  _handleEscKey = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._modalElement.addEventListener("click", (evt) => {
      this._clickToClose(evt);
    });
  }
}
