import { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import Apple from './Apple';
import { floorHeight } from './constants';
import { playAudio } from './utils';

export default function Food() {
    const appleRef = useRef();
    const eatSound = useRef(new Audio('./audio/pop.mp3'));

    const handleIntersection = () => {
        const pos = appleRef.current.translation();
        appleRef.current.setTranslation({ x: pos.x, y: -5, z: pos.z });
        playAudio(eatSound.current)
        setTimeout(reset, 2000);
    };

    const reset = () => {
        const pos = appleRef.current.translation();
        appleRef.current.setTranslation({ x: pos.x, y: floorHeight / 2 + 1, z: pos.z });
    };
    return (
        <RigidBody
            type="fixed"
            position={[2, floorHeight / 2 + 1, 2]}
            scale={10}
            sensor
            onIntersectionEnter={handleIntersection}
            ref={appleRef}>
            <Apple />
        </RigidBody>
    );
}
