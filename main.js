// Theme Toggle Functionality
const toggleBtn = document.getElementById('duality-toggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('digital');
    
    // Update toggle button text based on current theme
    const isDigital = body.classList.contains('digital');
    toggleBtn.setAttribute('aria-label', isDigital ? 'Switch to Analog Theme' : 'Switch to Digital Theme');
});

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Section Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe sections for animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Project Hover Effects
const projects = document.querySelectorAll('.project');

projects.forEach(project => {
    project.addEventListener('mouseenter', () => {
        project.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    project.addEventListener('mouseleave', () => {
        project.style.transform = 'translateY(0) scale(1)';
    });
});

// Timeline Event Animations
const timelineEvents = document.querySelectorAll('.event');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('slide-in');
            }, index * 200);
        }
    });
}, { threshold: 0.5 });

timelineEvents.forEach(event => {
    timelineObserver.observe(event);
});

// Neural Network Animation (Digital Theme)
function animateNeuralNetwork() {
    const neuralNetwork = document.querySelector('.neural-network svg');
    if (!neuralNetwork) return;
    
    const circles = neuralNetwork.querySelectorAll('circle');
    circles.forEach((circle, index) => {
        setTimeout(() => {
            circle.style.animation = 'pulse 2s infinite';
        }, index * 500);
    });
}

// Add CSS animations via JavaScript for dynamic themes
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 0.3; r: 2; }
        50% { opacity: 1; r: 4; }
    }
    
    .animate-in {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .slide-in {
        opacity: 0;
        transform: translateX(-50px);
        animation: slideIn 0.6s ease forwards;
    }
    
    .event:nth-child(even).slide-in {
        transform: translateX(50px);
        animation: slideInRight 0.6s ease forwards;
    }
    
    @keyframes slideIn {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .project {
        transition: transform 0.3s ease;
    }
`;

document.head.appendChild(styleSheet);

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    // Start neural network animation if in digital mode
    if (body.classList.contains('digital')) {
        animateNeuralNetwork();
    }
    
    // Observe theme changes to update animations
    const themeObserver = new MutationObserver(() => {
        if (body.classList.contains('digital')) {
            animateNeuralNetwork();
        }
    });
    
    themeObserver.observe(body, { attributes: true, attributeFilter: ['class'] });
});
