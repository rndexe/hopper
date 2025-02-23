import { create } from 'zustand';

export const groundLevel = 0.25;
export const boundarySize = 20;
export const canvasSize = 128;

export const GameState = {
    loading: 0,
    loaded: 1,
    started: 2,
    over: 3,
};

export const useGame = create((set, get) => {
    return {
        time: 'morning',
        resetKey: 0,
        animation: 'idle',
        userInput: false,
        gameState: GameState.loading,
        health: 50,
        actions: {
            setTime: (time) => set({ time: time }),
            reset: () => set((state) => ({ resetKey: state.resetKey + 1 })),
            setAnimation: (mode) => set({ animation: mode }),
            setUserInput: (bool) => set({ userInput: bool }),
            setGameState: (state) => {
                set({ gameState: state });
            },
            changeHealth: (amount) => {
                const { health } = get();

                const newHealth = health + amount;
                // if (health > 100) setAnimation('full');
                // else if (health < 100) setAnimation('dead');

                set({ health: newHealth });
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
