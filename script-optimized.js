// Optimized JavaScript for PoshWash Ireland - Performance Enhanced

// Loading Screen - Simplified
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'visible';
            }, 300);
        }, 1000); // Reduced loading time
    }
});

// Update copyright year
document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Mobile Navigation Toggle - Optimized
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Simplified hamburger animation
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

// Header scroll effect - Optimized with throttling
let lastScrollTop = 0;
let headerTicking = false;

function updateHeader() {
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
    headerTicking = false;
}

window.addEventListener('scroll', () => {
    if (!headerTicking) {
        requestAnimationFrame(updateHeader);
        headerTicking = true;
    }
});

// Intersection Observer for animations - Optimized
const observerOptions = {
    threshold: 0.1, // Reduced threshold for better performance
    rootMargin: '0px 0px 50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(
    '.service-card, .pricing-card, .contact-card, .social-card, .about-feature, .hero-stat, .preview-image'
);

animatedElements.forEach((element, index) => {
    element.classList.add('fade-in');
    element.style.transitionDelay = `${Math.min(index * 0.05, 0.5)}s`; // Cap delay at 0.5s
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
                    if (carsPrice) carsPrice.style.display = 'inline';
                    if (mpvPrice) mpvPrice.style.display = 'none';
                } else {
                    if (carsPrice) carsPrice.style.display = 'none';
                    if (mpvPrice) mpvPrice.style.display = 'inline';
                }
            });
        });
    });
}

// Parallax effect - Simplified and optimized
let parallaxTicking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    // Only apply parallax if element is in viewport
    if (heroVisual && scrolled < window.innerHeight) {
        const speed = scrolled * 0.05; // Reduced parallax intensity
        heroVisual.style.transform = `translateY(${speed}px)`;
    }
    parallaxTicking = false;
}

