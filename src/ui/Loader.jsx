import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { useGame, useGameActions } from '../store';

export default function Loader() {
    const { active, progress, item } = useProgress();
    const gameStart = useGame((s) => s.gameStart);
    const { setGameStart } = useGameActions();

    const [shown, setShown] = useState(active);

    useEffect(() => {
        let timeoutID;
        if (active !== shown) timeoutID = setTimeout(() => setShown(active), 300);
        return () => clearTimeout(timeoutID);
    }, [shown, active]);

    return gameStart ? null : (
        <div className="container">
            <div className="inner">
                {shown ? (
                    <div>Loading {item}</div>
                ) : (
                    <button
                        className="start pixel-corners"
                        onClick={() => {
                            setGameStart(true);
                        }}>
                        Start game
                    </button>
                )}
            </div>
        </div>
    );
}
