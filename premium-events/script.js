// Premium Events - Standalone Project

let currentIndex = 0;
const carousel = document.getElementById("eventsCarousel");
const dotsContainer = document.getElementById("carouselDots");
const totalItems = carousel.querySelectorAll(".gallery-item").length;

// Create dots
function createDots() {
    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement("div");
        dot.className = "dot" + (i === 0 ? " active" : "");
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function getItemsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

function updateCarousel() {
    const itemsPerView = getItemsPerView();
    const itemWidth = carousel.offsetWidth / itemsPerView;
    const offset = -(currentIndex * itemWidth);
    carousel.style.transform = `translateX(${offset}px)`;
    
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

function moveCarousel(direction) {
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = maxIndex;
    if (currentIndex > maxIndex) currentIndex = 0;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Event Popup Functionality
const eventPopup = document.getElementById("eventPopup");
const popupIframe = document.getElementById("popupIframe");
const galleryItems = document.querySelectorAll(".gallery-item");

function openEventPopup(url) {
    popupIframe.src = url;
    eventPopup.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeEventPopup() {
    eventPopup.classList.remove("active");
    popupIframe.src = "";
    document.body.style.overflow = "";
}

// Close popup when clicking outside
eventPopup.addEventListener("click", function(e) {
    if (e.target === eventPopup) {
        closeEventPopup();
    }
});

// Close popup with Escape key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && eventPopup.classList.contains("active")) {
        closeEventPopup();
    }
});

// Gallery items click handler
galleryItems.forEach(item => {
    item.addEventListener("click", function(e) {
        const url = this.getAttribute("data-url");
        if (url) {
            openEventPopup(url);
        }
    });
});

// Touch/Swipe support
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            moveCarousel(1);
        } else {
            moveCarousel(-1);
        }
    }
}, { passive: true });

// Handle window resize
window.addEventListener("resize", () => {
    updateCarousel();
});

// Initialize
createDots();
updateCarousel();

console.log("Premium Events - Standalone Project Loaded");

