import { RigidBody } from '@react-three/rapier';
import { floorHeight } from './constants';

export default function Ground() {
    return (
        <>
            <RigidBody type="fixed">
                <mesh scale={[100, floorHeight, 100]} receiveShadow>
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh>
            </RigidBody>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, floorHeight / 2 + 0.01, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <shadowMaterial transparent opacity={0.5} />
            </mesh>
        </>
    );
}
