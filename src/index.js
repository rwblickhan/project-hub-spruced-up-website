import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import EarthModel from './models/earth.obj'
import EarthDiffuseTexture from './textures/earth/4096_earth.jpg'
import EarthBumpTexture from './textures/earth/4096_bump.jpg'
import EarthNormalTexture from './textures/earth/4096_normal.jpg'

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const scene = new THREE.Scene();
// TODO: Set the scene's background
// Hint: Use a CubeTextureLoader: https://threejs.org/docs/index.html#api/en/loaders/CubeTextureLoader.
//       We've provided textures/space/ and textures/vancouver_convention_centre/
//       but feel free to find your own as well; http://www.humus.name/index.php?page=Textures
//       is a convenient source.
console.log("Created scene");

// TODO: Create a camera and set its position and direction
// Hint: See PerspectiveCamera https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera
//       or OrthographicCamera https://threejs.org/docs/index.html#api/en/cameras/OrthographicCamera.
// After this TODO, you should be able to see the scene in your web browser!
console.log("Created camera");

const modelLoader = new OBJLoader();
const textureLoader = new THREE.TextureLoader();
const earthMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(EarthDiffuseTexture),
    bumpMap: textureLoader.load(EarthBumpTexture),
    normalMap: textureLoader.load(EarthNormalTexture),
    metalness: 0.0
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

// TODO: Generate a mesh from SphereGeometry to serve as the moon.
// See https://threejs.org/docs/index.html#api/en/geometries/SphereGeometry
// Make sure to create a material - we recommend using the textures in textures/moon/
// See https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial
const moon = null;
console.log("Added moon");

// TODO: Add some lights.
// Hint: You'll definitely want at least AmbientLight,
//       and probably a DirectionalLight or PointLight as well.
console.log("Added lights");

const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(windowWidth, windowHeight);
canvas.appendChild(renderer.domElement);
console.log("Created renderer");

const controls = new OrbitControls(camera, renderer.domElement);
console.log("Created controls");

// Three.js provides many useful Helpers to let you visualize where things are.
// AxesHelper puts coordinate axes at the scene origin point.
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
console.log("Added AxesHelper");

const raycaster = new THREE.Raycaster();
function onMouseDown(event) {
    const mouse = new THREE.Vector3();
    mouse.x = (event.clientX / windowWidth) * 2 - 1;
    mouse.y = - (event.clientY / windowHeight) * 2 + 1;
    // TODO: Use the raycaster to go to your Github when
    //       you click on one of the scene objects.
}
window.addEventListener('mousedown', onMouseDown, false);
console.log("Set up onMouseDown callback");

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
        // TODO: Animate the moon!
        // Hint: The `rotation` property of an Object3D controls orientation.
        // Hint: Consider using cylindrical or spherical coordinates for position;
        //       see https://threejs.org/docs/index.html#api/en/math/Spherical
        //       or https://threejs.org/docs/index.html#api/en/math/Cylindrical.
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
console.log("Began animating");
