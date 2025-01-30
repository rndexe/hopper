import { RigidBody } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { floorHeight } from './constants';
import { useFrame } from '@react-three/fiber';

export default function Player() {
    const playerRef = useRef();
    const [sub, get] = useKeyboardControls();

    useEffect(() => {
        const unsub = sub(
            (state) => [state.forward, state.right, state.left, state.back],
            ([forward, right, left, back]) => {
                const pressed = forward || back || left || right;
                const currV = playerRef.current.linvel();
                const nextV = { x: 0, y: currV.y, z: 0 };
                const vStrength = 2;

                if (pressed) jump();
                if (forward) nextV.z -= vStrength;
                if (back) nextV.z += vStrength;
                if (left) nextV.x -= vStrength;
                if (right) nextV.x += vStrength;

                playerRef.current.setLinvel(nextV);
            },
        );

        return () => {
            unsub();
        };
    }, []);

    function jump() {
        const currV = playerRef.current.linvel();

        if (playerRef.current.translation().y <= 1 + floorHeight / 2) {
            playerRef.current.setLinvel({ x: currV.x, y: 6, z: currV.z });
        }
    }

    useFrame((state, delta) => {
        const { forward, back, left, right } = get();

        const pressed = forward || back || left || right;

        if (pressed) {
            jump();
        }
    });

    return (
        <RigidBody ref={playerRef} position-y={1 + floorHeight / 2} lockRotations restitution={1}>
            <mesh castShadow>
                <sphereGeometry arg />
                <meshStandardMaterial color={'green'} />
            </mesh>
        </RigidBody>
    );
}
