import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'dat.gui';

const canvas = document.querySelector('canvas.webgl');
if (!canvas) {
    throw new Error("Canvas element with class 'webgl' not found");
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222830);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);
scene.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const loader = new GLTFLoader();
let model;
loader.load('/pcd/character.glb', (gltf) => { // Ensure the path is correct
    model = gltf.scene;
    model.scale.set(1, 1, 1); // Adjust the scale as needed
    model.position.set(0, 0, 0); // Adjust the position as needed
    scene.add(model);

    // Add object position to debugObject
    debugObject.objectX = model.position.x;
    debugObject.objectY = model.position.y;
    debugObject.objectZ = model.position.z;

    // Add object position controls to GUI
    gui.add(debugObject, 'objectX', -10, 10).onChange((value) => {
        model.position.x = value;
    });
    gui.add(debugObject, 'objectY', -10, 10).onChange((value) => {
        model.position.y = value;
    });
    gui.add(debugObject, 'objectZ', -10, 10).onChange((value) => {
        model.position.z = value;
    });
}, undefined, (error) => {
    console.error(error);
});

// Debug UI
const gui = new GUI();
const debugObject = {
    backgroundColor: 0x222830,
    ambientLightColor: 0xffffff,
    directionalLightColor: 0xffffff,
    rotationSpeed: 0.01,
    cameraX: camera.position.x,
    cameraY: camera.position.y,
    cameraZ: camera.position.z,
    rotationX: camera.rotation.x,
    rotationY: camera.rotation.y,
    rotationZ: camera.rotation.z,
};

gui.addColor(debugObject, 'backgroundColor').onChange((value) => {
    scene.background.set(value);
});
gui.addColor(debugObject, 'ambientLightColor').onChange((value) => {
    ambientLight.color.set(value);
});
gui.addColor(debugObject, 'directionalLightColor').onChange((value) => {
    directionalLight.color.set(value);
});
gui.add(debugObject, 'rotationSpeed', 0, 0.1, 0.01);
gui.add(debugObject, 'cameraX', -10, 10).onChange((value) => {
    camera.position.x = value;
});
gui.add(debugObject, 'cameraY', -10, 10).onChange((value) => {
    camera.position.y = value;
});
gui.add(debugObject, 'cameraZ', -10, 10).onChange((value) => {
    camera.position.z = value;
});
gui.add(debugObject, 'rotationX', -Math.PI, Math.PI).onChange((value) => {
    camera.rotation.x = value;
});
gui.add(debugObject, 'rotationY', -Math.PI, Math.PI).onChange((value) => {
    camera.rotation.y = value;
});
gui.add(debugObject, 'rotationZ', -Math.PI, Math.PI).onChange((value) => {
    camera.rotation.z = value;
});

const animate = () => {
    requestAnimationFrame(animate);

    // Rotate the model if it is loaded
    if (model) {
        model.rotation.y += debugObject.rotationSpeed; // Use the rotation speed from the debug UI
    }

    controls.update();
    renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});