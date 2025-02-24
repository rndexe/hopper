import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { groundLevel, useGameActions } from '../store';
import { playAudio, getRandomPosition } from '../utils';
import Apple from '../models/AppleModel';

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
    const shadowTexture = useTexture('./images/shadow.jpg');
    const eatSound = useRef(new Audio('./audio/pop.mp3'));
    const fruitHeight = useMemo(() => groundLevel + 1, []);
    const phase = useMemo(() => Math.random());
    const { changeHealth } = useGameActions();

    function handleIntersection(payload) {
        if (payload.other.rigidBody.userData.name != 'player') return;
        const pos = appleRef.current.translation();
        appleRef.current.setTranslation({ x: pos.x, y: -5, z: pos.z });
        playAudio(eatSound.current);
        changeHealth(10);
        setTimeout(reset, 5000);
    }

    function reset() {
        const { x, z } = getRandomPosition();
        appleRef.current.setTranslation({ x: x, y: fruitHeight, z: z });
    }

    useFrame((state, delta) => {
        meshRef.current.position.y = 0.01 * Math.sin(2 * state.clock.elapsedTime + phase);
    });
    return (
        <RigidBody type="fixed" position={position} scale={10} onIntersectionEnter={handleIntersection} ref={appleRef}>
            <CuboidCollider args={[1, 1, 1]} scale={0.03} sensor />
            <Apple ref={meshRef} />

            <mesh rotation-x={-Math.PI / 2} position-y={-0.1} scale={0.2}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial
                    color={'black'}
                    transparent
                    alphaMap={shadowTexture}
                    opacity={0.2}
                    depthWrite={false}
                />
            </mesh>
        </RigidBody>
    );
}
