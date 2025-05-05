const mobileMenuButton = document.getElementById('mobile-menu-button');
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
e.preventDefault();

const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const phone = document.getElementById('phone').value;
const subject = document.getElementById('subject').value;
const message = document.getElementById('message').value;

if (!name || !email || !message) {
    alert('Veuillez remplir tous les champs obligatoires (nom, email et message).');
    return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    alert('Veuillez entrer une adresse email valide.');
    return;
}

if (phone) {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone)) {
        alert('Veuillez entrer un numéro de téléphone valide.');
        return;
    }
}

alert('Merci pour votre message! Nous vous contacterons bientôt.');

contactForm.reset();
});

const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
toggle.addEventListener('click', function() {
    const content = this.nextElementSibling;
    const icon = this.querySelector('i');
    
    content.classList.toggle('hidden');
    
    if (content.classList.contains('hidden')) {
        icon.style.transform = 'rotate(0deg)';
    } else {
        icon.style.transform = 'rotate(-180deg)';
    }
});
});

document.addEventListener('DOMContentLoaded', function() {
const revealSections = document.querySelectorAll('.section-reveal');

const revealOptions = {
    threshold: 0.1
};

const revealSection = function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
};

const sectionObserver = new IntersectionObserver(revealSection, revealOptions);

revealSections.forEach(section => {
    sectionObserver.observe(section);
});

const nav = document.getElementById('main-nav');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        nav.classList.add('shadow-lg');
        nav.classList.add('bg-white/95');
        
        if (scrollTop > lastScrollTop) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
    } else {
        nav.classList.remove('shadow-lg');
        nav.classList.remove('bg-white/95');
        nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});
});

gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-content h1", {
duration: 1,
y: -50,
opacity: 0,
ease: "power3.out"
});

gsap.from(".hero-content p", {
duration: 1,
y: -30,
opacity: 0,
delay: 0.3,
ease: "power3.out"
});

gsap.from(".hero-content .flex", {
duration: 1,
y: -20,
opacity: 0,
delay: 0.6,
ease: "power3.out"
});

gsap.from(".contact-icon-box", {
scrollTrigger: {
    trigger: ".contact-icon-box",
    start: "top 80%",
},
duration: 0.8,
y: 50,
opacity: 0,
stagger: 0.2,
ease: "power3.out"
});

gsap.from(".contact-form", {
scrollTrigger: {
    trigger: ".contact-form",
    start: "top 80%",
},
duration: 1,
y: 30,
opacity: 0,
ease: "power3.out"
});

gsap.from(".faq-toggle", {
scrollTrigger: {
    trigger: ".faq-toggle",
    start: "top 80%",
},
duration: 0.8,
y: 20,
opacity: 0,
stagger: 0.1,
ease: "power3.out"
});