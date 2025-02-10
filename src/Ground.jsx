import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { floorHeight } from './constants';

export default function Ground() {
    return (
        <>
            <RigidBody
                type="fixed"
                rotation={[-Math.PI / 2, 0, Math.PI / 4]}
                userData={{ name: 'ground' }}
                restitution={0}>
                <CuboidCollider args={[100, 100, 0.25]} />
         
            </RigidBody>
            <mesh
                rotation={[-Math.PI / 2, 0, Math.PI / 4]}
                scale={[100, 100, 1]}
                position={[0, floorHeight / 2, 0]}
                receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color={'white'} />
            </mesh>
        </>
    );
}
