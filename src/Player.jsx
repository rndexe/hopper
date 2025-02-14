import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Outlines, useKeyboardControls, useTexture } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { floorHeight } from './constants';
import { createGradientTexture, mutation } from './utils';
import Eyes from './Eyes';

export default function Player() {
    const playerRef = useRef();
    const meshRef = useRef();
    const [sub, get] = useKeyboardControls();

    const gradientMap = useMemo(() => createGradientTexture(), []);
    const jumpSound = useRef(new Audio('./slime_jump.mp3'));

    function jump(payload) {
        const isGroundCollision = payload ? payload.other.rigidBody.userData.name == 'ground' : true;
        if (isGroundCollision) {
            mutation.isJumping = false;
            if (isKeyPressed) playAudio(jumpSound.current);
        }
    }

    useFrame((state, delta) => {
        const { forward, back, left, right } = get();
        const isKeyPressed = forward || back || left || right;

        if (isKeyPressed && !mutation.isJumping) {
            mutation.isJumping = true;
            const nextV = { x: 0, y: 5, z: 0 };
            const maxV = 2.5;
            if (forward) nextV.z -= maxV;
            if (back) nextV.z += maxV;
            if (left) nextV.x -= maxV;
            if (right) nextV.x += maxV;

            normalize(nextV, maxV);
            playerRef.current.setLinvel(nextV, true);
            meshRef.current.rotation.set(0, Math.atan2(nextV.x, nextV.z), 0); // Set rotation based on velocity
            playAudio(jumpSound.current);
        }
        if (playerRef.current && meshRef.current) {
            const vel = playerRef.current.linvel(); // Get current velocity
            const scaleY = Math.abs(vel.y) / 20 + 1; // How much to stretch based on velocity
            meshRef.current.scale.lerp({ x: 1 / Math.sqrt(scaleY), y: scaleY, z: 1 / Math.sqrt(scaleY) }, 0.1); // Squish in other directions based on y- stretch
        }
        mutation.position.x = playerRef.current.translation().x;
        mutation.position.y = playerRef.current.translation().y;
        mutation.position.z = playerRef.current.translation().z;
    });

    return (
        <RigidBody
            ref={playerRef}
            onCollisionEnter={jump}
            lockRotations
            position-y={mutation.position[1]}
            colliders={false}>
            <CuboidCollider args={[1, 1, 1]} restitution={0} friction={100} />

            <group ref={meshRef}>
                <mesh>
                    <sphereGeometry />
                    <meshToonMaterial color={'pink'} gradientMap={gradientMap} />
                    <Outlines screenspace thickness={0.02} />
                </mesh>
                <Eyes />
            </group>
        </RigidBody>
    );
}

function normalize(v, length) {
    const mag = Math.sqrt(v.x ** 2 + v.z ** 2);
    if (mag === 0) {
        v.x = v.z = 0; // Avoid division by zero
        return;
    }

    const scale = length / mag;
    v.x *= scale;
    v.z *= scale;
}

function playAudio(audio) {
    audio.currentTime = 0;
    audio.volume = 0.2;
    audio.loop = false;
    audio.play();
}
