import { Vector3, Color } from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { mutation } from './utils';
import { groundLevel } from './constants';

gsap.registerPlugin(useGSAP);

export default function MyCamera() {
    const target = new Vector3();

    useFrame(({ camera }, delta) => {
        camera.position.lerp({ x: 10 + mutation.position.x, y: 25, z: 50 + mutation.position.z }, 0.1);
        target.copy({ x: mutation.position.x, y: groundLevel + 1, z: mutation.position.z });
        camera.lookAt(target);
    });
    return (
        <PerspectiveCamera makeDefault fov={20} position={[10, 25, 50]}>
            <MyLight />
        </PerspectiveCamera>
    );
}

function MyLight() {
    const lightRef = useRef();
    // const colorDay = new Color('rgb(255,255,255)');
    const colorDusk = new Color('rgb(207, 157, 82)');
    const colorNight = new Color('rgb(106, 130, 207)');

    const dayTime = 60;
    const nightTime = 30;
    const duskTime = 10;
    const changeDuration = 5;

    useGSAP(() => {
        if (lightRef.current) {
            gsap.timeline({ repeat: -1, paused: false, yoyo: true, delay: dayTime, repeatDelay: nightTime })
                .to(lightRef.current.color, {
                    r: colorDusk.r,
                    g: colorDusk.g,
                    b: colorDusk.b,
                    duration: changeDuration,
                })
                .to(lightRef.current.color, {
                    r: colorNight.r,
                    g: colorNight.g,
                    b: colorNight.b,
                    duration: changeDuration,
                    delay: duskTime,
                });
        }
    }, []);

    return (
        <directionalLight
            ref={lightRef}
            position={[100, 100, 100]}
            intensity={2}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-left={-25}
            shadow-camera-right={25}
            shadow-camera-top={25}
            shadow-camera-bottom={-25}
            shadow-camera-near={100}
            shadow-camera-far={300}
            shadow-bias={-0.001}
            castShadow
        />
    );
}
