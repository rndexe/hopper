import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { boundarySize, groundLevel } from '../constants';
import Scenery from './Scenery';

export default function GrassPlane() {
    return (
        <>
            <Scenery />
            <BigGroundPlane />
            <BoxBoundary />
        </>
    );
}

function BigGroundPlane() {
    return (
        <mesh
            rotation-x={-Math.PI / 2}
            scale={[2 * boundarySize, 2 * boundarySize, 1]}
            position-y={groundLevel - 0.2}
            receiveShadow>
            <circleGeometry />
            <meshStandardMaterial color={'rgb(77, 180, 73)'} />
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
            <CuboidCollider args={[1, 1, 1]} position={[-11, groundLevel + 1, 1]} />
            <CuboidCollider args={[2, 1, 2]} position={[17, groundLevel + 1, 5]} />
            <CuboidCollider args={[1.8, 1, 1.5]} position={[6, groundLevel + 1, -13]} />
        </RigidBody>
    );
}
