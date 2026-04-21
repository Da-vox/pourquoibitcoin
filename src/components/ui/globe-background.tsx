import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const GLOBE_SIZE = 900;
const TILT = 0.28;
const ROTATION_SPEED = 0.0025;

const CAPITAL_MARKERS: { location: [number, number]; size: number }[] = [
  { location: [48.8566, 2.3522], size: 0.06 },     // Paris
  { location: [51.5074, -0.1278], size: 0.06 },    // London
  { location: [40.7128, -74.006], size: 0.07 },    // New York
  { location: [35.6762, 139.6503], size: 0.07 },   // Tokyo
  { location: [39.9042, 116.4074], size: 0.07 },   // Beijing
  { location: [55.7558, 37.6173], size: 0.06 },    // Moscow
  { location: [28.6139, 77.209], size: 0.06 },     // Delhi
  { location: [-33.8688, 151.2093], size: 0.06 },  // Sydney
  { location: [-22.9068, -43.1729], size: 0.06 },  // Rio de Janeiro
  { location: [-34.6037, -58.3816], size: 0.05 },  // Buenos Aires
  { location: [-33.9249, 18.4241], size: 0.05 },   // Cape Town
  { location: [30.0444, 31.2357], size: 0.06 },    // Cairo
  { location: [19.4326, -99.1332], size: 0.06 },   // Mexico City
  { location: [1.3521, 103.8198], size: 0.05 },    // Singapore
  { location: [25.2048, 55.2708], size: 0.05 },    // Dubai
  { location: [52.52, 13.405], size: 0.05 },       // Berlin
  { location: [6.5244, 3.3792], size: 0.05 },      // Lagos
  { location: [13.7563, 100.5018], size: 0.05 },   // Bangkok
];

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
      diffuse: 1.4,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 8,
      baseColor: [0.45, 0.38, 0.3],
      markerColor: [1, 0.58, 0.23],
      glowColor: [0.5, 0.3, 0.15],
      offset: [0, 0],
      markers: CAPITAL_MARKERS,
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
