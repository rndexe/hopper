import { NearestMipMapNearestFilter } from 'three';
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
        textureRef.current.minFilter = NearestMipMapNearestFilter;
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
        } else if (animation == 'full') {
            fullAnimation(context.current, frameCount.current);
        } else if (animation == 'hurt') {
            hurtAnimation(context.current, frameCount.current);
        }

        if (textureRef.current) textureRef.current.needsUpdate = true;
        frameCount.current += 1;
        timeoutID.current = setTimeout(updateCanvas, 1000);
    }

    return (
        <sprite position={[1.3, 1.2, 0]} scale={[1, 1, 1]}>
            <spriteMaterial depthTest={false}>
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
    ctx.font = '80px Editundo';
    ctx.fillText('z', 20 + 40 * fc, 200 - 20 * fc);
}

function fullAnimation(ctx, frameCount) {
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.font = '80px Editundo';
    ctx.textAlign = 'center';
    ctx.fillText('TOO', canvasSize / 2, canvasSize / 2);
    ctx.fillText('FULL!', canvasSize / 2, canvasSize / 2 + 60);
}

function hurtAnimation(ctx, frameCount) {
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.font = '80px Editundo';
    ctx.textAlign = 'center';
    ctx.fillText('OUCH!', canvasSize / 2, canvasSize / 2 + 60);
}
