// Basic Setup
let scene, camera, renderer;
let planePoints;
let clock;

// Mouse Interaction Variables
const mouse = new THREE.Vector2(-10, -10); // Initialize mouse off-screen
const raycaster = new THREE.Raycaster();
const intersectionPoint = new THREE.Vector3();
let isIntersecting = false;

function init() {
    // Create a new scene
    scene = new THREE.Scene();

    // Create a clock to track elapsed time for animations
    clock = new THREE.Clock();

    // Create a perspective camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 26; // Move camera back to view the plane

    // Create the WebGL renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.insertBefore(renderer.domElement, document.body.firstChild);

    // Create the Point Plane
    // Parameters: width, height, widthSegments, heightSegments
    const geometry = new THREE.PlaneGeometry(100, 100, 128, 128);
    geometry.setAttribute('originalPosition', geometry.attributes.position.clone());

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.075,
        sizeAttenuation: true
    });

    planePoints = new THREE.Points(geometry, material);
    scene.add(planePoints);

    // Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onMouseMove, false);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Raycasting for Mouse Interaction
    // We need a temporary mesh to raycast against the plane
    const tempPlane = new THREE.Mesh(planePoints.geometry);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(tempPlane);
    tempPlane.visible = false; // Don't actually render it

    if (intersects.length > 0) {
        intersectionPoint.copy(intersects[0].point);
        isIntersecting = true;
    } else {
        isIntersecting = false;
    }

    // Animate Vertices
    const positions = planePoints.geometry.attributes.position;
    const originalPositions = planePoints.geometry.attributes.originalPosition;

    for (let i = 0; i < positions.count; i++) {
        const ox = originalPositions.getX(i);
        const oy = originalPositions.getY(i);
        const oz = originalPositions.getZ(i);

        // 1. Calculate base noise displacement (the original warping effect)
        const noiseDisplacement = 
            (Math.sin(elapsedTime * 0.5 + ox * 0.1) +
                Math.cos(elapsedTime * 0.4 + oy * 0.1) +
                Math.sin(elapsedTime * 0.3 + (ox + oy) * 0.05)) * 2.5;

        // 2. Calculate mouse-based warp displacement
        let warpDisplacement = 0;
        if (isIntersecting) {
            const currentVertex = new THREE.Vector3(ox, oy, oz);
            const dist = currentVertex.distanceTo(intersectionPoint);
            const warpRadius = 10; 

            if (dist < warpRadius) {
                const falloff = (1 - (dist / warpRadius));
                warpDisplacement = Math.pow(falloff, 2) * 5;
            }
        }
        
        // 3. Combine displacements and apply to the vertex
        // For a plane, we apply the displacement only on the Z axis.
        const totalDisplacement = noiseDisplacement + warpDisplacement;
        positions.setZ(i, oz + totalDisplacement);
    }

    // Tell three.js to update the geometry
    positions.needsUpdate = true;

    renderer.render(scene, camera);
}

// Event Handlers
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

// Start the application
init();
animate();