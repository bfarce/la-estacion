import { useEffect, useRef, useState } from "react";

/** Revela un elemento al entrar en viewport (fade + slide up). */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          const t = window.setTimeout(() => setVisible(true), delay);
          obs.disconnect();
          return () => window.clearTimeout(t);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return { ref, className: visible ? "reveal reveal-visible" : "reveal" };
}
