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
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger lines
            const lines = mobileToggle.querySelectorAll('.hamburger-line');
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
                const lines = mobileToggle.querySelectorAll('.hamburger-line');
                lines.forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                    const lines = mobileToggle.querySelectorAll('.hamburger-line');
                    lines.forEach(line => {
                        line.style.transform = 'none';
                        line.style.opacity = '1';
                    });
                }
            }
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
    threshold: 0.2,
    rootMargin: '0px 0px 50px 0px'
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
    '.service-card, .pricing-card, .contact-card, .social-card, .about-feature, .hero-stat, .preview-image'
);

animatedElements.forEach((element, index) => {
    element.classList.add('fade-in');
    element.style.transitionDelay = `${index * 0.05}s`;
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

// Call Now Button Functionality
function createConfetti(button) {
    const rect = button.getBoundingClientRect();
    const container = document.getElementById('confettiContainer');
    
    // Play confetti sound effect
    const audio = new Audio('assets/confetti.wav');
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Create more confetti pieces for a richer effect
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Add random shape classes
        const shapes = ['', 'confetti-circle', 'confetti-square', 'confetti-triangle'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        if (randomShape) confetti.classList.add(randomShape);
        
        // Position confetti at button location with some initial spread
        const startX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 100;
        const startY = rect.top + rect.height / 2 + (Math.random() - 0.5) * 50;
        confetti.style.left = startX + 'px';
        confetti.style.top = startY + 'px';
        
        // Random size variations
        const size = Math.random() * 8 + 4; // 4px to 12px
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // Random colors from Irish theme
        const colors = ['#22c55e', '#16a34a', '#059669', '#0d9488', '#0891b2', '#3b82f6', '#f59e0b', '#eab308', '#ef4444', '#ec4899'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Enhanced movement with random directions
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 300 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 200; // Bias upward initially
        
        confetti.style.setProperty('--vx', vx + 'px');
        confetti.style.setProperty('--vy', vy + 'px');
        
        // Random rotation speed
        const rotationSpeed = (Math.random() - 0.5) * 1440; // -720 to 720 degrees
        confetti.style.setProperty('--rotation', rotationSpeed + 'deg');
        
        // Random animation delay and duration
        confetti.style.animationDelay = Math.random() * 0.3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2.5) + 's'; // 2.5s to 4.5s
        
        // Random opacity for depth effect
        confetti.style.opacity = Math.random() * 0.4 + 0.6; // 0.6 to 1.0
        
        container.appendChild(confetti);
        
        // Remove confetti after animation with some buffer time
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 5000);
    }
    
    // Add screen shake effect
    document.body.style.animation = 'confetti-shake 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

function showCallPopup() {
    const popup = document.getElementById('callPopup');
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCallPopup() {
    const popup = document.getElementById('callPopup');
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function proceedWithCall() {
    window.location.href = 'tel:+353852050409';
    closeCallPopup();
}

// Add event listeners to Call Now buttons
document.addEventListener('DOMContentLoaded', function() {
    const callButtons = document.querySelectorAll('.call-now-btn');
    
    callButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create confetti effect
            createConfetti(this);
            
            // Show popup after short delay
            setTimeout(() => {
                showCallPopup();
            }, 500);
        });
    });
    
    // Close popup when clicking outside
    document.getElementById('callPopup').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCallPopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCallPopup();
        }
    });
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