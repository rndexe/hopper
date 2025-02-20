import { useEffect } from 'react';
import { mutation } from '../store';

export default function KeyboardControls() {
    function downHandler(e) {
        setKeyStore(e.code, true);
    }

    function upHandler(e) {
        setKeyStore(e.code, false);
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);
}

function setKeyStore(code, bool) {
    const keys = mutation.controls;

    const keyMap = {
        KeyW: 'forward',
        ArrowUp: 'forward',
        KeyS: 'back',
        ArrowDown: 'back',
        KeyA: 'left',
        ArrowLeft: 'left',
        KeyD: 'right',
        ArrowRight: 'right',
    };
    if (keyMap[code]) keys[keyMap[code]] = bool;
}
