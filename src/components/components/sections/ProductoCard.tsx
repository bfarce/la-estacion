import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { Producto } from "@/types/catalog";
import { MENSAJES, externalClick, whatsappUrl } from "@/config/site";
import { BottleArt } from "@/components/sections/BottleArt";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProductoCard({ producto, index = 0 }: { producto: Producto; index?: number }) {
  return (
    <motion.article
      className="card-premium group flex flex-col overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-surface">
        <BottleArt
          categoria={producto.categoria}
          marca={producto.marca}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,oklch(0.08_0.003_60/0.55)_0%,transparent_35%)]" />
        <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
          {producto.marca}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl text-foreground sm:text-2xl">{producto.nombre}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {producto.presentacion}
        </p>
        <p className="mt-3 mb-6 line-clamp-2 min-h-[2.6rem] text-sm leading-relaxed text-muted-foreground">
          {producto.descripcion}
        </p>

        <a
          href={whatsappUrl(MENSAJES.producto(producto.nombre))}
          onClick={externalClick(whatsappUrl(MENSAJES.producto(producto.nombre)))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-whatsapp/45 bg-whatsapp/10 text-sm font-medium text-whatsapp transition-all duration-400 hover:bg-whatsapp hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Consultar por WhatsApp
        </a>
      </div>
    </motion.article>
  );
}
