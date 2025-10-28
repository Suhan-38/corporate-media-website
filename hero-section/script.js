// Hero Section - Standalone Project

// Scroll animation for hero section
const heroSection = document.querySelector(".hero-section");
const mainContent = document.querySelector(".main-content");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    
    // Parallax effect
    heroSection.style.transform = `translateY(${scrollY * 0.5}px)`;
    
    // Fade out hero section as user scrolls
    const opacity = Math.max(0, 1 - (scrollY / (heroHeight * 0.8)));
    heroSection.style.opacity = opacity;
});

console.log("Hero Section - Standalone Project Loaded");

