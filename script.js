// Hero Section Scroll Animation - Fancy hide/show
const heroSection = document.querySelector(".hero-section");
const mainContent = document.querySelector(".main-content");
let isHeroHidden = false;

window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    // Hide hero when scrolling down (even slightly)
    if (scrollY > 10 && !isHeroHidden) {
        isHeroHidden = true;
        heroSection.style.transform = "translateY(-100%)";
        heroSection.style.opacity = "0";
        if (mainContent) {
            mainContent.style.marginTop = "0";
        }
    }
    // Show hero when scrolling back to top
    else if (scrollY <= 10 && isHeroHidden) {
        isHeroHidden = false;
        heroSection.style.transform = "translateY(0)";
        heroSection.style.opacity = "1";
        if (mainContent) {
            mainContent.style.marginTop = "100vh";
        }
    }
});

// Events Carousel
let currentIndex = 0;
const carousel = document.getElementById("eventsCarousel");
const items = document.querySelectorAll(".gallery-item");
const totalItems = items.length;
const dotsContainer = document.getElementById("carouselDots");

// Calculate items per view based on screen size
function getItemsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1023) return 2;
    return 3; // 1024px and above shows 3 cards
}

// Create dots
function createDots() {
    const itemsPerView = getItemsPerView();
    const totalDots = Math.ceil(totalItems / itemsPerView);
    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        if (i === 0) dot.classList.add("active");
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

// Move carousel
function moveCarousel(direction) {
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;

    currentIndex += direction;

    if (currentIndex < 0) currentIndex = maxIndex;
    if (currentIndex > maxIndex) currentIndex = 0;

    updateCarousel();
}

// Go to specific slide
function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Update carousel position
function updateCarousel() {
    const itemsPerView = getItemsPerView();
    const itemWidth = items[0].offsetWidth;
    const gap = 24; // 1.5rem gap
    const offset = currentIndex * itemsPerView * (itemWidth + gap);

    carousel.style.transform = `translateX(-${offset}px)`;

    // Update dots
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

// Initialize
createDots();

// Recalculate on resize
window.addEventListener("resize", () => {
    createDots();
    currentIndex = 0; // Reset to first slide on resize
    updateCarousel();
});

// Touch/Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - go to next
            moveCarousel(1);
        } else {
            // Swiped right - go to previous
            moveCarousel(-1);
        }
    }
}

// Mobile: Click/Tap to show overlay on gallery items
const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach(item => {
    item.addEventListener("click", function(e) {
        // Only on mobile (no hover support)
        if (window.innerWidth <= 768) {
            // Toggle active class
            const isActive = this.classList.contains("active");

            // Remove active from all items
            galleryItems.forEach(i => i.classList.remove("active"));

            // Add active to clicked item (unless it was already active)
            if (!isActive) {
                this.classList.add("active");
            }
        }
    });
});

// Close overlay when clicking outside
document.addEventListener("click", function(e) {
    if (window.innerWidth <= 768) {
        if (!e.target.closest(".gallery-item")) {
            galleryItems.forEach(i => i.classList.remove("active"));
        }
    }
});

// Observe subsidiary buttons
const subsidiaryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 50);
        }
    });
}, {
    threshold: 0.1
});

const subsidiaryBtns = document.querySelectorAll(".subsidiary-btn");
subsidiaryBtns.forEach((btn, index) => {
    btn.style.opacity = "0";
    btn.style.transform = "translateY(20px)";
    btn.style.transition = `all 0.5s ease ${index * 0.05}s`;
    subsidiaryObserver.observe(btn);
});

console.log("AZAQ & Brothers - Modern Carousel Loaded");
