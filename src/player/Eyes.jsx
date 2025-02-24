import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useMemo } from 'react';
import { createGradientTexture, useRandomInterval } from '../utils';
import { mutation, useGame } from '../store';

gsap.registerPlugin(useGSAP);

export default function Eyes() {
    const eyesRef = useRef();
    const animation = useGame((s) => s.animation);
    useRandomInterval(
        () => {
            if (animation == 'idle') {
                if (mutation.isJumping) return;

                if (eyesRef.current) {
                    gsap.to(eyesRef.current.scale, { y: 0.1, duration: 0.1, ease: 'power2.in' });
                    gsap.to(eyesRef.current.scale, { y: 1, duration: 0.1, ease: 'power2.out', delay: 0.1 });
                    gsap.to(eyesRef.current.scale, { y: 0.1, duration: 0.1, ease: 'power2.in', delay: 0.3 });
                    gsap.to(eyesRef.current.scale, { y: 1, duration: 0.1, ease: 'power2.out', delay: 0.4 });
                }
            }
        },
        animation == 'idle' ? 2000 : null,
        3000,
    );
    useGSAP(() => {
        if (animation == 'sleeping') {
            gsap.to(eyesRef.current.scale, { y: 0.1, duration: 1, ease: 'power2.in', delay: 1 });
        } else if (animation == 'idle') {
            gsap.to(eyesRef.current.scale, { y: 1, duration: 0.1, ease: 'power2.in', delay: 0.3 });
        }
    }, [animation]);

    return (
        <group ref={eyesRef} position={[0, 0.3, 1]}>
            <Eye position={-0.35} />
            <Eye position={0.35} />
        </group>
    );
}

function Eye({ position }) {
    const animation = useGame((s) => s.animation);

    return animation == 'dead' ? <DeadEye position={position} /> : <RoundEye position={position} />;
}

function RoundEye({ position }) {
    const gradientMap = useMemo(() => createGradientTexture('eyes'), []);

    return (
        <mesh position-x={position} scale={0.14}>
            <icosahedronGeometry args={[1, 1]} />
            <meshToonMaterial color={'white'} gradientMap={gradientMap} />
        </mesh>
    );
}
function DeadEye({ position }) {
    return (
        <>
            <mesh position-x={position} scale={[0.1, 0.4, 0.1]} rotation-z={Math.PI / 4}>
                <boxGeometry />
                <meshBasicMaterial color={'black'} />
            </mesh>
            <mesh position-x={position} scale={[0.1, 0.4, 0.1]} rotation-z={-Math.PI / 4}>
                <boxGeometry />
                <meshBasicMaterial color={'black'} />
            </mesh>
        </>
    );
}
