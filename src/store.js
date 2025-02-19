import { create } from 'zustand';

export const useGame = create((set, get) => {
    return {
        time: "morning",
        setTime: (time) => set({ time: time }),
    };
});

export const mutation = {
    isJumping: false,
    position: { x: 0, y: 2, z: 0 },
};
