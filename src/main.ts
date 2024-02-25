import * as SPLAT from "gsplat";

const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const renderer = new SPLAT.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight * .9);
// renderer.canvas.

const controls = new SPLAT.OrbitControls(camera, renderer.canvas);

async function main() {
    if (window.matchMedia("(hover: none)").matches) {
        return;
    }

    // Changing the tabindex to try and fix keypress problem
    // let canvas = document.getElementsByTagName('canvas')[0];
    // canvas.tabIndex = 0;
    // canvas.focus();

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
    let animationFinished:boolean = false;

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
        // if (event.detail && event.syntheticEvent) {
        if (event.syntheticEvent) {
            // Handle synthetic event
            console.log("Handling synthetic event", event);
        } else {
            // Prevent default and stop propagation for non-synthetic events
            // event.preventDefault();
            event.stopPropagation();
            console.log("Blocked user interaction");
        }
    }
    
    function disableWholeInteraction(event: Event): void {
        event.stopPropagation();
    }

    appElement?.addEventListener('wheel', disableWholeInteraction, true);
    
    const userEvents = ['mousedown', 'mouseup', 'mousemove', 'click', 'keydown', 'keyup'];

    userEvents.forEach((event) => {
        document.addEventListener(event, disableUserInteraction, true);
    });

    let isSynthetic: boolean = true;

    function dispatchSyntheticEvent(type: string, x: number, y: number): Promise<void> {
        return new Promise((resolve) => {
            isSynthetic = true;
    
            const event = new MouseEvent(type, { clientX: x, clientY: y });
            appElement.dispatchEvent(event);
            // console.log(event);
    
            isSynthetic = false;
            resolve();
        });
    }
    
    function dispatchSyntheticKeypress(type: string, key: KeyboardEventInit) {
        isSynthetic = true;

        const event = new KeyboardEvent(type, key);
        document.dispatchEvent(event);

        // const eventEnd = new KeyboardEvent('keyup', {'key': 'w', 'code': 'KeyW', bubbles: true, cancelable: true, composed: true});

        // console.log(event);

        isSynthetic = false;
    }

    interface CustomKeyboardEventInit extends KeyboardEventInit {
        syntheticEvent?: boolean; // Define your custom property
    }
    
    class CustomKeyboardEvent extends KeyboardEvent {
        syntheticEvent: boolean;
        
        constructor(typeArg: string, eventInitDict?: CustomKeyboardEventInit) {
            super(typeArg, eventInitDict);
            this.syntheticEvent = eventInitDict?.syntheticEvent ?? false;
        }
    }
    
    function dispatchCustomEvent(eventName: string) {
        const myEvent = new CustomKeyboardEvent("keydown", { key: "w", 'code': 'KeyW', bubbles: true, cancelable: true, composed: true, syntheticEvent: true});
        appElement.dispatchEvent(myEvent);
    }

    interface CustomMouseEventInit extends MouseEventInit {
        syntheticEvent?: boolean; // Define your custom property
    }
    
    class CustomMouseEvent extends MouseEvent {
        syntheticEvent: boolean;
        
        constructor(typeArg: string, eventInitDict?: CustomKeyboardEventInit) {
            super(typeArg, eventInitDict);
            this.syntheticEvent = eventInitDict?.syntheticEvent ?? false;
        }
    }
    
    function dispatchCustomMouseEvent(eventName: string, eventDeatils: CustomMouseEventInit) {
        const myEvent = new CustomMouseEvent(eventName, eventDeatils);
        appElement.dispatchEvent(myEvent);
    }

    let animationFrameID: number;

    const frame = () => {
        console.log('isSynthetic', isSynthetic);

        if (t < animationDuration) {
            
            if (t < 3) {
                // async function handleSyntheticInput() {
                //     await dispatchSyntheticEvent('mousedown', currentX, currentY);
                //     await dispatchSyntheticEvent('mousemove', currentX + 10, currentY + 10);
                //     await dispatchSyntheticEvent('mouseup', currentX + 10, currentY + 10);
                // }
                
                // handleSyntheticInput()
                
                // dispatchSyntheticEventNonAsync('mousedown', currentX, currentY);
                // dispatchSyntheticEventNonAsync('mousemove', currentX + 10, currentY - 10);
                // dispatchSyntheticEventNonAsync('mouseup', currentX + 10, currentY - 10);

                // dispatchCustomEvent('keydown');
                dispatchCustomMouseEvent('mousedown', {clientX: currentX, clientY: currentY, syntheticEvent: true});
                dispatchCustomMouseEvent('mousemove', {clientX: currentX + 10, clientY: currentY + 10, syntheticEvent: true});
                dispatchCustomMouseEvent('mouseup', {clientX: currentX, clientY: currentY, syntheticEvent: true});
                
                currentX += 1;
                currentY += 1;
            }
            else {
                
                // const clickEvent = new MouseEvent('click', {button: 0, bubbles: true});
                // appElement.dispatchEvent(clickEvent);
                console.log('SECOND HALF OF ANIMATION');
                // const mouseUpEvent = new MouseEvent('mouseup', {button: 0, bubbles: true, cancelable: true, composed: true});
                // appElement.dispatchEvent(mouseUpEvent);
                
                // dispatchSyntheticKeypress('keydown', {'key': 'w', 'code': 'KeyW', bubbles: true, cancelable: true, composed: true});

                currentX += 1;
                currentY -= 1;
            }
            
            
            
            // handleSyntheticKeyPress();
            
            t += 0.01;
        }
        else if (animationFinished === false) {
            isSynthetic = true;
            // dispatchSyntheticKeypress('keyup', {'key': 'w', 'code': 'KeyW', bubbles: true, cancelable: true, composed: true});
            // console.log(clickEvent);
            // const clickEvent = new MouseEvent('click', {button: 0, bubbles: true});
            // appElement.dispatchEvent(clickEvent);
            
            // console.log('Synthetic input dispatched DONE WOOOO');

            dispatchCustomMouseEvent('mouseup', {button: 0, bubbles: true, cancelable: true, composed: true, syntheticEvent: true});
            
            const userEvents = ['mousedown', 'mouseup', 'mousemove', 'click', 'keydown', 'keyup'];

            userEvents.forEach((event) => {
                document.removeEventListener(event, disableUserInteraction, true);
            });

            t += 0.01;
            animationFinished = true;
        }
        
        // console.log(camera.position.x, camera.position.y, camera.position.z);
        // console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z, camera.rotation.w);
        // isSynthetic = true;

        controls.update();
        renderer.render(scene, camera);
        animationFrameID = requestAnimationFrame(frame);
    };

    // requestAnimationFrame(frame);

    const startAnimation = () => {
        if (!animationFrameID) { // Prevent multiple loops from starting
          frame();
        }
    };

    const stopAnimation = () => {
        if (animationFrameID) {
          cancelAnimationFrame(animationFrameID);
          animationFrameID = null;
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
    }, { threshold: 0.3 }); // Threshold defines how much of the item must be visible for the callback to execute      

    observer.observe(appElement);
};

// After initializing the renderer...
document.getElementById('container_canvas').prepend(renderer.canvas); // This places the canvas at the beginning of the #app div

main();