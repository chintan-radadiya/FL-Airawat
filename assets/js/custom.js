// Hero Swiper
const heroSwiper = new Swiper('.hero-swiper', {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  speed: 1000,
  // Disable navigation arrows
  navigation: false
});

// Initialize Product Swipers when document is ready
// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    if (!contactForm.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    contactForm.classList.add('was-validated');
  }, false);
}

// Intersection Observer for fade-in animation
const animateOnScroll = () => {
  // Animate CTA section
  const ctaSection = document.querySelector('.cta-section');
  if (ctaSection) {
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          ctaObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    ctaObserver.observe(ctaSection);
  }
  
  // Animate contact section
  const contactSection = document.querySelector('.contact-section');
  if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          contactObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    contactObserver.observe(contactSection);
  }
};

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  animateOnScroll();
  
  // Re-run animations if the page is loaded with a hash (like #contact)
  if (window.location.hash) {
    setTimeout(animateOnScroll, 100);
  }
  // Initialize Testimonials Swiper
  const testimonialsSwiperEl = document.querySelector('.testimonials-swiper');
  if (testimonialsSwiperEl) {
    new Swiper(testimonialsSwiperEl, {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      effect: 'slide',
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: testimonialsSwiperEl.querySelector('.swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: testimonialsSwiperEl.querySelector('.swiper-button-next'),
        prevEl: testimonialsSwiperEl.querySelector('.swiper-button-prev'),
      },
      breakpoints: {
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
      },
    });
  }

  // Initialize all product swipers
  const productSwipers = document.querySelectorAll('.products-swiper');
  
  // Detect if on products.html
  const isProductsPage = window.location.pathname.endsWith('products.html') || document.body.classList.contains('products-page');

  productSwipers.forEach((swiperEl, index) => {
    // On products.html, always show 1 card per view (each card is a row with two columns)
    if (isProductsPage) {
      new Swiper(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: swiperEl.querySelector('.swiper-pagination'),
          clickable: true,
        },
        navigation: {
          nextEl: swiperEl.querySelector('.swiper-button-next'),
          prevEl: swiperEl.querySelector('.swiper-button-prev'),
        }
      });
    } else {
      // Default config (for index.html etc)
      new Swiper(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: swiperEl.querySelector('.swiper-pagination'),
          clickable: true,
        },
        navigation: {
          nextEl: swiperEl.querySelector('.swiper-button-next'),
          prevEl: swiperEl.querySelector('.swiper-button-prev'),
        },
        breakpoints: {
          576: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 25 },
          992: { slidesPerView: 3, spaceBetween: 30 },
          1200: { slidesPerView: 4, spaceBetween: 30 }
        }
      });
    }
  });
  
  // Initialize tab functionality
  const tabEls = document.querySelectorAll('button[data-bs-toggle="tab"]');
  tabEls.forEach(tabEl => {
    tabEl.addEventListener('shown.bs.tab', function (event) {
      // Update all Swiper instances when tab changes
      const activeTabPane = document.querySelector(event.target.getAttribute('data-bs-target'));
      const activeSwiper = activeTabPane.querySelector('.swiper');
      if (activeSwiper && activeSwiper.swiper) {
        activeSwiper.swiper.update();
        activeSwiper.swiper.slideTo(0);
      }
    });
  });
});