import { Color, MathUtils } from 'three';
import { useRef, useMemo } from 'react';
import { useThree, extend } from '@react-three/fiber';
import { shaderMaterial, Sparkles } from '@react-three/drei';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useGame } from '../store';

gsap.registerPlugin(useGSAP);

const SparkleMaterial = shaderMaterial(
    {
        time: 0,
        pixelRatio: 1,
        clr: new Color(1, 1, 1),
        opcty: 0,
    },
    /* glsl */ `
          uniform float pixelRatio;
          uniform float time;
          attribute float size;  
          attribute float speed;  
          attribute float opacity;
          attribute vec3 noise;
          attribute vec3 color;
          varying vec3 vColor;
          varying float vOpacity;
  
          void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
            modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
            modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectionPostion = projectionMatrix * viewPosition;
            gl_Position = projectionPostion;
            gl_PointSize = size * 25. * pixelRatio;
            gl_PointSize *= (1.0 / - viewPosition.z);
            vColor = color;
            vOpacity = opacity;
          }
        `,
    /* glsl */ `
          uniform vec3 clr;
          uniform float opcty;
          varying vec3 vColor;
          varying float vOpacity;
          void main() {
            float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
            float strength = 0.05 / distanceToCenter - 0.1;
            gl_FragColor = vec4(clr, strength * vOpacity * opcty);
            // #include <tonemapping_fragment>
            // #include <colorspace_fragment>
          }
        `,
);

extend({ SparkleMaterial });

function Firefly(props) {
    const dpr = useThree((state) => state.viewport.dpr);
    const ref = useRef();
    const time = useGame((s) => s.time);

    useGSAP(() => {
        if (time == 'noon') gsap.to(ref.current.material, { opcty: 1, duration: 5 });
        else if (time == 'night') gsap.to(ref.current.material.clr, { r: 1, g: 0.8, b: 1, duration: 5 });
        else if (time == 'morning') {
            gsap.to(ref.current.material, { opcty: 0, duration: 5 });
            gsap.to(ref.current.material.clr, { r: 1, g: 0.8, b: 0, duration: 5 });
        }
    }, [time]);

    return (
        <Sparkles ref={ref} scale={[5, 1, 5]} {...props}>
            <sparkleMaterial key={SparkleMaterial.key} transparent pixelRatio={dpr} depthWrite={false} />
        </Sparkles>
    );
}

export default function Fireflies({ count }) {
    const sizes = useMemo(() => Float32Array.from({ length: count }, () => MathUtils.randFloat(10, 20)), [count]);
    return (
        <>
            <Firefly count={count} position={[10, 2, 10]} size={sizes} />
            <Firefly count={count} position={[-18, 2, 0]} size={sizes} />
        </>
    );
}
