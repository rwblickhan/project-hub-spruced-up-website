import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import NegXSkyboxTexture from './textures/space/space-negx.png'
import NegYSkyboxTexture from './textures/space/space-negy.png'
import NegZSkyboxTexture from './textures/space/space-negz.png'
import PosXSkyboxTexture from './textures/space/space-posx.png'
import PosYSkyboxTexture from './textures/space/space-posy.png'
import PosZSkyboxTexture from './textures/space/space-posz.png'

let windowWidth = window.innerWidth;
let windowHeight = window.innerWidth;

const scene = new THREE.Scene();
scene.background = new THREE.CubeTextureLoader()
    .load([
        PosXSkyboxTexture, NegXSkyboxTexture,
        PosYSkyboxTexture, NegYSkyboxTexture,
        PosZSkyboxTexture, NegZSkyboxTexture
    ])
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
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
console.log("Created cube");

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