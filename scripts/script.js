const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

const carousel = document.querySelector('.carousel-container');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const indicators = document.querySelectorAll('.carousel-indicator');

let currentIndex = 0;
const totalItems = carouselItems.length;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('bg-opacity-100', 'w-6');
        } else {
            indicator.classList.remove('bg-opacity-100', 'w-6');
        }
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}, 5000);

const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.1 });

scrollRevealElements.forEach(element => {
    element.style.transform = 'translateY(30px)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.8s ease';
    observer.observe(element);
});

const header = document.getElementById('main-nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.classList.add('py-2', 'shadow-lg');
        header.classList.remove('py-3');
    } else {
        header.classList.remove('py-2', 'shadow-lg');
        header.classList.add('py-3');
    }
    
    lastScrollTop = scrollTop;
});

const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-section h1", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.3
});

gsap.from(".hero-section p", {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: "power3.out",
    delay: 0.6
});

gsap.from(".hero-section .flex", {
    duration: 1,
    y: 20,
    opacity: 0,
    ease: "power3.out",
    delay: 0.9
});

const sectionTitles = document.querySelectorAll('section h2');
sectionTitles.forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: "power3.out"
    });
});