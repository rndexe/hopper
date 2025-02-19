import { useGLTF } from '@react-three/drei';
import {} from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
export default function Colliders() {
    const { scene } = useGLTF('./models/colliders.glb');

    return (
        <RigidBody type="fixed" restitution={1}>
            {scene.children.map((child) =>
                child.isMesh ? (
                    <CuboidCollider
                        key={child.uuid}
                        args={child.scale.toArray()} // Use scale as collider size
                        position={child.position.toArray()}
                        // scale={[child.scale.x, 5, child.scale.z]}
                        rotation={child.rotation.toArray()}
                    />
                ) : null,
            )}
        </RigidBody>
    );
}

useGLTF.preload('./models/colliders.glb');
