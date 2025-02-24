import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { groundLevel, mutation, useGame, useGameActions } from '../store';
import { useState, useEffect } from 'react';

export default function SleepArea() {
    const time = useGame((s) => s.time);
    const { setAnimation } = useGameActions();

    const [isInCave, setIsInCave] = useState();
    const userInputDetected = useGame((s) => s.userInput);
    useEffect(() => {
        if (isInCave && time == 'night') {
            setAnimation('sleeping');
        } else if (useGame.getState().animation == 'sleeping') {
            setAnimation('idle');
        }
    }, [isInCave, time]);

    useEffect(() => {
        const { animation } = useGame.getState();
        if (userInputDetected && animation == 'sleeping') {
            setAnimation('idle');
        }
    }, [userInputDetected]);

    function jumpLess() {
        setIsInCave(true);
        mutation.jumpVelocity = 2;
    }

    function jumpNormal() {
        setIsInCave(false);
        mutation.jumpVelocity = 5;
    }

    return (
        <RigidBody
            type="fixed"
            sensor
            position={[-3.5, groundLevel + 1, -22]}
            onIntersectionEnter={jumpLess}
            onIntersectionExit={jumpNormal}>
            <CuboidCollider args={[2.5, 1, 2.0]} />
        </RigidBody>
    );
}
