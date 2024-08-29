//Modules

import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import Modal from "../components/Modal.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/constants.js";
import { settings } from "../utils/constants.js";

/*elements*/

const profileEditModal = document.querySelector("#profile-edit-modal");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = document.querySelector("#profile-edit-form");
const addCardForm = document.querySelector("#add-card-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageElement = document.querySelector(".modal__image");
const previewImageLabel = document.querySelector(".modal__image-label");
const modalContainer = document.querySelector(".modal__container");
const cardImageEl = document.querySelector(".card__image");

//buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileCloseButton = document.querySelector("#profile-close-button");
const addCardCloseButton = document.querySelector("#add-card-close-button");
const previewImageCloseButton = previewImageModal.querySelector(
  "#preview-image-close-button"
);

const addCardModalSelector = "#add-card-modal";
const addCardModalNode = document.querySelector(addCardModalSelector);
const profileEditModalSelector = "#profile-edit-modal";
const previewImageModalSelector = "#preview-image-modal";

const addCardModal = new ModalWithForm(
  addCardModalSelector,
  handleAddCardFormSubmit
);
const addEditModal = new ModalWithForm(
  profileEditModalSelector,
  handleEditProfileSubmit
);
const imagePreviewModal = new ModalWithImage(previewImageModalSelector);

/*form data*/
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// /*functions*/

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardListSection.addItem(cardElement);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

function handleImageClick(cardData) {
  imagePreviewModal.open(cardData.name, cardData.link);
}

/*Event Handlers*/
function handleEditProfileSubmit(inputValue) {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  addEditModal.close();
}

function handleAddCardFormSubmit({ name, link }) {
  renderCard({ name, link }, cardListEl);

  addCardModal.close();
  addCardForm.reset();
  addCardValidator.toggleButtonState();
}

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__description",
});

//profile edit
profileEditButton.addEventListener("click", () => addEditModal.open());

//add new card
addNewCardButton.addEventListener("click", () => addCardModal.open());

const formEls = [...document.querySelectorAll(settings.formSelector)];
formEls.forEach((formEl) => {
  const formValidator = new FormValidator(settings, formEl);
  formValidator.enableValidation();
});

const addCardValidator = new FormValidator(
  settings,
  document.querySelector(".modal__form")
);
addCardValidator.enableValidation();

const editProfileValidator = new FormValidator(
  settings,
  profileEditModal.querySelector(".modal__form")
);
editProfileValidator.enableValidation();

const cardListSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      renderCard(item, cardListEl);
    },
  },
  cardListEl
);
cardListSection.renderItems();

//pass the form submission handlers as second args

addCardModal.setEventListeners();
addEditModal.setEventListeners();
imagePreviewModal.setEventListeners();
