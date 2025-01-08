import * as THREE from 'three';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import pcd from '/pcd/PepijnPCD.pcd?url';


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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0.5, 0, 2.5);
scene.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.enableRotate = false;

const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
};

window.addEventListener('resize', handleResize);

const loader = new PCDLoader();
let exploded = false;
let originalPositions = [];
let targetPositions = [];

loader.load(
    pcd,
    (points) => {
        points.position.set(0.9, 0, 0); // Shift the model to the right

        const red = new THREE.Color(0xf05454);
        points.material = new THREE.PointsMaterial({ size: 0.01, color: red });

        const positions = points.geometry.attributes.position.array;
        const scaleFactor = 2; // Adjust this factor to control spacing

        for (let i = 0; i < positions.length; i += 3) {
            // Scale the original positions
            originalPositions.push({
                x: positions[i] * scaleFactor,
                y: positions[i + 1] * scaleFactor,
                z: positions[i + 2] * scaleFactor,
            });

            // Target positions for explosion effect
            targetPositions.push({
                x: positions[i] * scaleFactor + (Math.random() - 0.5) * 5,
                y: positions[i + 1] * scaleFactor + (Math.random() - 0.5) * 5,
                z: positions[i + 2] * scaleFactor + (Math.random() - 0.5) * 5,
            });

            // Apply the scaled positions directly to the geometry
            positions[i] *= scaleFactor;
            positions[i + 1] *= scaleFactor;
            positions[i + 2] *= scaleFactor;
        }

        scene.add(points);

        function animateExplosion() {
            if (!exploded) {
                gsap.to(points.geometry.attributes.position.array, {
                    duration: 1,
                    onUpdate: function () {
                        for (let i = 0; i < positions.length; i += 3) {
                            positions[i] = THREE.MathUtils.lerp(
                                originalPositions[i / 3].x,
                                targetPositions[i / 3].x,
                                this.progress()
                            );
                            positions[i + 1] = THREE.MathUtils.lerp(
                                originalPositions[i / 3].y,
                                targetPositions[i / 3].y,
                                this.progress()
                            );
                            positions[i + 2] = THREE.MathUtils.lerp(
                                originalPositions[i / 3].z,
                                targetPositions[i / 3].z,
                                this.progress()
                            );
                        }
                        points.geometry.attributes.position.needsUpdate = true;
                    },
                    onComplete: () => {
                        exploded = true;
                    },
                });
            } else {
                gsap.to(points.geometry.attributes.position.array, {
                    duration: 2,
                    onUpdate: function () {
                        for (let i = 0; i < positions.length; i += 3) {
                            positions[i] = THREE.MathUtils.lerp(
                                targetPositions[i / 3].x,
                                originalPositions[i / 3].x,
                                this.progress()
                            );
                            positions[i + 1] = THREE.MathUtils.lerp(
                                targetPositions[i / 3].y,
                                originalPositions[i / 3].y,
                                this.progress()
                            );
                            positions[i + 2] = THREE.MathUtils.lerp(
                                targetPositions[i / 3].z,
                                originalPositions[i / 3].z,
                                this.progress()
                            );
                        }
                        points.geometry.attributes.position.needsUpdate = true;
                    },
                    onComplete: () => {
                        exploded = false;
                    },
                });
            }
        }

        canvas.addEventListener('click', animateExplosion);

        const tick = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        };

        tick();
    },
    undefined,
    (error) => {
        console.error('An error occurred while loading the PCD file:', error);
    }
);