import { Environment, SoftShadows } from "@react-three/drei";

export default function Lights() {
    return (
        <>
            <directionalLight
                position={[0, 1.5, 0]}
                castShadow
                shadow-mapSize={[256, 256]}
              
            />
            <Environment preset="forest" />
            {/* <SoftShadows size={25} focus={1} /> */}
        </>
    );
}