import * as SPLAT from "gsplat";

const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const renderer = new SPLAT.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight * .9);
// renderer.canvas.

const controls = new SPLAT.OrbitControls(camera, renderer.canvas);

async function main() {
    // await SPLAT.Loader.LoadFromFileAsync("/src/point_cloud.splat", scene, () => {});
    
    // const url = "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat";
    const url = "https://huggingface.co/brycerichards13/brycerichards/resolve/main/hfbrycetext/point_cloud/iteration_7000/fullscenenotcleaned.splat";

    await SPLAT.Loader.LoadAsync(url, scene, () => {});
    
    let t:number = 1;
    const animationDuration:number = 5;

    let currentX = 0;
    let currentY = 0;
    
    // Select the canvas element
    const appElement = document.querySelector('canvas');
    
    // Event listener to update mouse position
    appElement.addEventListener('mousemove', (e) => {
        currentX = e.clientX;
        currentY = e.clientY;
    });

    function disableUserInteraction(event: MouseEvent): void {
        // Check if the event is a synthetic event
        if (!isSynthetic) {
            console.log('User interaction detected');
            event.preventDefault();
            event.stopPropagation();
        }
    }
    
    // document.addEventListener('mousedown', disableUserInteraction, true);
    // document.addEventListener('mouseup', disableUserInteraction, true);
    // document.addEventListener('mousemove', disableUserInteraction, true);
    // document.addEventListener('click', disableUserInteraction, true);
    document.addEventListener('wheel', disableUserInteraction, true);

    let isSynthetic: boolean = false;

    function dispatchSyntheticEvent(type: string, x: number, y: number): Promise<void> {
        return new Promise((resolve) => {
            isSynthetic = true; // Lock user input
    
            const event = new MouseEvent(type, { clientX: x, clientY: y });
            appElement.dispatchEvent(event);
            console.log(event);
    
            isSynthetic = false; // Unlock user input immediately after dispatch
            resolve();
        });
    }


    const frame = () => {
        // if (t < animationDuration) {
        //     async function handleSyntheticInput() {
        //         await dispatchSyntheticEvent('mousedown', currentX, currentY);
        //         await dispatchSyntheticEvent('mousemove', currentX + 10, currentY + 10);
        //     }
            
        //     handleSyntheticInput();
            
        //     currentX += 10;
        //     currentY += 10;
            
        //     t += 0.01;
        // }
        // else {
        //     dispatchSyntheticEvent('mouseup', currentX + 10, currentY + 10);
        //     isSynthetic = true
        // }
        
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(frame);

    };

    requestAnimationFrame(frame);
};

// After initializing the renderer...
document.getElementById('container_canvas').prepend(renderer.canvas); // This places the canvas at the beginning of the #app div

main();