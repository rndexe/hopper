import { create } from 'zustand';

export const groundLevel = 0.25;
export const boundarySize = 20;
export const canvasSize = 256;

export const GameState = {
    loading: 0,
    loaded: 1,
    started: 2,
    over: 3,
};

export const useGame = create((set, get) => {
    const initialHealth = 50;
    // let timeoutID = 0;
    return {
        time: 'morning',
        resetKey: 0,
        animation: 'idle',
        userInput: false,
        gameState: GameState.loading,
        health: initialHealth,
        deathReason: 'mysteriously',
        actions: {
            setTime: (time) => set({ time: time }),
            reset: () => {
                set((state) => ({
                    resetKey: state.resetKey + 1,
                    health: initialHealth,
                    gameState: GameState.started,
                    animation: 'idle',
                }));
            },
            setAnimation: (mode) => set({ animation: mode }),
            setUserInput: (bool) => set({ userInput: bool }),
            setGameState: (state) => {
                set({ gameState: state });
            },
            changeHealth: (amount) => {
                const { health, animation } = get();
                const newHealth = health + amount;
                let newAnimation = animation;
                if (health >= 150) {
                    newAnimation = 'dead';
                    setTimeout(() => set({ deathReason: 'of overeating', gameState: GameState.over }), 1000);
                } else if (health >= 100) {
                    newAnimation = 'full';
                    setTimeout(() => set({ animation: 'idle' }), 2000);
                }
                set({ health: newHealth, animation: newAnimation });
            },
        },
    };
});

export const useGameActions = () => useGame((s) => s.actions);

export const mutation = {
    isJumping: false,
    position: { x: 0, y: 2, z: 0 },
    jumpVelocity: 5,
    controls: {
        forward: false,
        back: false,
        left: false,
        right: false,
    },
};
