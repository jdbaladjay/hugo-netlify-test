
var openButton = document.getElementById('navigation-mobile-open');
var navigationMobile = document.getElementById('navigation-mobile');
var closeButton = document.getElementById('navigation-mobile-close');

function showMobileNavigation(e) {
  navigationMobile.style.display = 'block';
  navigationMobile.classList.add('navigation-mobile--on');

  // prevent page scrolling
  document.body.style.overflow = 'hidden';

  // reset mobile menu scroll position to top
  navigationMobile.scroll(0, 0);
}

function hideMobileNavigation(e) {
  navigationMobile.classList.remove('navigation-mobile--on');
  navigationMobile.style.display = 'none'; 
  document.body.style.overflow = 'unset';
}

openButton.addEventListener('click', showMobileNavigation);
closeButton.addEventListener('click', hideMobileNavigation);
