import type { MouseEvent } from "react";

/**
 * Configuración central del sitio.
 * Cambiar aquí el número de WhatsApp y los datos de contacto.
 */
export const SITE = {
  nombre: "La Estación",
  eslogan: "Distribución premium de licores nacionales e importados",
  whatsapp: "573123526566", // solo dígitos, con código de país
  email: "ventas@laestacion.com",
  telefono: "+57 312 352 6566",
  direccion: "Carrera 15 # 19B 04 SUR, Pitalito",
  horario: "Lun - Sáb: 9:00 a.m. - 10:00 p.m. · Dom: 11:00 a.m. - 8:00 p.m.",
  redes: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
} as const;

/** Construye un enlace de WhatsApp con mensaje prellenado. */
export function whatsappUrl(mensaje: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/**
 * Abre un enlace externo de forma confiable, incluso dentro de iframes
 * (preview) donde `target="_blank"` puede ser bloqueado.
 */
export function openExternal(url: string): void {
  try {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (win) return;
  } catch {
    /* ignorado: caemos al fallback */
  }
  try {
    (window.top ?? window).location.href = url;
  } catch {
    window.location.href = url;
  }
}

/** Handler de click para enlaces externos (WhatsApp, redes sociales). */
export function externalClick(url: string) {
  return (e: MouseEvent) => {
    e.preventDefault();
    openExternal(url);
  };
}

const FIRMA = `Escribo desde la web de ${SITE.nombre}.`;

export const MENSAJES = {
  cotizacion: `Hola, buen día. ${FIRMA} Quisiera solicitar una cotización de licores. ¿Me pueden compartir precios y disponibilidad?`,
  mayorista: `Hola, buen día. ${FIRMA} Estoy interesado en compras al por mayor para mi negocio. ¿Me pueden enviar la lista de precios mayoristas y condiciones de despacho?`,
  asesor: `Hola, buen día. ${FIRMA} Quisiera hablar con un asesor para recibir información sobre sus productos.`,
  catalogo: `Hola, buen día. ${FIRMA} ¿Me pueden compartir el catálogo completo con precios actualizados?`,
  contacto: `Hola, buen día. ${FIRMA} Quisiera más información sobre sus productos y servicios.`,
  producto: (nombre: string) =>
    `Hola, buen día. ${FIRMA} Me interesa el producto "${nombre}". ¿Me pueden confirmar precio, presentación y disponibilidad?`,
  categoria: (nombre: string) =>
    `Hola, buen día. ${FIRMA} Quisiera conocer el catálogo y los precios de la categoría "${nombre}".`,
} as const;
