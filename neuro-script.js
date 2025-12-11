// Neural Interface Script
class NeuralInterface {
    constructor() {
        this.bootTime = Date.now();
        this.mode = 'digital';
        this.init();
    }
    
    init() {
        this.initStats();
        this.initModeToggle();
        this.initNavigation();
    }
    
    initStats() {
        const counters = document.querySelectorAll('[data-target]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (!isNaN(target)) this.animateCounter(counter, target, 2000);
        });
        
        const clockEl = document.getElementById('clockSpeed');
        if (clockEl) {
            setInterval(() => {
                const base = 3.2;
                const fluct = Math.sin(Date.now() * 0.001) * 0.1;
                clockEl.textContent = (base + fluct).toFixed(1);
            }, 100);
        }
    }
    
    animateCounter(el, target, duration) {
        let start = 0;
        const inc = target / (duration / 16);
        const timer = setInterval(() => {
            start += inc;
            if (start >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    initModeToggle() {
        const btn = document.getElementById('acdcSwitch');
        if (btn) {
            btn.addEventListener('click', () => {
                this.mode = this.mode === 'digital' ? 'analog' : 'digital';
                document.body.classList.toggle('analog-mode');
                const overlay = document.getElementById('crtOverlay');
                if (overlay) {
                    overlay.style.opacity = this.mode === 'analog' ? '1' : '0';
                }
            });
        }
    }
    
    initNavigation() {
        document.querySelectorAll('.nav-node').forEach(node => {
            node.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.nav-node').forEach(n => n.classList.remove('active'));
                node.classList.add('active');
                const target = node.getAttribute('href');
                if (target) {
                    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.neuralInterface = new NeuralInterface();
});


// Terminal Contact Form
function sendTerminalMessage() {
    const name = document.getElementById('senderName')?.value?.trim();
    const email = document.getElementById('senderEmail')?.value?.trim();
    const message = document.getElementById('senderMessage')?.value?.trim();
    const response = document.getElementById('terminalResponse');
    
    if (!response) {
        console.error('Terminal response element not found');
        return;
    }
    
    // Show transmission animation
    response.innerHTML = '> [⚡] Initializing transmission...<br>> Converting to binary...';
    response.style.color = '#ffb700';
    
    setTimeout(() => {
        if (name && email && message) {
            // Simulate binary transmission
            const binaryAnimation = ['01001000', '01100101', '01101100', '01101100', '01101111'];
            let binaryIndex = 0;
            
            const binaryInterval = setInterval(() => {
                if (binaryIndex < binaryAnimation.length) {
                    response.innerHTML = `> [⚡] Transmitting: ${binaryAnimation[binaryIndex]}<br>> Status: SENDING...`;
                    binaryIndex++;
                } else {
                    clearInterval(binaryInterval);
                    
                    // Success message
                    response.innerHTML = `> [✓] Transmission successful!<br>> Status: 200 OK<br>> Message from "${name}" queued for delivery<br>> Payload size: ${message.length} bytes`;
                    response.style.color = '#64ffda';
                    
                    // Clear form after success
                    setTimeout(() => {
                        document.getElementById('senderName').value = '';
                        document.getElementById('senderEmail').value = '';
                        document.getElementById('senderMessage').value = '';
                        response.innerHTML = '> [💤] Terminal ready for next transmission...';
                        response.style.color = '#8892b0';
                    }, 3000);
                }
            }, 300);
            
        } else {
            // Error message
            const missingFields = [];
            if (!name) missingFields.push('NAME');
            if (!email) missingFields.push('EMAIL');
            if (!message) missingFields.push('MESSAGE');
            
            response.innerHTML = `> [❌] Error: Missing required fields<br>> Status: 400 BAD REQUEST<br>> Missing: ${missingFields.join(', ')}<br>> Please complete all fields to transmit`;
            response.style.color = '#ff6b6b';
        }
    }, 1000);
}
