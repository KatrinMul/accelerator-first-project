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

const swiper = new Swiper('.swiper', {
  modules: [Pagination],
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
