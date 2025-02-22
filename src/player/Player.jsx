import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { createGradientTexture, playAudio, normalize } from '../utils';
import { mutation, useGame } from '../store';
import { PlayerShadow } from './PlayerShadow';
import Eyes from './Eyes';
import SpeechBubble from './SpeechBubble';

export default function Player() {
    const playerRef = useRef();
    const meshRef = useRef();
    const resetKey = useGame((s) => s.resetKey);
    const reset = useGame((s) => s.reset);
    const animation = useGame((s) => s.animation);
    const gradientMap = useMemo(() => createGradientTexture(), []);
    const jumpSound = useRef(new Audio('./audio/slime_jump.mp3'));

    function jump(payload) {
        const isGroundCollision = payload ? payload.other.rigidBody.userData.name == 'ground' : true;
        if (isGroundCollision) {
            mutation.isJumping = false;
            if (isKeyPressed) playAudio(jumpSound.current);
        }
    }

    useEffect(() => {
        if (animation == 'sleeping') {
            meshRef.current.rotation.set(0, 0, 0);
        }
    }, [animation]);

    useFrame((state, delta) => {
        const { forward, back, left, right } = mutation.controls;
        const isKeyPressed = forward || back || left || right;
        if (isKeyPressed && !mutation.isJumping && animation == 'idle') {
            mutation.isJumping = true;
            const nextV = { x: 0, y: mutation.jumpVelocity, z: 0 };
            const maxV = 2.5;
            if (forward) nextV.z -= maxV;
            if (back) nextV.z += maxV;
            if (left) nextV.x -= maxV;
            if (right) nextV.x += maxV;

            normalize(nextV, maxV);
            playerRef.current.setLinvel(nextV, true);
            meshRef.current.rotation.set(0, Math.atan2(nextV.x, nextV.z), 0); // Set rotation based on velocity
            playAudio(jumpSound.current, 0.1);
        }

        // Squishing ball logic
        if (playerRef.current && meshRef.current) {
            const vel = playerRef.current.linvel(); // Get current velocity
            const scaleY = Math.abs(vel.y) / 20 + 1; // How much to stretch based on velocity
            meshRef.current.scale.lerp({ x: 1 / Math.sqrt(scaleY), y: scaleY, z: 1 / Math.sqrt(scaleY) }, 0.1); // Squish in other directions based on y- stretch
        }

        // Update position store
        Object.assign(mutation.position, playerRef.current.translation());
        if (mutation.position.y < -20) reset();
    });

    return (
        <group key={resetKey}>
            <RigidBody ref={playerRef} onCollisionEnter={jump} lockRotations position-y={mutation.position[1]}>
                <CuboidCollider args={[0.8, 1, 0.8]} restitution={0} friction={100} />
                <group ref={meshRef}>
                    <mesh>
                        <sphereGeometry />
                        <meshToonMaterial color={'pink'} gradientMap={gradientMap} />
                        <Outlines screenspace thickness={0.02} />
                    </mesh>
                    <Eyes />
                </group>
                <SpeechBubble />
            </RigidBody>
            <PlayerShadow />
        </group>
    );
}
