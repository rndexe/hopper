import { Canvas } from '@react-three/fiber';
import { OrbitControls, KeyboardControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { Perf } from 'r3f-perf';
import { Physics } from '@react-three/rapier';
import Player from './Player';
import Ground from './Ground';
import MyCamera from './MyCamera';
import Food from './Food';
import { groundLevel } from './constants';

export default function App() {
    return (
        <KeyboardControls
            map={[
                { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
                { name: 'back', keys: ['ArrowDown', 'KeyS'] },
                { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
                { name: 'right', keys: ['ArrowRight', 'KeyD'] },
                { name: 'jump', keys: ['Space'] },
            ]}>
            <Canvas>
                {import.meta.env.DEV && <Perf minimal />}
                <Experience />
                <OrbitControls />
            </Canvas>
        </KeyboardControls>
    );
}

function Experience() {
    return (
        <Suspense>
            <Physics gravity={[0, -10, 0]} debug={import.meta.env.DEV}>
                <Ground />
                <Player />
                <MyCamera />
                <Food />
                <Environment preset="city" />
            </Physics>
        </Suspense>
    );
}
