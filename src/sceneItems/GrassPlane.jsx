import { boundarySize, groundLevel } from '../constants';
import Scenery from './Scenery';
import Food from './Food';
import Fireflies from './Fireflies';
import Colliders from './Colliders';

export default function GrassPlane() {
    return (
        <>
            <Scenery />
            <BigGroundPlane />
            <Colliders />
            <Fireflies count={10} />
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
