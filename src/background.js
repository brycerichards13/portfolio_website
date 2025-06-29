const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
const container = document.getElementById('container_aboutskills_block');
console.log('Container:', container);

let stars = [];
const gridSpacing = 15;
const twinkleSpeed = 0.012;

/**
 * Sets the canvas dimensions to fill its container and resets star positions.
 */
function setCanvasSize() {
    // Use the container's dimensions, not the window's
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    stars = []; 
    initStars(); 
}

function Star(x, y, radius, alpha) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.alpha = alpha;
    this.initialAlpha = alpha; 
    this.alphaChange = (Math.random() > 0.5 ? twinkleSpeed : -twinkleSpeed) * Math.random();
}

function initStars() {
    for (let x = gridSpacing / 2; x < canvas.width; x += gridSpacing) {
        for (let y = gridSpacing / 2; y < canvas.height; y += gridSpacing) {
            const radius = 1.5; 
            const alpha = Math.random() * 0.7; 
            stars.push(new Star(x, y, radius, alpha));
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const star of stars) {
        star.alpha += star.alphaChange;
        if (star.alpha > star.initialAlpha + 0.3 || star.alpha < star.initialAlpha - 0.3) {
            star.alphaChange *= -1;
        }
        if (star.alpha < 0) star.alpha = 0;
        if (star.alpha > 1) star.alpha = 1;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    }
    requestAnimationFrame(animate);
}

// --- Event Listeners and Initialization ---

setCanvasSize();
animate();

// Use a ResizeObserver to be more efficient than a window resize event,
// but fall back to window resize for broader compatibility.
if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(setCanvasSize);
    observer.observe(container);
} else {
    window.addEventListener('resize', setCanvasSize);
}