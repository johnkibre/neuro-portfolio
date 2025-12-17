// Main JavaScript - Non-critical functionality
class ModernPortfolio {
    constructor() {
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }
    
    init() {
        this.initIntersectionObserver();
        this.initAccessibilityFeatures();
        this.initPerformanceOptimizations();
        console.log('🚀 Modern Portfolio initialized');
    }
    
    initIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe sections for scroll animations
        document.querySelectorAll('section:not(#hero)').forEach(section => {
            observer.observe(section);
        });
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
        
        // Initialize based on current preferences
        document.body.classList.toggle('reduced-motion', this.prefersReducedMotion);
        document.body.classList.toggle('high-contrast', contrastQuery.matches);
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
    }
    
    handleResize() {
        // Handle responsive changes
        const isMobile = window.innerWidth < 768;
        document.body.classList.toggle('mobile', isMobile);
    }
    
    announceToScreenReader(message) {
        const announcement = document.getElementById('announcements');
        if (announcement) {
            announcement.textContent = message;
            setTimeout(() => {
                announcement.textContent = '';
            }, 1000);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ModernPortfolio();
});