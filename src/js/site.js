import $ from 'jquery';
import './lib/polyfills';
// Swiper Carousel
import Swiper from 'swiper';

// Select2 Plugin
import 'select2/dist/js/select2.full'; // we want the full version
import 'select2/dist/css/select2.css';

// Vanilla Tilt
import VanillaTilt from 'vanilla-tilt';

// SimpleParallax
import simpleParallax from 'simple-parallax-js';

// Our site styles
import '../scss/site.scss';

// Foundation
import whatInput from 'what-input';
//import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
// see https://github.com/zurb/foundation-zurb-template
import './lib/foundation-explicit-pieces';

// Navigation
import './navigation';

function initializeCarousels() {
  $('.swiper-container').each(function(index, element){
    var $this = $(this);

    var initialSlideIndex = $this.find('[data-initial-slide]').index();
    initialSlideIndex = (initialSlideIndex !== -1) ? initialSlideIndex : 0;
    
    new Swiper($this, {
      autoplay: {
        delay: 7000,
      },
      loop: true,
      initialSlide: initialSlideIndex,
      slidesPerView: 3,
      watchOverflow: true, // hide pagination when slide is 1
      spaceBetween: 20,//16,
      grabCursor: true,
      autoHeight: false,
      pagination: {
        el: $this.find('.swiper-pagination')[0],
        clickable: false,
        dynamicBullets: false
      },
      navigation: {
        nextEl: $this.find('.swiper-button-next')[0],
        prevEl: $this.find('.swiper-button-prev')[0]
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 0
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 0
        },
        470: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      },

      // Fix pagination bullet inconsistent result
      // https://github.com/nolimits4web/swiper/issues/2428
      touchEventsTarget: 'wrapper'
    });
  });
}

function initializePostcards() {
  VanillaTilt.init(document.querySelectorAll(".postcard__image"), {
    max: 2.1,
    speed: 650,
    reverse: true,
    perspective: 700,
    scale: 1.03
  });
}

const Site = {
  initializeFoundation: function() {
    $(document).foundation();
    initializeCarousels(); // Swiper Carousel
    initializePostcards(); // VanillaTilt

    var featuredImage = document.querySelector('.post-header__figure img');
    if (featuredImage) {
      new simpleParallax(featuredImage, {
        orientation: "up",
        delay: 0.5
      });
    }
  }
};

export { Site };