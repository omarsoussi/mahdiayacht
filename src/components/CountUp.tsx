import { useEffect, useRef, useState } from 'react';

type CountUpProps = {
  end: number;
  duration?: number; // milliseconds
  suffix?: string;
  decimals?: number;
};

export default function CountUp({ end, duration = 2500, suffix = '', decimals = 0 }: CountUpProps) {
  const [value, setValue] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const factor = Math.pow(10, decimals);
            const step = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOutQuad approx
              const current = Math.round(eased * end * factor) / factor;
              setValue(current);
              if (t < 1) requestAnimationFrame(step);
              else setValue(Math.round(end * factor) / factor);
            };
            requestAnimationFrame(step);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref}>
      {value}
      {suffix}
    </div>
  );
}
