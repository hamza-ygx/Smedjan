"use client";

import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; hue: number };

// Embers rising off the edges of the build frame while the app is being forged.
export function Sparks({ active, target }: { active: boolean; target: React.RefObject<HTMLElement | null> }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const sparks: Spark[] = [];
    let raf = 0;
    let last = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = cv.getBoundingClientRect();
      cv.width = r.width * dpr;
      cv.height = r.height * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    const spawn = (box: DOMRect, host: DOMRect) => {
      const edge = Math.random();
      const left = box.left - host.left;
      const top = box.top - host.top;
      let x: number, y: number;
      if (edge < 0.6) {
        x = left + Math.random() * box.width;
        y = top + box.height;
      } else {
        x = edge < 0.8 ? left : left + box.width;
        y = top + box.height * (0.35 + Math.random() * 0.65);
      }
      const max = 0.9 + Math.random() * 1.4;
      sparks.push({
        x, y,
        vx: (Math.random() - 0.5) * 60 + (edge >= 0.6 ? (edge < 0.8 ? -30 : 30) : 0),
        vy: -60 - Math.random() * 160,
        life: 0, max,
        size: 0.8 + Math.random() * 2.2,
        hue: 18 + Math.random() * 22,
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const host = cv.getBoundingClientRect();
      const box = target.current?.getBoundingClientRect();
      if (activeRef.current && box) for (let i = 0; i < 3; i++) if (Math.random() < 0.8) spawn(box, host);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, host.width, host.height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += dt;
        if (s.life >= s.max) { sparks.splice(i, 1); continue; }
        s.vx += (Math.random() - 0.5) * 120 * dt;
        s.vy += 18 * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        const k = 1 - s.life / s.max;
        const r = s.size * (0.6 + k);
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 4);
        g.addColorStop(0, `hsla(${s.hue + 20}, 100%, 75%, ${k})`);
        g.addColorStop(0.3, `hsla(${s.hue}, 100%, 55%, ${k * 0.6})`);
        g.addColorStop(1, `hsla(${s.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = sparks.length || activeRef.current ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
    };
    kick();
    const iv = setInterval(() => activeRef.current && kick(), 250);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(iv);
      ro.disconnect();
    };
  }, [target]);

  return <canvas ref={canvas} className="sparks" aria-hidden />;
}
