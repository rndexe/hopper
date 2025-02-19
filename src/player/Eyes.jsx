import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MathUtils } from 'three';
import { useRef, useMemo } from 'react';
import { createGradientTexture } from '../utils';
import { mutation } from '../store';

gsap.registerPlugin(useGSAP);

export default function Eyes() {
    const eyesRef = useRef();

    useGSAP(() => {
        const blink = () => {
            const nextBlink = MathUtils.randInt(3000, 4000);
            setTimeout(blink, nextBlink);
            if (mutation.isJumping) return;

            if (eyesRef.current) {
                gsap.to(eyesRef.current.scale, { y: 0.1, duration: 0.1, ease: 'power2.in' });
                gsap.to(eyesRef.current.scale, { y: 1, duration: 0.1, ease: 'power2.out', delay: 0.1 });
                gsap.to(eyesRef.current.scale, { y: 0.1, duration: 0.1, ease: 'power2.in', delay: 0.3 });
                gsap.to(eyesRef.current.scale, { y: 1, duration: 0.1, ease: 'power2.out', delay: 0.4 });
            }
        };

        blink();
    }, []);
    return (
        <group ref={eyesRef} position={[0, 0.3, 1]}>
            <Eye position={-0.35} />
            <Eye position={0.35} />
        </group>
    );
}

function Eye({ position }) {
    const gradientMap = useMemo(() => createGradientTexture('eyes'), []);

    return (
        <mesh position-x={position} scale={0.14}>
            <icosahedronGeometry args={[1, 1]} />
            <meshToonMaterial color={'white'} gradientMap={gradientMap} />
        </mesh>
    );
}
