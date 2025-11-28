// https://swiperjs.com/get-started#installation
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';


const screenWidth = window.innerWidth;

const nav = document.querySelector('.nav');
const navButton = document.querySelector('.nav__button');

nav.classList.add('nav--closed');

navButton.addEventListener('click', () => {
  nav.classList.toggle('nav--closed');
  nav.classList.toggle('nav--opened');
});


const heroSwiper = new Swiper('.hero__swiper', {
  modules: [Pagination],
  slidesPerView: 1,
  loop: true,
  speed: 1500,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  a11y: {
    enabled: true,
    slideLinkClass: 'swiper__link',
    scrollOnFocus: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

const swiperContainer = document.querySelector('.hero__swiper');

swiperContainer.addEventListener('focusin', (event) => {
  const focusedSlide = event.target.closest('.swiper-slide');

  if (focusedSlide) {
    const realIndex = parseInt(focusedSlide.dataset.swiperSlideIndex, 10);

    if (realIndex !== heroSwiper.realIndex) {
      heroSwiper.slideToLoop(realIndex, 0);
    }
  }
});

heroSwiper.on('init', () => {
  heroSwiper.slideToLoop(0, 0);
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
    },
    1440: {
      slidesPerView: 'auto',
      slidesOffsetAfter: 220,
      spaceBetween: 100,
    },
  },
});

const DESKTOP_WIDTH = 1440;
let advantagesSwiper = null;
const swiperAdvContainer = document.querySelector('.advantages__container');

function initializeSwiper() {
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

function destroySwiper() {
  if (advantagesSwiper !== null) {
    advantagesSwiper.destroy(true, true);
    advantagesSwiper = null;
  }
}

function handleSwiperState() {
  if (window.matchMedia(`(min-width: ${DESKTOP_WIDTH}px)`).matches) {
    initializeSwiper();
  } else {
    destroySwiper();
  }
}

handleSwiperState();

window.addEventListener('resize', handleSwiperState);


const inputs = document.querySelectorAll('.request__input');

inputs.forEach((input) => {
  input.setAttribute('data-error-message', 'error');
});

function validateAndSetPlaceholder(input) {
  const defaultValue = input.getAttribute('data-placeholder-default');
  const errorMessage = input.getAttribute('data-error-message');
  let isValid = true;

  if (input.value.trim() === '' && input.required) {
    isValid = false;
  } else if (input.type === 'email') {
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(input.value)) {
      isValid = false;
    }
  } else if (input.type === 'tel') {
    const phonePattern = /^\+\d+/;
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

inputs.forEach((input) => {
  input.addEventListener('focus', function () {
    this.classList.remove('error');
    if (this.value === '') {
      this.placeholder = this.getAttribute('data-placeholder-focus');
    }
  });

  input.addEventListener('blur', function () {
    validateAndSetPlaceholder(this);
  });

  input.addEventListener('input', function () {
    if (this.classList.contains('error')) {
      this.classList.remove('error');
    }
  });
});
