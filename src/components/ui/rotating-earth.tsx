import { useEffect, useRef } from "react";

type City = { name: string; lat: number; lon: number };

const CITIES: City[] = [
  { name: "San Salvador", lat: 13.7, lon: -89.2 },
  { name: "New York", lat: 40.7, lon: -74.0 },
  { name: "London", lat: 51.5, lon: -0.1 },
  { name: "Zurich", lat: 47.4, lon: 8.5 },
  { name: "Paris", lat: 48.9, lon: 2.3 },
  { name: "Dubai", lat: 25.2, lon: 55.3 },
  { name: "Singapore", lat: 1.35, lon: 103.8 },
  { name: "Hong Kong", lat: 22.3, lon: 114.2 },
  { name: "Tokyo", lat: 35.7, lon: 139.7 },
  { name: "Sydney", lat: -33.9, lon: 151.2 },
  { name: "Sao Paulo", lat: -23.5, lon: -46.6 },
  { name: "Lagos", lat: 6.5, lon: 3.4 },
  { name: "Johannesburg", lat: -26.2, lon: 28.0 },
  { name: "Mumbai", lat: 19.1, lon: 72.9 },
  { name: "Toronto", lat: 43.7, lon: -79.4 },
  { name: "Los Angeles", lat: 34.0, lon: -118.2 },
  { name: "Buenos Aires", lat: -34.6, lon: -58.4 },
];

type Flow = {
  fromIdx: number;
  toIdx: number;
  startMs: number;
  durationMs: number;
};

const DEG = Math.PI / 180;

function latLonToVec(lat: number, lon: number): [number, number, number] {
  const la = lat * DEG;
  const lo = lon * DEG;
  return [Math.cos(la) * Math.sin(lo), -Math.sin(la), Math.cos(la) * Math.cos(lo)];
}

function rotateY([x, y, z]: [number, number, number], a: number): [number, number, number] {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [c * x + s * z, y, -s * x + c * z];
}

