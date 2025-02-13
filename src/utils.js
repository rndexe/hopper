import { DataTexture, NearestFilter, RedFormat } from 'three';

export function createGradientTexture(mode = 'body') {
    const size = 15; // Number of gradient steps
    const data = new Uint8Array(size); // Single-channel grayscale values

    // Define grayscale values (0-255)
    const lightnessValues =
        mode == 'body'
            ? [100, 100, 100, 100, 100, 192, 192, 192, 192, 192, 192, 192, 192, 192, 255] // Adjust for better transitions
            : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255]; // Adjust for better transitions

    for (let i = 0; i < size; i++) {
        data[i] = lightnessValues[i]; // Directly set grayscale intensity
    }

    const texture = new DataTexture(data, size, 1, RedFormat);
    texture.needsUpdate = true;
    texture.minFilter = NearestFilter;
    texture.magFilter = NearestFilter;
    texture.generateMipmaps = false;

    return texture;
}



export const mutation = {
    isJumping: false,
    position : {x:0, y:2, z:0}
};