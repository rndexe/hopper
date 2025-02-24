import { useGameActions, GameState, useGame } from '../store';
import { isTouch } from '../utils';

export function StartScreen() {
    const { setGameState } = useGameActions();
    return (
        <ModalContainer>
            <h1>
                Hoppy hoppy <wbr />
                boing boing
            </h1>
            <div className="intro-p">
                <p>Use {isTouch() ? 'Joystick' : 'WASD/Arrow keys'} to move.</p>
                <p>Stay safe at night!</p>
            </div>

            <button
                className="start"
                onClick={() => {
                    setGameState(GameState.started);
                }}>
                Start game
            </button>
        </ModalContainer>
    );
}

export function Reset() {
    const { deathReason } = useGame.getState();
    const { reset } = useGameActions();

    return (
        <ModalContainer>
            <h2>{`You died ${deathReason}`}</h2>
            <button className="start" onClick={reset}>
                Play again
            </button>
        </ModalContainer>
    );
}

function ModalContainer({ children }) {
    return <div className="inner pixel-corners">{children}</div>;
}
