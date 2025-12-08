// ===== THREE.JS EXPLODED CUBE IMPLEMENTATION =====
let scene, camera, renderer, cube;
let exploded = false;
let zoomedToHardware = false;

function initThreeJS() {
    const container = document.getElementById('threeContainer');
    if (!container) return;
    
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x0a192f, 0);
    container.appendChild(renderer.domElement);
    
    // Create exploded cube
    createExplodedCube();
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x64ffda, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xffb700, 0.8);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    
    // Animation
    animate();
    
    // Resize handler
    window.addEventListener('resize', onWindowResize);
    
    // Setup controls
    setupControls();
}

function createExplodedCube() {
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
    cube.add(innerCube);
    
    scene.add(cube);
}

function setupControls() {
    const zoomBtn = document.getElementById('zoomToHardware');
    const rotateBtn = document.getElementById('rotateCube');
    const explodeBtn = document.getElementById('explodeCube');
    
    if (zoomBtn) {
        zoomBtn.addEventListener('click', () => {
            zoomedToHardware = !zoomedToHardware;
            animateCamera(zoomedToHardware ? 2 : 5);
        });
    }
    
    if (rotateBtn) {
        rotateBtn.addEventListener('click', () => {
            cube.rotation.x += Math.PI / 4;
            cube.rotation.y += Math.PI / 4;
        });
    }
    
    if (explodeBtn) {
        explodeBtn.addEventListener('click', () => {
            exploded = !exploded;
            explodeCube(exploded);
        });
    }
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
    
    if (cube && !exploded) {
        cube.rotation.x += 0.003;
        cube.rotation.y += 0.005;
    }
    
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
