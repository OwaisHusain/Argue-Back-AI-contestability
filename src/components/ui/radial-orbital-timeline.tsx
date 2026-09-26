import { useEffect, useRef, useState } from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";

export interface OrbitalItem {
  id: number;
  title: string;
  label: string;
  content: string;
  href: string;
  icon: LucideIcon;
  relatedIds: number[];
  intensity: number;
}

export default function RadialOrbitalTimeline({ items }: { items: OrbitalItem[] }) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(200);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setRadius(Math.max(110, Math.min(210, entry.contentRect.width / 2 - 70)));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeId !== null || reducedMotion) return;
    const timer = setInterval(() => setRotation((prev) => Number(((prev + 0.3) % 360).toFixed(3))), 50);
    return () => clearInterval(timer);
  }, [activeId, reducedMotion]);

  const active = items.find((item) => item.id === activeId);

  const toggle = (id: number) => {
    if (activeId === id) {
      setActiveId(null);
      return;
    }
    const index = items.findIndex((item) => item.id === id);
    setRotation(270 - (index / items.length) * 360);
    setActiveId(id);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-[38rem] w-full items-center justify-center overflow-hidden"
      onClick={(e) => { if (e.target === e.currentTarget) setActiveId(null); }}
    >
      <div className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-lime via-lime/70 to-forest" aria-hidden="true">
        <div className="absolute h-20 w-20 animate-ping rounded-full border border-lime/30 opacity-70" />
        <div className="absolute h-24 w-24 animate-ping rounded-full border border-lime/15 opacity-50" style={{ animationDelay: "0.5s" }} />
        <div className="h-8 w-8 rounded-full bg-night/80 backdrop-blur-md" />
      </div>

      <div className="pointer-events-none absolute rounded-full border border-light-line" style={{ width: radius * 2, height: radius * 2 }} aria-hidden="true" />

      {items.map((item, index) => {
        const angle = ((index / items.length) * 360 + rotation) % 360;
        const radian = (angle * Math.PI) / 180;
        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);
        const isActive = activeId === item.id;
        const isRelated = active?.relatedIds.includes(item.id) ?? false;
        const opacity = Math.max(0.5, Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2)));
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="absolute transition-all duration-700"
            style={{ transform: `translate(${x}px, ${y}px)`, zIndex: isActive ? 200 : Math.round(100 + 50 * Math.cos(radian)), opacity: isActive ? 1 : opacity }}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isActive}
              aria-label={`${item.title}: ${item.label}`}
              className="group relative flex flex-col items-center outline-none"
            >
              <span
                aria-hidden="true"
                className={`absolute rounded-full ${isRelated ? "animate-pulse" : ""}`}
                style={{
                  background: "radial-gradient(circle, color-mix(in srgb, var(--lime) 28%, transparent) 0%, transparent 70%)",
                  width: item.intensity * 0.5 + 44,
                  height: item.intensity * 0.5 + 44,
                  top: -(item.intensity * 0.5) / 2 - 2,
                }}
              />
              <span
                className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-lime ${
                  isActive
                    ? "scale-125 border-lime bg-lime text-night shadow-lg shadow-lime/30"
                    : isRelated
                      ? "animate-pulse border-lime bg-lime/40 text-night"
                      : "border-paper/40 bg-night text-paper group-hover:border-lime"
                }`}
              >
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className={`mt-3 whitespace-nowrap font-display text-lg transition-all duration-300 ${isActive ? "text-lime" : "text-paper/80"}`}>{item.title}</span>
            </button>

            {isActive && (
              <div className="absolute left-1/2 top-24 w-64 -translate-x-1/2 border border-light-line bg-night/95 p-5 text-left shadow-xl shadow-black/40 backdrop-blur-lg">
                <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-lime/60" aria-hidden="true" />
                <p className="font-sans text-xs uppercase tracking-wider text-lime">{item.label}</p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-paper/85">{item.content}</p>
                <div className="mt-4 border-t border-light-line pt-3">
                  <div className="mb-1 flex items-center justify-between font-sans text-xs text-paper/70">
                    <span>How hard it pushes</span>
                    <span className="tabular-nums">{item.intensity}%</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-paper/10">
                    <div className="h-full bg-gradient-to-r from-forest to-lime" style={{ width: `${item.intensity}%` }} />
                  </div>
                </div>
                {item.relatedIds.length > 0 && (
                  <div className="mt-4 border-t border-light-line pt-3">
                    <p className="mb-2 font-sans text-xs uppercase tracking-wider text-paper/60">Pairs well with</p>
                    <div className="flex flex-wrap gap-1">
                      {item.relatedIds.map((relatedId) => {
                        const related = items.find((i) => i.id === relatedId);
                        return (
                          <button
                            key={relatedId}
                            type="button"
                            onClick={() => toggle(relatedId)}
                            className="flex h-6 items-center border border-light-line px-2 font-sans text-xs text-paper/80 transition-colors hover:bg-paper/10 hover:text-paper"
                          >
                            {related?.title}
                            <ArrowRight size={10} className="ml-1 text-paper/60" aria-hidden="true" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                <a href={item.href} className="mt-4 inline-block border-b border-lime pb-0.5 font-sans text-sm text-lime">See the example</a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
