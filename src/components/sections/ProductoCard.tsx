import { MessageCircle } from "lucide-react";
import type { Producto } from "@/types/catalog";
import { MENSAJES, externalClick, whatsappUrl } from "@/config/site";
import { useReveal } from "@/hooks/useReveal";

export function ProductoCard({ producto, index = 0 }: { producto: Producto; index?: number }) {
  const reveal = useReveal<HTMLElement>(index * 60);

  return (
    <article
      ref={reveal.ref}
      className={`card-premium group flex flex-col overflow-hidden rounded-2xl ${reveal.className}`}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-surface">
        <img
          src={producto.imagen}
          alt={`${producto.nombre} — ${producto.presentacion}`}
          loading="lazy"
          width={800}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
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
    </article>
  );
}
