/**
 * Yohannes Kibrekidusan Portfolio - Main JavaScript
 * Modern, accessible, and performant vanilla JavaScript
 */

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all components
        this.initLoading();
        this.initStats();
        this.initNavigation();
        this.initScrollEffects();
        this.initFormValidation();
        this.initAccessibility();
        this.initMobileMenu();
    }

    // ===== LOADING SCREEN =====
    initLoading() {
        const loading = document.getElementById('loading');
        if (!loading) return;

        // Hide loading screen after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                loading.classList.add('hidden');
                // Announce to screen readers
                this.announceToScreenReader('Portfolio loaded successfully');
            }, 500);
        });

        // Fallback: hide after 3 seconds max
        setTimeout(() => {
            if (!loading.classList.contains('hidden')) {
                loading.classList.add('hidden');
            }
        }, 3000);
    }

    // ===== STATISTICS COUNTER =====
    initStats() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('[data-target]');
                    statNumbers.forEach(stat => {
                        this.animateCounter(stat);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Observe all stat containers
        document.querySelectorAll('.hero-stats').forEach(stats => {
            statsObserver.observe(stats);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        if (isNaN(target)) return;

        const duration = 2000; // 2 seconds
        const start = 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(animate);
    }

    // ===== NAVIGATION =====
    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Update active state
                this.updateActiveNavLink(link);

                // Smooth scroll to section
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without page reload
                    history.pushState(null, null, targetId);

                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });

        // Update active nav on scroll
        this.initScrollSpy();
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });

        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'page');
    }

    initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observerOptions = {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

                    if (correspondingLink) {
                        this.updateActiveNavLink(correspondingLink);
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // ===== SCROLL EFFECTS =====
    initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe sections for scroll animations
        document.querySelectorAll('.projects, .skills, .about, .contact').forEach(section => {
            observer.observe(section);
        });

        // Add scroll effect to header
        this.initHeaderScrollEffect();
    }

    initHeaderScrollEffect() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - hide header
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up or at top - show header
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    // ===== MOBILE MENU =====
    initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navList = document.querySelector('.nav-list');

        if (!toggle || !navList) return;

        // Show mobile menu toggle on small screens
        const checkScreenSize = () => {
            if (window.innerWidth < 768) {
                toggle.style.display = 'block';
                navList.classList.add('mobile-menu');
            } else {
                toggle.style.display = 'none';
                navList.classList.remove('mobile-menu', 'open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        };

        // Initial check
        checkScreenSize();

        // Listen for resize
        window.addEventListener('resize', checkScreenSize);

        // Toggle menu
        toggle.addEventListener('click', () => {
            const isOpen = navList.classList.contains('open');
            navList.classList.toggle('open');
            toggle.setAttribute('aria-expanded', !isOpen);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navList.contains(e.target) && !toggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    closeMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navList = document.querySelector('.nav-list');

        if (navList) {
            navList.classList.remove('open');
        }
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
        }
    }

    // ===== FORM VALIDATION =====
    initFormValidation() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');

        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${field.previousElementSibling.textContent} is required`;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Minimum length validation
        if (field.hasAttribute('minlength')) {
            const minLength = parseInt(field.getAttribute('minlength'));
            if (value.length < minLength) {
                isValid = false;
                errorMessage = `Please enter at least ${minLength} characters`;
            }
        }

        this.setFieldError(field, isValid ? '' : errorMessage);
        return isValid;
    }

    setFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');

        if (existingError) {
            existingError.remove();
        }

        if (message) {
            const errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.setAttribute('role', 'alert');
            errorElement.textContent = message;

            formGroup.appendChild(errorElement);
            field.setAttribute('aria-invalid', 'true');
            field.setAttribute('aria-describedby', errorElement.id = `error-${field.name}`);
        } else {
            field.removeAttribute('aria-invalid');
            field.removeAttribute('aria-describedby');
        }
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');

        if (existingError) {
            existingError.remove();
        }

        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
    }

    async handleFormSubmit(form) {
        const submitBtn = form.querySelector('.btn-primary');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.announceToScreenReader('Please correct the errors in the form');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';

        try {
            // Simulate form submission (replace with actual API call)
            await this.submitForm(new FormData(form));

            // Success
            this.showFormSuccess(form);
            this.announceToScreenReader('Message sent successfully');

        } catch (error) {
            // Error
            this.showFormError(form, error.message);
            this.announceToScreenReader('Failed to send message');

        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'flex';
            btnLoading.style.display = 'none';
        }
    }

    async submitForm(formData) {
        // Simulate API call - replace with actual endpoint
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% success rate)
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error occurred'));
                }
            }, 2000);
        });
    }

    showFormSuccess(form) {
        const formContainer = form.closest('.contact-form-container');

        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--accent-cyan); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--accent-cyan); margin-bottom: 1rem;">Message Sent Successfully!</h3>
                <p style="color: var(--text-secondary);">Thank you for reaching out. I'll get back to you within 24 hours.</p>
            </div>
        `;

        formContainer.innerHTML = '';
        formContainer.appendChild(successMessage);

        // Reset form after delay
        setTimeout(() => {
            location.reload();
        }, 5000);
    }

    showFormError(form, message) {
        const existingError = form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }

        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.style.cssText = `
            background-color: rgba(255, 107, 107, 0.1);
            border: 1px solid #ff6b6b;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1.5rem;
            color: #ff6b6b;
            text-align: center;
        `;
        errorMessage.innerHTML = `
            <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
            ${message || 'Failed to send message. Please try again.'}
        `;

        form.insertBefore(errorMessage, form.firstChild);

        // Remove error after 5 seconds
        setTimeout(() => {
            if (errorMessage.parentNode) {
                errorMessage.remove();
            }
        }, 5000);
    }

    // ===== ACCESSIBILITY =====
    initAccessibility() {
        // Handle keyboard navigation
        this.initKeyboardNavigation();

        // Handle focus management
        this.initFocusManagement();

        // Handle reduced motion
        this.initReducedMotion();
    }

    initKeyboardNavigation() {
        // Enhanced keyboard navigation for interactive elements
        document.addEventListener('keydown', (e) => {
            // Skip to main content
            if (e.key === 'Tab' && !e.shiftKey && e.target === document.body) {
                const skipLink = document.querySelector('.skip-link');
                if (skipLink) {
                    skipLink.focus();
                }
            }
        });
    }

    initFocusManagement() {
        // Ensure focus is visible
        const focusableElements = document.querySelectorAll('button, a, input, textarea, [tabindex]');

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--accent-cyan)';
                element.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }

    initReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Disable scroll animations
            const style = document.createElement('style');
            style.textContent = `
                .fade-in-up {
                    animation: none !important;
                    opacity: 1 !important;
                    transform: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===== UTILITIES =====
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;

        document.body.appendChild(announcement);

        setTimeout(() => {
            if (announcement.parentNode) {
                announcement.remove();
            }
        }, 1000);
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// ===== LAZY LOADING =====
class LazyLoader {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.initIntersectionObserver();
        } else {
            // Fallback for browsers without IntersectionObserver
            this.loadAllImages();
        }
    }

    initIntersectionObserver() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe all images with data-src
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        }
    }

    loadAllImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => this.loadImage(img));
    }
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize portfolio
    window.portfolio = new Portfolio();

    // Initialize lazy loading
    window.lazyLoader = new LazyLoader();

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`🚀 Portfolio loaded in ${perfData.loadEventEnd - perfData.fetchStart}ms`);
        });
    }

    // Service Worker registration (optional)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('Service Worker registered'))
            .catch(() => console.log('Service Worker registration failed'));
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Could send error reports to analytics service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Could send error reports to analytics service
});
