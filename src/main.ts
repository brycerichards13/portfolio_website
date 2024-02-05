import * as SPLAT from "gsplat";

const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const renderer = new SPLAT.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight * .9);
// renderer.canvas.

const controls = new SPLAT.OrbitControls(camera, renderer.canvas);

async function main() {
    // await SPLAT.Loader.LoadFromFileAsync("/src/point_cloud.splat", scene, () => {});

    let startPos = new SPLAT.Vector3(4.2388241150117505, -2.4439043478085245, -1.190063843666451);
    let startRot = new SPLAT.Quaternion(-0.19189211657561078, -0.43105148200373744, -0.09435678760078532, 0.8766235406901722);
    
    camera.position = startPos;
    camera.rotation = startRot;

    // const url = "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat";
    const url = "https://huggingface.co/brycerichards13/brycerichards/resolve/main/hfbrycetext/point_cloud/iteration_7000/badtest.splat";

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

    function disableUserInteraction(event: Event): void {
        // Check if the event is a synthetic event
        if (!isSynthetic) {
            console.log('User interaction detected');
            event.preventDefault();
            event.stopPropagation();
        }
    }
    
    const userEvents = ['mousedown', 'mouseup', 'mousemove', 'click', 'wheel', 'keydown', 'keyup'];

    userEvents.forEach((event) => {
        document.addEventListener(event, disableUserInteraction, true);
    });

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

    function dispatchSyntheticKeypress(type: string, key: KeyboardEventInit): Promise<void> {
        return new Promise((resolve) => {
            isSynthetic = true; // Lock user input
    
            const event = new KeyboardEvent(type, key);
            appElement.dispatchEvent(event);
            console.log(event);
    
            isSynthetic = false; // Unlock user input immediately after dispatch
            resolve();
        });
    }
    
    
    const frame = () => {
        // dispatchSyntheticKeypress('keydown', { key: 'w' });

        // if (t < animationDuration) {
        //     if (t < 3) {
        //         async function handleSyntheticInput() {
        //             await dispatchSyntheticEvent('mousedown', currentX, currentY);
        //             await dispatchSyntheticEvent('mousemove', currentX + 1, currentY + 1);
        //             await dispatchSyntheticEvent('mouseup', currentX + 1, currentY + 1);
                    
        //         }

        //         handleSyntheticInput().then(() => {
        //             // camera.position = new SPLAT.Vector3(camera.position.x + .01, camera.position.y - .01, camera.position.z);
        //         });

        //         currentX += 1;
        //         currentY += 1;
        //     }
        //     else {
        //         async function handleSyntheticInput() {
        //             await dispatchSyntheticEvent('mousedown', currentX, currentY);
        //             await dispatchSyntheticEvent('mousemove', currentX + 1, currentY - 1);
        //             await dispatchSyntheticEvent('mouseup', currentX + 1, currentY - 1);
        //             camera.position = new SPLAT.Vector3(camera.position.x + .01, camera.position.y - .01, camera.position.z);
        //         }

        //         handleSyntheticInput().then(() => {
        //             camera.position = new SPLAT.Vector3(camera.position.x + .01, camera.position.y - .01, camera.position.z);
        //         });

        //         currentX += 1;
        //         currentY -= 1;
        //     }



        //     // handleSyntheticKeyPress();
            
        //     t += 0.01;
        // }
        // else {
        //     // dispatchSyntheticEvent('mouseup', currentX + 10, currentY + 10);
        //     isSynthetic = true
        // }
        
        // console.log(camera.position.x, camera.position.y, camera.position.z);
        // console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z, camera.rotation.w);
        isSynthetic = true;

        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(frame);

    };

    requestAnimationFrame(frame);
};

// After initializing the renderer...
document.getElementById('container_canvas').prepend(renderer.canvas); // This places the canvas at the beginning of the #app div

main();