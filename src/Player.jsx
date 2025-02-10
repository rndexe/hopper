import { RigidBody } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { useRef, useEffect, useMemo } from 'react';
import { floorHeight } from './constants';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

export default function Player() {
    const playerRef = useRef();
    const [sub, get] = useKeyboardControls();

    const groundLevel = useMemo(() => 1 + floorHeight / 2, []);

    useEffect(() => {
        const unsub = sub(
            (state) => [state.forward, state.right, state.left, state.back],
            ([forward, right, left, back]) => {
                jump();

            },
        );

        return () => {
            unsub();
        };
    }, []);

    function jump(payload) {
        const currV = playerRef.current.linvel();

        const isOnGround = playerRef.current.translation().y <= groundLevel;
        const isGroundCollision = payload ? payload.other.rigidBody.userData.name == 'ground' : true;

        if (isOnGround && isGroundCollision && isKeyPressed()) {
            playerRef.current.setLinvel({ x: currV.x, y: 5, z: currV.z });
        }
    }

    function isKeyPressed() {
        const { forward, back, left, right } = get();
        return forward || back || left || right;
    }

    useFrame((state, delta) => {
        const { forward, back, left, right } = get();


        if (isKeyPressed()) {
            // console.log('here')
            // const currV = playerRef.current.linvel();
            // playerRef.current.applyImpulse({ x: 0, y: -5, z: 0 });

            const currV = playerRef.current.linvel();
            const nextV = { x: 0, y: currV.y, z: 0 };
            const maxV = 5
            const vStrength = maxV * delta;

            // if (forward) nextV.z = currV.z - vStrength;
            if (forward) nextV.z = MathUtils.clamp(currV.z - vStrength, -maxV, 0);
            if (back) nextV.z = MathUtils.clamp(currV.z + vStrength, 0, maxV);
            if (left) nextV.x = MathUtils.clamp(currV.x - vStrength, -maxV, 0);
            if (right) nextV.x = MathUtils.clamp(currV.x + vStrength, 0, maxV);

            playerRef.current.setLinvel(nextV);
        }
    });

    return (
        <RigidBody
            ref={playerRef}
            onCollisionEnter={jump}
            lockRotations
            restitution={0}
            canSleep={false}
            position-y={groundLevel + 2}>
            <mesh castShadow>
                <sphereGeometry />
                <meshStandardMaterial color={'green'} />
            </mesh>
        </RigidBody>
    );
}
