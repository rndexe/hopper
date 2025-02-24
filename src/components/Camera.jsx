import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { mutation, groundLevel } from '../store';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import Light from './Lights';

gsap.registerPlugin(useGSAP);

const target = new Vector3();

export default function Camera() {
    const cameraRef = useRef();
    const start = useRef(false);

    useGSAP(() => {
        gsap.to(cameraRef.current.position, {
            x: 7,
            y: 17.4,
            z: 35.3,
            duration: 2,
            delay: 0.1,
            ease: 'power2.inOut',
            onComplete: () => {
                start.current = true;
            },
        });
    }, []);

    useFrame(({ camera }, delta) => {
        if (start.current) {
            camera.position.lerp({ x: mutation.position.x + 7, y: 17.4, z: 35.3 + mutation.position.z }, 0.1);
        }
        target.copy({ x: mutation.position.x, y: groundLevel + 1, z: mutation.position.z });
        camera.lookAt(target);
    });
    return (
        <PerspectiveCamera makeDefault fov={20} position={[0, groundLevel + 4, 25]} ref={cameraRef}>
            <Light />
        </PerspectiveCamera>
    );
}
