export { Skybox }

import * as THREE from 'three';

import NegXSkyboxTexture from './textures/vancouver_convention_centre/negx.jpg'
import NegYSkyboxTexture from './textures/vancouver_convention_centre/negy.jpg'
import NegZSkyboxTexture from './textures/vancouver_convention_centre/negz.jpg'
import PosXSkyboxTexture from './textures/vancouver_convention_centre/posx.jpg'
import PosYSkyboxTexture from './textures/vancouver_convention_centre/posy.jpg'
import PosZSkyboxTexture from './textures/vancouver_convention_centre/posz.jpg'

const size = 1000;

class Skybox {

    constructor() {
        this.textureLoader = new THREE.TextureLoader();
        this.skyboxGeometry = new THREE.PlaneGeometry(2 * size, 2 * size);
        const negX = this.generateNegX();
        const posX = this.generatePosX();
        const negY = this.generateNegY();
        const posY = this.generatePosY();
        const negZ = this.generateNegZ();
        const posZ = this.generatePosZ();
        this.walls = [negX, posX, negY, posY, negZ, posZ]
    }

    generateNegX() {
        const skyboxWall = this.generateSkyboxWall(NegXSkyboxTexture);
        skyboxWall.position.x = size;
        skyboxWall.rotation.y = -Math.PI / 2;
        return skyboxWall;
    }

    generatePosX() {
        const skyboxWall = this.generateSkyboxWall(PosXSkyboxTexture);
        skyboxWall.position.x = -size;
        skyboxWall.rotation.y = Math.PI / 2;
        return skyboxWall;
    }

    generateNegY() {
        const skyboxWall = this.generateSkyboxWall(NegYSkyboxTexture);
        skyboxWall.position.y = -size;
        skyboxWall.rotation.y = -Math.PI;
        skyboxWall.rotation.x = Math.PI / 2;
        return skyboxWall;
    }

    generatePosY() {
        const skyboxWall = this.generateSkyboxWall(PosYSkyboxTexture);
        skyboxWall.position.y = size;
        skyboxWall.rotation.y = Math.PI;
        skyboxWall.rotation.x = -Math.PI / 2;
        return skyboxWall;
    }

    generateNegZ() {
        const skyboxWall = this.generateSkyboxWall(NegZSkyboxTexture);
        skyboxWall.position.z = -size;
        return skyboxWall;
    }

    generatePosZ() {
        const skyboxWall = this.generateSkyboxWall(PosZSkyboxTexture);
        skyboxWall.position.z = size;
        return skyboxWall;
    }

    generateSkyboxWall(textureImage) {
        const texture = this.textureLoader.load(textureImage);
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.magFilter = THREE.LinearMipMapLinearFilter;

        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        return new THREE.Mesh(this.skyboxGeometry, material);
    }
}