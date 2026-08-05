import { useId } from "react";

/**
 * Ilustración SVG premium de una botella, generada por categoría de licor.
 * Sustituye a la fotografía de producto mientras no se cuenta con imágenes
 * reales licenciadas. Pensada para verse elegante, oscura y coherente con
 * la identidad visual de la marca (dorado + negro profundo).
 */

type CategoriaId =
  | "whisky"
  | "ron"
  | "vodka"
  | "tequila"
  | "aguardiente"
  | "cerveza"
  | "vinos"
  | "champanas"
  | "importados";

interface EstiloCategoria {
  /** Color del líquido, de más oscuro a más claro. */
  liquido: [string, string];
  /** Color de acento para el resplandor y detalles. */
  brillo: string;
  /** Tono del vidrio de la botella. */
  vidrio: string;
  /** Forma del cuerpo: "clasica" (whisky/ron), "alta" (vodka/tequila/ginebra), "vino" (vino/champaña). */
  forma: "clasica" | "alta" | "vino";
}

const ESTILOS: Record<CategoriaId, EstiloCategoria> = {
  whisky: {
    liquido: ["oklch(0.42 0.1 55)", "oklch(0.62 0.13 60)"],
    brillo: "oklch(0.75 0.105 85)",
    vidrio: "oklch(0.3 0.02 60)",
    forma: "clasica",
  },
  ron: {
    liquido: ["oklch(0.36 0.09 40)", "oklch(0.55 0.12 48)"],
    brillo: "oklch(0.75 0.105 85)",
    vidrio: "oklch(0.28 0.02 50)",
    forma: "clasica",
  },
  vodka: {
    liquido: ["oklch(0.78 0.01 230)", "oklch(0.94 0.005 230)"],
    brillo: "oklch(0.9 0.02 220)",
    vidrio: "oklch(0.4 0.01 230)",
    forma: "alta",
  },
  tequila: {
    liquido: ["oklch(0.68 0.06 95)", "oklch(0.85 0.05 95)"],
    brillo: "oklch(0.75 0.105 85)",
    vidrio: "oklch(0.35 0.02 90)",
    forma: "alta",
  },
  aguardiente: {
    liquido: ["oklch(0.82 0.01 200)", "oklch(0.96 0.005 200)"],
    brillo: "oklch(0.9 0.02 210)",
    vidrio: "oklch(0.4 0.01 200)",
    forma: "alta",
  },
  cerveza: {
    liquido: ["oklch(0.62 0.1 75)", "oklch(0.82 0.1 85)"],
    brillo: "oklch(0.85 0.08 88)",
    vidrio: "oklch(0.35 0.03 75)",
    forma: "clasica",
  },
  vinos: {
    liquido: ["oklch(0.22 0.09 20)", "oklch(0.38 0.13 18)"],
    brillo: "oklch(0.75 0.105 85)",
    vidrio: "oklch(0.25 0.02 20)",
    forma: "vino",
  },
  champanas: {
    liquido: ["oklch(0.72 0.05 90)", "oklch(0.9 0.04 92)"],
    brillo: "oklch(0.9 0.06 90)",
    vidrio: "oklch(0.35 0.02 90)",
    forma: "vino",
  },
  importados: {
    liquido: ["oklch(0.4 0.08 60)", "oklch(0.6 0.11 65)"],
    brillo: "oklch(0.75 0.105 85)",
    vidrio: "oklch(0.3 0.02 60)",
    forma: "clasica",
  },
};

/** Devuelve una inicial elegante para el sello de la etiqueta. */
function inicial(marca: string): string {
  const limpio = marca.trim();
  return limpio.length > 0 ? limpio.charAt(0).toUpperCase() : "L";
}

