import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { mutation } from './utils';
import { groundLevel } from './constants';

const target = new Vector3();
export default function MyCamera() {
    useFrame(({ camera }, delta) => {
        camera.position.lerp({ x: 10 + mutation.position.x, y: 25, z: 50 + mutation.position.z }, 0.1);
        target.copy({ x: mutation.position.x, y: groundLevel + 1, z: mutation.position.z });
        camera.lookAt(target);
    });
    return (
        <PerspectiveCamera makeDefault fov={20} position={[10, 25, 50]}>
            <directionalLight
                position={[100, 100, 100]}
                intensity={2}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-left={-25}
                shadow-camera-right={25}
                shadow-camera-top={25}
                shadow-camera-bottom={-25}
                shadow-camera-near={100}
                shadow-camera-far={300}
                shadow-bias={-0.001}
                castShadow
            />
        </PerspectiveCamera>
    );
}
