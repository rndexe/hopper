/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/tmgtchi.glb -I --shadows 
Files: public/models/tmgtchi.glb [202.54KB] > /home/rnd/code/3D/tamagotchi/tmgtchi-transformed.glb [49.51KB] (76%)
*/

import React from 'react';
import { useGLTF, Merged } from '@react-three/drei';

const context = React.createContext();

export function Instances({ children, ...props }) {
    const { nodes } = useGLTF('./models/tmgtchi-transformed.glb');
    const instances = React.useMemo(
        () => ({
            Rocktall: nodes.rocktall006,
        }),
        [nodes],
    );
    return (
        <Merged meshes={instances} {...props}>
            {(instances) => <context.Provider value={instances} children={children} />}
        </Merged>
    );
}

export function Model(props) {
    const instances = React.useContext(context);
    return (
        <group {...props} dispose={null}>
            <instances.Rocktall
                position={[-16.428, 0.561, -29.162]}
                rotation={[-Math.PI, 1.204, -Math.PI]}
                scale={[10.801, 11.493, 20.665]}
            />
        </group>
    );
}

useGLTF.preload('/tmgtchi-transformed.glb');

export default function Scenery() {
    return (
        <Instances castShadow receiveShadow>
            <Model />
        </Instances>
    );
}

useGLTF.preload('./models/tmgtchi-transformed.glb');
