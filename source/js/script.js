let nav = document.querySelector('.main-navigation');
let siteList = document.querySelector('.site-list');
let navToggle = document.querySelector('.main-header__toggle');
let logo = document.querySelector('.main-header__logo');
let header = document.querySelector('.main-header');

nav.classList.remove('main-navigation--nojs');
logo.classList.remove('main-header__logo--nojs');
navToggle.classList.remove('main-header__toggle--nojs');
siteList.classList.remove('site-list--opened');
header.classList.remove('main-header--nojs');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('main-navigation--closed');
  navToggle.classList.toggle('main-header__toggle--opened');
  siteList.classList.toggle('site-list--opened');
});
