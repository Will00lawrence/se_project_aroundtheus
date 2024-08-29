import Modal from "./Modal.js";

class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });

    this._modal = document.querySelector(modalSelector);
    this._form = this._modal.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._button = this._form.querySelector(".modal__button");
  }

  _getInputValues() {
    const inputList = Array.from(this._modal.querySelectorAll(".modal__input"));
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  open() {
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
  }
}

export default ModalWithForm;
//index.js
