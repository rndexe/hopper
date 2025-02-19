import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SoftShadows, useTexture } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { boundarySize, groundLevel } from '../constants';
import { mutation } from '../store';
import GrassPlane from './GrassPlane';

export default function Ground() {
    return (
        <>
            <RigidBody type="fixed" userData={{ name: 'ground' }} restitution={0}>
                <CuboidCollider args={[1.8*boundarySize, groundLevel, 1.8*boundarySize]} />
            </RigidBody>
            <GrassPlane />
            <PlayerShadow />
            {/* <SoftShadows size={100} samples={20}/> */}
        </>
    );
}

function PlayerShadow() {
    const shadowTexture = useTexture('./shadow.jpg');
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
