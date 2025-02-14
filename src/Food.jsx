import { useMemo, useRef } from 'react';
import { MathUtils } from 'three';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { boundarySize, groundLevel } from './constants';
import { playAudio } from './utils';
import Apple from './Apple';

export default function Food() {
    const fruitPositions = useMemo(() => {
        return Array.from({ length: 5 }, () => {
            const { x, z } = getRandomPosition();
            return [x, groundLevel + 1, z];
        });
    }, []);
    return (
        <>
            {fruitPositions.map((pos, index) => (
                <Fruit key={index} position={pos} />
            ))}
        </>
    );
}

function Fruit({ position }) {
    const appleRef = useRef();
    const meshRef = useRef();
    const eatSound = useRef(new Audio('./audio/pop.mp3'));
    const fruitHeight = useMemo(() => groundLevel + 1, []);
    const phase = useMemo(() => Math.random());

    const handleIntersection = () => {
        const pos = appleRef.current.translation();
        appleRef.current.setTranslation({ x: pos.x, y: -5, z: pos.z });
        playAudio(eatSound.current);
        setTimeout(reset, 2000);
    };

    const reset = () => {
        const { x, z } = getRandomPosition();
        appleRef.current.setTranslation({ x: x, y: fruitHeight, z: z });
    };

    useFrame((state, delta) => {
        meshRef.current.position.y = 0.01 * Math.sin(2 * state.clock.elapsedTime + phase);
    });
    return (
        <RigidBody
            type="fixed"
            position={position}
            scale={10}
            sensor
            onIntersectionEnter={handleIntersection}
            ref={appleRef}>
            <Apple ref={meshRef} />
        </RigidBody>
    );
}

function getRandomPosition() {
    const angle = Math.random() * Math.PI * 2;
    const radius = MathUtils.lerp(1, 20, Math.random());
    return { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius };
}
