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
  },
} as const;

/** Construye un enlace de WhatsApp con mensaje prellenado. */
export function whatsappUrl(mensaje: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export const MENSAJES = {
  cotizacion: "Hola, quisiera solicitar una cotización de licores.",
  mayorista: "Hola, estoy interesado en compras al por mayor. ¿Me pueden cotizar?",
  asesor: "Hola, quisiera hablar con un asesor.",
  producto: (nombre: string) => `Hola, me interesa el producto: ${nombre}. ¿Me pueden cotizar?`,
  categoria: (nombre: string) => `Hola, quisiera ver el catálogo de ${nombre}.`,
} as const;
