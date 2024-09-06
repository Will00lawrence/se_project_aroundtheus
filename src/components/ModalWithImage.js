import Modal from "./Modal.js";

class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._label = this._modalElement.querySelector(".modal__image-label");
    this._image = this._modalElement.querySelector(".modal__image");
  }

  open(name, link) {
    this._label.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}

export default ModalWithImage;
