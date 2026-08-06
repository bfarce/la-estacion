import { useEffect, useRef, useState } from "react";

export type RevealVariant = "up" | "scale" | "left" | "right";

type RevealOptions = {
  delay?: number;
  variant?: RevealVariant;
};

const VARIANTS: Record<RevealVariant, string> = {
  up: "reveal-up",
  scale: "reveal-scale",
  left: "reveal-left",
  right: "reveal-right",
};

/** Revela un elemento al entrar en viewport (fade + desplazamiento + desenfoque). */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: number | RevealOptions = 0,
) {
  const { delay = 0, variant = "up" } =
    typeof options === "number" ? { delay: options } : options;

  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          timer = window.setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    obs.observe(el);
    return () => {
      window.clearTimeout(timer);
      obs.disconnect();
    };
  }, [delay]);

  const base = VARIANTS[variant];

  return {
    ref,
    visible,
    className: visible ? `${base} reveal-in` : base,
  };
}
