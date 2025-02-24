import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useState, useEffect, useRef } from 'react';
import { GameState, useGame, useGameActions } from '../store';

const radius = 15; // Radius of allowed movement
const speed = 2; // Speed of movement
const minHeight = 0.5;
const maxHeight = 3;

export function MovingBody({ pos }) {
    const bodyRef = useRef();
    const [velocity, setVelocity] = useState([0, 0, 0]);
    const { setAnimation, setGameState, changeHealth } = useGameActions();

    // Function to generate a random velocity within a certain speed range
    function getRandomVelocity() {
        const angle = Math.random() * Math.PI * 2;
        const vy = (Math.random() - 0.5) * speed * 2;
        return [Math.cos(angle) * speed, vy, Math.sin(angle) * speed];
    }

    function enemyInteraction(payload) {
        if (payload.other.rigidBody.userData.name != 'player') return;

        const { health } = useGame.getState();
        if (health - 10 <= 0) {
            setAnimation('dead');
            setTimeout(() => setGameState(GameState.over), 1000);
        } else {
            setAnimation('hurt');
            changeHealth(-10);
            setTimeout(() => setAnimation('idle'), 1000);
        }
    }
    // Update velocity every few seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setVelocity(getRandomVelocity());
        }, 500); // Change direction every 2 seconds

        return () => clearInterval(interval);
    }, []);

    useFrame(() => {
        if (bodyRef.current && useGame.getState().time == 'night') {
            const body = bodyRef.current;
            const position = body.translation();
            let [vx, vy, vz] = velocity;

            // Keep the body within the horizontal circular boundary
            const dist = Math.sqrt(position.x ** 2 + position.z ** 2);
            if (dist > radius) {
                const angle = Math.atan2(position.z, position.x);
                body.setTranslation(
                    {
                        x: Math.cos(angle) * radius,
                        y: position.y,
                        z: Math.sin(angle) * radius,
                    },
                    true,
                );
                vx = -vx; // Reverse horizontal velocity
                vz = -vz;
            }

            // Keep the body within the vertical limits
            if (position.y < minHeight) {
                body.setTranslation({ x: position.x, y: minHeight, z: position.z }, true);
                vy = Math.abs(vy); // Bounce upwards
            }
            if (position.y > maxHeight) {
                body.setTranslation({ x: position.x, y: maxHeight, z: position.z }, true);
                vy = -Math.abs(vy); // Bounce downwards
            }

            body.setLinvel({ x: vx, y: vy, z: vz }, true);
            setVelocity([vx, vy, vz]); // Update velocity to reflect potential changes
        }
    });

    return (
        <RigidBody
            ref={bodyRef}
            type="dynamic"
            position={pos}
            colliders="cuboid"
            sensor
            onIntersectionEnter={enemyInteraction}>
            <mesh scale={0.1}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial color="red" />
            </mesh>
            {/* <pointLight color={'red'} decay={0} /> */}
        </RigidBody>
    );
}

export default function Enemies() {
    return (
        <>
            <MovingBody pos={[10, 0, 10]} />
            <MovingBody pos={[-10, 0, -10]} />
        </>
    );
}
