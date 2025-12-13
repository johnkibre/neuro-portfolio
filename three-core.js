// ===== THREE.JS NEURAL ARCHITECTURE CUBE IMPLEMENTATION =====
let scene, camera, renderer, cube, particleSystem;
let exploded = false;
let zoomedToHardware = false;
let isRotating = true;
let animationSpeed = 1;
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;

// Animation state
let animationState = {
    autoRotate: true,
    exploded: false,
    zoomedToHardware: false,
    rotationSpeed: { x: 0.003, y: 0.005 },
    floatAmplitude: 0.1,
    floatSpeed: 0.002
};

function initThreeJS() {
    console.log('🎯 Initializing Three.js Neural Architecture...');
    const container = document.getElementById('threeContainer');
    if (!container) {
        console.error('❌ Three.js container not found');
        return;
    }
    
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera with better positioning
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 6);
    
    // Enhanced renderer with better settings
    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a192f, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Create the neural architecture
    createNeuralArchitecture();
    
    // Enhanced lighting system
    setupLighting();
    
    // Add particle system for extra visual appeal
    createParticleSystem();
    
    // Mouse interaction
    setupMouseInteraction();
    
    // Start animation loop
    animate();
    
    // Setup event handlers
    window.addEventListener('resize', onWindowResize);
    setupControls();
    
    console.log('✅ Three.js Neural Architecture initialized successfully');
}

function createNeuralArchitecture() {
    cube = new THREE.Group();
    
    // Layer 1: Frontend (Outer Wireframe - Cyan)
    const outerGeo = new THREE.BoxGeometry(3, 3, 3);
    const outerMat = new THREE.MeshBasicMaterial({ 
        color: 0x64ffda, 
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const outerCube = new THREE.Mesh(outerGeo, outerMat);
    outerCube.userData = { layer: 'frontend', originalPosition: new THREE.Vector3(0, 0, 0) };
    cube.add(outerCube);
    
    // Layer 2: Backend (Middle - Purple)
    const middleGeo = new THREE.BoxGeometry(2, 2, 2);
    const middleMat = new THREE.MeshBasicMaterial({ 
        color: 0x8a2be2, 
        wireframe: true,
        transparent: true,
        opacity: 0.7
    });
    const middleCube = new THREE.Mesh(middleGeo, middleMat);
    middleCube.userData = { layer: 'backend', originalPosition: new THREE.Vector3(0, 0, 0) };
    cube.add(middleCube);
    
    // Layer 3: Hardware Core (Inner - Amber)
    const innerGeo = new THREE.BoxGeometry(1, 1, 1);
    const innerMat = new THREE.MeshStandardMaterial({ 
        color: 0xffb700,
        emissive: 0xffb700,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2
    });
    const innerCube = new THREE.Mesh(innerGeo, innerMat);
    innerCube.userData = { layer: 'hardware', originalPosition: new THREE.Vector3(0, 0, 0) };
    cube.add(innerCube);
    
    // Add some connecting lines for neural network effect
    createNeuralConnections();
    
    scene.add(cube);
}

function createNeuralConnections() {
    const connectionGroup = new THREE.Group();
    
    // Create glowing connection lines between layers
    const points = [
        new THREE.Vector3(-1.5, -1.5, -1.5),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1.5, 1.5, 1.5)
    ];
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ 
        color: 0x64ffda, 
        transparent: true, 
        opacity: 0.6 
    });
    
    for (let i = 0; i < 8; i++) {
        const line = new THREE.Line(geometry, material);
        line.rotation.x = (Math.PI / 4) * i;
        line.rotation.y = (Math.PI / 4) * i;
        connectionGroup.add(line);
    }
    
    cube.add(connectionGroup);
}

function setupLighting() {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    // Main point light (Cyan)
    const pointLight1 = new THREE.PointLight(0x64ffda, 1.2, 100);
    pointLight1.position.set(5, 5, 5);
    pointLight1.castShadow = true;
    scene.add(pointLight1);
    
    // Secondary point light (Amber)
    const pointLight2 = new THREE.PointLight(0xffb700, 0.8, 100);
    pointLight2.position.set(-5, -5, 5);
    pointLight2.castShadow = true;
    scene.add(pointLight2);
    
    // Accent light (Purple)
    const pointLight3 = new THREE.PointLight(0x8a2be2, 0.6, 100);
    pointLight3.position.set(0, 5, -5);
    scene.add(pointLight3);
}

function createParticleSystem() {
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const colorPalette = [
        new THREE.Color(0x64ffda), // Cyan
        new THREE.Color(0xffb700), // Amber
        new THREE.Color(0x8a2be2)  // Purple
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Random positions around the cube
        positions[i3] = (Math.random() - 0.5) * 20;
        positions[i3 + 1] = (Math.random() - 0.5) * 20;
        positions[i3 + 2] = (Math.random() - 0.5) * 20;
        
        // Random colors from palette
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
}

function setupMouseInteraction() {
    const container = document.getElementById('threeContainer');
    if (!container) return;
    
    // Mouse move for subtle interaction
    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Update target rotation based on mouse position
        targetRotationX = mouseY * 0.2;
        targetRotationY = mouseX * 0.2;
    });
    
    // Touch support for mobile
    container.addEventListener('touchmove', (event) => {
        event.preventDefault();
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        mouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        
        targetRotationX = mouseY * 0.2;
        targetRotationY = mouseX * 0.2;
    }, { passive: false });
}

