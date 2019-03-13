import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Skybox } from './skybox'
import NegXSkyboxTexture from './textures/vancouver_convention_centre/negx.jpg'
import NegYSkyboxTexture from './textures/vancouver_convention_centre/negy.jpg'
import NegZSkyboxTexture from './textures/vancouver_convention_centre/negz.jpg'
import PosXSkyboxTexture from './textures/vancouver_convention_centre/posx.jpg'
import PosYSkyboxTexture from './textures/vancouver_convention_centre/posy.jpg'
import PosZSkyboxTexture from './textures/vancouver_convention_centre/posz.jpg'

let windowWidth = window.innerWidth;
let windowHeight = window.innerWidth;

const scene = new THREE.Scene();
console.log("Created scene");

const camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 10000);
camera.position.z = 5;
scene.add(camera);
console.log("Created camera");

const canvas = document.getElementById('canvas');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(windowWidth, windowHeight);
canvas.appendChild(renderer.domElement);
console.log("Created renderer");

const controls = new OrbitControls(camera, renderer.domElement);
console.log("Created controls");

const geometry = new THREE.BoxGeometry(1, 1, 1);
const envmapLoader = new THREE.CubeTextureLoader();
const textureCube = envmapLoader.load([
    PosXSkyboxTexture, NegXSkyboxTexture,
    PosYSkyboxTexture, NegYSkyboxTexture,
    PosZSkyboxTexture, NegZSkyboxTexture
]);
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1.0,
    roughness: 0.0,
    envMap: textureCube
});
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
console.log("Created cube");

const skybox = new Skybox();
for (const wall of skybox.walls) {
    scene.add(wall);
}
console.log("Created skybox");

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function updateSize() {
    if (windowWidth !== window.innerWidth || windowHeight !== window.innerHeight) {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        renderer.setSize(windowWidth, windowHeight);
        console.log("Updated size");
    }
}

function animate() {
    updateSize();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
console.log("Began animating");