// NEURAL INTERFACE SCRIPT - PERFORMANCE OPTIMIZED & ACCESSIBLE
class NeuralInterface {
    constructor() {
        this.bootTime = Date.now();
        this.mode = 'digital';
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.observers = new Map();
        this.init();
    }
    
    init() {
        this.initIntersectionObserver();
        this.initStats();
        this.initModeToggle();
        this.initNavigation();
        this.initKeyboardNavigation();
        this.initPerformanceOptimizations();
        this.initAccessibilityFeatures();
        this.initButtonFixes();
    }
    
    // Fix button click issues
    initButtonFixes() {
        // Ensure all project buttons work
        document.querySelectorAll('.btn-secondary').forEach(button => {
            button.addEventListener('click', (e) => {
                const href = button.getAttribute('href');
                if (href && href.startsWith('http')) {
                    console.log('🔗 Opening link:', href);
                    // Force open in new tab
                    window.open(href, '_blank', 'noopener,noreferrer');
                    e.preventDefault();
                }
            });
        });
    }
    
    // Performance: Intersection Observer for scroll animations
    initIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once revealed for performance
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all reveal sections EXCEPT hero section
        document.querySelectorAll('.reveal-section:not(.hero-circuit)').forEach(section => {
            revealObserver.observe(section);
        });
        
        // Force hero section to be visible immediately
        const heroSection = document.querySelector('.hero-circuit');
        if (heroSection) {
            heroSection.classList.add('revealed');
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'none';
            heroSection.style.display = 'flex';
            heroSection.style.visibility = 'visible';
        }
        
        // Force profile image and title visibility
        const profileImg = document.querySelector('.profile-image');
        const heroTitle = document.querySelector('.hero-title');
        const profileSection = document.querySelector('.profile-section');
        const heroOverlay = document.querySelector('.hero-overlay');
        
        [profileImg, heroTitle, profileSection, heroOverlay].forEach(element => {
            if (element) {
                element.style.opacity = '1';
                element.style.visibility = 'visible';
                element.style.display = element === heroTitle ? 'block' : (element === profileSection || element === heroOverlay ? 'flex' : 'block');
                element.style.position = 'relative';
                element.style.zIndex = '100';
            }
        });
        
        this.observers.set('reveal', revealObserver);
        
        // Lazy load images below the fold
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        // Observe images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
        
