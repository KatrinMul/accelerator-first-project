// https://swiperjs.com/get-started#installation
import Swiper from 'swiper';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';

const DESKTOP_WIDTH = 1440;
const nav = document.querySelector('.nav');
const navButton = document.querySelector('.nav__button');
const menuLiks = nav.querySelectorAll('.menu__link');

nav.classList.add('nav--closed');

navButton.addEventListener('click', () => {
  nav.classList.toggle('nav--closed');
  nav.classList.toggle('nav--opened');
  if (nav.classList.contains('nav--opened')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

menuLiks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.toggle('nav--closed');
    nav.classList.toggle('nav--opened');
    document.body.style.overflow = '';
  });
});


new Swiper('.hero__swiper', {
  modules: [Pagination, A11y],
  slidesPerView: 1,
  loop: true,
  speed: 1500,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
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
  initialSlide: 2,
  navigation: {
    nextEl: '.training__swiper-button--next',
    prevEl: '.training__swiper-button--prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      initialSlide: 0,
    },
    1440: {
      initialSlide: 0,
      slidesPerView: 4,
    }
  },
});

new Swiper('.reviews__swiper', {
  modules: [Navigation],
  slidesPerView: 1,
  speed: 1500,
  spaceBetween: 10,
  navigation: {
    nextEl: '.reviews__swiper-button--next',
    prevEl: '.reviews__swiper-button--prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 'auto',
      slidesOffsetAfter: 60,
      spaceBetween: 0,
    },
    1440: {
      slidesPerView: 'auto',
      slidesOffsetAfter: 220,
      spaceBetween: 90,
    },
  },
});

let advantagesSwiper = null;
let gallerySwiper = null;
const swiperAdvContainer = document.querySelector('.advantages__container');
const swiperGalleryContainer = document.querySelector('.gallery__container');

function initializeAdvSwiper() {
  if (swiperAdvContainer && advantagesSwiper === null) {
    advantagesSwiper = new Swiper('.advantages__container', {
      modules: [Navigation],
      slidesPerView: 'auto',
      slidesPerGroup: 2,
      spaceBetween: 30,
      centeredSlides: true,
      initialSlide: 2,
      loop: true,
      navigation: {
        nextEl: '.advantages__swiper-button--next',
        prevEl: '.advantages__swiper-button--prev',
      },
    });
  }
}

function initializeGallerySwiper() {
  if (swiperGalleryContainer && gallerySwiper === null) {
    gallerySwiper = new Swiper('.gallery__container', {
      modules: [Navigation],
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 5,
      loop: true,
      navigation: {
        nextEl: '.gallery__swiper-button--next',
        prevEl: '.gallery__swiper-button--prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
        }
      }
    });
  }
}

function destroySwiper(nameSwiper) {
  if (nameSwiper !== null) {
    nameSwiper.destroy(true, true);
    nameSwiper = null;
  }
}

function handleSwiperState() {
  if (window.matchMedia(`(min-width: ${DESKTOP_WIDTH}px)`).matches) {
    initializeAdvSwiper();
    destroySwiper(gallerySwiper);
  } else {
    destroySwiper(advantagesSwiper);
    initializeGallerySwiper();
  }
}

handleSwiperState();

window.addEventListener('resize', handleSwiperState);

const form = document.querySelector('.request__form');
const inputs = form.querySelectorAll('.request__input');
const formButton = form.querySelector('.request__button');

inputs.forEach((input) => {
  input.setAttribute('data-error-message', 'error');
});

function validateAndSetPlaceholder(input) {
  const defaultValue = input.getAttribute('data-placeholder-default');
  const errorMessage = input.getAttribute('data-error-message');
  let isValid = true;

  if (input.type === 'email') {
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(input.value)) {
      isValid = false;
    }
  } else if (input.type === 'tel') {
    const phonePattern = /^[\d\s()\-+]+$/;
    if (!phonePattern.test(input.value)) {
      isValid = false;
    }
  }

  if (!isValid && input.value.trim() !== '') {
    input.classList.add('error');
    input.value = '';
    input.placeholder = errorMessage;

  } else if (input.value.trim() === '') {
    input.classList.remove('error');
    input.placeholder = defaultValue;

  } else {
    input.classList.remove('error');
  }

  return isValid;
}

formButton.addEventListener('click', () => {
  if (!form.isValid) {
    inputs.forEach((input) => {
      validateAndSetPlaceholder(input);
    });
  }
});

inputs.forEach((input) => {
  input.addEventListener('focus', function () {
    this.classList.remove('error');
    if (this.value === '') {
      this.placeholder = this.getAttribute('data-placeholder-focus');
    }
  });

  input.addEventListener('blur', function () {
    if (this.value === '') {
      this.placeholder = this.getAttribute('data-placeholder-default');
    }
  });

  input.addEventListener('input', function () {
    if (this.classList.contains('error')) {
      this.classList.remove('error');
    }
  });
});
