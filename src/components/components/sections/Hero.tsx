import { motion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-licoreria.jpg";
import { ActionButton } from "@/components/ui/action-button";
import { MENSAJES, whatsappUrl } from "@/config/site";

/** Curva de entrada suave y "premium", coherente con el resto del sitio. */
const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <motion.img
        src={heroImg}
        alt="Interior de una licorería moderna con botellas premium iluminadas en tonos cálidos"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,oklch(0.1_0_0/0.94)_0%,oklch(0.1_0_0/0.78)_45%,oklch(0.1_0_0/0.5)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--background),transparent)]" />

      <motion.div
        className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-24 lg:px-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-3xl">
          <motion.p
            variants={fadeUp}
            className="text-[0.7rem] uppercase tracking-[0.42em] text-gold"
          >
            Nacionales e importados
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-7 text-4xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl"
          >
            La mejor selección de{" "}
            <span className="text-gold-gradient italic">licores nacionales e importados</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Distribuimos licores al por mayor y al detal con las mejores marcas del mercado. Cotiza
            en minutos por WhatsApp con atención personalizada.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <ActionButton href={whatsappUrl(MENSAJES.cotizacion)} variant="gold" size="lg">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Solicitar cotización
            </ActionButton>
            <ActionButton href={whatsappUrl(MENSAJES.asesor)} variant="outline" size="lg">
              Hablar con un asesor
            </ActionButton>
          </motion.div>

          <motion.dl
            variants={fadeIn}
            className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-border/60 pt-8"
          >
            {[
              { k: "+500", v: "Referencias" },
              { k: "100%", v: "Asesoría personalizada" },
              { k: "7 días", v: "Atención toda la semana" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl text-gold sm:text-3xl">{s.k}</dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      <motion.a
        href="#categorias"
        aria-label="Ir a categorías"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-gold/70 transition-colors hover:text-gold md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
      >
        <ArrowDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
