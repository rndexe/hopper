import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function Scenery() {
    const { scene } = useGLTF('./models/tmgtchi.glb');
    useEffect(() => {
        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });
    }, [scene]);

    return <primitive object={scene} />;
}
useGLTF.preload('./models/tmgtchi.glb')