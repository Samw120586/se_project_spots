import "./index.css";
import { enableValidation, validationConfig, hideInputError } from "../scripts/validation.js";
import Api from "../utils/Api.js";



const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "46c74c8a-760c-42f8-a550-bb29200a256b",
    "Content-Type": "application/json"
  }
});

api.getInitialCards()
  .then((initialCards) => {
    initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
}).catch((err) => {
  console.error(err);
  });

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close-button");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");

const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(".profile__description");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const cardSubmitButton = newPostModal.querySelector(".modal__submit-button");
const nameInput = document.querySelector("#card-caption-input");
const linkInput = document.querySelector("#card-image-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(".modal__close-button");
const previewImageElement = previewModal.querySelector(".modal__image");
const previewImageCaption = previewModal.querySelector(".modal__caption");

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  const cardLikeButtonElement = cardElement.querySelector(".card__like-button");
  cardLikeButtonElement.addEventListener("click", () => {
    cardLikeButtonElement.classList.toggle("card__like-button_active");
  });

  const cardDeleteButtonElement = cardElement.querySelector(".card__delete-button");
  cardDeleteButtonElement.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
  previewImageElement.src = data.link;
  previewImageElement.alt = data.name;
  previewImageCaption.textContent = data.name;
  openModal(previewModal);
  });

  return cardElement;
};

const resetValidation = (formElement, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input, config)
  });
};

 previewModalCloseButton.addEventListener("click", function () {
    closeModal(previewModal);
  });

 function openModal(modal) {
   modal.classList.add("modal_is-opened");
   document.addEventListener("click", function (evt) {
    if (evt.target === modal) {
      closeModal(modal);
    };
   });
   document.addEventListener("keydown", function (evt) {
    if (evt.key === `Escape`) {
      closeModal(modal);
    };
   });
  };

 function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", function (evt) {
  });
  document.removeEventListener("click", function (evt) {
  });
 };

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  resetValidation(editProfileForm, [editProfileNameInput, editProfileDescriptionInput], validationConfig);
  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostButton.addEventListener("click", function () {

  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function () {

  closeModal(newPostModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = editProfileNameInput.value;
  profileDescriptionElement.textContent = editProfileDescriptionInput.value;
  resetValidation(editProfileForm, [editProfileNameInput, editProfileDescriptionInput], settings);
  closeModal(editProfileModal);
};

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const cardElement = getCardElement(inputValues);

  cardsList.prepend(cardElement);
  addCardFormElement.reset();
  disableButton(cardSubmitButton, settings);
  closeModal(newPostModal);
};

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

addCardFormElement.addEventListener("submit", handleAddCardSubmit);



enableValidation(validationConfig);

