import { ACESFilmicToneMapping } from 'three';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, KeyboardControls, Environment } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { Physics } from '@react-three/rapier';
import Player from './player/Player';
import Ground from './Ground';
import MyCamera from './MyCamera';
import Food from './sceneItems/Food';

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
            <Canvas shadows gl={{ toneMapping: ACESFilmicToneMapping }}>
                {import.meta.env.DEV && <Perf minimal />}
                <Experience />
                {import.meta.env.DEV && <OrbitControls />}
            </Canvas>
        </KeyboardControls>
    );
}

function Experience() {
    return (
        <Suspense>
            <Physics gravity={[0, -10, 0]} debug={import.meta.env.DEV} colliders={false}>
                <Ground />
                <Player />
                <MyCamera />
                <Food />
                <Environment files="./dikhololo_night_1k.jpg" environmentIntensity={0.1} />
            </Physics>
        </Suspense>
    );
}
