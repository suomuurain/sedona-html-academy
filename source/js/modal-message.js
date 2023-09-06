import {resetForm} from './form-validation.js';

//находим шаблоны #success и #error
const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');


//создаем соответствующие сообщения
const createSuccessMessage = () => {
  const successMessageClone = successMessageTemplate.cloneNode(true);
  document.body.append(successMessageClone);

  document.addEventListener('keydown', onSuccessMessageKeydown);
  successMessageClone.addEventListener('click', onMessageClick);

  resetForm();
};

const createErrorMessage = () => {
  const errorMessageClone = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessageClone);

  document.addEventListener('keydown', onErrorMessageKeydown, {capture: true});
  errorMessageClone.addEventListener('click', onMessageClick);
};

//исчезновение сообщений об успехе и об ошибке
const closeSuccessMessage = () => {
  const successMessageContainer = document.querySelector('.success');
  successMessageContainer.remove();

  document.removeEventListener('keydown', onSuccessMessageKeydown);
  successMessageContainer.removeEventListener('click', onMessageClick);
};

const closeErrorMessage = () => {
  const errorMessageContainer = document.querySelector('.error');
  errorMessageContainer.remove();

  document.removeEventListener('keydown', onErrorMessageKeydown, {capture: true});
  errorMessageContainer.removeEventListener('click', onMessageClick);
};


//обработчики закрытия через Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

function onSuccessMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
}
function onErrorMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    closeErrorMessage();
  }
}

//в обработчик закрытия через кнопку и по клику на произвольную область экрана за пределами блока
function onMessageClick(evt) {
  evt.preventDefault();
  if(evt.target.matches ('.success') || evt.target.matches ('.success__button')) {
    closeSuccessMessage();
  }

  if(evt.target.matches ('.error') || evt.target.matches ('.error__button')) {
    closeErrorMessage();
  }
}

export {createSuccessMessage, createErrorMessage};