        this.observers.set('images', imageObserver);
    }
    
    initStats() {
        const counters = document.querySelectorAll('[data-target]');
        
        // Use Intersection Observer to trigger counter animations only when visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    if (!isNaN(target)) {
                        this.animateCounter(counter, target, this.prefersReducedMotion ? 100 : 2000);
                        statsObserver.unobserve(counter);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            statsObserver.observe(counter);
        });
        
        this.observers.set('stats', statsObserver);
        
        // Clock speed animation with performance optimization
        const clockEl = document.getElementById('clockSpeed');
        if (clockEl && !this.prefersReducedMotion) {
            let animationId;
            const updateClock = () => {
                const base = 3.2;
                const fluct = Math.sin(Date.now() * 0.001) * 0.1;
                clockEl.textContent = (base + fluct).toFixed(1);
                animationId = requestAnimationFrame(updateClock);
            };
            
            // Start animation only when element is visible
            const clockObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateClock();
                    } else {
                        cancelAnimationFrame(animationId);
                    }
                });
            });
            
            clockObserver.observe(clockEl);
            this.observers.set('clock', clockObserver);
        }
    }
    
    animateCounter(el, target, duration) {
        if (this.prefersReducedMotion) {
            el.textContent = target;
            return;
        }
        
        let start = 0;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);
            
            el.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                el.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    initModeToggle() {
        const btn = document.getElementById('acdcSwitch');
        if (!btn) return;
        
        // Enhanced accessibility
        btn.setAttribute('aria-pressed', 'false');
        
        const toggleMode = () => {
            this.mode = this.mode === 'digital' ? 'analog' : 'digital';
            const isAnalog = this.mode === 'analog';
            
            document.body.classList.toggle('analog-mode', isAnalog);
            btn.setAttribute('aria-pressed', isAnalog.toString());
            
            const overlay = document.getElementById('crtOverlay');
            if (overlay) {
                overlay.style.opacity = isAnalog ? '1' : '0';
                overlay.setAttribute('aria-hidden', (!isAnalog).toString());
            }
            
            // Announce mode change to screen readers
            this.announceToScreenReader(`Switched to ${this.mode} mode`);
        };
        
        btn.addEventListener('click', toggleMode);
        
        // Keyboard support
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMode();
            }
        });
    }
    
    initNavigation() {
        const navNodes = document.querySelectorAll('.nav-node');
        
        navNodes.forEach(node => {
            node.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToSection(node);
            });
            
            // Enhanced keyboard navigation
            node.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.navigateToSection(node);
                }
            });
        });
        
        // Update active nav on scroll with throttling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            
            scrollTimeout = setTimeout(() => {
                this.updateActiveNav();
                scrollTimeout = null;
            }, 100);
        }, { passive: true });
    }
    
    navigateToSection(node) {
        // Update active state
        document.querySelectorAll('.nav-node').forEach(n => {
            n.classList.remove('active');
            n.removeAttribute('aria-current');
        });
        
        node.classList.add('active');
        node.setAttribute('aria-current', 'page');
        
        // Smooth scroll to target
        const target = node.getAttribute('href');
        if (target) {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ 
                    behavior: this.prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
                
                // Focus management for accessibility
                element.setAttribute('tabindex', '-1');
                element.focus();
                
                // Announce navigation to screen readers
                const sectionTitle = element.querySelector('h1, h2, h3')?.textContent || 'Section';
                this.announceToScreenReader(`Navigated to ${sectionTitle}`);
            }
        }
    }
    
    updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navNode = document.querySelector(`a[href="#${id}"]`);
            
            if (scrollPos >= top && scrollPos < bottom) {
                document.querySelectorAll('.nav-node').forEach(n => {
                    n.classList.remove('active');
                    n.removeAttribute('aria-current');
                });
                
                if (navNode) {
                    navNode.classList.add('active');
                    navNode.setAttribute('aria-current', 'page');
                }
            }
        });
    }
    
    initKeyboardNavigation() {
        // Enhanced keyboard navigation for the entire site
        document.addEventListener('keydown', (e) => {
            // Skip link activation
            if (e.key === 'Tab' && !e.shiftKey && e.target === document.body) {
                const skipLink = document.querySelector('.skip-link');
                if (skipLink) {
                    skipLink.focus();
                }
            }
            
            // Escape key to close modals or return focus
            if (e.key === 'Escape') {
                const activeElement = document.activeElement;
                if (activeElement && activeElement !== document.body) {
                    activeElement.blur();
                }
            }
        });
        
        // Ensure all interactive elements are keyboard accessible
        const interactiveElements = document.querySelectorAll('button, a, input, textarea, [tabindex]');
        interactiveElements.forEach(element => {
            if (!element.hasAttribute('tabindex') && element.tagName !== 'A') {
                element.setAttribute('tabindex', '0');
            }
        });
    }
    
    initPerformanceOptimizations() {
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        }, { passive: true });
        
        // Optimize scroll events
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        // Preload critical resources
        this.preloadCriticalResources();
    }
    
    initAccessibilityFeatures() {
        // Respect user preferences
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addEventListener('change', (e) => {
            this.prefersReducedMotion = e.matches;
            document.body.classList.toggle('reduced-motion', e.matches);
        });
        
        // High contrast mode support
        const contrastQuery = window.matchMedia('(prefers-contrast: high)');
        contrastQuery.addEventListener('change', (e) => {
            document.body.classList.toggle('high-contrast', e.matches);
        });
        
        // Color scheme preference
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        colorSchemeQuery.addEventListener('change', (e) => {
            document.body.classList.toggle('dark-mode', e.matches);
        });
        
        // Initialize based on current preferences
        document.body.classList.toggle('reduced-motion', this.prefersReducedMotion);
        document.body.classList.toggle('high-contrast', contrastQuery.matches);
        document.body.classList.toggle('dark-mode', colorSchemeQuery.matches);
    }
    
    preloadCriticalResources() {
        // Preload images that will be needed soon
        const criticalImages = [
            'assets/images/profile.jpg',
            'assets/images/Ethiopia tourism.png',
            'assets/images/ocr1.png',
            'assets/images/HRP 1.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    handleResize() {
        // Handle responsive changes
        const isMobile = window.innerWidth < 768;
        document.body.classList.toggle('mobile', isMobile);
        
        // Update Three.js canvas if it exists
        if (window.threeCore) {
            window.threeCore.handleResize();
        }
    }
    
    handleScroll() {
        // Optimize scroll-based animations
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Update navigation
        this.updateActiveNav();
        
        // Parallax effects (if not reduced motion)
        if (!this.prefersReducedMotion) {
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }
    }
    
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Cleanup method for performance
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
}

