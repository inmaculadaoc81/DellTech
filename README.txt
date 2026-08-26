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
- Ya tenía menú móvil funcional, colisión del chatbot corregida,
  schema.org, sección SEO y banner de cookies (ya corregido) de
  commits anteriores; no se ha tocado nada de eso.
- Botón de teléfono del menú (.navcall): acortado a solo el número (iba
  a partirse en dos líneas dentro de la píldora, mismo problema visto
  en RowentaTech/XiaomiTech); añadido white-space:nowrap.
- Dominio (informaticosmoncloa.com.es) verificado: no coincide con
  ningún otro repositorio de la familia (no confundir con
  OrdenadoresMoncloa, que usa asusplace.com.es).

REDIRECCIÓN DE URLS ANTIGUAS:
Este sitio era antes multipágina (tenía /modelos/..., eliminados en
commits anteriores al pasar a one-page). Añadido middleware.mjs:
cualquier URL que no sea "/" redirige (301) a la home. Añadida la
dependencia "@vercel/functions" en package.json.
