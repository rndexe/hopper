import { useEffect } from 'react';
import { mutation, useGameActions } from '../store';
import { isTouch } from '../utils';
import Joystick from 'rc-joystick';

const keyMap = {
    ArrowLeft: 'left',
    KeyA: 'left',
    Left: ['left'],
    ArrowRight: 'right',
    KeyD: 'right',
    Right: ['right'],
    ArrowUp: 'forward',
    KeyW: 'forward',
    Top: ['forward'],
    ArrowDown: 'back',
    KeyS: 'back',
    Bottom: ['back'],

    LeftTop: ['left', 'forward'],
    TopLeft: ['left', 'forward'],
    RightTop: ['right', 'forward'],
    TopRight: ['right', 'forward'],
    LeftBottom: ['left', 'back'],
    BottomLeft: ['left', 'back'],
    RightBottom: ['right', 'back'],
    BottomRight: ['right', 'back'],
    LeftRight: ['left', 'right'],
    RightLeft: ['left', 'right'],
    TopBottom: ['forward', 'back'],
    BottomTop: ['forward', 'back'],

    Center: [], // Reset all
};

export function KeyboardControls() {
    const { setUserInput } = useGameActions();
    function downHandler(e) {
        setKeyStore(e.code, true);
        if (!e.repeat) setUserInput(true);
    }

    function upHandler(e) {
        setKeyStore(e.code, false);
        setUserInput(false);
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

export function JoystickControls() {
    function handleJoystick(code) {
        setKeyStore(code, true);
        if (code != 'Center') setUserInput(true);
        else setUserInput(false);
    }
    return (
        isTouch() && (
            <Joystick
                directionCount={1}
                baseRadius={45}
                controllerRadius={30}
                className={'joystick'}
                throttle={200}
                onDirectionChange={handleJoystick}
            />
        )
    );
}

function setKeyStore(code, bool) {
    const keys = mutation.controls;

    const direction = keyMap[code];

    if (Array.isArray(direction)) {
        // Set only the specified directions to `true`, others to `false`
        Object.keys(keys).forEach((dir) => (keys[dir] = direction.includes(dir)));
    } else {
        keys[direction] = bool;
    }
}
