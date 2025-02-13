import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { floorHeight } from './constants';
import { mutation } from './utils';
// import { Grid } from '@react-three/drei';

export default function Ground() {
    const shadowTexture = useTexture('./shadow.jpg');
    const shadowRef = useRef();
    useFrame((state, delta) => {
        shadowRef.current.position.x = mutation.position.x;
        shadowRef.current.position.z = mutation.position.z;
        shadowRef.current.material.opacity = 1 - Math.abs(mutation.position.y) * 0.15;
    });

    return (
        <>
            <RigidBody type="fixed" rotation={[-Math.PI / 2, 0, 0]} userData={{ name: 'ground' }} restitution={0}>
                <CuboidCollider args={[50, 50, 0.25]} />
            </RigidBody>
            <mesh rotation={[-Math.PI / 2, 0, 0]} scale={[10, 10, 1]} position={[0, floorHeight / 2 - 0.2, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshBasicMaterial color={'#4ade80'} />
            </mesh>
            {/* <Grid sectionSize={10} cellSize={1} args={[100, 100]} cellColor={'black'} position-y={floorHeight / 2} /> */}
            <mesh rotation-x={-Math.PI / 2} position-y={floorHeight / 2 - 0.01} ref={shadowRef}>
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial color={'black'} transparent alphaMap={shadowTexture} opacity={0.5} />
            </mesh>
        </>
    );
}
