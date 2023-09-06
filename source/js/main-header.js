let nav = document.querySelector('.main-navigation');
let navList = document.querySelector('.nav-list');
let buttonNavToggle = document.querySelector('.main-header__toggle');
let logo = document.querySelector('.main-header__logo');
let header = document.querySelector('.main-header');

nav.classList.remove('main-navigation--nojs');
logo.classList.remove('main-header__logo--nojs');
buttonNavToggle.classList.remove('main-header__toggle--nojs');
navList.classList.remove('nav-list--opened');
header.classList.remove('main-header--nojs');

buttonNavToggle.addEventListener('click', () => {
  nav.classList.toggle('main-navigation--closed');
  buttonNavToggle.classList.toggle('main-header__toggle--opened');
  navList.classList.toggle('nav-list--opened');
});
