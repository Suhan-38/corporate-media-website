// Business Groups - Standalone Project

// Business Groups Carousel - Manual Controls
const subsidiariesCarousel = document.querySelector(".subsidiaries-carousel");
let subsidiariesCurrentIndex = 0;

function moveSubsidiaries(direction) {
    if (!subsidiariesCarousel) return;
    
    const items = subsidiariesCarousel.querySelectorAll(".subsidiary-btn");
    const itemWidth = items[0].offsetWidth + 24; // width + gap
    const containerWidth = subsidiariesCarousel.parentElement.offsetWidth;
    const itemsPerView = Math.floor(containerWidth / itemWidth);
    const maxIndex = Math.max(0, items.length - itemsPerView);
    
    subsidiariesCurrentIndex += direction;
    
    // Loop around
    if (subsidiariesCurrentIndex < 0) {
        subsidiariesCurrentIndex = maxIndex;
    } else if (subsidiariesCurrentIndex > maxIndex) {
        subsidiariesCurrentIndex = 0;
    }
    
    const offset = -(subsidiariesCurrentIndex * itemWidth);
    subsidiariesCarousel.style.transform = `translateX(${offset}px)`;
}

// Touch/Swipe Support for Business Groups
let subsidiariesTouchStartX = 0;
let subsidiariesTouchEndX = 0;

if (subsidiariesCarousel) {
    subsidiariesCarousel.addEventListener("touchstart", (e) => {
        subsidiariesTouchStartX = e.touches[0].clientX;
    }, { passive: true });

    subsidiariesCarousel.addEventListener("touchend", (e) => {
        subsidiariesTouchEndX = e.changedTouches[0].clientX;
        const diff = subsidiariesTouchStartX - subsidiariesTouchEndX;
        
        // Swipe threshold
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                moveSubsidiaries(1); // Swipe left
            } else {
                moveSubsidiaries(-1); // Swipe right
            }
        }
    }, { passive: true });
}

// Intersection Observer for animation
const subsidiaryBtns = document.querySelectorAll(".subsidiary-btn");
const subsidiaryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

subsidiaryBtns.forEach((btn, index) => {
    btn.style.opacity = "0";
    btn.style.transform = "translateY(20px)";
    btn.style.transition = `all 0.5s ease ${index * 0.05}s`;
    subsidiaryObserver.observe(btn);
});

console.log("Business Groups - Standalone Project Loaded");