export function BottleArt({
  categoria,
  marca,
  className,
}: {
  categoria: string;
  marca: string;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const estilo = ESTILOS[categoria as CategoriaId] ?? ESTILOS.importados;
  const liqOscuro = estilo.liquido[0];
  const liqClaro = estilo.liquido[1];

  // Geometría esbelta del cuerpo, con hombro curvo (bézier) según la forma.
  // neckTop: base del corcho · shoulderStart: fin del cuello · shoulderEnd: inicio del cuerpo recto
  const g =
    estilo.forma === "alta"
      ? { neckTop: 92, shoulderStart: 175, shoulderEnd: 210, half: 72, bottom: 452, neckHalf: 15 }
      : estilo.forma === "vino"
        ? { neckTop: 92, shoulderStart: 230, shoulderEnd: 262, half: 80, bottom: 452, neckHalf: 12 }
        : { neckTop: 92, shoulderStart: 155, shoulderEnd: 205, half: 92, bottom: 452, neckHalf: 17 };

  const round = 16;
  const bottlePath = `
    M ${200 - g.neckHalf} ${g.neckTop}
    L ${200 + g.neckHalf} ${g.neckTop}
    L ${200 + g.neckHalf} ${g.shoulderStart}
    C ${200 + g.neckHalf} ${g.shoulderStart + (g.shoulderEnd - g.shoulderStart) * 0.35},
      ${200 + g.half} ${g.shoulderEnd - (g.shoulderEnd - g.shoulderStart) * 0.55},
      ${200 + g.half} ${g.shoulderEnd}
    L ${200 + g.half} ${g.bottom - round}
    Q ${200 + g.half} ${g.bottom} ${200 + g.half - round} ${g.bottom}
    L ${200 - g.half + round} ${g.bottom}
    Q ${200 - g.half} ${g.bottom} ${200 - g.half} ${g.bottom - round}
    L ${200 - g.half} ${g.shoulderEnd}
    C ${200 - g.half} ${g.shoulderEnd - (g.shoulderEnd - g.shoulderStart) * 0.55},
      ${200 - g.neckHalf} ${g.shoulderStart + (g.shoulderEnd - g.shoulderStart) * 0.35},
      ${200 - g.neckHalf} ${g.shoulderStart}
    Z
  `;

  const labelHalf = g.half - 8;
  const labelTop = g.shoulderEnd + 34;
  const labelHeight = 96;

  return (
    <svg
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Ilustración de ${marca}`}
      className={className}
    >
      <defs>
        <radialGradient id={`bg-${uid}`} cx="50%" cy="38%" r="75%">
          <stop offset="0%" stopColor="var(--surface-elevated)" />
          <stop offset="65%" stopColor="var(--surface)" />
          <stop offset="100%" stopColor="oklch(0.08 0.003 60)" />
        </radialGradient>

        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={estilo.vidrio} stopOpacity="0.55" />
          <stop offset="18%" stopColor="oklch(0.55 0.01 90)" stopOpacity="0.35" />
          <stop offset="50%" stopColor={estilo.vidrio} stopOpacity="0.42" />
          <stop offset="82%" stopColor="oklch(0.55 0.01 90)" stopOpacity="0.3" />
          <stop offset="100%" stopColor={estilo.vidrio} stopOpacity="0.55" />
        </linearGradient>

        <linearGradient id={`liquid-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={liqClaro} />
          <stop offset="100%" stopColor={liqOscuro} />
        </linearGradient>

        <linearGradient id={`label-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.97 0.004 85)" />
          <stop offset="100%" stopColor="oklch(0.88 0.01 85)" />
        </linearGradient>

        <radialGradient id={`glow-${uid}`} cx="50%" cy="30%" r="55%">
          <stop offset="0%" stopColor={estilo.brillo} stopOpacity="0.35" />
          <stop offset="100%" stopColor={estilo.brillo} stopOpacity="0" />
        </radialGradient>

        <radialGradient id={`floor-${uid}`} cx="50%" cy="0%" r="70%">
          <stop offset="0%" stopColor={estilo.brillo} stopOpacity="0.22" />
          <stop offset="100%" stopColor={estilo.brillo} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Fondo */}
      <rect width="400" height="500" fill={`url(#bg-${uid})`} />
      <circle cx="200" cy="150" r="180" fill={`url(#glow-${uid})`} />

      {/* Reflejo de piso */}
      <ellipse cx="200" cy="452" rx="110" ry="16" fill={`url(#floor-${uid})`} />

      {/* Partículas doradas */}
      <g opacity="0.5">
        <circle cx="88" cy="120" r="1.6" fill="var(--gold)" />
        <circle cx="322" cy="160" r="2.2" fill="var(--gold)" />
        <circle cx="70" cy="300" r="1.4" fill="var(--gold-soft)" />
        <circle cx="335" cy="340" r="1.8" fill="var(--gold-soft)" />
        <circle cx="110" cy="400" r="1.2" fill="var(--gold)" />
      </g>

      {/* Sombra suave bajo la botella */}
      <ellipse cx="200" cy={g.bottom + 10} rx={g.half + 20} ry="14" fill="oklch(0.05 0 0)" opacity="0.45" />

      {/* Botella */}
      <g>
        <clipPath id={`clip-${uid}`}>
          <path d={bottlePath} />
        </clipPath>

        {/* Cuerpo de vidrio */}
        <path d={bottlePath} fill={`url(#glass-${uid})`} stroke="var(--gold)" strokeOpacity="0.22" strokeWidth="1" />

        {/* Nivel de líquido */}
        <rect
          x={200 - g.half - 4}
          y={g.shoulderEnd + 14}
          width={(g.half + 4) * 2}
          height={g.bottom - g.shoulderEnd}
          fill={`url(#liquid-${uid})`}
          clipPath={`url(#clip-${uid})`}
        />

        {/* Brillo curvo de vidrio (dos vetas, look de estudio fotográfico) */}
        <path
          d={`M ${200 - g.half * 0.55} ${g.shoulderEnd + 20} C ${200 - g.half * 0.7} ${(g.shoulderEnd + g.bottom) / 2}, ${200 - g.half * 0.7} ${(g.shoulderEnd + g.bottom) / 2}, ${200 - g.half * 0.55} ${g.bottom - 20}`}
          stroke="oklch(0.98 0 0)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          opacity="0.14"
          clipPath={`url(#clip-${uid})`}
        />
        <path
          d={`M ${200 + g.half * 0.62} ${g.shoulderEnd + 30} C ${200 + g.half * 0.75} ${(g.shoulderEnd + g.bottom) / 2}, ${200 + g.half * 0.75} ${(g.shoulderEnd + g.bottom) / 2}, ${200 + g.half * 0.62} ${g.bottom - 30}`}
          stroke="oklch(0.98 0 0)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.1"
          clipPath={`url(#clip-${uid})`}
        />

        {/* Tapa / cápsula */}
        <rect x={200 - g.neckHalf - 3} y="46" width={(g.neckHalf + 3) * 2} height="30" rx="3" fill={estilo.vidrio} />
        <rect x={200 - g.neckHalf - 3} y="46" width={(g.neckHalf + 3) * 2} height="8" rx="3" fill="var(--gold)" opacity="0.9" />
        <rect x={200 - g.neckHalf - 3} y="68" width={(g.neckHalf + 3) * 2} height="2" fill="var(--gold)" opacity="0.5" />

        {/* Etiqueta */}
        <rect
          x={200 - labelHalf}
          y={labelTop}
          width={labelHalf * 2}
          height={labelHeight}
          rx="3"
          fill={`url(#label-${uid})`}
          stroke="var(--gold)"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        <rect
          x={200 - labelHalf + 6}
          y={labelTop + 6}
          width={labelHalf * 2 - 12}
          height={labelHeight - 12}
          rx="2"
          fill="none"
          stroke="var(--gold)"
          strokeOpacity="0.35"
          strokeWidth="0.75"
        />
        <text
          x="200"
          y={labelTop + labelHeight * 0.42}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="30"
          letterSpacing="1"
          fill="oklch(0.2 0.015 60)"
        >
          {inicial(marca)}
        </text>
        <line
          x1={200 - labelHalf + 16}
          y1={labelTop + labelHeight * 0.62}
          x2={200 + labelHalf - 16}
          y2={labelTop + labelHeight * 0.62}
          stroke="var(--gold)"
          strokeWidth="0.75"
          opacity="0.7"
        />
        <text
          x="200"
          y={labelTop + labelHeight * 0.8}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-sans, sans-serif)"
          fontSize="7"
          letterSpacing="2.5"
          fill="oklch(0.35 0.02 60)"
        >
          LA ESTACIÓN
        </text>
      </g>
    </svg>
  );
}
