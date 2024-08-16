import Modal from './Modal.js';

class ModalWithForm extends Modal {
    constructor(modalSelector, handleFormSubmit){
      super({modalSelector});
      this._form = this._modal.querySelector('>modal__form')
      this._modalForm = this._modalElement.querySelector('.modal__form');
      this._handleFormSubmit = handleFormSubmit;

    }

getInputValues(){
  const inputList = Array.from(this._modal.querySelectorAll('.modal__input'));
  const data = {};
  inputList.forEach(input => {
    data[input.name] = input.value;
  });
  return data;
}

    open(){
      super.open();
      this._button.textContent = 'Save';
    }

    setEventListeners(){
      super.setEventListeners();
      this._form.addEventListener('submit', evt =>{
        evt.preventDefault();
        this._formSubmitHandler(this._getInputValues());
      });
    }


    close(){
      this._modalForm.reset();
      super.close();
    }
}



//index.js

const addCardModal = new ModalWithForm('#add-card-form', () => {});
addCardModal.