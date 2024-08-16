import Modal from "./Modal.js";

class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._label = this._modal.querySelector(".modal__image-label");
    this._image = this._modal.querySelector(".modal__image");
  }

  open(name, link) {
    this._label.textContent = name;
    this._image.src = link;
    super.open();
  }
}

export default ModalWithImage;