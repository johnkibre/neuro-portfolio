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
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const message = document.getElementById('senderMessage').value;
    const response = document.getElementById('terminalResponse');
    
    if (name && email && message) {
        response.innerHTML = '> [] Transmission successful!<br>> Status: 200 OK<br>> Message queued for delivery...';
        response.style.color = '#64ffda';
        
        setTimeout(() => {
            document.getElementById('senderName').value = '';
            document.getElementById('senderEmail').value = '';
            document.getElementById('senderMessage').value = '';
        }, 2000);
    } else {
        response.innerHTML = '> [] Error: Missing required fields<br>> Status: 400 BAD REQUEST';
        response.style.color = '#ff6b6b';
    }
}
