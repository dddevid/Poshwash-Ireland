// Loading Screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'visible';
            }, 500);
        }, 1500);
    }
});

// Update copyright year
document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Animate hamburger lines
        const lines = mobileToggle.querySelectorAll('.line');
        lines.forEach((line, index) => {
            if (mobileToggle.classList.contains('active')) {
                if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) line.style.opacity = '0';
                if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                line.style.transform = 'none';
                line.style.opacity = '1';
            }
        });
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (mobileToggle) {
            mobileToggle.classList.remove('active');
            const lines = mobileToggle.querySelectorAll('.line');
            lines.forEach(line => {
                line.style.transform = 'none';
                line.style.opacity = '1';
            });
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(
    '.service-card, .pricing-card, .contact-card, .social-card, .about-feature, .hero-stat'
);

animatedElements.forEach((element, index) => {
    element.classList.add('fade-in');
    element.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(element);
});

// Pricing toggle functionality
const pricingToggle = document.querySelector('.pricing-toggle');
const toggleOptions = document.querySelectorAll('.toggle-option');
const pricingCards = document.querySelectorAll('.pricing-card');

if (pricingToggle) {
    toggleOptions.forEach(option => {
        option.addEventListener('click', () => {
            const vehicleType = option.dataset.vehicle;
            
            // Update active button
            toggleOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Update pricing display
            pricingCards.forEach(card => {
                const carsPrice = card.querySelector('.cars-price');
                const mpvPrice = card.querySelector('.mpv-price');
                
                if (vehicleType === 'cars') {
                    if (carsPrice) {
                        carsPrice.style.display = 'inline';
                    }
                    if (mpvPrice) {
                        mpvPrice.style.display = 'none';
                    }
                } else {
                    if (carsPrice) {
                        carsPrice.style.display = 'none';
                    }
                    if (mpvPrice) {
                        mpvPrice.style.display = 'inline';
                    }
                }
            });
        });
    });
}

// Floating shamrocks animation
function createFloatingShamrock() {
    const shamrock = document.createElement('div');
    shamrock.className = 'shamrock';
    shamrock.innerHTML = '🍀';
    shamrock.style.left = Math.random() * 100 + 'vw';
    shamrock.style.animationDuration = (Math.random() * 3 + 2) + 's';
    shamrock.style.opacity = Math.random() * 0.5 + 0.3;
    
    const container = document.querySelector('.floating-shamrocks');
    if (container) {
        container.appendChild(shamrock);
        
        setTimeout(() => {
            shamrock.remove();
        }, 5000);
    }
}

// Create floating shamrocks periodically
setInterval(createFloatingShamrock, 3000);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        const speed = scrolled * 0.3;
        heroVisual.style.transform = `translateY(${speed}px)`;
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add click animations
document.querySelectorAll('.btn, .contact-card, .social-card').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// WhatsApp and phone click tracking
document.querySelectorAll('a[href^="tel:"], a[href^="https://wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        const type = this.href.includes('wa.me') ? 'WhatsApp' : 'Phone';
        console.log(`${type} contact initiated`);
        
        // Add success animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Scroll to top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Show scroll to top button
window.addEventListener('scroll', () => {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize AOS (Animate On Scroll) alternative
const initAnimations = () => {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(element => {
        const animationType = element.dataset.animate;
        element.classList.add(animationType);
        observer.observe(element);
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    
    // Update copyright year automatically
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Performance optimization: Throttle scroll events
let ticking = false;

function updateScrollEffects() {
    // All scroll-based animations here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);