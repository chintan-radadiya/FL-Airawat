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
  
  // Normalize Navbar Links to navigate correctly across all pages
  (function normalizeNavbarLinks() {
    const linkMap = {
      'home': 'index.html',
      'about us': 'about.html',
      'products': 'products.html',
      'contact us': 'contact.html#contact',
    };
    const headerLinks = document.querySelectorAll('header .nav-link');
    headerLinks.forEach(a => {
      const key = (a.textContent || '').trim().toLowerCase();
      const target = linkMap[key];
      if (target) {
        a.setAttribute('href', target);
        // If link points to a hash on the same page, allow smooth scroll without full navigation
        a.addEventListener('click', (e) => {
          if (target.startsWith('#')) {
            e.preventDefault();
            const el = document.querySelector(target);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    });
  })();
  
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

  // Sidebar-driven Products (Sidebar Categories -> Right Panel Product Grid)
  if (isProductsPage) {
    // Sample data structure: Replace with real data as needed
    const productData = [
      {
        id: 'cat-1',
        name: 'Category 1',
        products: [
          {
            id: 'p-101',
            name: 'Brand Name 1',
            image: 'https://via.placeholder.com/700x420?text=Product+1',
            params: ['Technical Param 1', 'Technical Param 2'],
            features: ['Feature 1', 'Feature 2'],
            applications: ['Application 1', 'Application 2']
          },
          {
            id: 'p-102',
            name: 'Brand Name 2',
            image: 'https://via.placeholder.com/700x420?text=Product+2',
            params: ['Technical Param 1', 'Technical Param 2'],
            features: ['Feature 1', 'Feature 2'],
            applications: ['Application 1', 'Application 2']
          }
        ]
      },
      {
        id: 'cat-2',
        name: 'Category 2',
        products: [
          {
            id: 'p-201',
            name: 'Brand Name 3',
            image: 'https://via.placeholder.com/700x420?text=Product+3',
            params: ['Technical Param A', 'Technical Param B'],
            features: ['Feature A', 'Feature B'],
            applications: ['Application A', 'Application B']
          }
        ]
      },
      {
        id: 'cat-3',
        name: 'Category 3',
        products: []
      },
      {
        id: 'cat-4',
        name: 'Category 4',
        products: []
      }
    ];

    const sidebarEl = document.getElementById('products-sidebar');
    const detailEl = document.getElementById('product-detail');

    const navigateToDetails = (product) => {
      const params = new URLSearchParams({ id: product.id, name: product.name });
      window.location.href = `product_details.html?${params.toString()}`;
    };

    const renderProductGrid = (categoryId) => {
      const category = productData.find(c => c.id === categoryId);
      if (!category) {
        detailEl.innerHTML = `<div class="p-4"><p class="text-muted mb-0">Select a category to view products.</p></div>`;
        return;
      }
      if (!category.products.length) {
        detailEl.innerHTML = `<div class="p-4"><p class="text-muted mb-0">No products available in this category.</p></div>`;
        return;
      }
      const cards = category.products.map(p => `
        <div class="col-12 col-sm-6 col-lg-6 mb-4">
          <div class="product-card-grid h-100">
            <div class="product-img-grid">
              <img src="${p.image}" alt="${p.name}" data-product-id="${p.id}" class="img-fluid clickable-img">
            </div>
            <div class="product-body-grid">
              <h3 class="h6 mb-1">${p.name}</h3>
              ${p.params?.length ? `<ul class="product-params small mb-0">${p.params.map(li => `<li>${li}</li>`).join('')}</ul>` : ''}
            </div>
          </div>
        </div>
      `).join('');
      detailEl.innerHTML = `
        <div class="row product-grid">${cards}</div>
      `;
      // attach click events to images
      detailEl.querySelectorAll('.clickable-img').forEach(img => {
        img.addEventListener('click', () => {
          const pid = img.getAttribute('data-product-id');
          const prod = category.products.find(pp => pp.id === pid);
          if (prod) navigateToDetails(prod);
        });
      });
    };

    const renderSidebar = (activeCategoryId) => {
      if (!sidebarEl) return;
      sidebarEl.innerHTML = productData.map(category => `
        <div class="category-item">
          <button class="category-pill ${activeCategoryId === category.id ? 'active' : ''}" type="button" data-category-id="${category.id}">
            ${category.name}
          </button>
        </div>
      `).join('');

      // Category click -> render grid
      sidebarEl.querySelectorAll('.category-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          const cid = btn.getAttribute('data-category-id');
          // update active state
          sidebarEl.querySelectorAll('.category-pill.active').forEach(el => el.classList.remove('active'));
          btn.classList.add('active');
          renderProductGrid(cid);
          // update hash for shareability
          if (history.replaceState) {
            history.replaceState(null, '', `#${cid}`);
          } else {
            location.hash = cid;
          }
        });
      });
    };

    // Initial selection: from hash or first category
    let initialCategoryId = decodeURIComponent(location.hash.replace('#', ''));
    if (!initialCategoryId || !productData.some(c => c.id === initialCategoryId)) {
      initialCategoryId = productData[0]?.id || '';
    }
    renderSidebar(initialCategoryId);
    renderProductGrid(initialCategoryId);
  }
});

