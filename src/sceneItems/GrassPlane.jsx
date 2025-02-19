import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { boundarySize, groundLevel } from '../constants';
import Scenery from './Scenery';
import Food from './Food';
import Fireflies from './Fireflies';

export default function GrassPlane() {
    return (
        <>
            <Scenery />
            <BigGroundPlane />
            <BoxBoundary />
            <Fireflies count={10}/>
            <Food />
        </>
    );
}

function BigGroundPlane() {
    return (
        <group rotation-x={-Math.PI / 2} position-y={groundLevel - 0.2}>
            <mesh scale={[1.8 * boundarySize, 1.8 * boundarySize, 1]} receiveShadow>
                <circleGeometry />
                <meshStandardMaterial color={'rgb(109, 197, 106)'} />
            </mesh>
            <mesh scale={[4 * boundarySize, 4 * boundarySize, 1]} position-z={-0.1}>
                <circleGeometry />
                <meshStandardMaterial color={'rgb(4, 56, 15)'} />
            </mesh>
        </group>
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
            <CuboidCollider args={[1, 1, 1]} position={[-11, groundLevel + 1, 1]} />
            <CuboidCollider args={[2, 1, 2]} position={[17, groundLevel + 1, 5]} />
            <CuboidCollider args={[1.8, 1, 1.5]} position={[6, groundLevel + 1, -13]} />
        </RigidBody>
    );
}
