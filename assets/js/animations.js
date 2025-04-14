document.addEventListener('DOMContentLoaded', function () {
  // scroll reveal animations
  initScrollReveal();

  // parallax effect to hero section
  initParallaxEffect();

  // init background particles if on home page
  if (document.querySelector('.hero')) {
    initParticleBackground();
  }
});

function initScrollReveal() {
  // to reveal with scroll
  const fadeInItems = document.querySelectorAll('.fade-in');
  const slideUpItems = document.querySelectorAll('.slide-up');
  const slideRightItems = document.querySelectorAll('.slide-right');
  const slideLeftItems = document.querySelectorAll('.slide-left');

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }

  function checkAnimations() {
    // fade in animations
    fadeInItems.forEach(item => {
      if (isInViewport(item) && !item.classList.contains('animated')) {
        item.style.animationDelay = '0.1s';
        item.classList.add('animated');
      }
    });

    // slide up animations
    slideUpItems.forEach(item => {
      if (isInViewport(item) && !item.classList.contains('animated')) {
        item.style.animationDelay = '0.3s';
        item.classList.add('animated');
      }
    });

    // slide right animations
    slideRightItems.forEach(item => {
      if (isInViewport(item) && !item.classList.contains('animated')) {
        item.style.animationDelay = '0.5s';
        item.classList.add('animated');
      }
    });

    // slide left animations
    slideLeftItems.forEach(item => {
      if (isInViewport(item) && !item.classList.contains('animated')) {
        item.style.animationDelay = '0.5s';
        item.classList.add('animated');
      }
    });
  }

  setTimeout(checkAnimations, 100);

  window.addEventListener('scroll', checkAnimations);
}

function initParallaxEffect() {
  const hero = document.querySelector('.hero');

  if (hero) {
    window.addEventListener('scroll', function () {
      const scrollPosition = window.scrollY;
      hero.style.backgroundPosition = `center ${50 + (scrollPosition * 0.05)}%`;
    });
  }
}

function initParticleBackground() {
  const hero = document.querySelector('.hero');

  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'particles-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '0';
  canvas.style.pointerEvents = 'none';

  hero.appendChild(canvas);

  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;

  const ctx = canvas.getContext('2d');

  // particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.color = this.getRandomColor();
    }

    getRandomColor() {
      const colors = [
        'rgba(255, 62, 157, 0.7)',
        'rgba(106, 17, 203, 0.7)',
        'rgba(37, 117, 252, 0.7)',
        'rgba(255, 184, 108, 0.7)'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }

      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // create particles
  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(animate);
  }

  animate();

  // handle window resize
  window.addEventListener('resize', function () {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  });
}