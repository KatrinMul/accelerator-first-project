// https://swiperjs.com/get-started#installation
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';

const nav = document.querySelector('.nav');
const navButton = document.querySelector('.nav__button');

nav.classList.add('nav--closed');

navButton.addEventListener('click', () => {
  nav.classList.toggle('nav--closed');
  nav.classList.toggle('nav--opened');
});


new Swiper('.hero__swiper', {
  modules: [Pagination],
  loop: true,
  speed: 1500,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

new Swiper('.tours__swiper', {
  modules: [Navigation],
  loop: false,
  speed: 1500,
  slidesPerView: 1,
  spaceBetween: 18,
  slidesPerGroup: 1,
  navigation: {
    nextEl: '.tours__swiper-button--next',
    prevEl: '.tours__swiper-button--prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 18
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
});

new Swiper('.training__swiper', {
  modules: [Navigation],
  slidesPerView: 1,
  speed: 1500,
  spaceBetween: 20,
  slidesPerGroup: 1,
  navigation: {
    nextEl: '.training__swiper-button--next',
    prevEl: '.training__swiper-button--prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 4,
    }
  },
});
