import Card from "../components/card.js";

import FormValidator from "../components/FormValidator.js";

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

/*elements*/

const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const addCardForm = addCardModal.querySelector("#add-card-form");
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
const profileCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
const addCardCloseButton = addCardModal.querySelector("#add-card-close-button");
const previewImageCloseButton = previewImageModal.querySelector(
  "#preview-image-close-button"
);

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

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscPress);
}

function renderCard(cardData, cardList) {
  //const cardElement = getCardElement(cardData);
  const card = new Card(cardData, "#card-template", handleImageClick);
  cardList.prepend(card.getView());
}

function handleImageClick(cardData) {
  previewImageElement.setAttribute("src", cardData.link);
  previewImageElement.setAttribute("alt", cardData.name);
  previewImageLabel.textContent = cardData.name;
  openModal(previewImageModal);
}

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);

//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__delete-button");

// function handleLikeButton() {
//   likeButton.classList.toggle("card__like-button_active");
// }

// likeButton.addEventListener("click", handleLikeButton);

// function handleDeleteButton() {
//   cardElement.remove();
// }

// cardImageEl.addEventListener("click", () => {
//   previewImageElement.src = cardData.link;
//   previewImageElement.alt = cardData.name;
//   previewImageLabel.textContent = cardData.name;
//   openModal(previewImageModal);
// });

// deleteButton.addEventListener("click", handleDeleteButton);

//   return cardElement;
// }

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
}

/*Event Listeners*/
profileEditForm.addEventListener("submit", handleEditProfileSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//profile edit
function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  fillProfileForm(profileEditForm);
  openModal(profileEditModal);
}
profileEditButton.addEventListener("click", openEditProfileModal);

//add new card
addNewCardButton.addEventListener("click", () => openModal(addCardModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

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
  modalButton: ".modal__button",
};

const formEls = [...document.querySelectorAll(settings.formSelector)];
formEls.forEach((formEl) => {
  const formValidator = new FormValidator(settings, formEl);
  formValidator.enableValidation();
});

//modal close with overlay

// function closeModalOverlay(event) {
//   if (event.target === event.currentTarget) {
//     closeModal(event.currentTarget);
//   }
// }
