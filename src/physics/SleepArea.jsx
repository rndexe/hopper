import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { groundLevel, mutation } from '../store';

export default function SleepArea() {
    function jumpLess() {
        mutation.jumpVelocity = 2;
    }

    function jumpNormal() {
        mutation.jumpVelocity = 5;
    }
    return (
        <RigidBody
            type="fixed"
            sensor
            position={[-3.5, groundLevel + 1, -22]}
            onIntersectionEnter={jumpLess}
            onIntersectionExit={jumpNormal}>
            <CuboidCollider args={[2.5, 1, 2.0]} />
        </RigidBody>
    );
}
