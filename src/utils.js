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

export function normalize(v, length) {
    const mag = Math.sqrt(v.x ** 2 + v.z ** 2);
    if (mag === 0) {
        v.x = v.z = 0; // Avoid division by zero
        return;
    }

    const scale = length / mag;
    v.x *= scale;
    v.z *= scale;
}

export function playAudio(audio, volume=1) {
    audio.currentTime = 0;
    audio.volume = volume;
    audio.loop = false;
    audio.play();
}