function setupControls() {
    console.log('🎮 Setting up 3D controls...');
    
    const zoomBtn = document.getElementById('zoomToHardware');
    const rotateBtn = document.getElementById('rotateCube');
    const explodeBtn = document.getElementById('explodeCube');
    
    // Enhanced button setup with mobile support
    if (zoomBtn) {
        console.log('⚡ Zoom button found');
        setupButton(zoomBtn, () => {
            animationState.zoomedToHardware = !animationState.zoomedToHardware;
            zoomedToHardware = animationState.zoomedToHardware;
            
            const targetZ = animationState.zoomedToHardware ? 3 : 6;
            animateCamera(targetZ);
            
            // Update button text
            const label = zoomBtn.querySelector('.control-label');
            if (label) {
                label.textContent = animationState.zoomedToHardware ? 'ZOOM OUT' : 'ZOOM TO HARDWARE';
            }
            
            console.log(`⚡ Zoom ${animationState.zoomedToHardware ? 'IN' : 'OUT'}`);
        });
    }
    
    if (rotateBtn) {
        console.log('🔄 Rotate button found');
        setupButton(rotateBtn, () => {
            animationState.autoRotate = !animationState.autoRotate;
            
            if (!animationState.autoRotate) {
                // Manual rotation
                cube.rotation.x += Math.PI / 3;
                cube.rotation.y += Math.PI / 3;
                cube.rotation.z += Math.PI / 6;
            }
            
            // Update button text
            const label = rotateBtn.querySelector('.control-label');
            if (label) {
                label.textContent = animationState.autoRotate ? 'STOP ROTATION' : 'AUTO ROTATE';
            }
            
            console.log(`🔄 Auto-rotate ${animationState.autoRotate ? 'ON' : 'OFF'}`);
        });
    }
    
    if (explodeBtn) {
        console.log('💥 Explode button found');
        setupButton(explodeBtn, () => {
            animationState.exploded = !animationState.exploded;
            exploded = animationState.exploded;
            explodeCube(animationState.exploded);
            
            // Update button text
            const label = explodeBtn.querySelector('.control-label');
            if (label) {
                label.textContent = animationState.exploded ? 'REASSEMBLE' : 'EXPLODE';
            }
            
            console.log(`💥 Architecture ${animationState.exploded ? 'EXPLODED' : 'ASSEMBLED'}`);
        });
    }
    
    console.log('✅ 3D controls setup complete');
}

function setupButton(button, callback) {
    // Remove any existing listeners
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    
    // Add enhanced event listeners for both desktop and mobile
    ['click', 'touchend'].forEach(eventType => {
        newButton.addEventListener(eventType, (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Visual feedback
            newButton.style.transform = 'scale(0.95)';
            newButton.style.background = 'rgba(100, 255, 218, 0.3)';
            
            setTimeout(() => {
                newButton.style.transform = '';
                newButton.style.background = '';
                callback();
            }, 150);
        }, { passive: false });
    });
    
    // Touch feedback
    newButton.addEventListener('touchstart', (e) => {
        newButton.style.background = 'rgba(100, 255, 218, 0.2)';
    }, { passive: true });
}

function animateCamera(targetZ) {
    const startZ = camera.position.z;
    const duration = 1000;
    const startTime = Date.now();
    
    function updateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        camera.position.z = startZ + (targetZ - startZ) * eased;
        
        if (progress < 1) {
            requestAnimationFrame(updateCamera);
        }
    }
    updateCamera();
}

function explodeCube(explode) {
    const layers = cube.children;
    const duration = 1000;
    const startTime = Date.now();
    const startPositions = layers.map(l => l.position.clone());
    
    function updateExplosion() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        layers.forEach((layer, i) => {
            const distance = explode ? (i + 1) * 0.8 : 0;
            layer.position.x = startPositions[i].x + (distance - startPositions[i].x) * eased;
        });
        
        if (progress < 1) {
            requestAnimationFrame(updateExplosion);
        }
    }
    updateExplosion();
}

function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    if (cube) {
        // Continuous auto-rotation when enabled
        if (animationState.autoRotate && !animationState.exploded) {
            cube.rotation.x += animationState.rotationSpeed.x;
            cube.rotation.y += animationState.rotationSpeed.y;
            cube.rotation.z += animationState.rotationSpeed.x * 0.5;
        }
        
        // Floating motion
        cube.position.y = Math.sin(time * animationState.floatSpeed) * animationState.floatAmplitude;
        
        // Subtle mouse interaction
        if (!animationState.exploded) {
            cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.05;
            cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.05;
        }
        
        // Pulsing effect for hardware core
        const hardwareCore = cube.children.find(child => child.userData.layer === 'hardware');
        if (hardwareCore) {
            const pulse = Math.sin(time * 2) * 0.1 + 1;
            hardwareCore.material.emissiveIntensity = 0.3 + pulse * 0.2;
        }
    }
    
    // Animate particle system
    if (particleSystem) {
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.002;
        
        // Make particles orbit around the cube
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const angle = time * 0.5 + i * 0.01;
            const radius = 8 + Math.sin(time + i * 0.1) * 2;
            positions[i] = Math.cos(angle) * radius;
            positions[i + 2] = Math.sin(angle) * radius;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
    }
    
    // Animate lights for dynamic lighting
    const lights = scene.children.filter(child => child.type === 'PointLight');
    lights.forEach((light, index) => {
        const offset = index * Math.PI * 0.67;
        light.position.x = Math.cos(time * 0.5 + offset) * 6;
        light.position.z = Math.sin(time * 0.5 + offset) * 6;
        light.intensity = 0.8 + Math.sin(time * 2 + offset) * 0.3;
    });
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.getElementById('threeContainer');
    if (!container) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeJS);
} else {
    initThreeJS();
}
