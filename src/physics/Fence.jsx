import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export default function Fence() {
    const { scene } = useGLTF('./models/fence.glb');
    return (
        <group position-y={0.1}>
            {scene.children.map((child) => {
                if (child.isMesh)
                    return (
                        <RigidBody
                            colliders="cuboid"
                            key={child.uuid}
                            rotation={child.rotation.toArray()}
                            position={child.position.toArray()}
                            userData={{ name: 'ground' }}
                            mass={0.1}>
                            <mesh geometry={child.geometry} scale={child.scale.toArray()}>
                                <meshStandardMaterial color={'#854d0e'} />
                            </mesh>
                        </RigidBody>
                    );
                else return null;
            })}
        </group>
    );
}

useGLTF.preload('./models/fence.glb');
