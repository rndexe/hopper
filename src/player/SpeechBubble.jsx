import { NearestFilter } from 'three';
import { useRef, useEffect } from 'react';
import { mutation, useGame, canvasSize } from '../store';

export default function SpeechBubble() {
    const canvasRef = useRef(document.createElement('canvas'));
    const context = useRef(canvasRef.current.getContext('2d'));
    const textureRef = useRef();
    const frameCount = useRef(0);
    const animation = useGame((s) => s.animation);

    const timeoutID = useRef(0);

    useEffect(() => {
        canvasRef.current.width = canvasSize;
        canvasRef.current.height = canvasSize;
        textureRef.current.minFilter = NearestFilter;
    }, []);

    useEffect(() => {
        context.current.clearRect(0, 0, canvasSize, canvasSize);
        frameCount.current = 0;
        updateCanvas();
        return () => clearTimeout(mutation.timeoutID);
    }, [animation]);

    function updateCanvas() {
        if (animation == 'idle') {
            context.current.clearRect(0, 0, canvasSize, canvasSize);
            textureRef.current.needsUpdate = true;
            clearTimeout(timeoutID.current);
            return;
        } else if (animation == 'sleeping') {
            sleepAnimation(context.current, frameCount.current);
        }

        if (textureRef.current) textureRef.current.needsUpdate = true;
        frameCount.current += 1;
        timeoutID.current = setTimeout(updateCanvas, 1000);
    }

    // useAnimationDebug(animation);

    return (
        <sprite position={[1.3, 1.2, 0]} scale={[1, 1, 1]}>
            <spriteMaterial>
                <canvasTexture ref={textureRef} attach="map" image={canvasRef.current} />
            </spriteMaterial>
        </sprite>
    );
}

function sleepAnimation(ctx, frameCount) {
    const fc = frameCount % 3;
    if (fc == 0) {
        ctx.clearRect(0, 0, canvasSize, canvasSize);
    }

    ctx.fillStyle = '#fff';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${40}px EditUndo`;
    ctx.fillText(`z`, 20 + 20 * fc, 100 - 20 * fc);
}
