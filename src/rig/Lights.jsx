import { Color } from 'three';
import { useRef } from 'react';
import { useGame } from '../store';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

export default function Light() {
    const setTime = useGame((s) => s.setTime);
    const lightRef = useRef();
    const colorDay = new Color('rgb(255,255,255)');
    const colorDusk = new Color('rgb(207, 157, 82)');
    const colorNight = new Color('rgb(106, 130, 207)');

    const dayTime = 5;
    const nightTime = 5;
    const duskTime = 1;
    const changeDuration = 5;

    useGSAP(() => {
        if (lightRef.current) {
            gsap.timeline({
                repeat: -1,
                paused: false,
            })
                .to(lightRef.current.color, {
                    r: colorDusk.r,
                    g: colorDusk.g,
                    b: colorDusk.b,
                    duration: changeDuration,
                    delay: dayTime,
                    onStart: () => {
                        console.log('noon transition started');
                        setTime('noon');
                    },
                    onComplete: () => {
                        console.log('noon transition completed');
                    },
                })
                .to(lightRef.current.color, {
                    r: colorNight.r,
                    g: colorNight.g,
                    b: colorNight.b,
                    duration: changeDuration,
                    delay: duskTime,
                    onStart: () => {
                        console.log('night transition started');
                        setTime('night');
                    },
                    onComplete: () => {
                        console.log('night transition completed');
                    },
                })
                .to(lightRef.current.color, {
                    r: colorDay.r,
                    g: colorDay.g,
                    b: colorDay.b,
                    duration: changeDuration,
                    delay: nightTime,
                    onStart: () => {
                        console.log('day transition started');
                        setTime('morning');
                    },
                    onComplete: () => {
                        console.log('day transition completed');
                    },
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