// Product Details Page initialization
document.addEventListener('DOMContentLoaded', function () {
  const isProductDetailsPage = window.location.pathname.endsWith('product_details.html');
  if (!isProductDetailsPage) return;

  // Map of product data keyed by id. Replace with real data as needed.
  const PRODUCT_MAP = {
    'p-101': {
      name: 'Brand Name 1',
      desc: 'High-performance unit suitable for industrial applications.',
      images: [
        'https://via.placeholder.com/1000x650?text=Product+1+-+Front',
        'https://via.placeholder.com/1000x650?text=Product+1+-+Side',
        'https://via.placeholder.com/1000x650?text=Product+1+-+Back'
      ],
      details: {
        Features: ['Feature 1', 'Feature 2', 'Feature 3'],
        Applications: ['Application 1', 'Application 2']
      },
      specs: {
        'Power Rating': '5 kW',
        'Voltage': '220V',
        'Material': 'Alloy Steel',
        'Dimensions': '350 x 250 x 200 mm',
        'Weight': '12 kg'
      }
    },
    'p-102': {
      name: 'Brand Name 2',
      desc: 'Reliable solution with compact design and efficient output.',
      images: [
        'https://via.placeholder.com/1000x650?text=Product+2+-+Front',
        'https://via.placeholder.com/1000x650?text=Product+2+-+Detail'
      ],
      details: {
        Features: ['Feature A', 'Feature B'],
        Applications: ['Application X', 'Application Y']
      },
      specs: {
        'Power Rating': '3 kW',
        'Voltage': '110V',
        'Material': 'Aluminum',
        'Protection': 'IP54'
      }
    },
    'p-201': {
      name: 'Brand Name 3',
      desc: 'Versatile device optimized for durability.',
      images: [
        'https://via.placeholder.com/1000x650?text=Product+3+-+Angle+1',
        'https://via.placeholder.com/1000x650?text=Product+3+-+Angle+2',
        'https://via.placeholder.com/1000x650?text=Product+3+-+Angle+3'
      ],
      details: {
        Features: ['Durable build', 'Low maintenance'],
        Applications: ['Industrial lines', 'Workshops']
      },
      specs: {
        'Power Rating': '7 kW',
        'Voltage': '220V',
        'Max RPM': '1500'
      }
    }
  };

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const fallbackName = params.get('name') || 'Product';

  const titleEl = document.getElementById('pd-title');
  const nameEl = document.getElementById('pd-name');
  const descEl = document.getElementById('pd-desc');
  const galleryEl = document.getElementById('pd-gallery');
  const specsTable = document.getElementById('pd-specs');
  const specsEmpty = document.getElementById('pd-empty-specs');
  const notFound = document.getElementById('pd-notfound');
  const detailsEl = document.getElementById('pd-details');

  const data = id && PRODUCT_MAP[id] ? PRODUCT_MAP[id] : null;

  if (!data) {
    // Not found fallback
    titleEl.textContent = 'Product Not Found';
    nameEl.textContent = fallbackName;
    descEl.textContent = 'We couldn’t find information for this product.';
    notFound?.classList.remove('d-none');
    galleryEl.innerHTML = `
      <div class="swiper-slide">
        <img src="https://via.placeholder.com/1000x650?text=No+Image" alt="No image" />
      </div>
    `;
    specsTable.innerHTML = '';
    specsEmpty?.classList.remove('d-none');
    detailsEl.innerHTML = '<p class="text-muted mb-0">No additional details provided.</p>';
  } else {
    // Title
    titleEl.textContent = data.name;
    nameEl.textContent = data.name;
    descEl.textContent = data.desc || '';

    // Gallery
    const imgs = (data.images && data.images.length ? data.images : [
      'https://via.placeholder.com/1000x650?text=Image+Unavailable'
    ]);
    galleryEl.innerHTML = imgs.map(src => `
      <div class="swiper-slide">
        <img src="${src}" alt="${data.name}">
      </div>
    `).join('');

    // Details (features/applications)
    const details = data.details || {};
    const detailBlocks = Object.entries(details).map(([heading, items]) => `
      <div class="mb-2">
        <strong>${heading}:</strong>
        <ul class="mb-0" style="padding-left:1.1rem;">
          ${(items || []).map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>
    `).join('');
    detailsEl.innerHTML = detailBlocks || '<p class="text-muted mb-0">No additional details provided.</p>';

    // Specs table
    const specs = data.specs || {};
    const keys = Object.keys(specs);
    if (keys.length === 0) {
      specsTable.innerHTML = '';
      specsEmpty?.classList.remove('d-none');
    } else {
      specsEmpty?.classList.add('d-none');
      specsTable.innerHTML = `
        <thead>
          <tr>
            <th scope="col" style="width:40%;">Specification</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          ${keys.map(k => `
            <tr>
              <td>${k}</td>
              <td>${specs[k]}</td>
            </tr>
          `).join('')}
        </tbody>
      `;
    }
  }

  // Init Swiper for gallery
  new Swiper('.pd-gallery-swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: '.pd-gallery-swiper .swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.pd-gallery-swiper .swiper-button-next',
      prevEl: '.pd-gallery-swiper .swiper-button-prev',
    },
  });
});