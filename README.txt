DELLTECH ALIENWARE ONE PAGE

Dominio: https://informaticosmoncloa.com.es/
Teléfono único (caja y botones): +34 910 05 31 43

Variables SMTP compartidas:
SMTP_HOST=cp7124.webempresa.eu
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=soporte@kelatos.com
SMTP_PASS=[configurada solo en Vercel]
CONTACT_EMAIL=soporte@kelatos.com

El correo no aparece visible en la web; solo se usa en backend.

Google Analytics:
G-3JCBHJ8DCD

REVISIÓN (fixes aplicados):
- Ya tenía menú móvil funcional, colisión del chatbot corregida y
  banner de cookies (ya corregido) de commits anteriores; no se ha
  tocado nada de eso.
- Botón de teléfono del menú (.navcall): acortado a solo el número (iba
  a partirse en dos líneas dentro de la píldora, mismo problema visto
  en RowentaTech/XiaomiTech); añadido white-space:nowrap.
- Dominio (informaticosmoncloa.com.es) verificado: no coincide con
  ningún otro repositorio de la familia (no confundir con
  OrdenadoresMoncloa, que usa asusplace.com.es).

REVISIÓN ADICIONAL (esta pasada):
- H1 no seguía la regla final de la familia: era largo (23 palabras) y
  terminaba en planteamiento abierto ("y qué pasará con tus
  archivos"), sin ser una frase 100% afirmativa. Reescrito: "Tu Dell
  no responde. Revisamos el equipo y tus datos." (10 palabras).
- BUG REAL — Schema.org: pese a lo que indicaba este mismo README (y
  el README heredado por InformáticosExpress, el rebrand de este
  repositorio), no existía ningún bloque schema.org en el HTML real.
  Añadido LocalBusiness completo (nombre, teléfono, dirección,
  areaServed, sameAs con Google Business y YouTube).
- BUG REAL — Sección SEO: tampoco existía pese a lo indicado; añadida
  sección "Guía" (id="guia", enlazada en el menú) con contenido propio
  sobre averías habituales en Dell/Alienware.
- BUG REAL — el chat n8n no tenía borde blanco en el botón flotante
  (mismo patrón encontrado en TaurusMyCook); añadido
  border:1px solid #fff!important.

REDIRECCIÓN DE URLS ANTIGUAS:
Este sitio era antes multipágina (tenía /modelos/..., eliminados en
commits anteriores al pasar a one-page). Añadido middleware.mjs:
cualquier URL que no sea "/" redirige (301) a la home. Añadida la
dependencia "@vercel/functions" en package.json.

REVISIÓN ADICIONAL (checklist unificado de la familia, a petición del cliente):
- BUG REAL — dos textos decorativos gigantes sin reducción de tamaño
  en móvil/tablet (mismo patrón que MedionTech/AsusTech/BoschTech/
  ThermomixTech): ".problems:after" ("ALIENWARE", 160px) y
  ".data-art:before" ("DATA", 120px). Añadida reducción en tablet
  (100px/80px) y móvil (60px/50px).
- BUG REAL — el formulario no tenía ninguna casilla de consentimiento
  de política de privacidad. Añadida, con enlace a
  https://kelatos.com/privacy-policy/ en azul y subrayado.
- Añadida franja de aviso de servicio técnico independiente debajo
  del menú (no existía).
- Añadido "Sábados, domingos y días festivos estamos cerrados" debajo
  del horario.
- Botón "Atención Telefónica..." sin icono, a diferencia del de
  WhatsApp. Añadido.
- Formulario verificado: fetch a /api/contacto coincide con
  api/contacto.js; conexión correcta.

REVISIÓN ADICIONAL (checklist unificado de la familia, a petición del cliente — repo 16/48):
- BUG REAL — enlace de Cal.com desactualizado. Actualizado a
  https://cal.com/kelatos/30min?embed=true&theme=light&attendeePhoneNumber=%2B34&overlayCalendar=true.
- Verificado: el correo soporte@kelatos.com no aparece visible.
- BUG REAL — el mensaje prellenado de WhatsApp decía "¡Hola Kelatos!".
  Corregido a "¡Hola DellTech!".
- Verificado: el menú móvil ya se cerraba correctamente al pulsar un
  enlace.
- Verificado: sin iconos ni imágenes con proporciones fijas
  incorrectas.
- BUG REAL — el H1 en móvil estaba en 40px. Corregido a 48px.
- BUG REAL — botones del hero (.cta) con border-radius de 15px y sin
  estado hover. Aumentado a border-radius:999px; añadido
  filter:brightness(.88) en whatsapp/pickup (colores sólidos) y
  relleno sólido con var(--blue2) + texto blanco en el botón de
  teléfono (estilo contorno) al pasar el ratón.
- Verificado: este repo no usa el patrón de franja de insignias bajo
  el H1 (familia Dyson); no aplica la reubicación.

REVISIÓN ADICIONAL (nueva regla de menú móvil, a petición del cliente):
- BUG REAL — la franja de aviso de independencia estaba dentro de
  <header>. Movida fuera de <header>, como hermana justo después de
  él y antes del hero: sigue siendo la misma franja amarilla de ancho
  completo.
- Verificado: el header (.header{position:sticky;top:0}) ya se
  mantenía fijo/pegado arriba al hacer scroll; no requería cambios.
- Verificado de nuevo: el checklist de 7 puntos ya estaba aplicado de
  una pasada anterior; no requería cambios.
