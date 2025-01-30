import { RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { floorHeight } from './constants';

export default function Player() {
    const playerRef = useRef();
    const [ subscribeKeys, getKeys ] = useKeyboardControls()

    function jump() {
        playerRef.current.applyImpulse({ x: 0, y: 50, z: 0 });
    }
    return (
        <RigidBody ref={playerRef}>
            <mesh position-y={1 + floorHeight / 2} onClick={jump} castShadow>
                <sphereGeometry arg />
                <meshStandardMaterial color={'green'} />
            </mesh>
        </RigidBody>
    );
}
