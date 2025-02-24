import { GameState, useGame } from '../store';
import { StartScreen, Reset } from './Modals';
import Loader from './Loader';
import Hud from './Hud';

export default function Overlay() {
    const gameState = useGame((s) => s.gameState);

    switch (gameState) {
        case GameState.loading:
            return (
                <OverlayContainer>
                    <Loader />
                </OverlayContainer>
            );
        case GameState.loaded:
            return (
                <OverlayContainer>
                    <StartScreen />
                </OverlayContainer>
            );
        case GameState.started:
            return <Hud />;
        case GameState.over:
            return (
                <OverlayContainer>
                    <Reset />
                </OverlayContainer>
            );
    }
}

function OverlayContainer({ children }) {
    return <div className="container">{children}</div>;
}
