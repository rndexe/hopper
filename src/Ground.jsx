import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Box } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { boundarySize, groundLevel } from './constants';
import { mutation } from './utils';

export default function Ground() {
    return (
        <>
            <RigidBody type="fixed" userData={{ name: 'ground' }} restitution={0}>
                <CuboidCollider args={[50, groundLevel, 50]} />
            </RigidBody>
            <GrassPlane />
            <ShadowPlane />
            <BoxBoundary />
        </>
    );
}

function GrassPlane() {
    return (
        <>
            <mesh position={[5, -0.4, 5]}>
                <cylinderGeometry />
                <meshStandardMaterial color={'darkgreen'} />
            </mesh>
            <mesh rotation-x={-Math.PI / 2} scale={[boundarySize, boundarySize, 1]} position-y={groundLevel - 0.2}>
                <planeGeometry args={[2, 2]} />
                <meshBasicMaterial color={'#22c55e'} />
            </mesh>
        </>
    );
}

function ShadowPlane() {
    const shadowTexture = useTexture('./shadow.jpg');
    const shadowRef = useRef();
    useFrame((state, delta) => {
        shadowRef.current.position.x = mutation.position.x;
        shadowRef.current.position.z = mutation.position.z;
        shadowRef.current.material.opacity = 1 - Math.abs(mutation.position.y) * 0.15;
    });
    return (
        <mesh rotation-x={-Math.PI / 2} position-y={groundLevel - 0.01} ref={shadowRef} scale={4}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color={'black'} transparent alphaMap={shadowTexture} opacity={1} />
        </mesh>
    );
}

function BoxBoundary() {
    return (
        <RigidBody type="fixed" restitution={1}>
            {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                return (
                    <CuboidCollider
                        key={i}
                        args={[1, 2, boundarySize * Math.tan(Math.PI / 12)]}
                        position={[
                            Math.cos(angle) * (boundarySize + 1),
                            groundLevel + 2,
                            Math.sin(angle) * (boundarySize + 1),
                        ]}
                        rotation={[0, -angle, 0]}
                    />
                );
            })}
        </RigidBody>
    );
}