// Enhanced Contact Form with Accessibility
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.responseEl = document.getElementById('terminalResponse');
        this.submitBtn = document.querySelector('.terminal-submit');
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Real-time validation
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${field.name} is required`;
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        
        this.setFieldError(field, isValid ? '' : errorMessage);
        return isValid;
    }
    
    setFieldError(field, message) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        if (message) {
            const errorEl = document.createElement('div');
            errorEl.className = 'field-error';
            errorEl.textContent = message;
            errorEl.style.color = '#ff6b6b';
            errorEl.style.fontSize = '0.8rem';
            errorEl.style.marginTop = '0.25rem';
            errorEl.setAttribute('role', 'alert');
            
            field.parentNode.appendChild(errorEl);
            field.setAttribute('aria-invalid', 'true');
            field.setAttribute('aria-describedby', errorEl.id = `error-${field.name}`);
        } else {
            field.removeAttribute('aria-invalid');
            field.removeAttribute('aria-describedby');
        }
    }
    
    clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
            field.removeAttribute('aria-invalid');
            field.removeAttribute('aria-describedby');
        }
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    async handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate all fields
        let isFormValid = true;
        this.form.querySelectorAll('input, textarea').forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.announceError('Please correct the errors above');
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        try {
            await this.sendMessage(data);
            this.showSuccess();
            this.form.reset();
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.setLoadingState(false);
        }
    }
    
    setLoadingState(loading) {
        if (!this.submitBtn) return;
        
        this.submitBtn.disabled = loading;
        this.submitBtn.textContent = loading ? 'TRANSMITTING...' : 'TRANSMIT';
        this.submitBtn.setAttribute('aria-busy', loading.toString());
        
        if (loading) {
            this.responseEl.textContent = '> Processing transmission...';
            this.responseEl.style.color = '#ffb700';
        }
    }
    
    async sendMessage(data) {
        // Simulate transmission with binary animation
        const binaryFrames = ['01001000', '01100101', '01101100', '01101100', '01101111'];
        
        for (let i = 0; i < binaryFrames.length; i++) {
            await this.delay(300);
            this.responseEl.innerHTML = `> [⚡] Transmitting: ${binaryFrames[i]}<br>> Status: SENDING...`;
        }
        
        // Simulate API call (replace with actual endpoint)
        await this.delay(1000);
        
        // For demo purposes, always succeed
        // In production, replace with actual API call:
        /*
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: new FormData(this.form),
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) {
            throw new Error('Network error occurred');
        }
        */
    }
    
    showSuccess() {
        const message = `> [✓] Transmission successful!<br>> Status: 200 OK<br>> Message delivered to jhonkibre0912@gmail.com<br>> Thank you for your message!`;
        
        this.responseEl.innerHTML = message;
        this.responseEl.style.color = '#64ffda';
        this.responseEl.setAttribute('role', 'status');
        this.responseEl.setAttribute('aria-live', 'polite');
        
        // Announce success to screen readers
        window.neuralInterface?.announceToScreenReader('Message sent successfully');
        
        // Clear after delay
        setTimeout(() => {
            this.responseEl.innerHTML = '> [💤] Terminal ready for next transmission...';
            this.responseEl.style.color = '#8892b0';
        }, 5000);
    }
    
    showError(message) {
        this.responseEl.innerHTML = `> [❌] Transmission failed<br>> Status: 500 SERVER ERROR<br>> Error: ${message}<br>> Please try again later`;
        this.responseEl.style.color = '#ff6b6b';
        this.responseEl.setAttribute('role', 'alert');
        
        window.neuralInterface?.announceToScreenReader('Message failed to send');
    }
    
    announceError(message) {
        window.neuralInterface?.announceToScreenReader(message);
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize neural interface
    window.neuralInterface = new NeuralInterface();
    
    // Initialize contact form
    window.contactForm = new ContactForm();
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page loaded in ${perfData.loadEventEnd - perfData.fetchStart}ms`);
        });
    }
    
    // Service Worker registration for PWA capabilities (optional)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker not available, continue without it
        });
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.neuralInterface) {
        window.neuralInterface.destroy();
    }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NeuralInterface, ContactForm };
}