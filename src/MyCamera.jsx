import { PerspectiveCamera } from '@react-three/drei';
import { R, theta } from './constants';

export default function MyCamera() {
    return (
        <PerspectiveCamera makeDefault fov={20} position={[10,25,50]}>
            <directionalLight position={[100, 100, 100]} intensity={2} />
        </PerspectiveCamera>
    );
}
