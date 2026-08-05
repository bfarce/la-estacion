import { Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Wine } from "lucide-react";
import { MENSAJES, SITE, whatsappUrl } from "@/config/site";

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Mayoristas", href: "#mayoristas" },
  { label: "Nosotros", href: "#nosotros" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-gold/10">
              <Wine className="h-5 w-5 text-gold" aria-hidden="true" />
            </span>
            <span className="font-display text-xl tracking-wide text-foreground">{SITE.nombre}</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {SITE.eslogan}. Atención al detal y al por mayor con despacho a todo el país.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={SITE.redes.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={SITE.redes.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={whatsappUrl(MENSAJES.asesor)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full border border-whatsapp/40 text-whatsapp transition-colors hover:bg-whatsapp hover:text-background"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Enlaces del pie de página">
          <h3 className="text-[0.68rem] uppercase tracking-[0.3em] text-gold">Navegación</h3>
          <ul className="mt-5 space-y-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[0.68rem] uppercase tracking-[0.3em] text-gold">Contacto</h3>
          <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
              <span>{SITE.direccion}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
              <span>{SITE.horario}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
              <span>{SITE.telefono}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-gold">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.nombre}. Todos los derechos reservados.
          </p>
          <p>Prohibida la venta de bebidas alcohólicas a menores de 18 años.</p>
        </div>
      </div>
    </footer>
  );
}
