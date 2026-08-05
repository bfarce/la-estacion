import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { ProductoCard } from "./ProductoCard";
import { catalogKeys, getProductosDestacados } from "@/services/catalogService";
import { ActionButton } from "@/components/ui/action-button";
import { MENSAJES, whatsappUrl } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProductosDestacados() {
  const { data: productos = [], isLoading } = useQuery({
    queryKey: catalogKeys.destacados,
    queryFn: getProductosDestacados,
  });

  return (
    <section id="productos" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--gold)_35%,transparent),transparent)]"
      />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading
            eyebrow="Selección destacada"
            title="Referencias que manejamos"
            description="Consulta por las referencias más solicitadas; te confirmamos disponibilidad y precio por WhatsApp."
          />
        </motion.div>

        {isLoading ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[28rem] animate-pulse rounded-2xl bg-card" />
            ))}
          </div>
        ) : (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productos.map((p, i) => (
              <ProductoCard key={p.id} producto={p} index={i} />
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <ActionButton href={whatsappUrl(MENSAJES.asesor)} variant="outline" size="lg">
            Solicitar información por WhatsApp
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
