import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import NegXSkyboxTexture from './textures/space/space-negx.png'
import NegYSkyboxTexture from './textures/space/space-negy.png'
import NegZSkyboxTexture from './textures/space/space-negz.png'
import PosXSkyboxTexture from './textures/space/space-posx.png'
import PosYSkyboxTexture from './textures/space/space-posy.png'
import PosZSkyboxTexture from './textures/space/space-posz.png'
import EarthModel from './models/earth.obj'
import EarthNightTexture from './textures/4096_night_lights.jpg'
import EarthBumpTexture from './textures/4096_bump.jpg'
import EarthNormalTexture from './textures/4096_normal.jpg'

let windowWidth = window.innerWidth;
let windowHeight = window.innerWidth;

const scene = new THREE.Scene();
// TODO: Set the scene's background
// Hint: Use a CubeTextureLoader: // https://threejs.org/docs/index.html#api/en/loaders/CubeTextureLoader
//       We've provided textures/space/ and textures/vancouver_convention_centre/
//       but feel free to find your own as well; http://www.humus.name/index.php?page=Textures
//       is a convenient source
scene.background = new THREE.CubeTextureLoader()
    .load([
        PosXSkyboxTexture, NegXSkyboxTexture,
        PosYSkyboxTexture, NegYSkyboxTexture,
        PosZSkyboxTexture, NegZSkyboxTexture
    ])
console.log("Created scene");

const modelLoader = new OBJLoader();
const textureLoader = new THREE.TextureLoader();
const earthMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(EarthNightTexture),
    bumpMap: textureLoader.load(EarthBumpTexture),
    normalMap: textureLoader.load(EarthNormalTexture)
});
console.log("Created earth material");

let earth = null;
modelLoader.load(
    EarthModel,
    function (object) {
        object.traverse(function (child) {
            if (child.isMesh) child.material = earthMaterial;
        });
        earth = object;
        scene.add(earth);
        console.log("Added earth model to scene");
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (err) {
        console.log("An error occurred: " + err);
    }
);
console.log("Began loading earth model");

const moonGeometry = new THREE.SphereGeometry(25, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 1.0
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(750, 0, 750);
scene.add(moon);
console.log("Added moon");

// TODO: create a camera and set its position and direction
// Hint: see PerspectiveCamera https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera
//       or OrthographicCamera https://threejs.org/docs/index.html#api/en/cameras/OrthographicCamera
const camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 10000);
camera.position.set(-100, 350, -750);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);
console.log("Created camera");

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// const sunlight = new THREE.DirectionalLight(0x404040);
// sunlight.position.set(-1000, 1000, 1000);
// scene.add(sunlight);

// const sunlightHelper = new THREE.DirectionalLightHelper(sunlight);
// scene.add(sunlightHelper);

const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(windowWidth, windowHeight);
canvas.appendChild(renderer.domElement);
console.log("Created renderer");

const controls = new OrbitControls(camera, renderer.domElement);
console.log("Created controls");

// Three.js provides many useful Helpers to let you visualize where things are
// AxesHelper puts coordinate axes at the scene origin point
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
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    if (earth !== null) {
        earth.rotation.y += 0.001;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
console.log("Began animating");