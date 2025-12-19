const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  // Only toggle on small screens
  if (window.innerWidth < 800) {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
  }
});

// Submenu dropdown (mobile click version)
const submenuParents = document.querySelectorAll(".off-screen-menu .has-submenu");

submenuParents.forEach((parent) => {
  const submenu = parent.querySelector(".submenu");

  parent.addEventListener("click", (e) => {
    if (window.innerWidth < 800) {
      e.preventDefault();
      e.stopPropagation();

      if (submenu.classList.contains("open")) {
        submenu.style.maxHeight = null;
        submenu.classList.remove("open");
      } else {
        document.querySelectorAll(".submenu.open").forEach((openMenu) => {
          openMenu.style.maxHeight = null;
          openMenu.classList.remove("open");
        });
        submenu.classList.add("open");
        submenu.style.maxHeight = submenu.scrollHeight + "px";
      }
    }
  });
});

// Click outside to close (mobile only)
document.addEventListener("click", (e) => {
  if (window.innerWidth >= 800) return; // ignore on desktop

  const isClickInsideMenu = offScreenMenu.contains(e.target);
  const isClickOnHam = hamMenu.contains(e.target);

  if (!isClickInsideMenu && !isClickOnHam) {
    offScreenMenu.classList.remove("active");
    hamMenu.classList.remove("active");

    document.querySelectorAll(".submenu.open").forEach((submenu) => {
      submenu.style.maxHeight = null;
      submenu.classList.remove("open");
    });
  }
});


const overlay = document.querySelector(".menu-overlay");

// Close menu when clicking overlay
overlay.addEventListener("click", () => {
  offScreenMenu.classList.remove("active");
  hamMenu.classList.remove("active");

  document.querySelectorAll(".submenu.open").forEach((submenu) => {
    submenu.style.maxHeight = null;
    submenu.classList.remove("open");
  });
});



// Gallery Carousel
const track = document.querySelector('.gallery-carousel-track');
const images = document.querySelectorAll('.gallery-carousel img');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');

let currentIndex = 0;
let startX = 0;
let isDragging = false;

// Create indicators
images.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
});

const indicators = document.querySelectorAll('.indicator');

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
}

// Button events
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Touch/swipe events
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
});

track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
    
    isDragging = false;
});

// Mouse drag events (for desktop)
track.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    track.style.cursor = 'grabbing';
});

track.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
});

track.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    
    const endX = e.clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
    
    isDragging = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mouseleave', () => {
    isDragging = false;
    track.style.cursor = 'grab';
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});