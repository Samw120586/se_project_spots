const showInputError = (inputElement, formElement, errorMessage) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageElement = document.querySelector("#", errorMessageID);
  errorMessageElement.textContent = errorMessage;
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelectorAll(".modal__submit-button");


inputList.forEach((inputElement) => {
  inputElement.addEventListener("input", function () {
    checkInputValidity(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
});
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  })
};

enableValidation();