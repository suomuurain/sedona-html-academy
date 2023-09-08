import {sendData} from './api.js';
import {createSuccessMessage, createErrorMessage} from './modal-message.js';

const USERNAME_MAX_LENGTH = 10;
const USERNAME_ERROR_TEXT = `Нельзя указать больше ${USERNAME_MAX_LENGTH} символов.`;

const PHONE_VALID_SYMBOLS = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
const PHONE_ERROR_TEXT = `Номер должен быть валидным. Первый символ должен быть цифрой или "+".`;

const EMAIL_VALID_SYMBOLS = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
const EMAIL_ERROR_TEXT = `EMAIL должен быть валидным. В адресе отсутствует символ "@".`;

const SubmitButtonText = {
  IDLE: 'ОТПРАВИТЬ ОТЗЫВ',
  SENDING: 'ПУБЛИКУЮ ОТЗЫВ'
};

const form = document.querySelector('.form__application');
const userNameField = document.querySelector('.username__field--name');
const userSurnameField = document.querySelector('.username__field--surname');
const phoneField = document.querySelector('.contacts__field--phone');
const emailField = document.querySelector('.contacts__field--email');
const submitButton = document.querySelector('.form__button');

//создание экземпляра валидатора формы, в Pristine передаем объект с настройками
const pristine = new Pristine(form, {
  classTo: 'pristine-form',
  errorTextParent: 'pristine-form',
  errorTextClass: 'pristine-form--error'
});

// очистка формы
const resetForm = () => {
  form.reset();
  pristine.reset();
};

// проверка полей на вадидность. value передает сама pristine

// для телефона
const isValidPhone = (phone) => PHONE_VALID_SYMBOLS.test(phone);

const validatePhone = (value) => {
  const phone = value;
  return isValidPhone(phone);
};

pristine.addValidator(phoneField, validatePhone, PHONE_ERROR_TEXT);

//для почты
const isValidEmail = (email) => EMAIL_VALID_SYMBOLS.test(email);

const validateEmail = (value) => {
  const email = value;
  return isValidEmail(email);
};

pristine.addValidator(emailField, validateEmail, EMAIL_ERROR_TEXT);

//для юзернейма
const isValidUsername = (username) => username.length < USERNAME_MAX_LENGTH;

const validateUsername = (value) => {
  const username = value;
  return isValidUsername(username);
};

pristine.addValidator(userNameField, validateUsername, USERNAME_ERROR_TEXT);
pristine.addValidator(userSurnameField, validateUsername, USERNAME_ERROR_TEXT);

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

    const isValid = pristine.validate();
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
