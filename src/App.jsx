import { ACESFilmicToneMapping } from 'three';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Effects } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { Physics } from '@react-three/rapier';
import { KeyboardControls, JoystickControls } from './components/Controls';
import Player from './player/Player';
import Ground from './components/Ground';
import Camera from './components/Camera';
import Overlay from './ui/Overlay';

export default function App() {
    return (
        <>
            <Canvas shadows gl={{ toneMapping: ACESFilmicToneMapping }}>
                {import.meta.env.DEV && <Perf minimal />}
                {import.meta.env.DEV && <OrbitControls />}

                <Suspense>
                    <Physics gravity={[0, -10, 0]} debug={import.meta.env.DEV} colliders={false} timeStep={'vary'}>
                        <Ground />
                        <Player />
                        <Camera />
                        <Environment files="./images/envmap.jpg" environmentIntensity={0.1} />
                    </Physics>
                </Suspense>
            </Canvas>
            <KeyboardControls />
            <JoystickControls />
            <Overlay />
        </>
    );
}
