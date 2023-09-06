import {sendData} from './api.js';
import {createSuccessMessage, createErrorMessage} from './modal-message.js';

const USERNAME_MAX_LENGTH = 30;
const USERNAME_ERROR_TEXT = `Нельзя указать больше ${USERNAME_MAX_LENGTH} символов.`;

const PHONE_VALID_SYMBOLS = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
const PHONE_ERROR_TEXT = `Номер должен быть валидным. Необходимо указать код страны, начинающийся с +.`;

const EMAIL_VALID_SYMBOLS = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const EMAIL_ERROR_TEXT = `EMAIL должен быть валидным. Необходимо указать @.`;

const SubmitButtonText = {
  IDLE: 'ОТПРАВИТЬ ОТЗЫВ',
  SENDING: 'ПУБЛИКУЮ ОТЗЫВ'
};

const form = document.querySelector('.form__application');
const usernameField = document.querySelector('.username__field');
const phoneField = document.querySelector('.contacts__field--phone');
const emailField = document.querySelector('.contacts__field--email');
const submitButton = document.querySelector('.form__button');

//создание экземпляра валидатора формы, в Pristine передаем объект с настройками
const pristineUsername = new Pristine(form, {
  classTo: 'username__group',
  errorTextParent: 'username__group',
  errorTextClass: 'username__group--error'
});

const pristineContacts = new Pristine(form, {
  classTo: 'contacts__group',
  errorTextParent: 'contacts__group',
  errorTextClass: 'contacts__group--error'
});

// reset формы resetForm
const resetForm = () => {
  form.reset();
  pristineUsername.reset();
  pristineContacts.reset();
};

// проверка полей на вадидность. value передает сама pristine
//для телефона
const isValidPhone = (phone) => PHONE_VALID_SYMBOLS.test(phone);

const validatePhone = (value) => {
  const phone = value;
  return isValidPhone(phone);
};

pristineContacts.addValidator(phoneField, validatePhone, PHONE_ERROR_TEXT);

//для почты
const isValidEmail = (email) => EMAIL_VALID_SYMBOLS.test(email);

const validateEmail = (value) => {
  const email = value;
  return isValidEmail(email);
};

pristineContacts.addValidator(emailField, validateEmail, EMAIL_ERROR_TEXT);

//для юзернейма
const isValidUsername = (username) => username.length < USERNAME_MAX_LENGTH;

const validateUsername = (value) => {
  const username = value;
  return isValidUsername(username);
};

pristineUsername.addValidator(usernameField, validateUsername, USERNAME_ERROR_TEXT);

//блокируем кнопку на время отправки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

//отправка формы на промисах
const setOnFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristineUsername.validate() && pristineContacts.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(createSuccessMessage)
        .catch(createErrorMessage)
        .finally(unblockSubmitButton);
    }
  });
};

export {setOnFormSubmit, resetForm};
