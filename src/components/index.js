//Modules

import logoSrc from "../images/logo.svg";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import Modal from "./Modal.js";
import ModalWithImage from "./ModalWithImage.js";
import ModalWithForm from "./ModalWithForm.js";
import UserInfo from "./UserInfo.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//index of variable declarations

/*HTML images*/

// const logoImage = document.getElementById("logo");
// logoImage.src = logoSrc;
// const avatarImage = document.getElementById("avatar");
// avatarImage.src = avatarSrc;

/*elements*/

const modal = document.getElementsByClassName("modal");
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

//profile

const profile = {
  title: profileTitle.textContent,
  description: profileDescription.textContent,
};

/*form data*/
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#card-url-input");

/*functions*/
function handleEscPress(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscPress);
}

// function openModal(modal) {
//   console.log(666);
//   console.log(modal);
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscPress);
// }

function renderCard(cardData, cardList) {
  //const cardElement = getCardElement(cardData);
  const card = new Card(cardData, "#card-template", handleImageClick);
  cardList.prepend(card.getView());
}

function handleImageClick(cardData) {
  // previewImageElement.setAttribute("src", cardData.link);
  // previewImageElement.setAttribute("alt", cardData.name);
  // previewImageLabel.textContent = cardData.name;
  imagePreviewModal.open(cardData.name, cardData.link);
}

/*Event Handlers*/
function handleEditProfileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardForm.reset();
  addCardValidator.toggleButtonState();
}

/*Event Listeners*/
// profileEditForm.addEventListener("submit", handleEditProfileSubmit);
// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//profile edit
function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  fillProfileForm(profileEditForm);
  // openModal(profileEditModal);
}
profileEditButton.addEventListener("click", () => addEditModal.open());

//add new card
addNewCardButton.addEventListener("click", () => addCardModal.open());

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
    if (evt.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// const formEls = [...document.querySelectorAll(settings.formSelector)];
// formEls.forEach((formEl) => {
//   const formValidator = new FormValidator(settings, formEl);
//   formValidator.enableValidation();
// });

const addCardValidator = new FormValidator(
  settings,
  document.querySelector(".modal__form")
);
addCardValidator.enableValidation(); // starts listening to events with <input /> elements for the 'add card' form.

const editProfileValidator = new FormValidator(
  settings,
  profileEditModal.querySelector(".modal__form")
);
editProfileValidator.enableValidation(); // starts listening to events with <input /> elements for the 'edit profile' form.

addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

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

// const formPreviewModal = new ModalWithForm({ modalSelector, handleFormSubmit });
// const imagePeviewModal = new ModalWithImage("#preview-image-modal");

//pass the form submission handlers as second args

addCardModal.setEventListeners();
addEditModal.setEventListeners();
imagePreviewModal.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__description",
});

console.log(userInfo.getUserInfo());
