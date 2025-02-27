import { DataTexture, NearestFilter, RedFormat, MathUtils } from 'three';
import { useEffect, useRef, useCallback } from 'react';

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

export function getRandomPosition() {
    const angle = Math.random() * Math.PI * 2;
    const radius = MathUtils.lerp(1, 18, Math.random());
    return { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius };
}

export function playAudio(audio, volume = 1) {
    audio.currentTime = 0;
    audio.volume = volume;
    audio.loop = false;
    audio.play();
}

export function isTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
}

export const useRandomInterval = (callback, minDelay, maxDelay) => {
    const timeoutId = useRef(null);
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        let isEnabled = typeof minDelay === 'number' && typeof maxDelay === 'number';

        if (isEnabled) {
            const handleTick = () => {
                const nextTickAt = MathUtils.randInt(minDelay, maxDelay);

                timeoutId.current = setTimeout(() => {
                    savedCallback.current();
                    handleTick();
                }, nextTickAt);
            };

            handleTick();
        }

        return () => clearTimeout(timeoutId.current);
    }, [minDelay, maxDelay]);

    const cancel = useCallback(function () {
        clearTimeout(timeoutId.current);
    }, []);

    return cancel;
};
