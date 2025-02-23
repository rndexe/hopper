import { GameState, useGame } from '../store';
import { StartScreen, Reset } from './Modals';
import Loader from './Loader';
import Hud from './Hud';

function Overlay() {
    const gameState = useGame((s) => s.gameState);

    switch (gameState) {
        case GameState.loading:
            return <Loader />;
        case GameState.loaded:
            return <StartScreen />;
        case GameState.started:
            return <Hud />;
        case GameState.over:
            return <Reset />;
    }
}

function OverlayContainer() {
    return (
        <div className="container">
            <Overlay />
        </div>
    );
}

export default OverlayContainer;
