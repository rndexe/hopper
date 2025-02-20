import { boundarySize, groundLevel } from '../store';
import Scenery from '../models/SceneModel';
import Food from '../physics/Food';
import Fireflies from './Fireflies';
import Colliders from '../physics/Colliders';
import SleepArea from '../physics/SleepArea';

export default function GrassPlane() {
    return (
        <>
            <Scenery />
            <BigGroundPlane />
            <Colliders />
            <SleepArea />
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
        </group>
    );
}
