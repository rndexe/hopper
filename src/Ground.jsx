import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { floorHeight } from './constants';
import { Grid } from '@react-three/drei';

export default function Ground() {
    return (
        <>
            <RigidBody type="fixed" rotation={[-Math.PI / 2, 0, 0]} userData={{ name: 'ground' }} restitution={0}>
                <CuboidCollider args={[50, 50, 0.25]} />
            </RigidBody>
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[10, 10, 1]}
                position={[0, floorHeight / 2 - 0.2, 0]}
                receiveShadow>
                <planeGeometry args={[10, 10]} />
                <meshBasicMaterial color={'#4ade80'} />
            </mesh>
            <Grid sectionSize={10} cellSize={1} args={[100, 100]} cellColor={'black'} position-y={floorHeight / 2} />
        </>
    );
}
