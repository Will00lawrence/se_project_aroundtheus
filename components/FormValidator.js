export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formEl;
    this._submitButtonSelector = settings.submitButtonSelector;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }
  _toggleButtonState() {
    const inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    if (this._hasInvalidInput(inputEls)) {
      this._disableButton();
      return;
    }
    this._enableButton();
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((input) => input.validity.valid);
  }

  //   _disableButton() {
  //     const submitButton = this._form.querySelector(this._submitButtonSelector);
  //     submitButton.classList.add(this._inactiveButtonClass);
  //     submitButton.disabled = true;
  //   }

  //   _enableButton() {
  //     const submitButton = this._form.querySelector(this._submitButtonSelector);
  //     submitButton.classList.remove(this._inactiveButtonClass);
  //     submitButton.disabled = false;
  //   }

  _disableButton() {
    console.log("submitButton:", this._submitButton);
    console.log("this._inactiveButtonClass:", this._inactiveButtonClass);
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListeners() {
    const inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}
