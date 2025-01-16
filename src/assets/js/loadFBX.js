// Import Three.js and required modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// DOM Elements
const canvas = document.querySelector('canvas.webgl');
const loadingScreen = document.getElementById('loading-screen');

if (!canvas || !loadingScreen) {
    throw new Error("Required DOM elements ('canvas.webgl' or '#loading-screen') not found.");
}

// Adjust loading screen position to the canvas container
loadingScreen.style.position = 'absolute';
loadingScreen.style.top = '50%';
loadingScreen.style.left = '50%';
loadingScreen.style.transform = 'translate(-50%, -50%)';
loadingScreen.style.zIndex = '1000';
loadingScreen.style.pointerEvents = 'none'; // Ensure it does not block interactions with the canvas
canvas.parentElement.style.position = 'relative';

// Initialize Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222830);

// Initialize Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Initialize Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);
scene.add(camera);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load 3D Model
const loader = new GLTFLoader();
loadingScreen.style.display = 'flex'; // Show the loading screen before loading starts

loader.load(
    '/pcd/character.glb', // Replace with the actual path to your 3D model
    (gltf) => {
        console.log('Model loaded successfully');
        // Add the loaded model to the scene
        const model = gltf.scene;
        model.position.set(0, -4, 0); // Set model position
        scene.add(model);

        // Hide the loading screen
        loadingScreen.style.display = 'none';
    },
    (xhr) => {
        // Update the loading screen with progress
        const progress = Math.round((xhr.loaded / xhr.total) * 100);
        console.log(`Loading: ${progress}%`);
        loadingScreen.textContent = `Loading: ${progress}%`;
    },
    (error) => {
        // Handle loading errors
        console.error('An error occurred while loading the model:', error);
        loadingScreen.textContent = 'Error loading the model!';
    }
);

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});

// Initial render
renderer.render(scene, camera);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
