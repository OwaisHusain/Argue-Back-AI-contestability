import { useEffect, useRef } from "react";

const TRAIL_HUES = [78, 150, 190, 14, 42];

type Crystal = { x: number; y: number; angle: number; radius: number; target: number; life: number; width: number; turn: number; hue: number };
type Shard = { x: number; y: number; vx: number; vy: number; life: number; size: number; hue: number };

export default function CrystalCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let crystals: Crystal[] = [];
    let shards: Shard[] = [];
    const mouse = { x: -999, y: -999, moving: 0 };
    let hueIndex = 0;
    let frame = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const animate = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.14)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "source-over";

      if (mouse.moving > 0 && Math.random() > 0.55) {
        crystals.push({
          x: mouse.x + (Math.random() - 0.5) * 36,
          y: mouse.y + (Math.random() - 0.5) * 36,
          angle: Math.random() * Math.PI * 2,
          radius: 0,
          target: Math.random() * 46 + 12,
          life: 90,
          width: Math.random() * 1.4 + 0.5,
          turn: (Math.random() - 0.5) * 0.1,
          hue: TRAIL_HUES[hueIndex % TRAIL_HUES.length] ?? 78,
        });
      }
      mouse.moving = Math.max(0, mouse.moving - 1);

      crystals = crystals.filter((c) => c.life > 0);
      for (const c of crystals) {
        if (c.radius < c.target) c.radius += 0.8;
        c.life -= 1;
        c.angle += c.turn;
        ctx.strokeStyle = `hsla(${c.hue}, 80%, 58%, ${c.life / 90})`;
        ctx.lineWidth = c.width;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x + Math.cos(c.angle) * c.radius, c.y + Math.sin(c.angle) * c.radius);
        ctx.stroke();
      }

      shards = shards.filter((s) => s.life > 0);
      for (const s of shards) {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.96;
        s.vy *= 0.96;
        s.life -= 1;
        ctx.fillStyle = `hsla(${s.hue}, 85%, 62%, ${s.life / 70})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(animate);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moving = 12;
    };
    const onClick = (e: MouseEvent) => {
      hueIndex += 1;
      for (let i = 0; i < 36; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        shards.push({ x: e.clientX, y: e.clientY, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 70, size: Math.random() * 2.4 + 0.8, hue: TRAIL_HUES[(hueIndex + i) % TRAIL_HUES.length] ?? 78 });
      }
    };

    resize();
    frame = requestAnimationFrame(animate);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] h-screen w-screen" />;
}
