import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { groundLevel } from '../store';

export default function SleepArea() {
    return (
        <RigidBody type="fixed" sensor position={[-3.5, groundLevel+1, -22]}>
            <CuboidCollider args={[2.5, 1, 2.5]} />
        </RigidBody>
    );
}
