document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');

      // change icon based on menu state (mobile)
      const icon = this.querySelector('i');
      if (mobileNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // header scroll effect
  const header = document.querySelector('header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // fullscreen for game page
  const fullscreenBtn = document.getElementById('toggleFullscreen');
  const gameIframe = document.querySelector('.game-iframe');

  // fullscreen in all browsers
  if (fullscreenBtn && gameIframe) {
    fullscreenBtn.addEventListener('click', function () {
      if (gameIframe.requestFullscreen) {
        gameIframe.requestFullscreen();
      } else if (gameIframe.mozRequestFullScreen) { // Firefox
        gameIframe.mozRequestFullScreen();
      } else if (gameIframe.webkitRequestFullscreen) { // Chrome, Safari, Opera
        gameIframe.webkitRequestFullscreen();
      } else if (gameIframe.msRequestFullscreen) { // Edge
        gameIframe.msRequestFullscreen();
      }
    });
  }

  // scroll animation (in init of the page)
  initScrollAnimations();

  // psychedelic background effect to certain elements
  addPsychedelicEffects();
});


function initScrollAnimations() {
  const elementsToAnimate = document.querySelectorAll('.character-content, .game-preview, .story-text, .gallery-item, .contact-form-container');

  elementsToAnimate.forEach(element => {
    element.classList.add('animate-on-scroll');
  });

  function checkScroll() {
    elementsToAnimate.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('animated');
      }
    });
  }

  checkScroll();

  window.addEventListener('scroll', checkScroll);
}

function addPsychedelicEffects() {
  // floating animation to character image
  const characterImage = document.querySelector('.character-image');
  if (characterImage) {
    characterImage.classList.add('float');
  }

  // color shift to some headings
  const psychedelicHeadings = document.querySelectorAll('.section-title, .page-title');
  psychedelicHeadings.forEach(heading => {
    heading.classList.add('color-shift');
  });

  // psychedelic background to certain sections
  const sectionsWithBg = document.querySelectorAll('.about-hero, .gallery-hero, .contact-hero');
  sectionsWithBg.forEach(section => {
    section.classList.add('psychedelic-bg');
  });
}