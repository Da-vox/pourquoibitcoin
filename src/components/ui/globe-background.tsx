import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const GLOBE_SIZE = 900;
const TILT = 0.28;
const ROTATION_SPEED = 0.0025;

export function GlobeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const dpr = window.devicePixelRatio ?? 1;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: GLOBE_SIZE * 2,
      height: GLOBE_SIZE * 2,
      phi: 0,
      theta: TILT,
      dark: 1,
      diffuse: 1.1,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 4,
      baseColor: [0.24, 0.18, 0.12],
      markerColor: [1, 0.58, 0.23],
      glowColor: [0.5, 0.3, 0.15],
      offset: [0, 0],
      markers: [],
      onRender: (state) => {
        state.phi = phiRef.current;
        phiRef.current += ROTATION_SPEED;
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: `${GLOBE_SIZE}px`,
          height: `${GLOBE_SIZE}px`,
          position: "absolute",
          right: `-${GLOBE_SIZE * 0.3}px`,
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0.9,
        }}
      />
    </div>
  );
}
