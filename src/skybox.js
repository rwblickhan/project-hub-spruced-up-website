export { Skybox }

import * as THREE from 'three';

const size = 1000;

class Skybox {

    constructor(posXImage, negXImage,
        posYImage, negYImage,
        posZImage, negZImage) {
        this.textureLoader = new THREE.TextureLoader();
        this.skyboxGeometry = new THREE.PlaneGeometry(2 * size, 2 * size);
        const negX = this.generateNegX(negXImage);
        const posX = this.generatePosX(posXImage);
        const negY = this.generateNegY(negYImage);
        const posY = this.generatePosY(posYImage);
        const negZ = this.generateNegZ(negZImage);
        const posZ = this.generatePosZ(posZImage);
        this.walls = [negX, posX, negY, posY, negZ, posZ]
    }

    generateNegX(negXImage) {
        const skyboxWall = this.generateSkyboxWall(negXImage);
        skyboxWall.position.x = size;
        skyboxWall.rotation.y = -Math.PI / 2;
        return skyboxWall;
    }

    generatePosX(posXImage) {
        const skyboxWall = this.generateSkyboxWall(posXImage);
        skyboxWall.position.x = -size;
        skyboxWall.rotation.y = Math.PI / 2;
        return skyboxWall;
    }

    generateNegY(negYImage) {
        const skyboxWall = this.generateSkyboxWall(negYImage);
        skyboxWall.position.y = -size;
        skyboxWall.rotation.y = -Math.PI;
        skyboxWall.rotation.x = Math.PI / 2;
        return skyboxWall;
    }

    generatePosY(posYImage) {
        const skyboxWall = this.generateSkyboxWall(posYImage);
        skyboxWall.position.y = size;
        skyboxWall.rotation.y = Math.PI;
        skyboxWall.rotation.x = -Math.PI / 2;
        return skyboxWall;
    }

    generateNegZ(negZImage) {
        const skyboxWall = this.generateSkyboxWall(negZImage);
        skyboxWall.position.z = -size;
        return skyboxWall;
    }

    generatePosZ(posZImage) {
        const skyboxWall = this.generateSkyboxWall(posZImage);
        skyboxWall.position.z = size;
        skyboxWall.rotation.y = Math.PI;
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