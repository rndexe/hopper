import { Environment, SoftShadows } from '@react-three/drei';

export default function Lights() {
    return (
        <>
            <directionalLight
                position={[0, 2, 0]}
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={0.1}
                shadow-camera-far={20}
                shadow-camera-left={-100}
                shadow-camera-right={100}
                shadow-camera-top={100}
                shadow-camera-bottom={-100}
            />
            <Environment preset="forest" />
            {/* <SoftShadows /> */}
        </>
    );
}
