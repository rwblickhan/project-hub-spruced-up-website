import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Skybox } from './skybox'

const scene = new THREE.Scene();
console.log("Created scene");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = 5;
scene.add(camera);
console.log("Created camera");

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
console.log("Created renderer");

const controls = new OrbitControls(camera, domElement.camera);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
console.log("Created cube");

const skybox = new Skybox();
for (const wall of skybox.walls) {
    scene.add(wall);
}
console.log("Created skybox");

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
console.log("Began animating");