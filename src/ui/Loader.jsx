import { useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { GameState, useGameActions } from '../store';

export default function Loader() {
    const item = useProgress((s) => s.item);
    const progress = useProgress((s) => s.progress);
    const { setGameState } = useGameActions();

    // useEffect(() => {
    //     // let timeoutID;
    //     // if (!active)
    //     //     timeoutID = setTimeout(() => {
    //     //         setGameState(GameState.loaded);
    //     //     }, 300);
    //     // return () => clearTimeout(timeoutID);
    // }, [active]);

    useEffect(() => {
        // console.log(progress);
        let timeoutID;
        if (progress >= 100) {
            timeoutID = setTimeout(() => {
                setGameState(GameState.loaded);
            }, 100);
        }
        return () => clearTimeout(timeoutID);
    }, [progress]);
    return <div>Loading {item}</div>;
}
