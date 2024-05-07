const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('signin__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('signin__input-error_active');
};
  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('signin__input_type_error');
    errorElement.classList.remove('signin__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.signin__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.signin__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        });

        setEventListeners(formElement);
    }); 
}

enableValidation();