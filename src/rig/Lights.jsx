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

    const testScale = import.meta.env.DEV ? 0.5 : 1;

    const dayTime = 15 * testScale;
    const nightTime = 15 * testScale;
    const duskTime = 5 * testScale;
    const changeDuration = 5 * testScale;

    useGSAP(() => {
        if (lightRef.current) {
            gsap.timeline({
                repeat: -1,
                paused: false,
                defaults: { duration: changeDuration },
            })
                .to(lightRef.current.color, {
                    r: colorDusk.r,
                    g: colorDusk.g,
                    b: colorDusk.b,
                    delay: dayTime,
                    onStart: () => {
                        setTime('noon');
                    },
                })
                .to(lightRef.current.color, {
                    r: colorNight.r,
                    g: colorNight.g,
                    b: colorNight.b,
                    delay: duskTime,
                    onStart: () => {
                        setTime('night');
                    },
                })
                .to(lightRef.current.color, {
                    r: colorDay.r,
                    g: colorDay.g,
                    b: colorDay.b,
                    delay: nightTime,
                    onStart: () => {
                        setTime('morning');
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
