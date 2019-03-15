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
import EarthDiffuseTexture from './textures/earth/4096_earth.jpg'
import EarthCloudsTexture from './textures/earth/4096_clouds.jpg'
import EarthNightTexture from './textures/earth/4096_night_lights.jpg'
import EarthBumpTexture from './textures/earth/4096_bump.jpg'
import EarthNormalTexture from './textures/earth/4096_normal.jpg'
import MoonDiffuseTexture from './textures/moon/moonmap2k.jpg'
import MoonBumpTexture from './textures/moon/moon-normal.jpg'

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
const earthMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(EarthDiffuseTexture),
    bumpMap: textureLoader.load(EarthBumpTexture),
    normalMap: textureLoader.load(EarthNormalTexture),
    metalness: 0.5
});
console.log("Created earth material");

let earth = null;
modelLoader.load(
    EarthModel,
    function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = earthMaterial;
                child.castShadow = true;
                child.receiveShadow = true;
            }
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
    map: textureLoader.load(MoonDiffuseTexture),
    bumpMap: textureLoader.load(MoonBumpTexture),
    metalness: 0.5
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(750, 0, 750);
moon.castShadow = true;
moon.receiveShadow = true;
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

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

const sunlight = new THREE.DirectionalLight(0xFFFFFF);
sunlight.position.set(-1000, 0, 1000);
sunlight.castShadow = true;
scene.add(sunlight);

const sunlightHelper = new THREE.DirectionalLightHelper(sunlight);
scene.add(sunlightHelper);

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
    if (earth !== null) {
        earth.rotation.y += 0.001;
    }
    if (moon !== null) {
        moon.rotation.y += 0.0022;
        let cylindricalCoordinates = new THREE.Cylindrical();
        cylindricalCoordinates.setFromVector3(moon.position);
        cylindricalCoordinates.theta += 0.002;
        moon.position.setFromCylindrical(cylindricalCoordinates);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
console.log("Began animating");