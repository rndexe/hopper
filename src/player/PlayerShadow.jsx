import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { mutation, groundLevel } from '../store';

export function PlayerShadow() {
    const shadowTexture = useTexture('./images/shadow.jpg');
    const shadowRef = useRef();
    useFrame((state, delta) => {
        shadowRef.current.position.x = mutation.position.x;
        shadowRef.current.position.z = mutation.position.z;
        shadowRef.current.material.opacity = 1 - Math.abs(mutation.position.y) * 0.15;
    });
    return (
        <mesh rotation-x={-Math.PI / 2} position-y={groundLevel - 0.01} ref={shadowRef} scale={4}>
            <planeGeometry />
            <meshBasicMaterial color={'black'} transparent alphaMap={shadowTexture} opacity={1} />
        </mesh>
    );
}