function slerp(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  if (omega < 1e-4) return a;
  const s = Math.sin(omega);
  const k1 = Math.sin((1 - t) * omega) / s;
  const k2 = Math.sin(t * omega) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

export function RotatingEarth({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const flowsRef = useRef<Flow[]>([]);
  const nextFlowRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const start = performance.now();
    nextFlowRef.current = start + 400;

    const spawnFlow = (now: number) => {
      let fromIdx = Math.floor(Math.random() * CITIES.length);
      let toIdx = Math.floor(Math.random() * CITIES.length);
      if (toIdx === fromIdx) toIdx = (toIdx + 1) % CITIES.length;
      flowsRef.current.push({
        fromIdx,
        toIdx,
        startMs: now,
        durationMs: 3500 + Math.random() * 2500,
      });
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const rotation = (t / 60) * Math.PI * 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width, height) * 0.42;

      const glow = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.35);
      glow.addColorStop(0, "rgba(247,147,26,0.12)");
      glow.addColorStop(0.6, "rgba(247,147,26,0.04)");
      glow.addColorStop(1, "rgba(247,147,26,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.4, 0, Math.PI * 2);
      ctx.fill();

      const sphere = ctx.createRadialGradient(
        cx - R * 0.25,
        cy - R * 0.3,
        R * 0.1,
        cx,
        cy,
        R
      );
      sphere.addColorStop(0, "rgba(30,30,34,0.55)");
      sphere.addColorStop(1, "rgba(10,10,12,0.85)");
      ctx.fillStyle = sphere;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(247,147,26,0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      const project = (v: [number, number, number]) => ({
        x: cx + v[0] * R,
        y: cy + v[1] * R,
        z: v[2],
      });

      ctx.lineWidth = 0.8;

      for (let lonDeg = 0; lonDeg < 360; lonDeg += 20) {
        ctx.beginPath();
        let started = false;
        for (let latDeg = -90; latDeg <= 90; latDeg += 4) {
          const v = rotateY(latLonToVec(latDeg, lonDeg), rotation);
          const p = project(v);
          if (p.z >= 0) {
            const alpha = 0.08 + p.z * 0.22;
            ctx.strokeStyle = `rgba(247,147,26,${alpha})`;
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            if (started) ctx.stroke();
            ctx.beginPath();
            started = false;
          }
        }
        if (started) ctx.stroke();
      }

      for (let latDeg = -60; latDeg <= 60; latDeg += 20) {
        ctx.beginPath();
        let started = false;
        for (let lonDeg = 0; lonDeg <= 360; lonDeg += 4) {
          const v = rotateY(latLonToVec(latDeg, lonDeg), rotation);
          const p = project(v);
          if (p.z >= 0) {
            const alpha = 0.06 + p.z * 0.18;
            ctx.strokeStyle = `rgba(247,147,26,${alpha})`;
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            if (started) ctx.stroke();
            ctx.beginPath();
            started = false;
          }
        }
        if (started) ctx.stroke();
      }

      const cityPts = CITIES.map((c) => {
        const v = rotateY(latLonToVec(c.lat, c.lon), rotation);
        return { v, p: project(v) };
      });

      for (const { p } of cityPts) {
        if (p.z < 0) continue;
        ctx.fillStyle = `rgba(247,147,26,${0.35 + p.z * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (now >= nextFlowRef.current) {
        spawnFlow(now);
        nextFlowRef.current = now + 500 + Math.random() * 900;
      }

      flowsRef.current = flowsRef.current.filter(
        (f) => now - f.startMs < f.durationMs + 200
      );

      for (const f of flowsRef.current) {
        const t01 = Math.max(0, Math.min(1, (now - f.startMs) / f.durationMs));
        const a = rotateY(latLonToVec(CITIES[f.fromIdx].lat, CITIES[f.fromIdx].lon), rotation);
        const b = rotateY(latLonToVec(CITIES[f.toIdx].lat, CITIES[f.toIdx].lon), rotation);

        const STEPS = 48;
        const arcHeight = 0.35;
        const pts: { x: number; y: number; z: number }[] = [];
        for (let i = 0; i <= STEPS; i++) {
          const u = i / STEPS;
          const m = slerp(a, b, u);
          const lift = 1 + arcHeight * Math.sin(u * Math.PI);
          const pv: [number, number, number] = [m[0] * lift, m[1] * lift, m[2] * lift];
          pts.push({ x: cx + pv[0] * R, y: cy + pv[1] * R, z: pv[2] });
        }

        const head = Math.floor(STEPS * t01);
        const tailLen = 14;
        const tailStart = Math.max(0, head - tailLen);

        for (let i = tailStart; i < head; i++) {
          const p0 = pts[i];
          const p1 = pts[i + 1];
          if (!p0 || !p1) continue;
          if (p0.z < -0.05 && p1.z < -0.05) continue;
          const k = (i - tailStart) / Math.max(1, head - tailStart);
          const alpha = k * 0.9 * (0.4 + 0.6 * Math.min(1, (p0.z + p1.z) / 2 + 0.5));
          ctx.strokeStyle = `rgba(247,147,26,${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }

        const headPt = pts[Math.min(head, pts.length - 1)];
        if (headPt && headPt.z > -0.1) {
          ctx.fillStyle = "rgba(255,193,88,0.95)";
          ctx.beginPath();
          ctx.arc(headPt.x, headPt.y, 2.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "rgba(247,147,26,0.35)";
          ctx.beginPath();
          ctx.arc(headPt.x, headPt.y, 5, 0, Math.PI * 2);
          ctx.fill();
        }

        const endA = pts[0];
        const endB = pts[pts.length - 1];
        if (endA.z > 0) {
          ctx.fillStyle = "rgba(255,193,88,0.7)";
          ctx.beginPath();
          ctx.arc(endA.x, endA.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        if (t01 >= 0.98 && endB.z > 0) {
          const pulse = 1 - (t01 - 0.98) / 0.02;
          ctx.strokeStyle = `rgba(247,147,26,${pulse * 0.9})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(endB.x, endB.y, 6 + (1 - pulse) * 10, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