window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    let backToTopTicking = false;
    
    function updateBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        backToTopTicking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!backToTopTicking) {
            requestAnimationFrame(updateBackToTop);
            backToTopTicking = true;
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced click animations with haptic feedback
document.querySelectorAll('.btn, .contact-card, .social-card').forEach(element => {
    element.addEventListener('click', function(e) {
        // Light haptic feedback for general interactions
        if ('vibrate' in navigator) {
            navigator.vibrate(30); // Short, subtle vibration
        }
        
        // Simple scale animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// WhatsApp and phone click tracking with haptic feedback
document.querySelectorAll('a[href^="tel:"], a[href^="https://wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        const type = this.href.includes('wa.me') ? 'WhatsApp' : 'Phone';
        console.log(`${type} contact initiated`);
        
        // Medium haptic feedback for contact actions
        if ('vibrate' in navigator) {
            navigator.vibrate(50); // Medium vibration for important actions
        }
        
        // Simple feedback animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Enhanced Haptic Feedback Function - Cross-platform compatibility
function triggerHapticFeedback(pattern = [40, 20, 80, 20, 40]) {
    // Detect device and browser capabilities
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    
    // Check for various vibration API implementations
    const hasVibrate = !!(navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate);
    
    console.log('Device Info:', {
        isIOS,
        isAndroid,
        isMobile,
        hasVibrate,
        userAgent: navigator.userAgent.substring(0, 50) + '...'
    });
    
    // Try multiple vibration APIs with fallbacks
    let vibrationTriggered = false;
    
    // Standard Vibration API (most modern browsers)
    if (navigator.vibrate && typeof navigator.vibrate === 'function') {
        try {
            console.log('Using navigator.vibrate with pattern:', pattern);
            navigator.vibrate(pattern);
            vibrationTriggered = true;
        } catch (e) {
            console.log('navigator.vibrate failed:', e.message);
        }
    }
    
    // WebKit prefix (older Safari, some mobile browsers)
    if (!vibrationTriggered && navigator.webkitVibrate && typeof navigator.webkitVibrate === 'function') {
        try {
            console.log('Using navigator.webkitVibrate');
            navigator.webkitVibrate(pattern);
            vibrationTriggered = true;
        } catch (e) {
            console.log('navigator.webkitVibrate failed:', e.message);
        }
    }
    
    // Mozilla prefix (older Firefox)
    if (!vibrationTriggered && navigator.mozVibrate && typeof navigator.mozVibrate === 'function') {
        try {
            console.log('Using navigator.mozVibrate');
            navigator.mozVibrate(pattern);
            vibrationTriggered = true;
        } catch (e) {
            console.log('navigator.mozVibrate failed:', e.message);
        }
    }
    
    // Microsoft prefix (older Edge/IE)
    if (!vibrationTriggered && navigator.msVibrate && typeof navigator.msVibrate === 'function') {
        try {
            console.log('Using navigator.msVibrate');
            navigator.msVibrate(pattern);
            vibrationTriggered = true;
        } catch (e) {
            console.log('navigator.msVibrate failed:', e.message);
        }
    }
    
    // iOS specific handling (iOS Safari has limited vibration support)
    if (!vibrationTriggered && isIOS) {
        try {
            // iOS only supports simple vibration, not patterns
            if (navigator.vibrate) {
                console.log('iOS fallback: using simple vibration');
                navigator.vibrate(200); // Simple 200ms vibration
                vibrationTriggered = true;
            }
        } catch (e) {
            console.log('iOS vibration fallback failed:', e.message);
        }
    }
    
    // Android specific handling
    if (!vibrationTriggered && isAndroid) {
        try {
            // Android usually supports patterns well
            if (navigator.vibrate) {
                console.log('Android fallback: using pattern vibration');
                navigator.vibrate(pattern);
                vibrationTriggered = true;
            }
        } catch (e) {
            console.log('Android vibration fallback failed:', e.message);
        }
    }
    
    // Final fallback for any mobile device
    if (!vibrationTriggered && isMobile) {
        try {
            // Try with a simple vibration as last resort
            const vibrateFn = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate;
            if (vibrateFn) {
                console.log('Mobile fallback: simple vibration');
                vibrateFn.call(navigator, 100);
                vibrationTriggered = true;
            }
        } catch (e) {
            console.log('Mobile vibration fallback failed:', e.message);
        }
    }
    
    // Log final result
    if (vibrationTriggered) {
        console.log('✅ Haptic feedback triggered successfully');
    } else {
        console.log('❌ Haptic feedback not available on this device/browser');
        
        // Alternative feedback for devices without vibration
        if (isMobile) {
            console.log('Providing visual feedback as alternative');
            // Could add visual feedback here (like a brief flash or animation)
        }
    }
    
    return vibrationTriggered;
}

// Call Now Button Functionality - Enhanced with Original Confetti and Haptic Feedback
function createConfetti(button) {
    const rect = button.getBoundingClientRect();
    const container = document.getElementById('confettiContainer');
    
    if (!container) return;
    
    // Trigger haptic feedback for supported devices - synchronized with confetti
    triggerHapticFeedback();
    
    // Play confetti sound effect
    const audio = new Audio('assets/confetti.wav');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Create full confetti effect like the original (80 pieces)
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Position confetti at button location with spread
        const startX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 100;
        const startY = rect.top + rect.height / 2 + (Math.random() - 0.5) * 50;
        confetti.style.left = startX + 'px';
        confetti.style.top = startY + 'px';
        
        // Variable sizes for more dynamic effect
        const size = Math.random() * 8 + 4;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // Rich color palette
        const colors = [
            '#22c55e', '#16a34a', '#15803d', '#166534',
            '#f59e0b', '#d97706', '#b45309', '#92400e',
            '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af',
            '#ef4444', '#dc2626', '#b91c1c', '#991b1b',
            '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6',
            '#ec4899', '#db2777', '#be185d', '#9d174d'
        ];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Enhanced styling
        confetti.style.position = 'fixed';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10000';
        confetti.style.opacity = '0.9';
        
        // Complex movement with rotation
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 150;
        const rotation = Math.random() * 720 + 360;
        
        confetti.style.setProperty('--vx', vx + 'px');
        confetti.style.setProperty('--vy', vy + 'px');
        confetti.style.setProperty('--rotation', rotation + 'deg');
        
        // Enhanced animation with CSS keyframes
        confetti.style.animation = 'confetti-fall 3s ease-out forwards';
        confetti.style.animationDelay = Math.random() * 0.3 + 's';
        
        container.appendChild(confetti);
        
        // Remove confetti after animation with cleanup
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 3500);
    }
    
    // Enhanced button feedback synchronized with haptic
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

function showCallPopup() {
    const popup = document.getElementById('callPopup');
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCallPopup() {
    const popup = document.getElementById('callPopup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
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
            
            // Create enhanced confetti effect with haptic feedback
            createConfetti(this);
            
            // Show popup after short delay
            setTimeout(() => {
                showCallPopup();
            }, 300);
        });
    });
    
    // Close popup when clicking outside
    const callPopup = document.getElementById('callPopup');
    if (callPopup) {
        callPopup.addEventListener('click', function(e) {
            if (e.target === this) {
                closeCallPopup();
            }
        });
    }
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCallPopup();
        }
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year automatically
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
});

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events with debouncing for resize
window.addEventListener('resize', debounce(() => {
    // Handle resize events if needed
}, 250));

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'assets/logo.png',
        'assets/sideimage.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();