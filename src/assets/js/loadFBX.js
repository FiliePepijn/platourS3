import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

const canvas = document.querySelector('canvas.webgl');
const loadingScreen = document.getElementById('loading-screen');
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
camera.position.set(0, 2, 4);
scene.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableRotate = false;
controls.enableZoom = false;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 20);
scene.add(directionalLight);

const loader = new GLTFLoader();
loadingScreen.style.display = 'block';
loader.load(
    '/path/to/your/model.glb',
    (gltf) => {
        scene.add(gltf.scene);
        loadingScreen.style.display = 'none';
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('An error happened', error);
        loadingScreen.style.display = 'none';
    }
);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();