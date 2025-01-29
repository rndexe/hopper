import { Canvas } from '@react-three/fiber';
import { OrbitControls, KeyboardControls } from '@react-three/drei';
import { Suspense } from 'react';
import { Perf } from 'r3f-perf';
import { Physics } from '@react-three/rapier';
import { R, theta } from './constants';
import Lights from './Lights';
import Player from './Player';
import Ground from './Ground';

export default function App() {
    return (
        <KeyboardControls
            map={[
                { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
                { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
                { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
                { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
                { name: 'jump', keys: ['Space'] },
            ]}>
            <Canvas shadows camera={{ fov: 20, position: [0, R * Math.sin(theta), R * Math.cos(theta)] }}>
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
            <Physics gravity={[0, -9.81, 0]} debug>
                <Ground />
                <Player />
                <Lights />
            </Physics>
        </Suspense>
    );
}
