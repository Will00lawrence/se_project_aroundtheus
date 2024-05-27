export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonCLass = settings.inactiveButtonCLass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorCLass = settings.errorClass;
    this._form = formElement;
  }

  _showInputError(inputEl) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }

  _hideInputError(formEl, inputEl) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
  }

  _checkInputValidity(formEl, inputEl) {
    if (!inputEl.validity.valid) {
      return showInputError(formEl, inputEl, options);
    } else {
      hideInputError(formEl, inputEl, options);
    }
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _disableButton(submitButton, inactiveButtonClass) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }

  _enableButton(submitButton, inactiveButtonClass) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }

  _toggleButtonState() {
    if (hasInvalidInput(inputEls)) {
      disableButton();
      return;
    }
    enableButton();
  }

  _setEventListeners() {
    const inputEls = [...this._form.querySelectorAll(inputSelector)];
    const submitButton = this._form.querySelector(modalButton);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(inputEl);
        toggleButtonState(inputEls);
      });
    });
  }

  _enableValidation() {
    formEls.forEach((formEl) => {
      this._form.addEventListener("submit", (e) => {
        e.preventDefault();
      });

      setEventListeners(formEl, options);
    });
  }
}
