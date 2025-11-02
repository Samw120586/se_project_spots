import "./index.css";
import { enableValidation, validationConfig, hideInputError } from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { data } from "autoprefixer";



const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "46c74c8a-760c-42f8-a550-bb29200a256b",
    "Content-Type": "application/json"
  }
});

  api.getAppInfo()
  .then(([initialCards, userInfo]) => {
    initialCards.forEach((item) =>{
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
  });
  profileNameElement.textContent = userInfo.name;
  profileDescriptionElement.textContent = userInfo.about;
})
.catch(console.error);

const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};


const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close-button");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");
const avatarModalButton = document.querySelector(".profile__avatar-button");

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

const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitButton = avatarModal.querySelector(".modal__submit-button");
const avatarCloseButton = avatarModal.querySelector(".modal__close-button");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
let selectedCard, selectedCardId;





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

  cardDeleteButtonElement.addEventListener("click", (evt) =>
    handleDeleteCard(cardElement, data._id)
  );

  cardImageElement.addEventListener("click", () => {
  previewImageElement.src = data.link;
  previewImageElement.alt = data.name;
  previewImageCaption.textContent = data.name;
  openModal(previewModal);
  });

  return cardElement;
};

 const disableButton = (button, config) => {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
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

editProfileCloseButton.addEventListener("click", () => {
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
  api.editUserInfo({
    name: editProfileNameInput.value,
    about: editProfileDescriptionInput.value
  })
  .then((data) => {
    profileNameElement.textContent = data.name;
    profileDescriptionElement.textContent = data.about;
  resetValidation(editProfileForm, [editProfileNameInput, editProfileDescriptionInput], settings);
  closeModal(editProfileModal);
   })
  .catch((err) => {
    console.log(err);
  });
};

 const inputValues = {
    name: nameInput.value,
    link: linkInput.value,
  };

function handleAddCardSubmit(evt) {
  evt.preventDefault();
};

 function handleAvatarSubmit(evt) {
    evt.preventDefault();
    api.editAvatarInfo(avatarInput.value)
    .then((data) => {
      avatarInput.src = data.avatar;
      resetValidation(avatarForm, [avatarInput], settings);
      closeModal(avatarModal);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    api.deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleDeleteCard(cardElement, cardId) {
    selectedCard = cardElement;
    selectedCardId = cardId;
    openModal(deleteModal);
  };

  const cardElement = getCardElement(inputValues);

  cardsList.prepend(cardElement);
  addCardFormElement.reset();
  disableButton(cardSubmitButton, settings);
  closeModal(newPostModal);


avatarModalButton.addEventListener("click", () => {
 openModal(avatarModal);
});

avatarCloseButton.addEventListener("click", () => {
 closeModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);



enableValidation(validationConfig);
