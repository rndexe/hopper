import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { InstancedRigidBodies } from '@react-three/rapier';
import { useGame } from '../store';

export default function Fence() {
    const { scene, nodes } = useGLTF('./models/fence.glb');
    const resetKey = useGame((s) => s.resetKey);

    const instances = useMemo(
        () =>
            scene.children.map((child) => ({
                key: child.uuid,
                position: child.position.toArray(),
                rotation: child.rotation.toArray(),
                scale: child.scale.toArray(),
            })),
        [scene.children],
    );
    return (
        <group position-y={0.1} key={resetKey}>
            <InstancedRigidBodies instances={instances} colliders="cuboid" userData={{ name: 'ground' }}>
                <instancedMesh count={instances.length} args={[nodes.Cube012.geometry, undefined, instances.length]}>
                    <meshStandardMaterial color={'#854d0e'} />
                </instancedMesh>
            </InstancedRigidBodies>
        </group>
    );
}

useGLTF.preload('./models/fence.glb');
