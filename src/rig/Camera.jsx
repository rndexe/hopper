import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import Light from './Lights';
import { mutation } from '../store';
import { groundLevel } from '../store';

export default function Camera() {
    const target = new Vector3();

    useFrame(({ camera }, delta) => {
        camera.position.lerp({ x: 10 + mutation.position.x, y: 25, z: 50 + mutation.position.z }, 0.1);
        target.copy({ x: mutation.position.x, y: groundLevel + 1, z: mutation.position.z });
        camera.lookAt(target);
    });
    return (
        <PerspectiveCamera makeDefault fov={20} position={[10, 25, 50]}>
            <Light />
        </PerspectiveCamera>
    );
}
