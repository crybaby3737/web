// Portfolio Main JavaScript
// Language Toggle & Mobile Navigation

(function() {
    'use strict';

    // Current language state
    let currentLang = 'en';

    // Toggle language between EN and DE
    window.toggleLanguage = function() {
        currentLang = currentLang === 'en' ? 'de' : 'en';
        updateLanguage();
        
        // Update button text
        const btn = document.querySelector('.lang-toggle');
        if (btn) {
            btn.textContent = currentLang === 'en' ? 'DE' : 'EN';
        }
    };

    // Update all translatable elements
    function updateLanguage() {
        const elements = document.querySelectorAll('[data-en][data-de]');
        elements.forEach(el => {
            const text = el.getAttribute(`data-${currentLang}`);
            if (text) {
                el.textContent = text;
            }
        });

        // Update html lang attribute
        document.documentElement.lang = currentLang;
    }

    // Mobile navigation toggle
    window.toggleMobileNav = function() {
        let menu = document.querySelector('.nav-mobile-menu');
        
        if (!menu) {
            // Create mobile menu if it doesn't exist
            menu = document.createElement('div');
            menu.className = 'nav-mobile-menu';
            menu.innerHTML = `
                <a href="#about" onclick="closeMobileNav()" data-en="About" data-de="Über mich">About</a>
                <a href="#services" onclick="closeMobileNav()" data-en="Services" data-de="Leistungen">Services</a>
                <a href="#projects" onclick="closeMobileNav()" data-en="Projects" data-de="Projekte">Projects</a>
                <a href="#contact" onclick="closeMobileNav()" data-en="Contact" data-de="Kontakt">Contact</a>
                <button class="lang-toggle" onclick="toggleLanguage(); closeMobileNav();">DE</button>
            `;
            document.querySelector('.nav').appendChild(menu);
        }
        
        menu.classList.toggle('active');
    };

    window.closeMobileNav = function() {
        const menu = document.querySelector('.nav-mobile-menu');
        if (menu) {
            menu.classList.remove('active');
        }
    };

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('.nav');
        const menu = document.querySelector('.nav-mobile-menu');
        
        if (menu && menu.classList.contains('active')) {
            if (!nav.contains(e.target)) {
                menu.classList.remove('active');
            }
        }
    });

    // Smooth scroll for anchor links (fallback for older browsers)
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    });

    // Detect user's browser language and set initial language
    document.addEventListener('DOMContentLoaded', function() {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('de')) {
            currentLang = 'de';
            updateLanguage();
            const btn = document.querySelector('.lang-toggle');
            if (btn) btn.textContent = 'EN';
        }
    });

    // Simple scroll reveal animation
    document.addEventListener('DOMContentLoaded', function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // Observe all cards and sections
        document.querySelectorAll('.service-card, .project-card, .skill-category').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    });
})();
