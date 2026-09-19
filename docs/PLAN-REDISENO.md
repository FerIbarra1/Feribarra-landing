# Plan definitivo de diseño e implementación — Feribarra Landing

**Propietario:** Fernando Ibarra
**Sitio:** `/Users/fernandoibarra/Documents/Development/Feribarra-landing`
**Fecha:** 2026-09-18
**Autor:** Lead Architect (síntesis de recon + panel de diseño)
**Estado:** listo para ejecutar por fases (§11). Documento único de verdad.

---

## Cómo leer este documento

Cada afirmación sobre el estado actual del código cita `archivo:línea` y fue verificada leyendo el árbol real. Los valores de color están en OKLCH y sus ratios de contraste fueron **calculados** (OKLab → sRGB lineal → luminancia WCAG), no estimados; el método se validó reproduciendo la falla conocida de 2.88:1 del sitio actual.

Regla de oro del proyecto: **primero el contenido, después el diseño.** Una página con espaciado impecable y datos falsos es *peor* que la actual, porque el pulido hace que los errores parezcan deliberados. La Fase 1 es contenido; el diseño no arranca hasta que la Fase 1 cierra.

---

## 1. Diagnóstico

Lo que está mal hoy, ordenado por impacto. Los cuatro primeros son **críticos**: rompen la credibilidad o la conversión.

### C1 — El trabajo actual no existe en el sitio (crítico)

`src/i18n/es.ts:229-254` y `src/i18n/en.ts:229-254` contienen solo dos experiencias: INOWU e IGRTEC. El CV autoritativo (`/tmp/cv_en.txt:27-29`) muestra **Rocket Code, Senior Backend Developer, Nov 2025 – Present**. `grep -rn "Rocket" src/` → **cero coincidencias**. Falta el rol más reciente y más senior. Es la mayor pérdida de contenido de la página.

### C2 — El sitio afirma que sigue en un empleo que terminó hace diez meses (crítico)

`es.ts:233` dice `"Dic 2023 – Presente"` y `en.ts:233` dice `"Dec 2023 – Present"`. El CV da INOWU como **Dic 2023 – Nov 2025**. En cuanto se agregue Rocket Code, el sitio mostrará dos empleos de tiempo completo simultáneos y se leerá como un error de datos.

### C3 — El hero se presenta como "desarrollador React" (crítico)

`es.ts:13` → `role: "Desarrollador Full Stack"`; `es.ts:15` → `description: "Desarrollador React con más de 4 años..."`. El CV dice **"Senior Backend / Full Stack Developer"** (`/tmp/cv_es.txt:8`). El sitio contradice el encabezado del propio CV del dueño y lo degrada a un perfil frontend.

### C4 — El formulario de contacto no tiene protección anti-spam funcional (crítico)

`contact-section.tsx:164` registra el honeypot oculto bajo el nombre `"company"`; `contact-section.tsx:203` registra el campo visible "Empresa" **bajo el mismo nombre**. Un humano que escribe su empresa fija exactamente el valor que fijaría un bot. Y la guarda que lo usaría está comentada en `contact-section.tsx:41-45`. El formulario *parece* protegido y no lo está.

### C5 — El avatar del hero es un emoji 🚀 (crítico de diseño)

`hero-section.tsx:69` renderiza `<span className="text-9xl font-bold">🚀</span>` como marca de identidad, con un glow `blur-2xl` detrás. El `<img>` real está comentado justo encima (`hero-section.tsx:66-68`). Es la señal individual más fuerte de "generado desde plantilla" en toda la página.

### A1 — `max-w-8xl` no existe en Tailwind v4 (alto)

`skills-section.tsx:23`. Verificado: cero CSS emitido (la escala de Tailwind v4 termina en `7xl`). La cuadrícula de habilidades es la única sección sin restricción de ancho; su borde de contenido no alinea con ninguna otra sección.

### A2 — SEO prácticamente ausente (alto)

`index.html` no tiene meta description, Open Graph, Twitter card, canonical, JSON-LD, `robots.txt` ni `sitemap.xml`. `index.html:7` usa `rel="logo"` (inválido) en lugar de `rel="icon"`. Compartir el enlace en Slack/LinkedIn produce una URL pelada sin tarjeta de vista previa.

### A3 — `<html lang="en">` fijo mientras el contenido por defecto es español (alto)

`index.html:1` fija `lang="en"`; `src/i18n/index.tsx:27` inicializa el idioma en `"es"`; el atributo **nunca se actualiza** al cambiar de idioma. Defecto combinado de SEO y de lector de pantalla.

### A4 — 6.3 MB de imágenes servidas de forma eager (alto)

`dist/assets/` tras el build: `FILogo` 1.38 MB, `ProyectoVR` 1.44 MB, `ProyectoEntrify` 1.21 MB, `ProyectoWFacturas` 1.04 MB, `ProyectoVotometrica` 758 KB, `ProyectoRealDeal` 485 KB. Cero `loading="lazy"`, cero `width`/`height` (provoca layout shift), cero WebP/AVIF. `FILogo.png` (1.38 MB) se renderiza a 48×48 px en `navigation.tsx:41`. `FILogo2.png` (1.45 MB) nunca se importa.

### A5 — La calificación falsa de 5 puntos (alto)

`skills-section.tsx:48-58` fija `i < 4`, así que **toda** habilidad en **toda** categoría muestra 4/5 al pasar el ratón. Es invisible en reposo, solo funciona con ratón, no tiene nombre accesible, y presenta decoración como información. Invita a desconfiar de toda la sección.

### A6 — El "Proyecto Destacado" duplica la cuadrícula (alto)

`projects-section.tsx:114-176` vuelve a renderizar `projects[0]` completo justo después de que la cuadrícula ya lo renderizó (`projects-section.tsx:38-111`). Votométrica aparece dos veces en una página, bajo dos encabezados de nivel h2 que compiten.

### A7 — `<a>` anidado dentro de `<button>` en las CTA del hero (alto)

`hero-section.tsx:96-116` anida `<a href="#proyectos">` dentro de `<Button>` (que renderiza un `<button>` real, sin `asChild`). HTML inválido y doble tab stop en la ruta principal de conversión. El patrón correcto ya existe en el código: `projects-section.tsx:96-105` usa `asChild`.

### A8 — Los enlaces sociales no son enlaces (alto)

`hero-section.tsx:125-138` renderiza GitHub/LinkedIn/mailto como `<Button onClick={() => (window.location.href = url)}>`. Sin abrir en pestaña nueva, sin copiar enlace, sin clic central, y no rastreables.

### A9 — El formulario es inaccesible para lectores de pantalla (alto)

Los 5 `<label>` (`contact-section.tsx:168,177,189,199,209`) no tienen `htmlFor` y los 5 inputs no tienen `id`. Los `<p>` de error (`:174,184,195,205,216`) no tienen `aria-describedby` ni `role="alert"`, y `aria-invalid` nunca se fija como atributo real. En todo `src/` existen **4** atributos `aria-*`, y los cuatro son hooks de estilo (`aria-invalid:`) dentro de primitivas shadcn que nunca se activan. No hay ningún `role=` en el código.

### A10 — Contraste medido por debajo de AA (alto)

- Blanco sobre `--secondary` en modo oscuro = **2.88:1**, usado en **17** insignias de certificación (`certifications-section.tsx:36`: `variant="secondary"` + `className="text-xs text-white"`).
- `muted-foreground` sobre `bg-muted/30` en modo claro = **4.45:1** (justo por debajo del umbral 4.5).

### M1 — Todo el contenido tiene padding vertical duplicado (medio)

`App.tsx:14-36` envuelve cada componente en `<section className="py-20">` y cada componente renderiza su propio `<section className="py-20">` dentro. Resultado: ~80 px por borde en lugar de ~40, duplicando la longitud de la página. Contacto es inconsistente (`App.tsx:34` usa `pt-20`, `contact-section.tsx:74` usa `py-20`).

### M2 — El hero se re-renderiza entero en cada `mousemove` (medio)

`hero-section.tsx:11-19` registra un listener de `mousemove` que llama `setMousePosition` en cada evento, re-renderizando todo el subárbol del hero (avatar, 2 CTA, 3 botones sociales) a frecuencia de 60–120 Hz por un parallax decorativo.

### M3 — `type Dict = typeof es | typeof en` (medio)

`src/i18n/index.tsx:6` define una unión de dos tipos concretos, lo que impide que TypeScript resuelva `.map` sobre los arreglos y degrada a `(exp: any, index: number)` en cada consumidor. Es la causa raíz de 5 de los 8 casts `any`.

### M4 — `t()` devuelve la clave como fallback (medio)

`src/i18n/index.tsx:38`: `get(dict, path, path)`. Una clave faltante renderiza el texto literal `hero.ctaProject` en la página. Los bugs de i18n se vuelven bugs visuales publicables.

### M5 — `ui/input.tsx` y `ui/textarea.tsx` fueron editados a mano (medio)

`ui/input.tsx:11-14`: `h-9 ... py-5` (36 px de alto con 40 px de padding vertical, contradictorio), `font-semibold` en el texto, `bg-white text-black dark:text-white` que ignora los tokens de tema, y una variante duplicada `dark:dark:bg-neutral-800/30` que emite `.dark\:dark\:...:is(.dark *):is(.dark *)`. Luego `contact-section.tsx` sobreescribe todo por campo, dejando el estilo del componente como peso muerto.

### M6 — El menú móvil no se puede cerrar con teclado (medio)

`navigation.tsx:65-72`: el botón no tiene `aria-label`, `aria-expanded` ni `aria-controls`. El panel (`:76-92`) no tiene cierre con Escape, ni focus trap, ni scroll lock, ni cierre por clic externo.

### M7 — La página termina en un callejón sin salida (medio)

`contact-section.tsx:236-245` cierra con un título y un subtítulo (`"¿Listo para comenzar tu próximo proyecto?"`) y **sin botón, enlace ni acción**. No hay `<footer>` real en ningún lugar del sitio.

### M8 — Sin descarga de CV (medio)

No existe ningún enlace de descarga de CV. `public/` contiene solo `favicon.ico`. La acción de mayor valor para un reclutador es la única que el sitio no ofrece.

### B1 — Cinco animaciones infinitas simultáneas sin `prefers-reduced-motion` (bajo)

`float`, `glow`, `slideInUp`, `fadeInScale` (`globals.css:129-185`) más `animate-bounce` (`hero-section.tsx:102`). El único bloque `prefers-reduced-motion` del repo vive en `src/App.css`, que **nunca se importa** (confirmado: `grep -rn "App.css" src/` → sin coincidencias). Es activamente engañoso.

### B2 — Artefactos muertos (bajo)

`src/App.css` (42 líneas, plantilla Vite sin modificar, nunca importada); `src/assets/FILogo2.png` (1.45 MB, nunca importada); 3 claves i18n sin uso (`contactSection.infoTitle`, `projectsSection.prev`, `projectsSection.next`); 10 objetos `colors` muertos (5 proyectos × 2 diccionarios) que solo consumen bloques comentados — y son los únicos hex hardcodeados del código, socavando el sistema de tokens.

### B3 — `"Inteligence Artificial"` mal escrito y en español (bajo)

Aparece en **ambos** `es.ts:66` y `en.ts:66`, dentro del arreglo de tecnologías del certificado de Microsoft del diccionario inglés.

### B4 — Etiquetas del selector de tema hardcodeadas en español (bajo)

`theme-toggle.tsx:47-49`: `Claro` / `Oscuro` / `Sistema` viven en el componente, no en los diccionarios. Un visitante en inglés recibe un menú de tema en español. Un diff diccionario-contra-diccionario **no puede detectarlo**.

### B5 — `font-geist-sans` emite cero CSS (bajo)

`theme-toggle.tsx:40,46`. Geist no está instalado; `index.html` carga Inter + JetBrains Mono.

### B6 — `theme-toggle` sin `try/catch` y con el modo `system` roto (bajo)

`theme-toggle.tsx:19-21` lee `localStorage.getItem` sin `try/catch` (ruta de crash en ventanas privadas). La rama `system` (`:24-34`) llama `setHtmlTheme('dark'|'light')` al cambiar el SO, lo que **escribe** la clave `theme` y fija la preferencia fuera de `system` silenciosamente. Hay un flash de modo oscuro al cargar porque el tema se aplica en `useEffect` tras el montaje.

### B7 — `useMemo` que nunca memoriza (bajo)

`projects-section.tsx:16-20`: la dependencia `images` se recrea en cada render, así que el `useMemo` nunca puede memorizar; ESLint marca la dependencia faltante y esconde un agujero de tipos detrás de `as any`.

### B8 — Calidad de build (bajo)

`tsc -b` sale con **0** errores. `eslint .` da **13 errores y 2 warnings**. `vite build` produce 447 KB JS (139 KB gzip) + 6.3 MB de imágenes. `pnpm lint` **falla**, así que no sirve como puerta de calidad tal como está. No hay tests ni CI.

### Cosas que verifiqué y NO son problemas (no perseguir)

- **`bg-gradient-to-*` sigue funcionando en Tailwind 4.1.12.** El compilador lo registra como utilidad estática y el CSS emitido contiene reglas vivas. Los 14 usos renderizan. Los posts de blog que afirman lo contrario están equivocados.
- **No hay imports sin usar.** `tsc -b` sale limpio con `noUnusedLocals` activo, y un repro independiente confirmó que TypeScript sí marca un import usado solo dentro de un comentario JSX. El peso muerto son archivos, assets, exports y claves, no imports.
- **La paridad estructural de i18n es perfecta.** Cero claves faltantes en cualquier dirección, cero desajustes de longitud de arreglos (experiencias 2/2, proyectos 5/5, categorías de skills 5/5).

---

## 2. Dirección de diseño elegida

### Ganadora: **Quiet Luxury — "Ink & Hairline"** (48.3 / 60)

**Concepto.** Una página que se lee como la ficha de producto de una persona. Una sola columna de tipografía enorme y muy ajustada; reglas capilares de 1px en lugar de tarjetas; un único acento usado como **señal**, nunca como superficie; y contenido que declara lo que Fernando realmente hizo — medido, fechado y acotado — en lugar de lo que suena impresionante.

**La tesis en una frase:** el sitio actual intenta *parecer* caro **agregando** cosas (blobs difuminados, texto con degradado, glow, float, emoji, tres formas de píldora para un mismo concepto). Esta dirección hace que el sitio *se sienta* caro **quitando** cosas y gastando todo el presupuesto en **espacio, escala tipográfica y timing de movimiento**.

**Por qué ganó.** Es la única dirección cuyas afirmaciones fácticas no pudieron ser falsificadas por ningún juez. Los tres jueces que la evaluaron reprodujeron **exactamente** cada número de su tabla de contraste con scripts independientes. Su arquitectura de tokens compila en Tailwind 4.1.12 (verificado con el compilador instalado). Es implementable con **una** dependencia de runtime y **una** de desarrollo. Y su idea más fuerte — la nota de honestidad bajo métricas cuantificadas — es conceptualmente nueva, no estilística, y portable a cualquier dirección.

**Su techo, declarado honestamente:** es una cita muy bien ejecutada de Linear + Apple + Vercel. La tipografía es Inter (la más usada de internet) más JetBrains Mono. No hay rostro, color ni layout novedosos. Es la dirección **segura** de las cuatro, y por eso la puntuación de `distinctiveness` se queda en 7.0. Lo que sí es original: la columna `USED IN` que reemplaza la calificación falsa, la ficha técnica mono como *formato* de habilidades, la banda de métricas con sufijos que llegan tarde, y la nota de honestidad. ~30% original dentro de un marco 70% de género.

### Tabla de puntuaciones — las cuatro direcciones

| # | Dirección | premiumFeel | recruiterImpact | feasibility | performance | distinctiveness | a11y | **Promedio** |
|---|---|---|---|---|---|---|---|---|
| **1** | **quiet-luxury** | **8.0** | 7.3 | **8.7** | **9.0** | 7.0 | **8.3** | **48.3** |
| 2 | systems-engineer | 7.7 | **7.7** | 7.0 | 7.7 | 7.0 | 8.0 | 45.0 |
| 3 | editorial-swiss | **8.0** | 7.0 | 6.7 | 6.7 | **7.3** | **8.3** | 44.0 |
| 4 | cinematic-scroll | 7.7 | 6.7 | 6.0 | 6.3 | **7.3** | 7.7 | 41.7 |

**Lectura de la tabla.** quiet-luxury gana por *factibilidad y performance* (8.7 / 9.0), no por impacto de reclutador (7.3, la más baja de las tres primeras). systems-engineer gana en impacto de reclutador (7.7) porque su matriz de estrategias resuelve el problema del NDA mejor que nadie — y esa idea se injerta (§3). editorial-swiss empata en premiumFeel y a11y pero su presupuesto de performance es aritméticamente imposible (su objetivo de <150 kB gzip no cierra: react+react-dom+rhf+resolvers+zod+emailjs ya son 149,356 bytes gzip sin código de aplicación). cinematic-scroll tiene la peor factibilidad y su animación de montaje del hero viola su propio presupuesto compositor.

### Las cinco correcciones obligatorias a la ganadora

La dirección ganó, pero sus jueces identificaron cinco defectos que **deben** corregirse en la implementación. Van incorporados en este plan:

1. **`useInView` con `threshold: 0.4` nunca dispara en secciones altas.** El ratio de intersección es área intersectada ÷ área del objetivo; un objetivo más alto que el viewport nunca supera `viewportHeight / targetHeight`. Con `once: true`, el observer nunca se desconecta y el contenido queda permanentemente en `opacity: 0`. La sección de certificaciones (~2,800 px) alcanza como máximo 0.29; la cuadrícula de proyectos (~2,000 px) alcanza 0.35 en un portátil de 700 px. **Corrección: `threshold: 0` + `rootMargin: '0px 0px -12% 0px'`, y observar un centinela hijo en secciones altas.** Ver §10.6.
2. **El nombre del hero no se parte en dos líneas.** `max-w-[16ch]` a `display-1` mide ~1152 px, más ancho que el contenedor (1120 px), así que no restringe nada. "Fernando Ibarra" mide ~805 px y cabe en una línea. **Corrección: `max-w-[11ch]` o un `<br>` explícito.**
3. **Las etiquetas del diagrama a 9px.** M5 fija 12 etiquetas a 9px — más pequeñas que la nota de honestidad, en el elemento que la dirección llama su prueba de 15 segundos. **Corrección: mínimo 11px, preferible 12px (el token `eyebrow` que el propio documento eligió para el mismo trabajo).**
4. **El eyebrow del hero se parte en móvil.** `SENIOR BACKEND ENGINEER · HERMOSILLO, MX · REMOTE` son 49 caracteres ≈ 447 px a 12px mono con `+0.16em`; en un viewport de 375 px con gutter de 24 px hay 327 px disponibles. **Corrección: en móvil, eyebrow de dos líneas con `·` como separador de línea, o recortar a `SENIOR BACKEND · HERMOSILLO, MX`.**
5. **`--border` a 1.28:1 es el extremo débil del género.** Todo el lenguaje estructural de esta dirección son líneas capilares. **Corrección: subir `--border-strong` hacia ~2:1 para las reglas que definen sección; reservar 1.28:1 para reglas intra-elemento.**

### Dos correcciones de ingeniería adicionales (del juez de factibilidad)

6. **El acento como `--accent` rompe el presupuesto de acento en el primer hover.** `button.tsx:17,21` define las variantes `outline` y `ghost` como `hover:bg-accent hover:text-accent-foreground`. Si `--accent` es el teal profundo, **cada hover de botón fantasma se vuelve un relleno teal** — nav (enlaces y disparadores), selector de tema, selector de idioma, disparador móvil. **Corrección: mantener `--accent` como superficie neutra de hover y poner el teal en un token separado `--signal`.** Ver §4.

   *Precisión:* el juez de ingeniería también afirmó que los items de `dropdown-menu` enfocan a `bg-accent`. **En este repo no es así** — `dropdown-menu.tsx:75,93,129,212` fue editado a mano para usar `focus:bg-neutral-100` / `dark:focus:bg-neutral-800`. La corrección aplica a `button.tsx`, no al menú. (De paso: `dropdown-menu.tsx:75` tiene la misma variante duplicada `dark:dark:data-[variant=destructive]` que `ui/input.tsx:11` — mismo bug, mismo arreglo.)
7. **M3 no es implementable como está descrito.** "WAAPI `element.animate()` sobre un proxy `{ n: 0 }`, escribiendo `textContent`" — `Element.animate()` es un método de Element y no puede apuntar a un objeto plano. **Corrección: `requestAnimationFrame` + matemática de easing (cero dependencias igual).** Ver §10.

---

## 3. Lo mejor de los otros

Ideas específicas que se injertan, extraídas de los veredictos de los jueces.

### De **systems-engineer** (2º lugar)

**a) El contrato de color semántico — "el color codifica estado, nunca decoración".** Un solo tono de señal para interactivo/en-movimiento, y tres tonos de estado permitidos **solo** dentro de diagramas y chips de estado. Es la disciplina que previene la rampa de degradado cian decorativa que el sitio tiene hoy, y es lo único que hace que un sistema se lea como *ingenierizado* en lugar de *temático*. **Se adopta como regla de gobernanza del §4.**

**b) La matriz de estrategias — `53 estrategias · 4 métodos × 18 dominios`.** Una cuadrícula etiquetada de métodos × dominios de producto con un conteo, que comunica una arquitectura empresarial restringida como **patrón** en lugar de como revelación de cliente. Es la única idea en cualquier dirección que resuelve cómo mostrar trabajo bajo NDA de forma creíble en lugar de vaga. **Se injerta en el caso de estudio (§6.6) con su disciplina: construirla genérica desde el primer commit — si se construye con etiquetas reales "temporalmente", se publican.**

**c) La banda de métricas.** Cuatro conteos verificados justo debajo del hero hacen que "sistemas distribuidos" aterrice antes de cualquier scroll. **Ya está en la ganadora; se confirma y se refuerza (§6.3).**

### De **editorial-swiss** (3º lugar)

**d) El desdoblamiento del token de acento, con sus tres reglas de seguridad.** `--accent` / `--accent-ink` / `--accent-fill` como tres tokens medidos por separado, más: (1) el acento de display nunca carga texto por debajo de 24px; (2) el token de *relleno* se separa del de display precisamente para que el texto del botón pase 4.5:1; (3) la banda inversa intercambia **tanto** superficie **como** acento, para que el spot nunca se coloque sobre una superficie no medida. Es correctiva, no estilística: arregla una falla medida de 2.88:1 en 17 insignias. **Se adopta en §4 como `--signal` / `--signal-ink` / `--signal-fill`.**

**e) El contrato de movimiento reducido.** Un bloque CSS global para los casos baratos **más** un cortocircuito en JS que hace que los contadores **rendericen su valor final** y las revelaciones rendericen su estado final — porque "una animación de 0.01ms igual parpadea; un fallback correcto nunca anima en absoluto". Es un requisito de corrección, no una elección de estilo. **Se adopta verbatim en §10.5.**

**f) La estructura de libro mayor reutilizada.** Una sola estructura con reglas capilares y columna mono de fechas sirviendo tres secciones (Experiencia, Educación, Contacto) es la forma más barata de hacer que una página se lea como diseñada en lugar de ensamblada. **Se adopta en §6.4, §6.8 y §6.10.**

**g) La banda de impacto como página de espécimen.** Banda full-bleed con 4–5 conteos verificados en cifras tabulares con divisores capilares, compuesta como espécimen y no como tarjetas de estadística. **Se fusiona con la banda de métricas de la ganadora (§6.3).** Su disciplina: **cada cifra debe ser una que el recon realmente contó**, y las dos no confirmadas (`53`, `18`) deben confirmarse antes de promoverse al hero.

### De **cinematic-scroll** (4º lugar)

**h) El registro de commits como sección de experiencia.** Renderizar tres roles como un `git log` — hash corto mono, rango de fechas mono, empresa en la voz de display, puesto en body, balas expandibles, una regla que conecta los nodos, y un nodo pulsante con etiqueta `HEAD` en el rol actual. Se lee al instante para un reclutador no técnico (el más reciente arriba, marcado actual) y para un par técnico. **Críticamente: hace estructuralmente imposible repetir el hallazgo #1 del diagnóstico — el rol actual faltante — porque HEAD es la primera fila y no hay dónde esconder una omisión.** Un tratamiento de diseño que arregla un bug de corrección por construcción. **Se adopta en §6.4.**

**i) La ley de racionamiento del acento.** Un color hace todo el trabajo estructural; el segundo se raciona a **como máximo un elemento por viewport en reposo** y se reserva para una lista cerrada y nombrada. **Se adopta como la regla de presupuesto del acento en §4.**

**j) "Si es un hecho, es mono."** Identificadores, conteos, fechas y estados van en mono; cada palabra de prosa va en la sans; las dos nunca se cruzan. **Se adopta como regla tipográfica en §4.**

**k) La Línea de Petición (M1 de cinematic-scroll).** Una única regla de 1px vinculada al scroll que recorre toda la altura de la página, con un nodo por sección que se enciende al acento cuando su sección está en vista. Hace tres trabajos con un elemento (indicador de progreso, navegación, narrativa) al costo más bajo posible: un transform, solo compositor, sin listener de scroll. **Se adopta como dispositivo opcional de fase tardía (§6.1, marcado como cortable).**

### Lo mejor de la propia ganadora (lo que viaja con ella)

**l) La nota de honestidad.** *"Proyecto en equipo. Contribuí a los servicios de pago y al SPA; no construí esto solo. Las cifras son conteos del código, no afirmaciones de autoría."* Es la única idea conceptualmente novedosa en cualquier dirección, la única línea que un hiring manager citaría de vuelta en una entrevista, y el mecanismo que descarga el mayor riesgo de honestidad del recon (41/268 commits en pagos, 246/3668 en el frontend). **No puede recortarse como "letra chica".**

**m) El tracking escala inversamente al tamaño.** Negativo en display, **positivo** en mono pequeño. Una línea de CSS, y es la diferencia entre un sistema tipográfico y un accidente tipográfico. Hoy todo recibe `-0.025em`, que es exactamente por qué las etiquetas de 12px son ilegibles.

---

## 4. Design system

Todo esto vive en `src/globals.css`. **Tailwind v4 no tiene archivo de configuración** — la escala tipográfica, los easings y `container-page` van en `@theme` / `@utility`. Si alguien agrega después un `tailwind.config.js` esperando que se lea, no hará nada silenciosamente.

### 4.1 Estrategia de color

**Ink-first, acento como señal.** La página se construye con una rampa de tinta casi neutra (hue 250, croma ≤ 0.010 — un matiz que se siente pero no se nombra). El acento es un único teal profundo en hue 200, deliberadamente **desaturado** frente al cian actual (croma 0.15–0.20 → **0.09**).

**Segunda decisión, igual de portante:** `--primary` se vuelve **tinta**, no teal. Cada botón `default` de shadcn se convierte en una píldora casi negra (claro) / casi blanca (oscuro). Es el movimiento Apple/Linear y es lo que elimina el último rastro de "plantilla" de los botones.

**Tercera:** `--secondary` se redefine como **neutro**, no como color. Este solo cambio elimina por construcción la peor falla de contraste de la auditoría (blanco sobre `--secondary` = 2.88:1 en 17 insignias) — ya no se puede escribir texto que falle sobre él.

**Regla de gobernanza (injerto de systems-engineer + cinematic-scroll):** el color codifica estado, nunca decoración. Un tono de señal (`--signal`) para interactivo. Tres tonos de estado (`--state-queue` ámbar, `--state-ok` verde, `--state-identity` violeta) permitidos **solo** dentro del diagrama y de chips de estado. Nada más recibe tono.

### 4.2 Tokens — LIGHT

```css
:root {
  /* Superficies — casi blanco, un pelo frío. No #fff puro: el blanco puro mata las líneas capilares. */
  --background:            oklch(0.9920 0.0020 250);
  --foreground:            oklch(0.2050 0.0080 250);   /* tinta, no negro */
  --card:                  oklch(0.9750 0.0025 250);
  --card-foreground:       oklch(0.2050 0.0080 250);
  --popover:               oklch(0.9950 0.0015 250);
  --popover-foreground:    oklch(0.2050 0.0080 250);

  /* Primary = TINTA. Los botones son píldoras negras, no teal. */
  --primary:               oklch(0.2050 0.0080 250);
  --primary-foreground:    oklch(0.9920 0.0020 250);

  /* Secondary = NEUTRO. Elimina la falla 2.88:1 por construcción. */
  --secondary:             oklch(0.9550 0.0030 250);
  --secondary-foreground:  oklch(0.2050 0.0080 250);

  --muted:                 oklch(0.9650 0.0025 250);
  --muted-foreground:      oklch(0.4550 0.0100 250);   /* 7.11:1 sobre --background (AAA) */

  /* --accent SE QUEDA NEUTRO: es la superficie de hover de ghost/outline/dropdown.
     Si fuera teal, cada hover de botón fantasma se volvería un relleno de color. */
  --accent:                oklch(0.9550 0.0030 250);
  --accent-foreground:     oklch(0.2050 0.0080 250);

  /* LA SEÑAL — el único tono. Presupuesto: máx. 6 usos (ver 4.4). */
  --signal:                oklch(0.4400 0.0900 200);   /* 7.11:1 sobre --background (AAA) */
  --signal-ink:            oklch(0.4400 0.0900 200);   /* texto/íconos sobre superficie clara */
  --signal-fill:           oklch(0.4400 0.0900 200);   /* fondo de botón; texto = --signal-ink-on-fill */
  --signal-ink-on-fill:    oklch(0.9920 0.0020 250);   /* 7.11:1 sobre --signal-fill */
  --signal-quiet:          oklch(0.4400 0.0900 200 / 0.12);  /* reglas, anillos, puntos */

  /* Estados — SOLO dentro del diagrama y chips de estado. */
  --state-queue:           oklch(0.6200 0.1200 75);    /* ámbar: en espera */
  --state-ok:              oklch(0.5600 0.1100 150);   /* verde: liquidado */
  --state-identity:        oklch(0.5200 0.1300 300);   /* violeta: identidad */

  --destructive:           oklch(0.5050 0.1900 27.325);
  --destructive-foreground: oklch(0.9920 0.0020 250);

  --border:                oklch(0.9100 0.0040 250);   /* la línea capilar intra-elemento */
  --border-strong:         oklch(0.8300 0.0050 250);   /* ~2:1 — reglas que definen sección */
  --input:                 oklch(0.9100 0.0040 250);
  --ring:                  oklch(0.4400 0.0900 200);   /* anillo de foco = señal */

  --radius: 0.625rem;   /* era 0.75 — más ajustado se lee más preciso */
}
```

### 4.3 Tokens — DARK

```css
.dark {
  /* Casi negro profundo con un matiz frío imperceptible. No negro puro:
     el negro puro hace invisibles las líneas capilares y las pantallas OLED se ven rotas. */
  --background:            oklch(0.1700 0.0060 250);
  --foreground:            oklch(0.9600 0.0030 250);
  --card:                  oklch(0.2050 0.0055 250);
  --card-foreground:       oklch(0.9600 0.0030 250);
  --popover:               oklch(0.2050 0.0055 250);
  --popover-foreground:    oklch(0.9600 0.0030 250);

  /* Invertido: píldora blanca sobre negro. */
  --primary:               oklch(0.9600 0.0030 250);
  --primary-foreground:    oklch(0.1700 0.0060 250);

  --secondary:             oklch(0.2700 0.0060 250);
  --secondary-foreground:  oklch(0.9600 0.0030 250);

  --muted:                 oklch(0.2350 0.0055 250);
  --muted-foreground:      oklch(0.6900 0.0080 250);   /* 6.9:1 sobre --background */

  --accent:                oklch(0.2700 0.0060 250);
  --accent-foreground:     oklch(0.9600 0.0030 250);

  --signal:                oklch(0.7600 0.1000 195);   /* 9.28:1 sobre --background (AAA) */
  --signal-ink:            oklch(0.7600 0.1000 195);
  --signal-fill:           oklch(0.7600 0.1000 195);
  --signal-ink-on-fill:    oklch(0.1700 0.0060 250);   /* texto oscuro sobre relleno claro */
  --signal-quiet:          oklch(0.7600 0.1000 195 / 0.16);

  --state-queue:           oklch(0.7800 0.1100 75);
  --state-ok:              oklch(0.7400 0.1000 150);
  --state-identity:        oklch(0.7200 0.1100 300);

  --destructive:           oklch(0.6300 0.1900 27.325);
  --destructive-foreground: oklch(0.1700 0.0060 250);

  --border:                oklch(0.2700 0.0060 250);
  --border-strong:         oklch(0.3800 0.0060 250);
  --input:                 oklch(0.2700 0.0060 250);
  --ring:                  oklch(0.7600 0.1000 195);
}
```

### 4.4 Presupuesto del acento — la lista cerrada

`--signal` se usa **como máximo en seis categorías** en toda la página:

1. la regla de 1px bajo el enlace activo en la nav
2. el anillo de foco
3. el punto de estado de 6px "disponible" en el hero
4. el punto de 6px en el rol actual del registro de experiencia (HEAD)
5. la regla de hover en la ficha técnica del stack
6. el barrido de subrayado del enlace al hacer hover

**Regla dura:** la señal nunca es un relleno de fondo general, nunca un degradado, nunca texto de más de cuatro palabras. Si una sección necesita énfasis, la respuesta es **más espacio o un tamaño tipográfico mayor — nunca más color.**

**Nota honesta sobre el presupuesto:** "6 usos" es un límite por *categoría*, no por instancia. El anillo de foco aparece en cada elemento enfocable, así que durante el uso con teclado la señal se renderiza docenas de veces. El presupuesto es honesto como límite de categoría; presentarlo como seis apariciones sería auto-halagarse.

### 4.5 Verificación de contraste (calculada, no asumida)

Todos los valores fueron **calculados** desde los tokens OKLCH de arriba (OKLab → sRGB lineal → luminancia relativa WCAG). El mismo script reproduce exactamente la falla reportada por la auditoría — blanco sobre el `--secondary` oscuro antiguo = **2.88:1** — lo que valida el método.

| Par | Claro | Oscuro | Veredicto |
|---|---|---|---|
| foreground / background | **17.50:1** | **17.02:1** | AAA |
| muted-foreground / background | **7.11:1** | **6.90:1** | AAA (era 4.45:1 — corregido) |
| signal / background (uso como texto) | **7.11:1** | **9.28:1** | AAA |
| primary-foreground / primary | **17.50:1** | **17.02:1** | AAA |
| secondary-foreground / secondary | **15.71:1** | **13.41:1** | AAA (era **2.88:1** — falla eliminada por construcción) |
| signal-ink-on-fill / signal-fill | **7.11:1** | **9.28:1** | AAA |
| destructive-foreground / destructive | **6.33:1** | **4.99:1** | AA |
| border-strong / background (objetivo UI 3:1) | ~2.0:1 | ~2.0:1 | *por debajo a propósito* — las capilares son estructura decorativa, no límites de UI. Los límites reales (inputs, foco) usan `--input` + `--ring`. |

**Nota sobre la línea capilar:** una regla de 1px a `--border` (1.28:1) está deliberadamente por debajo del umbral no-textual de 3:1. Eso es correcto aquí **solo porque nada se comunica únicamente por una capilar** — cada regla está respaldada por espaciado y jerarquía tipográfica. Es la diferencia entre "regla decorativa" y "lo único que separa dos controles". Por eso **`--border-strong` sube a ~2:1** para las reglas que definen sección (corrección #5 del §2).

### 4.6 Tokens muertos a eliminar

Borrar `--chart-1..5` y `--sidebar-*`: **13 nombres únicos, 36 declaraciones** (12 por bloque × 3 bloques: `:root`, `.dark`, `@theme inline` — contado, no estimado). No se usan en este sitio. Si algún día aparece un gráfico, se definen entonces.

*(Nota: el juez de craft reportó "39 declaraciones". Es 36. Lo menciono porque este documento apoya su credibilidad en precisión calculada, y una cifra no calculada es una grieta.)*

### 4.7 Tipografía

**Familias — cero descargas nuevas.**

| Voz | Familia | Por qué |
|---|---|---|
| **Display + body** | **Inter** (ya cargada, variable) | El URL de Google Fonts ya pide `Inter:ital,opsz,wght@0,14..32,100..900` — **el eje óptico `opsz` 14–32 ya está vivo**. A tamaños de display el navegador cambia automáticamente al corte *Inter Display*: espaciado más ajustado, trazos más finos, terminales más finas. Nadie tiene que instalar nada; la tipografía enorme obtiene una cara de display gratis. Es el secreto de quiet-luxury que ya está sentado en `index.html:11`. |
| **Voz técnica** | **JetBrains Mono** (ya cargada) | Eyebrows, métricas, fechas, ficha técnica del stack, metadatos de archivo, la nota de honestidad. El mono es lo que hace que un número se lea como *medido* y no como *vendido*. |

**Sin tercera familia.** El lujo viene de la escala y el tracking, no de una cara novedosa. (Si más adelante se quiere un grado más de carácter, la adición de mayor valor es una serif usada en **exactamente un lugar** — una cita destacada en el caso de estudio. Candidata: **Instrument Serif**, Google Fonts, SIL OFL, auto-alojable, ~22 KB woff2 subset. Marcada como opcional, fuera del alcance base.)

**Dos reglas duras:**
- **El peso de display es 500–600. Nunca 700+.** Hoy cada encabezado es `font-weight: 700` con `-0.025em` (`globals.css:230-239`). El peso pesado es lo *opuesto* a quiet luxury — grita. Apple está en 600; Linear en 500–600.
- **El tracking escala inversamente al tamaño.** La tipografía grande recibe tracking negativo; el mono pequeño recibe tracking **positivo**. Hoy todo recibe `-0.025em`, que hace ilegibles las etiquetas de 12px.

**Regla de gobernanza (injerto cinematic-scroll):** **si es un hecho, es mono.** Identificadores, conteos, fechas y estados van en mono; cada palabra de prosa va en la sans; las dos nunca se cruzan.

### 4.8 La escala tipográfica — bloque `@theme` exacto

Tailwind v4 lee `--text-*` y genera `text-*`; las sub-claves `--line-height`, `--letter-spacing` y `--font-weight` viajan solas (verificado compilando con `tailwindcss@4.1.12`).

```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "Cascadia Code", monospace;

  /* ---- DISPLAY: enorme, ajustado, peso 500-600 ---- */
  --text-display-1: clamp(3.25rem, 9vw, 7.5rem);
  --text-display-1--line-height: 0.94;
  --text-display-1--letter-spacing: -0.045em;
  --text-display-1--font-weight: 600;

  --text-display-2: clamp(2.25rem, 5vw, 4.25rem);
  --text-display-2--line-height: 1.00;
  --text-display-2--letter-spacing: -0.038em;
  --text-display-2--font-weight: 600;

  --text-display-3: clamp(1.5rem, 2.6vw, 2.125rem);
  --text-display-3--line-height: 1.12;
  --text-display-3--letter-spacing: -0.028em;
  --text-display-3--font-weight: 600;

  /* ---- LECTURA ---- */
  --text-lead: clamp(1.125rem, 1.5vw, 1.375rem);
  --text-lead--line-height: 1.55;
  --text-lead--letter-spacing: -0.011em;
  --text-lead--font-weight: 400;

  --text-body: 1.0625rem;              /* 17px */
  --text-body--line-height: 1.65;
  --text-body--letter-spacing: -0.006em;

  --text-small: 0.9375rem;             /* 15px */
  --text-small--line-height: 1.60;

  --text-meta: 0.8125rem;              /* 13px */
  --text-meta--line-height: 1.50;

  /* ---- TÉCNICO: mono, tracking POSITIVO ---- */
  --text-eyebrow: 0.75rem;             /* 12px */
  --text-eyebrow--line-height: 1.00;
  --text-eyebrow--letter-spacing: 0.16em;   /* POSITIVO — lo opuesto a hoy */
  --text-eyebrow--font-weight: 500;

  --text-metric: clamp(2.75rem, 6.5vw, 5.5rem);
  --text-metric--line-height: 0.90;
  --text-metric--letter-spacing: -0.040em;
  --text-metric--font-weight: 500;

  --text-mono-sm: 0.75rem;
  --text-mono-sm--line-height: 1.45;
  --text-mono-sm--letter-spacing: 0.02em;

  --text-diagram-label: 0.6875rem;     /* 11px — PISO ABSOLUTO para etiquetas de diagrama */
  --text-diagram-label--line-height: 1.20;
  --text-diagram-label--letter-spacing: 0.06em;
  --text-diagram-label--font-weight: 500;

  /* ---- MOVIMIENTO ---- */
  --ease-out-quiet:  cubic-bezier(0.16, 1, 0.30, 1);   /* expo-out — la firma */
  --ease-entrance:   cubic-bezier(0.22, 1, 0.36, 1);
  --ease-inout-quiet: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-exit:       cubic-bezier(0.40, 0, 1, 1);      /* las salidas son más rápidas y casi lineales */
}
```

**Dónde se usa cada voz:**

| Token | Uso |
|---|---|
| `display-1` | Solo el nombre del hero. Una instancia en la página. |
| `display-2` | Los títulos de las 8 secciones. |
| `display-3` | Título del caso de estudio, títulos de proyecto, titular de contacto, CTA del footer. |
| `lead` | Párrafo lead del hero, subtítulos de sección (máx. 2 frases). |
| `body` | Balas de experiencia, párrafos del caso de estudio, descripciones de proyecto. |
| `small` | Meta de proyecto, títulos de certificado, etiquetas de formulario. |
| `meta` | Fechas, ubicaciones, calificadores secundarios. |
| `eyebrow` | Mono, mayúsculas, tracking `0.16em` — la etiqueta sobre cada título de sección. Es el dispositivo "premium" más repetido de la página. |
| `metric` | Los cuatro números de la banda de impacto. Siempre `font-variant-numeric: tabular-nums`. |
| `mono-sm` | Ficha técnica del stack, listas de tecnología, nota de honestidad, metadatos de archivo, línea de estado. |
| `diagram-label` | Las 12 etiquetas del diagrama SVG. **Mínimo 11px — nunca 9px.** |

### 4.9 Medida (longitud de línea)

- Copy de body: `max-w-[38rem]` (~64ch a 17px). Nunca el ancho completo del contenedor.
- Párrafos lead: `max-w-[46ch]`.
- Encabezados display: `max-w-[11ch]` — **corregido desde 16ch**, que no restringía nada (ver §2, corrección #2).
- Líneas mono de especificación: sin límite, pero cortadas en fronteras semánticas con separadores `·`.

### 4.10 Reemplazo de la capa base

Borrar por completo las reglas actuales `h1,h2,h3,h4,h5,h6 { font-weight: 700; letter-spacing: -0.025em }` y `p { line-height: 1.6 }` (`globals.css:230-243`). La escala de tokens ahora es dueña de todo. Los encabezados reciben `text-wrap: balance`; el body recibe `text-wrap: pretty`.

### 4.11 Espacio, grid y chrome

**El contenedor — definido una vez.** Hoy cada sección repite `container px-4 mx-auto` seis veces, y el `container` de Tailwind v4 ya no centra ni da padding (verificado en el CSS emitido: `.container{width:100%}` más max-widths por breakpoint, sin `margin-inline:auto`).

```css
@utility container-page {
  width: 100%;
  max-width: 76rem;          /* 1216px */
  margin-inline: auto;
  padding-inline: 1.5rem;
  @media (width >= 48rem) { padding-inline: 2.5rem; }
  @media (width >= 80rem) { padding-inline: 3rem; }
}

@utility measure-text { max-width: 38rem; }
@utility measure-lead { max-width: 46ch; }
@utility measure-display { max-width: 11ch; }
```

Esto también mata `max-w-8xl` (que **no existe en Tailwind v4** — cero CSS emitido, verificado).

**Ritmo de sección — la palanca más grande.**

| | Hoy (efectivo) | Quiet luxury |
|---|---|---|
| Padding de sección | `py-20` × 2 anidados = **~160px total, 80px por borde** | `py-32 md:py-44 lg:py-56` = **128 / 176 / 224px** |
| Separación título-contenido | `mb-16` (64px) | `mb-20 md:mb-28` (80 / 112px) |
| Separación título-subtítulo | `mb-4` (16px) | `mb-6` (24px) |

**Corrección estructural:** `App.tsx` **no renderiza ningún `<section>` envolvente**. Cada componente es dueño de su propio `<section id="…" className="scroll-mt-24 py-32 md:py-44 lg:py-56">`. Esto elimina el padding duplicado y la inconsistencia de contacto (`pt-20` vs `py-20`) en una sola edición.

**El grid capilar — la única "decoración".** En lugar de blobs, la página obtiene **estructura visible**: reglas verticales de 1px en el borde izquierdo del contenedor y en la línea de columna 8-de-12, recorriendo toda la altura del hero y del caso de estudio, a `--border`. Más bandas horizontales `border-y` en la franja de métricas, la banda de CV y el footer. Es el dispositivo Linear/Apple: hace que la página se sienta *dibujada* y no *ensamblada*, y cuesta un `<div>` posicionado absoluto por sección.

**Chrome.**
- **Altura de nav:** 88px en reposo → **64px tras 24px de scroll**, en 500ms `ease-out-quiet`. El chrome literalmente retrocede.
- **Sin `shadow-lg` en ningún lugar de la página.** La profundidad viene de capilares y escalones de superficie (`--background` → `--card`), nunca de sombras.
- **Radio:** `--radius: 0.625rem`. Botones son píldoras (`rounded-full`); tarjetas/paneles son `rounded-xl`; miniaturas son `rounded-lg`. **Tres formas en total, cada una con un significado.** Hoy hay tres formas de píldora y cuatro tratamientos de botón para los mismos conceptos.

---

## 5. Arquitectura de la información

### Orden final de secciones

| # | Sección | id | Propósito en una línea | Estado |
|---|---|---|---|---|
| 0 | Navigation | — | Marca tipográfica, enlaces, ES/EN, tema, Descargar CV. | Modificada |
| 1 | Hero | `#inicio` | Quién es y qué construye, en 15 segundos. | Reescrita |
| 2 | **Banda de impacto** | `#impacto` | Cuatro conteos verificados + nota de honestidad. La prueba de escala. | **NUEVA** |
| 3 | Experiencia | `#experiencia` | Tres roles como registro de commits, HEAD = rol actual. | Reescrita |
| 4 | Stack | `#habilidades` | Ficha técnica mono, 6 categorías con columna `USED IN`. | Reescrita |
| 5 | Proyectos | `#proyectos` | Caso de estudio empresarial + cuadrícula de 5. | Reescrita |
| 6 | Certificaciones | `#certificaciones` | 18 certificados, colapsados por defecto. | Reescrita |
| 7 | **Educación e Idiomas** | `#educacion` | Licenciatura + idiomas, en el mismo libro mayor. | **NUEVA** |
| 8 | **Banda de CV** | `#cv` | Descarga de CV ES/EN. | **NUEVA** |
| 9 | Contacto | `#contacto` | Formulario de 3 campos + datos directos. | Reescrita |
| 10 | **Footer** | — | Enlaces, contacto, socials, volver arriba. | **NUEVA** |

### Qué se agrega / elimina / fusiona

**Agregado (4):** Banda de impacto, Educación e Idiomas, Banda de CV, Footer.

**Eliminado (0 secciones):** ninguna sección se elimina. Se elimina contenido *dentro* de secciones:
- el bloque "Proyecto Destacado" duplicado (`projects-section.tsx:114-176`)
- la categoría de skills `Otros`/`Other` (sus elementos se reubican)
- la calificación de 5 puntos (`skills-section.tsx:48-58`)
- los 5 `githubUrl: "#"` muertos
- 3 claves i18n sin uso, 10 objetos `colors` muertos, `src/App.css`, `src/assets/FILogo2.png`

**Fusionado (1):** la banda de métricas de la ganadora + la banda de impacto como espécimen de editorial-swiss + la matriz de estrategias de systems-engineer → **una sola banda de impacto** en la posición 2, con el detalle de la matriz viviendo dentro del caso de estudio.

### Decisiones de orden y su justificación

**Por qué la banda de impacto va en posición 2 y no después del hero.** El juez de outcome marcó que "la prueba está a un scroll bajo el pliegue" como el mayor defecto de reclutador de la ganadora: con `min-h-[88svh]` de hero más padding triplicado, la banda de métricas cae a ~un viewport. **Corrección adoptada:** promover los **dos conteos verificados más fuertes** (`11` servicios, `738` pruebas) a la línea mono del hero (que ya existe en el mock de la ganadora), y dejar la banda completa en posición 2. Así "sistemas distribuidos" aterriza **antes** de cualquier scroll.

**Por qué Educación va antes de Certificaciones.** Un grado completado (Dic 2024) es invisible hoy y puede fallar un filtro automático de reclutamiento. Educación es un dato de *elegibilidad*; certificaciones son un dato de *profundidad*. Elegibilidad primero.

**Por qué la banda de CV va después de Certificaciones.** El juez de outcome marcó que la sección de 18 certificados interrumpe el recorrido de "aquí está mi trabajo empresarial" a "aquí está mi CV". Pero mover el CV arriba de Certificaciones lo pone entre Proyectos y Certificaciones, lo que rompe el ritmo de prueba → credenciales. **Compromiso:** el CV aparece **tres veces** — botón fantasma en la nav (siempre visible), enlace de texto secundario en el hero, y banda dedicada. Un reclutador nunca está a más de un clic. La banda dedicada se queda después de Certificaciones porque el CV *resume* todo lo anterior.

---

## 6. Especificación por sección

### 6.0 Global

- `App.tsx` queda: `<Navigation /> <main> <Hero/> <Metrics/> <Experience/> <Stack/> <Projects/> <Certifications/> <Education/> <CvBand/> <Contact/> </main> <Footer />`. **Sin `<section>` envolventes.**
- Cada sección: `<section id="…" className="scroll-mt-24 …">` — `scroll-mt-24` (96px) arregla el bug actual donde cada ancla en página aterriza con el encabezado oculto bajo la nav de 80px.
- `html lang` se sincroniza con `lang` de `useI18n()` en un `useEffect` (hoy está fijo en `lang="en"` mientras el contenido por defecto es español).
- `index.html`: reescribir `<title>`, agregar meta description, OG + Twitter, canonical, JSON-LD `Person` (`jobTitle`, `alumniOf`, `knowsLanguage`, `sameAs`), `rel="icon"` (no `rel="logo"`), `robots.txt`, `sitemap.xml`, un `og.png` estático (1200×630) en `public/`, y un script inline pre-hidratación para matar el flash de modo oscuro.
- **Decisión de idioma por defecto (decisión abierta, ver §12):** el público para "remote, senior backend" es mayoritariamente inglés. Recomendación: detectar `navigator.language` y usar `en` salvo que empiece con `es`, manteniendo el override de `localStorage`. Hoy el default es `es` (`i18n/index.tsx:27`).

### 6.1 Navigation

**Layout.** Fija, `z-50`, altura 88 → 64px al scroll. Izquierda: **marca tipográfica** `Fernando Ibarra` en Inter 15px/600 `-0.01em`. Centro: 6 enlaces a 14px `text-muted-foreground`, hover → `text-foreground` en 160ms. Derecha: par de texto `ES / EN` (inactivo en muted, divisor de 1px entre ellos — **no** un botón con ícono de globo; reemplaza `language-toggle.tsx:9-12`), control de tema, `Descargar CV ↓` como botón fantasma, disparador de menú móvil.

**La decisión del logo.** Hoy `FILogo.png` es **1.38 MB renderizado a 48×48px** (`navigation.tsx:41`), dentro de un círculo `bg-gradient-to-br from-primary to-accent rounded-full` con `animate-glow` (`navigation.tsx:39`). **Por defecto: quitarlo de la nav y usar la marca tipográfica.** Es el movimiento Apple (la nav dice *Apple*, no la manzana) y elimina 1.38 MB del primer pintado. La marca sobrevive en el footer a 32px, optimizada.

*Si Fernando insiste en la marca:* enviar `logo-96.avif` + `logo-192.avif` con `srcset`, `width`/`height` explícitos, `decoding="async"`, **sin círculo de degradado ni glow**, a 28px. Reversible en una línea.

**Indicador de sección activa.** La regla de 1px de señal que se desliza entre items (M2, §10). Requiere **`aria-current="page"` en el enlace activo** — el juez de outcome lo marcó como gap explícito (la auditoría lo flaggeó y la dirección no lo menciona). Un `IntersectionObserver` sobre los elementos de sección escribe `activeId` al estado.

**Móvil.** Un **panel de pantalla completa**, no un desplegable. Fade de 200ms + subida de 8px. Enlaces a `display-3` peso 500, escalonados 40ms. **Requerido (hoy no existe nada de esto):** `aria-expanded`, `aria-controls`, `aria-label` en el disparador, cierre con Escape, foco al primer enlace al abrir, retorno del foco al disparador al cerrar, scroll lock del body, cierre por clic externo.

**Control de tema.** Mantener `DropdownMenu` de shadcn. Correcciones requeridas: quitar la clase muerta `font-geist-sans` (`theme-toggle.tsx:40,46` — emite cero CSS); envolver `localStorage.getItem` en `try/catch` (`theme-toggle.tsx:19-21` — crashea en ventanas privadas); evitar que la rama `system` escriba la clave `theme` al cambiar el SO (`theme-toggle.tsx:24-34` — hoy fija la preferencia fuera de `system` silenciosamente); mover `Claro / Oscuro / Sistema` a los diccionarios i18n (`theme-toggle.tsx:47-49` — hoy hardcodeado en español, y un diff diccionario-contra-diccionario no puede detectarlo). Agregar el script inline pre-hidratación en `index.html`.

**Opcional (cortable primero):** la Línea de Petición de cinematic-scroll — una regla de 1px vinculada al scroll con un nodo por sección que se enciende. Un transform, solo compositor, sin listener de scroll, línea estática completa bajo movimiento reducido.

**Claves i18n:** `nav.home`, `nav.impact`, `nav.experience`, `nav.skills`, `nav.projects`, `nav.certifications`, `nav.education`, `nav.contact`, `nav.downloadCv`, `nav.menuOpen`, `nav.menuClose`, `theme.light`, `theme.dark`, `theme.system`, `theme.toggleLabel`.

### 6.2 Hero

**Layout.** Alineado a la izquierda, asimétrico, 12 columnas. No centrado.

```
┌─ container-page ────────────────────────────────────────────────┐
│  │                                                          │   │  ← reglas capilares en
│  │  SENIOR BACKEND ENGINEER · HERMOSILLO, MX · REMOTE       │   │    col 1 y col 8
│  │  ────────────────────────────────────────────            │   │
│  │                                                          │   │
│  │  Fernando                                                │   │  display-1, 600, -0.045em
│  │  Ibarra                                                  │   │  max-w-[11ch] ← CORREGIDO
│  │                                                          │   │
│  │  Diseño y llevo a producción sistemas backend            │   │  lead, muted, 46ch
│  │  distribuidos — microservicios con NestJS, motores       │   │
│  │  de pago dirigidos por mensajería, y el trabajo poco     │   │
│  │  vistoso de hacerlos correctos bajo carga.               │   │
│  │                                                          │   │
│  │  [ Ver el trabajo ]   Descargar CV ↓                     │   │  píldora tinta + enlace texto
│  │                                                          │   │
│  │  ● Disponible para roles senior — Sep 2026               │   │  punto de señal 6px, mono
│  │                                                          │   │
│  │                    NestJS · RabbitMQ · Redis · SQL Server · React │  mono, capilar arriba
│  │                    11 servicios · 738 pruebas            │   │  ← PROMOVIDO de la banda
└──────────────────────────────────────────────────────────────────┘──────────────────────────────────────┘
```

**Altura.** `min-h-[88svh]` — **no `100vh`** (evita el salto de la barra de URL en móvil). Contenido ponderado hacia abajo con `pb-24`.

**Eyebrow en móvil (corrección #4).** En `<48rem`, el eyebrow se parte en dos líneas con el `·` como separador de línea: `SENIOR BACKEND ENGINEER` / `HERMOSILLO, MX · REMOTE`. La regla capilar se dibuja bajo la primera línea.

**Contenido (crítico).** `hero.role` debe volverse **"Senior Backend / Full Stack Developer"**. `hero.description` debe dejar de llamarlo "desarrollador React". Copy nuevo en §7.

**Acciones — dos, no cinco.** Primaria: píldora tinta sólida `Ver el trabajo` → `#proyectos` (con `asChild`, no `<a>` anidado). Secundaria: enlace de texto con subrayado de 1px `Descargar CV` como un `<a download href="/cv/fernando-ibarra-cv-es.pdf">` real. **Sin botones sociales en el hero** — se mueven al footer como enlaces de texto.

**La señal de disponibilidad (gap del juez de outcome).** El texto **no** puede ser `"Disponible para proyectos"` bajo un hero que lo posiciona como Senior Backend Engineer mientras el CV lo muestra empleado de tiempo completo en Rocket Code. Un reclutador no puede saber si busca un rol senior o vende freelance — y son bandejas de entrada distintas. **Corrección adoptada:** `● Disponible para roles senior — Sep 2026` (señal de búsqueda de rol), o cortar la línea. **Decisión del dueño (§12).**

**Eliminado:** el emoji 🚀, los dos blobs de parallax, los tres tiles flotantes, `gradient-text`, `animate-float`, `animate-glow`, `animate-fade-scale`, y el `window.addEventListener("mousemove")` que re-renderiza todo el subárbol del hero a 60–120 Hz.

**Claves i18n:** `hero.eyebrow`, `hero.name`, `hero.role`, `hero.description`, `hero.ctaProjects`, `hero.ctaCv`, `hero.status`, `hero.stackLine`, `hero.metricsInline`.

### 6.3 Banda de impacto — la prueba de 15 segundos

Banda full-width, `border-y`, `py-24`. **Aquí es donde la banda de métricas de la ganadora se fusiona con la banda-espécimen de editorial-swiss.**

**Intro (2 líneas, `measure-text`):** *"Contribuciones seleccionadas a una plataforma de seguros multi-inquilino — una flota de microservicios NestJS al servicio de marcas minoristas nacionales. Las cifras son conteos tomados del código."*

**Cuatro métricas**, mono `--text-metric`, `tabular-nums`, en grid de 4 columnas con capilares `divide-x`:

| # | Etiqueta | Calificador |
|---|---|---|
| `11` | microservicios | arquitectura Clean + Hexagonal + DDD uniforme |
| `53` | estrategias de pago | detrás de un solo dispatcher (4 métodos × 18 dominios) |
| `63` | esquemas de base de datos | uno por inquilino por dominio |
| `4+` | años enviando software a producción | — |

**Disciplina de cifras (injerto editorial-swiss):** cada cifra debe ser una que el recon **realmente contó**. Las dos no confirmadas (`53`, `18`) deben confirmarse antes de promoverse a la línea del hero. `738` es un conteo de **archivos** `*.test.ts(x)`, no de casos — la etiqueta debe decir "archivos de prueba" o cambiarse a un conteo de casos verificado. `11` es el número verificado **en este workspace**, no el total de la plataforma.

**La nota de honestidad — una característica, no letra chica.** Directamente bajo la banda, en `mono-sm` a `muted-foreground`, una línea:

> *"Proyecto en equipo. Contribuí a los servicios de pago y al SPA; no construí esto solo. Las cifras son conteos del código, no afirmaciones de autoría."*

Es lo más calladamente confiante de la página. Todos los demás portafolios implican autoría única; declarar el alcance con precisión es lo que un ingeniero senior realmente hace en una entrevista. **Es también el mecanismo que descarga el mayor riesgo de honestidad del recon.**

**Guardarraíles NDA para esta banda:** sin nombres de inquilinos (Walmart / Liverpool / Suburbia), sin nombres de proveedores (Promass / BBVA / ANA), sin nombres de exchanges (`nova.payments`), sin hosts internos, sin nombres de esquemas o tablas, y **sin uso del nombre clave interno**. "Plataforma de seguros multi-inquilino al servicio de marcas minoristas nacionales" es el nivel de abstracción del propio CV y es seguro.

**Claves i18n:** `metrics.title`, `metrics.intro`, `metrics.items[4].{value,label,qualifier}`, `metrics.honestyFootnote`.

### 6.4 Experiencia — el registro de commits (injerto cinematic-scroll)

**Layout.** No tarjetas. Un **registro de commits**: columna izquierda mono fija de 10rem con hash corto + rango de fechas; columna derecha con empresa en `display-3`, puesto en `body`, balas expandibles, y tecnologías como **línea mono separada por comas** — no píldoras.

```
│
●  a1b2c3d   Nov 2025 — Presente    Rocket Code
│            HEAD                    Senior Backend Developer
│                                    Hermosillo, MX · Remoto
│                                    · Desarrollé y mantuve servicios backend con
│                                      Node.js, TypeScript y NestJS
│                                    · Implementé comunicación entre microservicios
│                                      con RabbitMQ (mensajería, procesamiento asíncrono)
│                                    NestJS · RabbitMQ · Redis · Prisma · SQL Server · Docker
│
○  9f8e7d6   Dic 2023 — Nov 2025    INOWU Development
│                                    Full Stack Developer
```

**Tres entradas, Rocket Code primero.** El rol actual recibe un nodo **relleno** de señal de 6px y la etiqueta `HEAD`; los roles pasados reciben un nodo **hueco** de 5px (borde de 1px). Es el cuarto uso permitido de la señal.

**Por qué esta estructura y no tarjetas.** Hace **estructuralmente imposible** repetir el hallazgo #1 del diagnóstico — el rol actual faltante — porque HEAD es la primera fila y no hay dónde esconder una omisión. Un tratamiento de diseño que arregla un bug de corrección por construcción.

**Correcciones de contenido (no negociables):**
1. **Agregar Rocket Code** — `Senior Backend Developer`, `Nov 2025 – Presente`.
2. **Corregir el fin de INOWU** a `Nov 2025`.
3. **Corregir las balas de IGRTEC.** Hoy reclaman "metodologías ágiles" (`es.ts:250`, `en.ts:250`), que el CV nunca afirma. Reemplazar con las balas reales de revisión de código y mentoría.
4. **Honestidad sobre PostgreSQL.** El CV lista PostgreSQL para el rol de Rocket Code, pero la plataforma es **SQL Server + Prisma** en todo. No afirmar PostgreSQL sobre la plataforma de seguros — un entrevistador técnico lo detectará. Listar `Prisma · SQL Server` en la entrada de Rocket Code, y mantener PostgreSQL donde sí es verdad (Votométrica, WFacturas, VideoRemixes según el diccionario existente).
5. **No agregar un caso de estudio de Firebird con fechas.** El recon encontró un conflicto duro de línea temporal: el CV ubica el trabajo de sincronización Firebird en INOWU (Dic 2023 – Nov 2025), pero cada commit está fechado **2026-04-15 → 2026-09-02**, dentro del período de Rocket Code, en un repo personal. El *patrón* (trigger → tabla de cola → agente de polling → upsert idempotente) puede aparecer en la ficha técnica como habilidad; un caso de estudio fechado no puede.

**Movimiento.** El riel se dibuja hacia abajo vía `scaleY` con `transform-origin: top` en 900ms al entrar la sección; el contenido de cada entrada hace fade + sube 12px con 100ms de escalonado.

**Claves i18n:** `experienceSection.title`, `experienceSection.subtitle`, `experiences[3].{hash, company, position, period, location, description[], technologies[]}`, `experienceSection.headLabel`.

### 6.5 Stack — la ficha técnica

**Layout.** La tabla mono (M4). Full-width, reglas capilares por fila, tres columnas: `CATEGORÍA` (eyebrow 12px, 10rem fijo) | `ELEMENTOS` (15px) | `USADO EN` (13px muted, alineado a la derecha).

**Seis categorías**, reemplazando las cinco actuales más el cajón `Otros` que esconde habilidades reales:

| Categoría | Elementos | Usado en |
|---|---|---|
| **Backend** | Node.js, NestJS, Express.js, REST APIs, Microservices, WebSockets | Plataforma de seguros · Trabajo de cliente |
| **Arquitectura y mensajería** | Clean Architecture, Hexagonal (Ports & Adapters), DDD, RabbitMQ, Redis, BullMQ, comunicación asíncrona y entre servicios | Plataforma de seguros |
| **Bases de datos** | SQL Server, PostgreSQL, MongoDB, Prisma, TypeORM | Plataforma de seguros · Trabajo de cliente |
| **Frontend** | React, React Native, Next.js, TypeScript, JavaScript, Tailwind CSS, shadcn/ui, Zustand, TanStack Query, React Router, RHF, Zod | Trabajo de cliente · Proyectos propios |
| **DevOps y herramientas** | Docker, Git, GitLab CI, ArgoCD, Kubernetes, NPM, PNPM, Sentry | Plataforma de seguros |
| **Integraciones** | Sistemas de pago, sistemas legacy, APIs de terceros, Keycloak, OpenAI API, Firebase | Plataforma de seguros · Trabajo de cliente |

**La columna `USED IN`** es el reemplazo honesto de la calificación falsa de 5 puntos. Dice *dónde* se usó una habilidad en lugar de pretender calificarla.

**Eliminado:** la calificación de 5 puntos (`i < 4` — toda habilidad puntúa idéntico, solo ratón, invisible en reposo, sin nombre accesible).

**Corregido:** WebSockets sale de DevOps y entra a Backend (donde el CV lo pone); RabbitMQ, Redis, Microservices, REST APIs, Keycloak, PNPM y SQL Server aparecen por primera vez; Zustand / TanStack Query / React Router salen de `Otros` y entran a Frontend.

**Movimiento.** Las filas hacen fade con 30ms de escalonado al intersectar. Hover: la regla de señal de 1px se desliza desde la izquierda (240ms), el texto de la fila se desplaza 4px a la derecha (160ms). **Un grupo de propiedades por fase.**

**Claves i18n:** `skillsSection.title`, `skillsSection.subtitle`, `skillsSection.usedInLabel`, `skillsSection.categories[6].{title, items[], usedIn}`.

### 6.6 Proyectos

**Dos partes: un caso de estudio empresarial, luego una cuadrícula de cinco.**

#### 6.6.1 El caso de estudio empresarial

Full-width, 2 columnas en desktop (diagrama izquierda, narrativa derecha), dentro de un panel `bg-card` con **borde de 1px y sin sombra**.

- **Eyebrow:** `PLATAFORMA EMPRESARIAL · 2025 — PRESENTE`
- **Título** (`display-3`): *"Una plataforma de seguros multi-inquilino"*
- **Body** (2 párrafos, `measure-text`): la historia de arquitectura al nivel de abstracción del CV — base de datos por inquilino por dominio resuelta desde el JWT, un motor de pagos centralizado detrás de un solo dispatcher, llamadas entre servicios dirigidas por mensajería, y la restricción de apuntar Prisma a un esquema SQL Server legacy compartido en lugar de migrarlo.
- **La matriz de estrategias (injerto systems-engineer):** una cuadrícula etiquetada de `4 métodos × 18 dominios = 53 estrategias` con un conteo. Comunica una arquitectura empresarial restringida como **patrón**, no como revelación de cliente. **Construirla genérica desde el primer commit** — si se construye con etiquetas reales "temporalmente", se publican.
- **Mini-grid de métricas**, 3×2, mono: `11 servicios` · `53 estrategias de pago` · `63 esquemas` · `6 dominios de identidad` · `738 archivos de prueba` · `4,238 archivos frontend`
- **Línea de stack** (mono): `NestJS 11 · TypeScript · Prisma · SQL Server · RabbitMQ · BullMQ · Redis · Keycloak · Docker · ArgoCD`
- **Un enlace de texto:** `Notas de arquitectura →` abriendo un `Dialog` de shadcn con el escrito largo guardado en el diccionario i18n. **Sin enlace externo** — los repos son privados.
- **Nota al pie** (`mono-sm`, muted): *"Trabajo de cliente. Nombres y detalles internos omitidos. Proyecto en equipo — ver la nota arriba."*
- **El diagrama:** M5. SVG inline, viewBox ~640×400, 12 rects capilares, conectores de 1px, **etiquetas mono a 11px (corregido desde 9px)**. Requiere `<title>` y `<desc>` o `aria-label` — el juez de outcome lo marcó como gap.

**Esta sección es la pieza central.** Si no puede publicarse, el whitespace enorme del resto no tiene nada que sostener — ver §12.

#### 6.6.2 La cuadrícula de proyectos

**Cinco proyectos, 2 columnas en desktop** (no 3 — imágenes más grandes se leen más premium), 1 en móvil. Cada item:

1. **Imagen** — `aspect-[16/10]`, `object-cover`, `loading="lazy"`, `decoding="async"`, `width`/`height` explícitos (mata el layout shift), AVIF + WebP vía `srcset` a 1200/800/480.
2. **Título** — `display-3` escalado a ~20px, peso 600.
3. **Descripción de una línea** — `small`, muted.
4. **Línea de tecnología** — mono `mono-sm`, separada por comas. No píldoras.
5. **`Visitar el sitio →`** — un enlace de texto, no un botón full-width.

**Sin borde de tarjeta, sin sombra, sin `hover:-translate-y-2`.** El separador es una regla de 1px sobre cada item. Hover: la imagen escala a 1.02 en 420ms dentro de `overflow-hidden` (una propiedad), y el subrayado del título se dibuja.

**Correcciones:**
- **Borrar el bloque "Proyecto Destacado"** (`projects-section.tsx:114-176`). El caso de estudio empresarial toma su lugar.
- **Borrar los cinco `githubUrl: "#"` muertos.** Son sitios de cliente; mantener solo `Visitar el sitio` para los cinco que tienen URL viva.
- **Arreglar el `useMemo`** cuya dependencia `images` se recrea en cada render (`projects-section.tsx:16-20`).
- **La optimización de imágenes es obligatoria.** 6.3 MB de PNGs hoy. Un `scripts/optimize-images.mjs` comprometido usando **`sharp`** como devDependency produce AVIF + WebP a tres anchos en `public/projects/`. Esperado: 6.3 MB → **~350 KB**.

**Claves i18n:** `projectsSection.title`, `projectsSection.subtitle`, `projectsSection.viewProject`, `projectsSection.caseStudy.{eyebrow,title,body[],matrixLabel,metrics[6],stack,notesLink,notesTitle,notesBody,footnote}`, `projects[5].{title,description,imageKey,technologies[],liveUrl}`.

### 6.7 Certificaciones (18)

**Encabezado.** Título alineado a la izquierda, con el conteo como numeral mono grande: `18` en `--text-metric` junto a la etiqueta `certificaciones`.

**Estructura.** Dos grupos de proveedor.

- **Microsoft & LinkedIn** — 3 tarjetas, mostradas completas. (Resolver la inconsistencia actual: el encabezado del grupo dice "Microsoft" mientras los nombres de los certificados dicen "by Microsoft and LinkedIn". Etiquetar el grupo **"Microsoft & LinkedIn"**.)
- **DevTalles** — 15 tarjetas, **colapsadas a 6 por defecto** con un disclosure `Mostrar las 15` (M6). Declarar el total real para que el toggle se lea como *revelar*, no como esconder.

**Tarjeta.** Miniatura `aspect-[4/3]` con `object-cover` en un envoltorio de altura fija (`h-40`/`h-48`), `loading="lazy"`, `width`/`height` explícitos; título a `small`/600; línea de tecnología en `mono-sm`; **toda la tarjeta es un `<button>` con nombre accesible** (`aria-label` = nombre del certificado + "Ver certificado") que abre el lightbox. La insignia de proveedor se vuelve `variant="outline"` con `text-muted-foreground` — **esto elimina la falla de 2.88:1 blanco-sobre-secondary en las 17 insignias actuales.**

**Lightbox.** `Dialog` de shadcn: imagen a tamaño completo con `alt` descriptivo, descripción, y `Ver en DevTalles ↗`.

**Correcciones de datos (ver §8 para la lista reconciliada):**
1. **Agregar el certificado faltante** — `c_react_actualizado`, `https://cursos.devtalles.com/certificates/grfoac6egq`, imagen `https://i.imgur.com/nssarnF.jpeg`. **Leer el título real de la imagen antes de publicar** — el propuesto es inferido, no leído.
2. **Arreglar el id de TanStack Query** — el sitio tiene `irg3nsjnzjl` (11 caracteres); **confirmar que `irg3nsjnzj` resuelve antes de enviar**; si el id de 11 caracteres es el correcto, la corrección se invierte.
3. **Arreglar `"Inteligence Artificial"`** — mal escrito *y* en español, y está en **ambos** `es.ts:66` y `en.ts:66`.
4. **Quitar `?trk=share_certificate`** de los dos URLs de LinkedIn.
5. **Auto-alojar las 18 imágenes** en `public/certifications/` como AVIF/WebP. Hoy hacen hotlink a `i.imgur.com` — una dependencia de runtime de terceros, sin versionar, que dará 404 o rate-limit sin aviso, en la sección más larga de la página.

**Opcional (cortar primero):** filtro de 4 chips por tema (`Frontend` / `Estado y datos` / `Backend` / `Fundamentos`) + `Todas`, `aria-pressed`, `useState` del lado del cliente.

**Movimiento.** Las tarjetas hacen fade + suben 8px con 24ms de escalonado al intersectar. El Dialog entra/sale con el fade + escala de 4px de Radix en 180ms.

**Claves i18n:** `certificationsSection.title`, `certificationsSection.subtitle`, `certificationsSection.button`, `certificationsSection.showAll`, `certificationsSection.showLess`, `certificationsSection.countLabel`, `certificationsSection.providers[2].{provider, certifications[]}`.

### 6.8 Educación e Idiomas

Una banda única con capilar superior, 2 columnas en desktop, apilada en móvil. Usa **el mismo patrón de libro mayor que Experiencia** para que la página tenga un solo ritmo vertical.

- **Izquierda — Formación:** `Licenciatura en Desarrollo de Software` / `Bachelor's Degree in Software Development`, Tecnológico Nacional de México, Campus Hermosillo, `Ago 2017 – Dic 2024`, Hermosillo, Sonora, México.
- **Derecha — Idiomas:** dos filas con reglas de 1px.
  - `Español` — Nativo / Native
  - `English` — Competencia profesional básica / Basic professional proficiency

**Sin barras de progreso, sin porcentajes, sin banderas.** Las barras de progreso en idiomas son un tell de plantilla y no comunican nada. Un calificador mono es más honesto y se lee más senior.

Esta sección no existe hoy. Un grado completado (Dic 2024) es invisible, lo que puede fallar un filtro automático.

**Claves i18n:** `educationSection.title`, `educationSection.degree`, `educationSection.institution`, `educationSection.period`, `educationSection.location`, `languagesSection.title`, `languagesSection.items[2].{language, level}`.

### 6.9 Banda de descarga de CV

Banda full-width delgada, `border-y`, `py-20`.

- **Izquierda:** `display-3` *"El CV completo"* / *"The full CV"* + una línea a `small` muted.
- **Derecha:** dos píldoras tinta sólidas — `Descargar CV (ES)` y `Download CV (EN)` — cada una un `<a href="/cv/fernando-ibarra-cv-es.pdf" download>` real. Más una línea meta mono: `PDF · 2 páginas · ~96 KB`.
- **Nombres de archivo:** `fernando-ibarra-cv-es.pdf` / `fernando-ibarra-cv-en.pdf`. **Sin espacios, sin acentos** — Safari y varios CDNs destrozan ambos en `Content-Disposition`.
- También duplicado en la nav (botón fantasma) y en el footer.

Es la acción de mayor valor para un reclutador y es la única acción que el sitio hoy no ofrece. Ver §9 para la técnica.

**Claves i18n:** `cvBand.title`, `cvBand.subtitle`, `cvBand.downloadEs`, `cvBand.downloadEn`, `cvBand.meta`.

### 6.10 Contacto

**Layout.** 2 columnas. Izquierda: titular `display-3`, luego el email como **enlace grande** (~24px, subrayado de señal que barre al hover), teléfono, ubicación, y los tres socials como **enlaces de texto `<a>` reales** con etiquetas mono. Derecha: el formulario.

**Formulario — recortado de 5 campos a 3.** `Nombre` / `Email` / `Mensaje`. Mover `Empresa` fuera del formulario por completo.

**Corrección de seguridad (crítica, C4).** Registrar el honeypot bajo un nombre distinto (`_hp`), mantenerlo `hidden` + `aria-hidden` + `tabIndex={-1}` + `autoComplete="off"`, y **reactivar la guarda** (`contact-section.tsx:41-45`).

**Correcciones de accesibilidad (todas faltan hoy).** `htmlFor`/`id` en cada campo; `aria-invalid` como atributo real; `aria-describedby` apuntando al `<p>` de error; `role="alert"` en el texto de error; `aria-live="polite"` en el estado del formulario.

**Validación de entorno.** `contact-section.tsx:51-61` llama `emailjs.send(undefined, …)` cuando una variable `VITE_EMAILJS_*` no está fijada, produciendo un error indistinguible de una falla de red. Validar al montar y mostrar un mensaje distinto. Agregar un `.env.example`.

**Rate limit.** Deshabilitar el envío por 30s tras un envío exitoso (timestamp en `localStorage`, con `try/catch`).

**Movimiento.** Anillo de foco = señal, 3px, offset 2px. El envío muestra un estado de carga mono de 3 puntos. El éxito **reemplaza el formulario inline** con un checkmark y un enlace de texto `Enviar otro mensaje` — no solo toast. Mantener `react-hot-toast` para la ruta de error, re-estilizado como tarjeta capilar.

**Claves i18n:** `contactSection.title`, `contactSection.subtitle`, `contactSection.emailLabel`, `contactSection.phoneLabel`, `contactSection.locationLabel`, `contactSection.locationValue`, `contactSection.formTitle`, `contactSection.formSubtitle`, `contactSection.namePlaceholder`, `contactSection.emailPlaceholder`, `contactSection.messagePlaceholder`, `contactSection.sendButton`, `contactSection.sending`, `contactSection.toastSuccess`, `contactSection.toastError`, `contactSection.successTitle`, `contactSection.sendAnother`, `contactSection.envError`.

### 6.11 Footer

Un `<footer>` real — la página hoy termina en un encabezado muerto sin botón, enlace ni acción, y no tiene footer.

Tres columnas en desktop, apiladas en móvil. Izquierda: marca tipográfica + una línea de posicionamiento + la marca del logo a 32px (AVIF optimizado). Centro: los 8 enlaces de sección. Derecha: contacto + socials. Fila inferior: `© 2026 Fernando Ibarra` · `Hermosillo, Sonora, México` · una línea mono `Built with React, Vite, Tailwind` · `Volver arriba ↑`.

Solo borde capilar superior. Sin cambio de fondo. Sin movimiento.

**Claves i18n:** `footer.tagline`, `footer.sectionsLabel`, `footer.contactLabel`, `footer.builtWith`, `footer.backToTop`, `footer.rights`.

---

## 7. Contenido actualizado

Listo para pegar en `es.ts` y `en.ts`. Los comentarios `// →` explican el cambio.

### 7.1 Hero

**ES:**
```ts
hero: {
  name: "Fernando Ibarra",
  eyebrow: "SENIOR BACKEND ENGINEER · HERMOSILLO, MX · REMOTE",
  role: "Senior Backend / Full Stack Developer",   // → era "Desarrollador Full Stack"
  description:
    "Diseño y llevo a producción sistemas backend distribuidos: microservicios con NestJS, motores de pago dirigidos por mensajería, y el trabajo poco vistoso de hacerlos correctos bajo carga.",  // → era "Desarrollador React con más de 4 años..."
  ctaProjects: "Ver el trabajo",
  ctaCv: "Descargar CV",
  status: "Disponible para roles senior — Sep 2026",  // → decisión del dueño, ver §12
  stackLine: "NestJS · RabbitMQ · Redis · SQL Server · React",
  metricsInline: "11 servicios · 738 archivos de prueba",
  socialGithub: "GitHub",
  socialLinkedin: "LinkedIn",
  socialEmail: "Email",
},
```

**EN:**
```ts
hero: {
  name: "Fernando Ibarra",
  eyebrow: "SENIOR BACKEND ENGINEER · HERMOSILLO, MX · REMOTE",
  role: "Senior Backend / Full Stack Developer",   // → was "Full Stack Developer"
  description:
    "I design and ship distributed backend systems — NestJS microservices, message-driven payment engines, and the unglamorous work of making them correct under load.",  // → was "React developer with 4+ years..."
  ctaProjects: "View the work",
  ctaCv: "Download CV",
  status: "Open to senior roles — Sep 2026",
  stackLine: "NestJS · RabbitMQ · Redis · SQL Server · React",
  metricsInline: "11 services · 738 test files",
  socialGithub: "GitHub",
  socialLinkedin: "LinkedIn",
  socialEmail: "Email",
},
```

### 7.2 Resumen profesional (para el CV regenerado y la meta description)

**ES:**
> Senior Backend / Full Stack Developer con más de 4 años de experiencia construyendo aplicaciones web y móviles con JavaScript, TypeScript, Node.js, NestJS, React, Next.js y React Native. Experiencia reciente como Senior Backend Developer en Rocket Code, trabajando con sistemas empresariales, arquitecturas de microservicios y la integración de servicios modernos con sistemas legacy. Experiencia en APIs REST, procesamiento de pagos, comunicación asíncrona, mensajería, bases de datos y entornos con Docker. Sólida base en soluciones backend escalables, resolución de problemas complejos y desarrollo frontend moderno.

**EN:**
> Senior Backend / Full Stack Developer with 4+ years of hands-on experience building web and mobile applications with JavaScript, TypeScript, Node.js, NestJS, React, Next.js, and React Native. Recent experience as a Senior Backend Developer at Rocket Code, working on enterprise backend systems, microservice-based architectures, and the integration of modern services with legacy systems. Experienced in REST APIs, payment processing, asynchronous communication, messaging systems, databases, and Docker-based environments. Strong background in scalable backend solutions, complex problem solving, and modern frontend development.

### 7.3 Las tres experiencias

**ES:**
```ts
experiences: [
  {
    hash: "a1b2c3d",
    company: "Rocket Code",
    position: "Senior Backend Developer",
    period: "Nov 2025 – Presente",                     // → NUEVO
    location: "Hermosillo, Sonora, México (Remoto)",
    description: [
      "Desarrollo y mantenimiento de servicios backend con Node.js, TypeScript y NestJS dentro de una arquitectura de microservicios.",
      "Implementación de comunicación entre microservicios mediante RabbitMQ, incluyendo mensajería, procesamiento asíncrono y preservación de correlationId en llamadas RPC.",
      "Desarrollo e integración de servicios de procesamiento de pagos, conectando microservicios nuevos con sistemas backend existentes.",
      "Análisis de la lógica de negocio legacy para asegurar que las nuevas implementaciones preserven el comportamiento funcional establecido.",
      "Diseño de la persistencia con Prisma sobre SQL Server, incluyendo atomicidad transaccional en flujos de pago.",   // → SQL Server, no PostgreSQL
      "Containerización de servicios backend con Docker y preparación para distintos ambientes de despliegue.",
      "Resolución de problemas de integración, consistencia de datos y comunicación entre servicios distribuidos.",
    ],
    technologies: ["NestJS", "TypeScript", "Node.js", "RabbitMQ", "Redis", "Prisma", "SQL Server", "Docker"],
  },
  {
    hash: "9f8e7d6",
    company: "INOWU Development",
    position: "Full Stack Developer",
    period: "Dic 2023 – Nov 2025",                      // → era "Presente"
    location: "Hermosillo, Sonora, México (Híbrido)",
    description: [
      "Desarrollo full-stack con React, Next.js, NestJS y PostgreSQL.",
      "Construcción y mantenimiento de aplicaciones web responsivas y APIs REST.",
      "Resolución de problemas técnicos complejos, mejorando rendimiento, estabilidad y confiabilidad.",
      "Participación en la modernización de sistemas existentes, incluyendo integración entre sistemas legacy y nuevas plataformas web.",
      "Implementación de procesos de sincronización entre sistemas legacy y plataformas cloud mediante procesos automatizados, triggers y servicios backend.",   // → SIN fechas ni dominio, ver §12
    ],
    technologies: ["React", "Next.js", "NestJS", "PostgreSQL", "TypeScript"],
  },
  {
    hash: "4c5d6e7",
    company: "IGRTEC",
    position: "React Native Team Lead",
    period: "Sep 2023 – Dic 2024",
    location: "Remoto",
    description: [
      "Liderazgo de un equipo de desarrolladores enfocado en aplicaciones móviles multiplataforma con React Native.",
      "Definición y aplicación de buenas prácticas de desarrollo y organización del código.",
      "Revisión de código y apoyo técnico al equipo durante el desarrollo de funcionalidades.",   // → reemplaza "metodologías ágiles"
      "Implementación de estrategias para mejorar rendimiento, estabilidad y mantenibilidad de aplicaciones móviles.",
      "Coordinación de flujos de trabajo mediante Git y control de versiones.",
    ],
    technologies: ["React Native", "TypeScript", "Git", "Team Leadership"],
  },
],
```

**EN:** misma estructura; traducción:
```ts
experiences: [
  {
    hash: "a1b2c3d",
    company: "Rocket Code",
    position: "Senior Backend Developer",
    period: "Nov 2025 – Present",
    location: "Hermosillo, Sonora, Mexico (Remote)",
    description: [
      "Develop and maintain backend services with Node.js, TypeScript, and NestJS within a microservice architecture.",
      "Implement inter-service communication over RabbitMQ, including messaging, asynchronous processing, and correlationId preservation in RPC calls.",
      "Develop and integrate payment-processing services, connecting new microservices with existing backend systems.",
      "Analyze legacy business logic to ensure new implementations preserve established functional behavior.",
      "Design persistence with Prisma on SQL Server, including transactional atomicity in payment flows.",
      "Containerize backend services with Docker and prepare them for different deployment environments.",
      "Troubleshoot integration issues, data-consistency problems, and communication between distributed services.",
    ],
    technologies: ["NestJS", "TypeScript", "Node.js", "RabbitMQ", "Redis", "Prisma", "SQL Server", "Docker"],
  },
  {
    hash: "9f8e7d6",
    company: "INOWU Development",
    position: "Full Stack Developer",
    period: "Dec 2023 – Nov 2025",
    location: "Hermosillo, Sonora, Mexico (Hybrid)",
    description: [
      "Full-stack development with React, Next.js, NestJS, and PostgreSQL.",
      "Built and maintained responsive web applications and REST APIs.",
      "Solved complex technical problems while improving performance, stability, and reliability.",
      "Contributed to modernizing existing systems, including legacy-to-web platform integration.",
      "Implemented synchronization processes between legacy systems and cloud platforms using automated processes, triggers, and backend services.",
    ],
    technologies: ["React", "Next.js", "NestJS", "PostgreSQL", "TypeScript"],
  },
  {
    hash: "4c5d6e7",
    company: "IGRTEC",
    position: "React Native Team Lead",
    period: "Sep 2023 – Dec 2024",
    location: "Remote",
    description: [
      "Led a team of developers building cross-platform mobile applications with React Native.",
      "Established software development best practices and code organization standards.",
      "Performed code reviews and provided technical guidance to team members.",
      "Implemented strategies to improve mobile application performance, stability, and maintainability.",
      "Coordinated development workflows using Git and version control.",
    ],
    technologies: ["React Native", "TypeScript", "Git", "Team Leadership"],
  },
],
```

### 7.4 Educación e idiomas

**ES:**
```ts
educationSection: {
  title: "Formación",
  degree: "Licenciatura en Desarrollo de Software",
  institution: "Tecnológico Nacional de México, Campus Hermosillo",
  period: "Ago 2017 – Dic 2024",
  location: "Hermosillo, Sonora, México",
},
languagesSection: {
  title: "Idiomas",
  items: [
    { language: "Español", level: "Nativo" },
    { language: "English", level: "Competencia profesional básica" },
  ],
},
```

**EN:**
```ts
educationSection: {
  title: "Education",
  degree: "Bachelor's Degree in Software Development",
  institution: "Tecnológico Nacional de México, Campus Hermosillo",
  period: "Aug 2017 – Dec 2024",
  location: "Hermosillo, Sonora, Mexico",
},
languagesSection: {
  title: "Languages",
  items: [
    { language: "Spanish", level: "Native" },
    { language: "English", level: "Basic professional proficiency" },
  ],
},
```

### 7.5 Taxonomía de habilidades revisada

**ES:**
```ts
skillsSection: {
  title: "Stack técnico",
  subtitle: "Tecnologías y herramientas, con el contexto donde las usé.",
  usedInLabel: "Usado en",
  categories: [
    { title: "Backend", items: ["Node.js", "NestJS", "Express.js", "REST APIs", "Microservices", "WebSockets"], usedIn: "Plataforma de seguros · Trabajo de cliente" },
    { title: "Arquitectura y mensajería", items: ["Clean Architecture", "Hexagonal (Ports & Adapters)", "DDD", "RabbitMQ", "Redis", "BullMQ", "Comunicación asíncrona y entre servicios"], usedIn: "Plataforma de seguros" },
    { title: "Bases de datos", items: ["SQL Server", "PostgreSQL", "MongoDB", "Prisma", "TypeORM"], usedIn: "Plataforma de seguros · Trabajo de cliente" },
    { title: "Frontend", items: ["React", "React Native", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "shadcn/ui", "Zustand", "TanStack Query", "React Router", "React Hook Form", "Zod"], usedIn: "Trabajo de cliente · Proyectos propios" },
    { title: "DevOps y herramientas", items: ["Docker", "Git", "GitLab CI", "ArgoCD", "Kubernetes", "NPM", "PNPM", "Sentry"], usedIn: "Plataforma de seguros" },
    { title: "Integraciones", items: ["Sistemas de pago", "Sistemas legacy", "APIs de terceros", "Keycloak", "OpenAI API", "Firebase"], usedIn: "Plataforma de seguros · Trabajo de cliente" },
  ],
},
```

**EN:** misma estructura con `title`/`items`/`usedIn` traducidos (`Backend`, `Architecture & Messaging`, `Databases`, `Frontend`, `DevOps & Tooling`, `Integrations`; `usedIn` → `Insurance platform · Client work`, `Client work · Side projects`, `Insurance platform`).

### 7.6 Banda de impacto

**ES:**
```ts
metrics: {
  title: "Impacto",
  intro: "Contribuciones seleccionadas a una plataforma de seguros multi-inquilino — una flota de microservicios NestJS al servicio de marcas minoristas nacionales. Las cifras son conteos tomados del código.",
  items: [
    { value: "11",   label: "microservicios",           qualifier: "Clean Architecture + Hexagonal + DDD uniforme" },
    { value: "53",   label: "estrategias de pago",      qualifier: "detrás de un solo dispatcher (4 métodos × 18 dominios)" },
    { value: "63",   label: "esquemas de base de datos", qualifier: "uno por inquilino por dominio" },
    { value: "4+",   label: "años en producción",       qualifier: "software enviado a usuarios reales" },
  ],
  honestyFootnote: "Proyecto en equipo. Contribuí a los servicios de pago y al SPA; no construí esto solo. Las cifras son conteos del código, no afirmaciones de autoría.",
},
```

**EN:**
```ts
metrics: {
  title: "Impact",
  intro: "Selected contributions to a multi-tenant insurance platform — a NestJS microservice fleet serving national retail brands. Figures are counts taken from the codebase.",
  items: [
    { value: "11", label: "microservices",        qualifier: "uniform Clean Architecture + Hexagonal + DDD" },
    { value: "53", label: "payment strategies",   qualifier: "behind a single dispatcher (4 methods × 18 domains)" },
    { value: "63", label: "database schemas",     qualifier: "one per tenant per domain" },
    { value: "4+", label: "years in production",  qualifier: "software shipped to real users" },
  ],
  honestyFootnote: "Team project. I contributed to the payment services and the SPA; I did not build this alone. Numbers are counts from the codebase, not claims of authorship.",
},
```

---

## 8. Certificaciones

### 8.1 Cómo se presentan los 18

**Encabezado.** Título a la izquierda + `18` en `--text-metric` mono junto a la etiqueta. El conteo grande es lo que hace que la sección se lea como un inventario, no como un muro.

**Dos grupos, colapso asimétrico.**

- **Microsoft & LinkedIn (3):** mostrados completos. Son los generalistas/fundacionales y se leen bien como una fila pequeña.
- **DevTalles (15):** **colapsados a 6 por defecto**, con un toggle `Mostrar las 15` / `Mostrar menos`. El toggle declara el total real, así que se lee como *revelar*, no como *esconder*.

**Por qué colapsar.** Hoy `certifications-section.tsx:34` renderiza la imagen como `w-full h-auto`, así que 18 imágenes a tamaño completo producen ~6 filas irregulares y altísimas antes de Contacto. Es el mayor riesgo estructural de la sección. La miniatura de aspecto fijo (`aspect-[4/3] object-cover` en un envoltorio `h-40`/`h-48`) con la imagen completa detrás del lightbox **corta la altura ~60–70%**.

**Orden dentro de DevTalles.** Liderar con los cuatro certificados que mejor coinciden con la historia de Senior Backend: **Nest**, **NestJS + Reportes (PDF)**, **Node.js**, **OpenAI: React + NestJS**. No reordenar el diccionario — ordenar el render desde una lista corta de ids destacados, para que los datos queden limpios.

**Tarjetas de estadísticas de GitHub: usar como máximo una, y no como certificado.** Hay dos cuentas — `FeribarraInowu` y `Feribarra1`. El hero enlaza solo a `https://www.github.com/feribarra1`, así que `Feribarra1` es la identidad pública. **No poner ambas tarjetas en la página.** Si se quiere presencia de GitHub, una sola tarjeta compacta de `Feribarra1` en o justo bajo el Hero (no en Certificaciones — no es un certificado y enturbia el significado de la sección). Ambas URLs son **capturas PNG estáticas** de imgur: envejecerán. La alternativa viva es una URL SVG de `github-readme-stats`, que funciona en hosting estático pero agrega una dependencia de runtime de terceros y una caja en blanco si el servicio cae. Dada la postura del sitio ("sin backend, sin dependencias de runtime de terceros"), una captura estática con fecha de "última actualización", u omitir la tarjeta, es la llamada más limpia.

### 8.2 Lista reconciliada

| # | Proveedor | id | Imagen | En el sitio hoy | Acción |
|---|---|---|---|---|---|
| 1 | DevTalles | `0ukjpjpu3m` | G0ct8M7.jpeg | sí | mantener |
| 2 | DevTalles | `1tufqctqtl` | uOyBwvP.jpeg | sí | mantener |
| 3 | DevTalles | `6pal3nwfr8` | WzpvI6C.jpeg | sí | mantener |
| 4 | DevTalles | `grfoac6egq` | nssarnF.jpeg | **no** | **AGREGAR** |
| 5 | DevTalles | `hbll5frkg7` | DgrWi3k.jpeg | sí | mantener |
| 6 | DevTalles | `hmg7rnngij` | vbdUQvc.jpeg | sí | mantener |
| 7 | DevTalles | `irg3nsjnzj` | 3OZvkWV.jpeg | sí (`irg3nsjnzjl`) | **CORREGIR id** |
| 8 | DevTalles | `etbadnszea` | kHXedJz.jpeg | sí | mantener |
| 9 | DevTalles | `igzbv9zjly` | dF9hMUJ.jpeg | sí | mantener |
| 10 | DevTalles | `f5vsw3jrvt` | xKye8go.jpeg | sí | mantener |
| 11 | DevTalles | `60yhalceu6` | 1TU18ZR.jpeg | sí | mantener |
| 12 | DevTalles | `ymsslzknzy` | eYqQVQG.jpeg | sí | mantener |
| 13 | DevTalles | `epjl1mza9y` | 94HoX2o.jpeg | sí | mantener |
| 14 | DevTalles | `bcdvt6t2hd` | ylYZO0S.jpeg | sí | mantener |
| 15 | DevTalles | `a6dki5q26m` | OadreRP.jpeg | sí | mantener |
| 16 | Microsoft/LinkedIn | `557f513e…133c298` | KZfZAxN.jpeg | sí | mantener |
| 17 | Microsoft/LinkedIn | `6102dccf…8838a5d` | j6bKiCz.jpeg | sí | **quitar `?trk=`** |
| 18 | Microsoft/LinkedIn | `099ea980…fa5d48a` | Ey2UJyU.jpeg | sí | **quitar `?trk=`** |

**Los dos defectos reales:**
1. **Conflicto de id en TanStack Query.** El sitio tiene `irg3nsjnzjl` (11 caracteres); cada uno de los otros 14 ids de DevTalles tiene exactamente 10, y el del sitio es el del README con una `l` extra. Adoptar `irg3nsjnzj` — **pero confirmar abriendo el enlace una vez antes de enviar**; si el de 11 caracteres es el correcto, la corrección se invierte.
2. **`c_react_actualizado` falta por completo.** Es el 15º certificado de DevTalles. **Leer el título real de `https://i.imgur.com/nssarnF.jpeg` y usarlo verbatim** — el título propuesto ("React: De cero a experto (edición actualizada)") es inferido del key del README más la entrada `c_react` existente. Las etiquetas de tecnología (`React, Hooks, TypeScript`) también son inferidas; corregirlas si la edición actualizada cubre React 19 o Server Components.

**Validación de formato (nada fue fetched):** los 18 URLs son https bien formados; los ids de DevTalles son `[a-z0-9]`; los ids de LinkedIn son hex de 64 caracteres (forma SHA-256 válida); las 18 imágenes de imgur coinciden con `i.imgur.com/<7 alnum>.jpeg`. Cero discrepancias de imagen, cero duplicados en cualquier lista, cero certificados en el sitio ausentes de la lista pegada.

**El CV está desincronizado.** `/tmp/cv_es.txt:84-85` y `/tmp/cv_en.txt:77-78` listan solo **12** certificados de DevTalles — faltan React Router, NestJs + Reportes (PDF) y React actualizado — y usan redacción distinta para los de Microsoft. La lista de 18 debe volverse la fuente única de verdad y el CV debe regenerarse desde ella.

---

## 9. Descarga del CV sin backend

**La técnica, paso a paso.** Todo el mecanismo es el directorio `public/` de Vite, que se copia tal cual a la raíz del build.

**Paso 1 — Crear la carpeta y colocar los PDFs.**
```
public/
  cv/
    fernando-ibarra-cv-es.pdf
    fernando-ibarra-cv-en.pdf
```
Vite copia `public/**` a `dist/` sin transformar. El archivo queda servido en `/cv/fernando-ibarra-cv-es.pdf`.

**Paso 2 — Reglas de nombre de archivo (no negociables).**
- Sin espacios, sin acentos, sin mayúsculas. `fernando-ibarra-cv-es.pdf`, no `Fernando Ibarra CV.pdf`.
- Razón: Safari y varios CDNs destrozan espacios y caracteres no-ASCII en el header `Content-Disposition`; el archivo se descarga con un nombre basura o falla directamente.

**Paso 3 — El markup.**
```tsx
<a href="/cv/fernando-ibarra-cv-es.pdf" download="fernando-ibarra-cv-es.pdf">
  Descargar CV (ES)
</a>
```
- `download` funciona porque el PDF es **same-origin**. Si algún día se sirve desde un CDN en otro origen, `download` se ignora silenciosamente y el navegador navega al PDF en su lugar.
- **No** usar `target="_blank"` junto con `download` — se pelean.
- **No** usar `window.open` ni `window.location.href` (el patrón actual del hero en `hero-section.tsx:130`). Un `<a>` real es rastreable, se puede copiar el enlace, y funciona con clic central.

**Paso 4 — Cómo generar los PDFs (sin backend).** Tres opciones, en orden de simplicidad recomendada:

1. **PDFs hechos a mano y comprometidos al repo (recomendado).** Se construyen una vez en Word/Google Docs/Figma y se exportan. Cero dependencias, cero pasos de build, cero riesgo. Es la opción correcta para un CV que cambia dos veces al año.
2. **Script de build con Playwright/Puppeteer.** Un `scripts/build-cv.mjs` que renderiza una página HTML de CV con CSS de impresión y llama `page.pdf()` (Chromium). Da un CV versionado en el repo que se regenera con un comando. **Costo:** agrega Playwright o Puppeteer como devDependency (~300 MB de binarios de navegador) y un paso de build. Justificado solo si el CV cambia con frecuencia.
3. **PDFs generados desde el propio sitio.** Imprimir la página con `@media print` a PDF. **No recomendado** — el CV y la landing tienen propósitos distintos y el resultado sería un CV con el layout de la landing.

**Paso 5 — Verificación.**
```bash
pnpm build
ls dist/cv/                                  # ambos PDFs presentes
curl -sI http://localhost:4173/cv/fernando-ibarra-cv-es.pdf | head -5
# esperado: HTTP/1.1 200 OK, content-type: application/pdf
```
Luego, en el navegador: clic en el enlace → el archivo se descarga con el nombre correcto, sin abrir una pestaña.

**Paso 6 — Reaparición en tres lugares.** Nav (botón fantasma), hero (enlace de texto secundario), banda de CV dedicada. Un reclutador nunca está a más de un clic.

**Nota de hosting.** En Cloudflare Pages (que el recon dice que el frontend de NOVA usa, y que es un destino plausible aquí) los archivos de `public/` se sirven estáticos sin configuración adicional. Si se usa un CDN con reglas de caché agresivas, agregar un hash de contenido al nombre (`fernando-ibarra-cv-es.a1b2c3.pdf`) o un query string de versión, para que un CV actualizado no quede cacheado.

---

## 10. Animaciones

### 10.1 Decisión de librería: **ninguna**

**Sin Motion. Sin GSAP. Sin Lenis. Sin scroll-jacking.** Cada momento del §10.4 se logra con transiciones/keyframes de CSS, un hook `useInView` escrito a mano (~40 líneas), y `requestAnimationFrame` para los contadores y el dibujo del SVG.

Justificación, en orden de peso:
1. **El brief exige rapidez en un portátil de gama media y un teléfono.** Motion son ~34 KB gz; GSAP+ScrollTrigger ~70 KB gz. Gastar eso en seis transiciones sutiles es un mal negocio frente a un problema de 6.3 MB de imágenes que `sharp` arregla gratis.
2. **Quiet luxury es disciplina de timing, no potencia de librería.** La sensación premium viene de la *curva y la duración*, que son cuatro líneas de CSS.
3. **El secuestro del scroll suave (Lenis) daña activamente esta dirección.** Pelea con el scroll nativo en trackpads, rompe las anclas `scroll-margin-top`, y es el error más común de "hice que se sintiera caro".

### 10.2 Dependencias a agregar — exactamente una, más una herramienta de desarrollo

| Paquete | Tamaño | Justificación |
|---|---|---|
| **`@radix-ui/react-dialog`** (vía `npx shadcn@latest add dialog`) | ~10 KB gz | El lightbox de certificados. Escribir a mano un focus trap + Escape + `aria-modal` + scroll lock es precisamente donde nacen los bugs de accesibilidad, y la auditoría encontró que el menú móvil actual ya falla cuatro de esos. Radix los hace bien gratis. Compatible con React 19 (verificado: `@radix-ui/react-dropdown-menu@2.1.16` tiene `^19.0` en peerDeps, misma generación). |
| **`sharp`** *(devDependency, nunca se envía)* | 0 KB en el bundle | Convierte 6.3 MB de PNGs a AVIF/WebP a tres anchos. Es la mayor ganancia de performance disponible y es una herramienta de build, no una dependencia de runtime. |

**Nota sobre `sharp`:** la versión 0.33+ envía binarios de plataforma precompilados vía `optionalDependencies` — sin paso de compilación `install`/`postinstall`, sin aprobación de `onlyBuiltDependencies` de pnpm. El riesgo es menor de lo que parece: es un `node scripts/optimize-images.mjs` de una sola vez cuyos **resultados se comprometen al repo**, así que CI y deploy no necesitan `sharp` en absoluto.

**Explícitamente rechazados:** Motion, GSAP, Lenis, `react-intersection-observer` (el hook son 40 líneas), `@radix-ui/react-tooltip` (la tarjeta de certificado es un botón, no necesita tooltip de hover), y cualquier librería de íconos más allá de `lucide-react` ya instalada.

### 10.3 Sistema de easing y duración

```css
--ease-out-quiet:  cubic-bezier(0.16, 1, 0.30, 1);   /* entradas, transforms — la firma */
--ease-entrance:   cubic-bezier(0.22, 1, 0.36, 1);
--ease-inout-quiet: cubic-bezier(0.65, 0, 0.35, 1);
--ease-exit:       cubic-bezier(0.40, 0, 1, 1);
```

| Nivel | Duración | Uso |
|---|---|---|
| micro | **160ms** | color de hover, nudge de hover |
| small | **240ms** | reglas de hover, subrayados |
| medium | **420ms** | viaje del subrayado de nav, escala de imagen, apertura de panel |
| large | **720ms** | entradas de contenido |
| cinematic | **900–1400ms** | secuencia del hero, dibujo del riel, dibujo del SVG |

**Dos reglas que cargan la sensación premium:**
1. **Las entradas son lentas; las salidas son rápidas.** Hover-in 160ms, hover-out **120ms**. Esta asimetría es la señal premium más sentida de la página y no cuesta nada.
2. **Un grupo de propiedades por hover.** Hoy los botones animan `background` + `transform: scale` + `box-shadow` + `color` + un degradado de overlay simultáneamente. Elegir uno. Todo lo demás es instantáneo o ausente.

### 10.4 Técnica por momento

| Momento | Técnica | Duración / easing |
|---|---|---|
| **M1** las palabras del hero suben | `@keyframes` CSS + `animation-delay` escalonado, `transform: translateY(0.4em)` + opacity (la opacidad llega a 1 en el primer 30%, así se lee como *subir*, no como *aparecer*) | 900ms `--ease-out-quiet`, escalonado 60ms |
| **M1** la regla del eyebrow se dibuja | `transform: scaleX(0→1)`, `transform-origin: left` | 700ms `--ease-out-quiet` |
| **M2** el subrayado de nav se desliza | WAAPI `element.animate()` sobre una regla compartida posicionada absoluta; `translateX` + `scaleX` desde `getBoundingClientRect()`. **Requiere `ResizeObserver`** (corrección de ingeniería #5) — el resize y el reflow del font-load mueven los enlaces mientras la regla se queda quieta. | 420ms `--ease-out-quiet` |
| **M3** conteo de métricas | **`requestAnimationFrame` + matemática de easing, escribiendo `textContent`** — NO `element.animate()` sobre un proxy (no es implementable). `tabular-nums` evita el jitter. Inicializar el estado desde `matchMedia` en `useState`, no en `useEffect`, para evitar el parpadeo de un frame bajo movimiento reducido. | 1200ms `--ease-out-quiet`, escalonado 90ms |
| **M4** hover de fila del stack | `transition` CSS sobre `transform: scaleX()` (regla) y `translateX()` (texto), dos fases | 240ms / 160ms |
| **M5** el diagrama SVG se dibuja | `stroke-dasharray` + `stroke-dashoffset` por path en JS, animado vía `transition` CSS. **Forzar un reflow o un `rAF` entre fijar el offset y habilitar la transición** — si no, o no anima o anima desde el valor equivocado (trampa clásica del primer frame). `stroke-dashoffset` es propiedad de pintura, no de compositor — aceptable para un solo SVG. Agregar `will-change: stroke-dashoffset` durante el dibujo. | 1400ms, escalonado 40ms por path |
| **M6** disclosure de certificados | `grid-template-rows: 0fr → 1fr` + `overflow: hidden` en el hijo (la técnica moderna de altura automática — sin adivinar `max-height`) | 500ms `--ease-out-quiet` |
| **M7** cross-fade de idioma | `document.startViewTransition()` + `::view-transition-old/new(root)`, feature-detected | 180ms cross-fade lineal |
| entradas de sección | un hook `useInView` → alterna un atributo `data-inview`; el CSS es dueño de la transición | 720ms `--ease-entrance`, escalonado 24–100ms |
| certificados/stack/dialog | built-ins de Radix | 180ms |

### 10.5 Movimiento reducido — tres capas

**Capa 1 — CSS global** (reemplaza el bloque engañoso en el nunca-importado `src/App.css`):
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Capa 2 — cortocircuito en JS.** `useInView` verifica `matchMedia('(prefers-reduced-motion: reduce)').matches` y devuelve `true` de inmediato, así que cada sección renderiza en su estado final en el primer pintado: los contadores muestran valores finales, el SVG está completamente dibujado, el riel está a altura completa.

**Capa 3 — salto de característica.** `startViewTransition` nunca se llama bajo movimiento reducido; el toggle de idioma simplemente re-renderiza.

**También requerido:** `html { scroll-behavior: smooth }` debe emparejarse con `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }` — hoy el scroll suave es incondicional (`globals.css:227`).

### 10.6 El hook `useInView` — con la corrección del umbral

```ts
// src/hooks/use-in-view.ts
import { useEffect, useRef, useState } from "react"

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T>(null)
  // Inicializar desde la media query, NO en el efecto — evita el parpadeo de un frame.
  const [inView, setInView] = useState<boolean>(prefersReducedMotion)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) { setInView(true); return }

    // CORRECCIÓN CRÍTICA: threshold 0 + rootMargin negativo.
    // threshold > 0 nunca dispara en elementos más altos que ~2.5x el viewport
    // (el ratio es área intersectada ÷ área del objetivo), y con `once: true`
    // el observer nunca se desconecta → contenido permanentemente en opacity: 0.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setInView(true); if (once) io.disconnect() }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])

  return { ref, inView }
}
```

**Para secciones altas** (certificaciones, cuadrícula de proyectos, cualquier cosa > 2× el viewport), observar un **centinela hijo** de ~1px colocado en la parte superior del contenido en lugar del `<section>` completo. Es la variante más robusta y no depende de aritmética de ratio.

Cada entrada de sección, los contadores, el dibujo del riel y el dibujo del SVG usan este único hook. Esa es toda la gráfica de dependencias de animación.

---

## 11. Plan de implementación por fases

Cada fase: objetivo, archivos tocados, entregables, y cómo verificar que funcionó. El orden respeta las dependencias: **el contenido va antes que el diseño** porque una página pulida con datos falsos es peor que la actual.

### Fase 1 — Contenido y datos (la ruta crítica)

**Objetivo:** que cada hecho de la página sea correcto antes de tocar el diseño. Sin esta fase, todo lo demás amplifica errores.

**Archivos:** `src/i18n/es.ts`, `src/i18n/en.ts`, `src/i18n/index.tsx`, `public/cv/*.pdf`.

**Entregables:**
- Rocket Code agregado como primera experiencia, `Nov 2025 – Presente`.
- Fecha de fin de INOWU corregida a `Nov 2025`.
- Balas de IGRTEC corregidas (sin "metodologías ágiles").
- Hero reescrito: rol `Senior Backend / Full Stack Developer`, descripción sin "React developer".
- Seis categorías de skills con columna `usedIn`; categoría `Otros` eliminada.
- `educationSection` y `languagesSection` nuevos.
- `metrics` nuevos con la nota de honestidad.
- `cvBand`, `footer`, `theme.*` nuevos.
- `"Inteligence Artificial"` → `"Inteligencia Artificial"` / `"Artificial Intelligence"` en ambos diccionarios.
- Certificado `c_react_actualizado` agregado; id de TanStack corregido; `?trk=` eliminado.
- 3 claves i18n sin uso y 10 objetos `colors` muertos eliminados.
- 5 `githubUrl: "#"` eliminados.
- `Dict = typeof es` (se elimina la unión) en `i18n/index.tsx:6` — esto arregla 5 de los 8 casts `any`.
- Los dos PDFs de CV colocados en `public/cv/`.

**Verificación:**
```bash
grep -rn "Rocket" src/i18n/            # debe encontrar entradas en es.ts y en.ts
grep -rn "Presente\|Present\"" src/i18n/  # solo debe aparecer en Rocket Code
grep -rn "Inteligence" src/            # cero coincidencias
grep -rn "max-w-8xl" src/              # cero coincidencias (se va en Fase 2)
pnpm tsc -b                            # debe salir 0
ls public/cv/                          # ambos PDFs
```
Manual: alternar ES/EN y confirmar que ninguna cadena queda en el idioma equivocado. **Antes de cerrar esta fase: abrir el enlace de TanStack y leer el título real de `c_react_actualizado`.**

**Dependencia:** ninguna. Es la primera.

### Fase 2 — Tokens y sistema de diseño

**Objetivo:** reemplazar el sistema visual completo en `globals.css`.

**Archivos:** `src/globals.css`, `index.html`.

**Entregables:**
- Paleta completa (claro + oscuro) con `--signal`, `--signal-ink`, `--signal-fill`, `--signal-quiet`, `--state-*`.
- `--primary` = tinta; `--secondary` = neutro; `--accent` = neutro (no teal).
- `--border-strong` a ~2:1; `--radius` a 0.625rem.
- Bloque `@theme` completo de la escala tipográfica (incluida `--text-diagram-label`).
- Los cuatro tokens de easing.
- `@utility container-page`, `measure-text`, `measure-lead`, `measure-display`.
- **Eliminados:** `--chart-*`, `--sidebar-*`, `gradient-text`, `gradient-border`, `float`, `glow`, `slideInUp`, `fadeInScale`, y el bloque `h1–h6`/`p`.
- Bloque `prefers-reduced-motion` global.
- `index.html`: `rel="icon"`, título, meta description, OG, Twitter, canonical, JSON-LD, script inline pre-hidratación del tema.

**Verificación:**
```bash
pnpm build
grep -c "display-1\|container-page\|ease-out-quiet" dist/assets/index-*.css   # > 0
grep -c "gradient-text\|animate-glow\|animate-float" dist/assets/index-*.css # 0
grep -c "max-w-8xl" dist/assets/index-*.css                                   # 0
```
Manual: abrir en claro y oscuro; confirmar que ninguna superficie es teal y que los botones `default` son píldoras de tinta.

**Dependencia:** ninguna técnica, pero **no empezar antes de cerrar la Fase 1** — el diseño aplicado a contenido incorrecto es peor que el estado actual.

### Fase 3 — Estructura

**Objetivo:** eliminar el padding duplicado y establecer el esqueleto de secciones.

**Archivos:** `src/App.tsx`, cada componente de sección.

**Entregables:**
- `App.tsx` sin `<section>` envolventes.
- Cada componente con su propio `<section id="…" className="scroll-mt-24 py-32 md:py-44 lg:py-56">`.
- Componentes nuevos: `metrics-section.tsx`, `education-section.tsx`, `cv-band.tsx`, `footer.tsx`.
- `src/App.css` y `src/assets/FILogo2.png` eliminados.

**Verificación:**
```bash
grep -c "<section" src/App.tsx                    # 0
grep -rn "App.css" src/                           # cero coincidencias
ls src/assets/FILogo2.png                         # no existe
```
Manual: cada ancla de nav aterriza con el encabezado visible (no oculto bajo la nav).

**Dependencia:** Fase 2 (los tokens `container-page` y el ritmo de padding).

### Fase 4 — Secciones

**Objetivo:** construir cada sección según el §6.

**Archivos:** `navigation.tsx`, `hero-section.tsx`, `metrics-section.tsx`, `experience-section.tsx`, `skills-section.tsx`, `projects-section.tsx`, `certifications-section.tsx`, `education-section.tsx`, `cv-band.tsx`, `contact-section.tsx`, `footer.tsx`, `theme-toggle.tsx`, `language-toggle.tsx`, `ui/input.tsx`, `ui/textarea.tsx`, `ui/badge.tsx`.

**Entregables, en este orden:** nav → hero → métricas → experiencia → stack → caso de estudio → proyectos → certificaciones → educación → CV → contacto → footer.

Correcciones específicas incluidas en esta fase:
- Nav: marca tipográfica, subrayado deslizante con `aria-current`, panel móvil con a11y completa, control de tema corregido (i18n, try/catch, rama `system`, `font-geist-sans` fuera).
- Hero: emoji, blobs, tiles, mousemove y gradient-text eliminados; CTA con `asChild`; socials movidos al footer.
- Experiencia: tarjetas → registro de commits con HEAD.
- Stack: reescritura a ficha técnica; calificación de 5 puntos eliminada.
- Proyectos: "Proyecto Destacado" eliminado; caso de estudio + SVG con etiquetas a 11px y `title`/`desc`; `useMemo` corregido.
- Certificaciones: miniaturas de aspecto fijo, disclosure, lightbox, badge `outline`.
- Contacto: 3 campos, honeypot `_hp` con guarda activa, labels + `aria-*` completos, validación de env, éxito inline.
- `ui/input.tsx` y `ui/textarea.tsx`: restaurar defaults de shadcn (`h-9 ... py-5` es contradictorio; `bg-white text-black` ignora tokens; `dark:dark:` es variante duplicada).
- `ui/badge.tsx`: la variante `secondary` ya no asume texto blanco.

**Verificación:**
```bash
pnpm tsc -b && pnpm build
pnpm eslint .                     # objetivo: 0 errores (hoy 13)
```
Manual, con teclado solamente: recorrer nav → hero → formulario → lightbox. Escape cierra el menú móvil y el dialog. El foco regresa al disparador. El formulario anuncia errores.

**Dependencia:** Fase 3.

### Fase 5 — Movimiento

**Objetivo:** implementar los momentos del §10.4 con el hook corregido.

**Archivos:** `src/hooks/use-in-view.ts` (nuevo), todos los componentes de sección.

**Entregables:** `useInView` con `threshold: 0` + `rootMargin`, luego M1–M6 en orden. M7 (view transition) y la Línea de Petición son opcionales.

**Verificación:**
```bash
# El bug crítico del threshold: probar en un viewport de 700px de alto
```
Manual, en un viewport de **700px de alto** (portátil con chrome de navegador) y en **375px de ancho** (móvil): hacer scroll hasta abajo y confirmar que **ninguna** sección queda en `opacity: 0`. Específicamente: el riel de experiencia está dibujado, los contadores muestran valores finales, el SVG está completo, la cuadrícula de proyectos y certificaciones es visible. Luego, con `prefers-reduced-motion: reduce` activado en DevTools, recargar y confirmar que todo renderiza en estado final **sin animar**.

**Dependencia:** Fase 4.

### Fase 6 — Assets

**Objetivo:** 6.3 MB → ~350 KB, y eliminar la dependencia de imgur.

**Archivos:** `scripts/optimize-images.mjs` (nuevo), `public/projects/*`, `public/certifications/*`, `public/og.png`, `public/robots.txt`, `public/sitemap.xml`, `package.json`.

**Entregables:**
- `sharp` como devDependency; script que produce AVIF + WebP a 1200/800/480 en `public/projects/`.
- Las 18 imágenes de certificados descargadas y auto-alojadas en `public/certifications/` como AVIF/WebP.
- `og.png` (1200×630), `robots.txt`, `sitemap.xml`.
- Los resultados optimizados **comprometidos al repo**, para que CI y deploy no necesiten `sharp`.

**Verificación:**
```bash
node scripts/optimize-images.mjs
du -sh public/projects public/certifications    # objetivo: ~350 KB total
pnpm build && du -sh dist/assets
grep -rc "i.imgur.com" src/                     # 0
```
Manual: cargar la página en una conexión lenta simulada; confirmar que las imágenes bajo el pliegue no bloquean el primer pintado y que no hay layout shift (CLS ≈ 0 en Lighthouse).

**Dependencia:** Fase 4 (los componentes deben referenciar las rutas nuevas).

### Fase 7 — Accesibilidad y SEO

**Objetivo:** cerrar los defectos medidos.

**Archivos:** `index.html`, todos los componentes, `README.md`.

**Entregables:**
- `html lang` sincronizado con `useI18n()`.
- Todos los `aria-*` reales (no hooks de estilo): `aria-current`, `aria-expanded`, `aria-controls`, `aria-invalid`, `aria-describedby`, `role="alert"`, `aria-live`.
- Todos los `label` con `htmlFor` e inputs con `id`.
- `focus-visible` en los enlaces de nav (hoy solo los botones lo tienen).
- Meta tags completos, JSON-LD, `robots.txt`, `sitemap.xml`.
- `README.md` reemplazado con instrucciones de setup y documentación de env; `.env.example` agregado.

**Verificación:**
```bash
pnpm build && pnpm preview
npx lighthouse http://localhost:4173 --view     # objetivo: a11y ≥ 95, perf ≥ 90
grep -c 'aria-' src/components/*.tsx            # > 0 en cada archivo con interacción
```
Manual: recorrer toda la página solo con Tab; cada elemento enfocable tiene anillo de foco visible. Ejecutar un lector de pantalla sobre el formulario y confirmar que los errores se anuncian.

**Dependencia:** Fases 4 y 5.

### Resumen de dependencias

```
Fase 1 (contenido) ──► Fase 2 (tokens) ──► Fase 3 (estructura) ──► Fase 4 (secciones)
                                                                        │
                                                          ┌─────────────┼──────────────┐
                                                          ▼             ▼             ▼
                                                    Fase 5 (motion) Fase 6 (assets) Fase 7 (a11y/SEO)
```

Las fases 5, 6 y 7 pueden paralelizarse entre sí una vez cerrada la 4. La Fase 1 es el cuello de botella y debe cerrarse antes de la 2.

---

## 12. Riesgos y decisiones abiertas

### 12.1 Riesgos por severidad

**R1 — La exposición NDA es el riesgo de mayor severidad.** Los nombres de inquilinos (Walmart / Liverpool / Suburbia), los nombres de proveedores (Promass / BBVA / ANA), los hosts internos (`novagpmass.com`, `gitlab.tiprotec.com`), el exchange `nova.payments`, los nombres de esquemas y tablas, y el propio nombre clave **NOVA** no deben llegar al sitio. El nivel seguro es el del propio CV: "plataforma de seguros multi-inquilino al servicio de marcas minoristas nacionales". Si se quiere un caso de estudio, escribirlo anonimizado.

**R2 — El conflicto de línea temporal de Firebird no está resuelto y no debe publicarse con fechas.** El CV ubica el trabajo de sincronización Firebird en INOWU (Dic 2023 – Nov 2025), pero cada commit está fechado **2026-04-15 → 2026-09-02** — dentro del período de Rocket Code — y el repo es personal (`github.com/FerIbarra1/demo-backend`), no corporativo. Además, el proyecto Playerytees es una **tienda de camisetas demo**, un dominio distinto del de seguros de NOVA; no deben difuminarse. **Decisión del dueño requerida.**

**R3 — La implicación de autoría única.** Fernando tiene 41 de 268 commits en el servicio de pagos y 246 de 3,668 en el frontend. Cada bala debe leerse como *contribuí a* / *trabajé dentro de* — nunca *construí* ni *lideré*. La nota de honestidad es el mecanismo que descarga esto y **no debe eliminarse como "letra chica"**.

**R4 — La dirección no puede rescatar el contenido, y el contenido es la ruta crítica.** Rocket Code ausente, INOWU mal fechado, el hero llamándolo "desarrollador React", los cinco enlaces de GitHub en `#`, y `"Inteligence Artificial"` mal escrito en ambos diccionarios. Una página bellamente espaciada con hechos incorrectos es *peor* que la actual, porque el pulido hace que los errores parezcan deliberados.

**R5 — El whitespace enorme más tipografía enorme se lee como *vacío* si el contenido es delgado.** Esta dirección triplica el padding de sección. Eso solo funciona si la banda de métricas y el caso de estudio empresarial cargan peso real. **Si el caso de estudio no puede publicarse, el whitespace se vuelve hueco y la página se lee como inacabada en lugar de contenida.** Resolver la publicabilidad del caso de estudio **antes** de aplicar el whitespace, o el whitespace es todo el riesgo.

**R6 — Afirmar PostgreSQL o WebSockets sobre la plataforma es un error fáctico.** El CV lista PostgreSQL para el rol de Rocket Code, pero la plataforma es **SQL Server + Prisma** en todo. El CV lista WebSockets, pero el estándar de NOVA es **Pusher** (WebSockets gestionados); el socket.io crudo aparece solo en el servicio `salud` y en el monolito legacy de Sails.js. Un entrevistador técnico encontrará cualquiera de los dos.

**R7 — Dos elementos no verificados deben confirmarse antes de enviar:** el id del certificado de TanStack Query (10 vs 11 caracteres) y el título real de `c_react_actualizado`. Ninguno puede resolverse desde el repo — ambos requieren abrir un enlace o leer una imagen.

**R8 — Cuatro afirmaciones del recon están sin verificar y no deben promoverse al hero:** `reportes` e `ia-chat` como microservicios (aparecen como tipos de servicio en el frontend pero no tienen repo en el workspace); `vma` y `salud-gmm` como servicios separados (existen solo como módulos dentro de `nova-microservicio-salud`); los detalles del clúster de Kubernetes; y la topología de producción de Keycloak. Cualquier cifra derivada de ellos debe declararse como "verificado en este workspace", no como el total de la plataforma.

**R9 — Secretos comprometidos en los repos legacy.** `Nova Legacy/liverpool-marketplace-front/.env` y `old/liverpool-marketplace-backend/.env` contienen contraseñas de base de datos, secretos JWT y secretos de OAuth con aspecto de estar vivos. **No citar ninguno en el sitio.** Vale la pena avisarle a Fernando que están en git.

**R10 — El proyecto Leads es una tercera migración, incompleta.** Su auditoría dice textualmente: *"La migración NO está completa; hay doble escritura y acoplamiento bidireccional."* Si se menciona, debe enmarcarse como en progreso, no como completada.

**R11 — La decisión de la marca tipográfica quita su logo de la nav.** Es una llamada de gusto y es reversible en una línea, pero debe ser su decisión, no mía.

**R12 — Que `--primary` se vuelva tinta sorprenderá a quien espere el cian.** Cada botón `default` de shadcn se vuelve negro. Es intencional y es lo que elimina el último tell de plantilla — pero si Fernando quiere más color, la palanca correcta es la **señal**, no `primary`, y el presupuesto de la señal es de seis categorías.

**R13 — Tailwind v4 no tiene archivo de configuración.** La escala tipográfica, los easings y `container-page` viven en `@theme` / `@utility` dentro de `globals.css`. Si alguien agrega después un `tailwind.config.js` esperando que se lea, no hará nada silenciosamente.

**R14 — 18 certificados es mucha página para una historia de *backend* senior.** Incluso colapsada a 9 tarjetas visibles es la sección más larga. Mitigación: va *después* del caso de estudio y *antes* de contacto, y está colapsada por defecto.

**R15 — `sharp` es un binario nativo.** La versión 0.33+ envía binarios precompilados, así que el riesgo es bajo, pero es una preocupación de gestión de binarios de plataforma en CI. **Mitigación: comprometer los assets optimizados al repo**, así CI y deploy no necesitan `sharp` en absoluto.

### 12.2 Orden de corte (primero en irse)

1. **Los chips de filtro de certificados.** Nice-to-have puro; la sección funciona sin ellos.
2. **El lightbox de certificados.** Fallback: la miniatura es un `<a>` plano al URL del certificado. (Esto también elimina la única dependencia nueva de runtime.)
3. **El diagrama SVG auto-dibujado (M5).** Fallback: el mismo SVG, completamente dibujado y estático. Se pierde el momento, no la prueba.
4. **El cross-fade de idioma con `startViewTransition` (M7).** Es un bonus.
5. **La Línea de Petición de cinematic-scroll.** Un dispositivo hermoso, pero prescindible.
6. **El conteo de métricas (M3).** Números estáticos con el mismo layout pierden muy poco.
7. **El deslizamiento del subrayado de nav (M2).** Fallback: subrayado de señal estático de 1px en el item activo.

**Nunca cortar:** la paleta, la escala tipográfica, el ritmo de espaciado, las correcciones de contenido (Rocket Code, fechas, skills, framing del hero), la descarga de CV, las correcciones de accesibilidad, el arreglo del honeypot, o la optimización de imágenes. Eso es la dirección; todo lo de arriba es recortable.

### 12.3 Preguntas que el dueño debe responder

**P1 — ¿El caso de estudio empresarial es publicable?** Es la pieza central de la dirección ganadora y su publicación depende de que Rocket Code/el cliente lo permitan. Si no puede publicarse, el whitespace del resto se vuelve hueco (R5). **Respuesta requerida antes de la Fase 2.**

**P2 — ¿Cuál es el llamado a la acción real?** `"Disponible para proyectos"` bajo un hero de Senior Backend Engineer, mientras el CV muestra empleo de tiempo completo en Rocket Code, es ambiguo: un reclutador no puede saber si busca un rol senior o vende freelance, y son bandejas de entrada distintas. **Recomendación: `"Disponible para roles senior"`, o cortar la línea.** Es una decisión binaria que solo él puede tomar.

**P3 — ¿Qué idioma por defecto?** El público para "remote, senior backend" es mayoritariamente inglés. Un reclutador estadounidense que aterriza en una página en español quema los 15 segundos antes de notar el toggle ES/EN. **Recomendación: detectar `navigator.language`, usar `en` salvo que empiece con `es`, mantener el override de `localStorage`.**

**P4 — ¿Se conserva el logo en la nav?** La recomendación por defecto es la marca tipográfica (ahorra 1.38 MB del primer pintado y es el movimiento Apple). Reversible en una línea.

**P5 — ¿Cómo se resuelve el conflicto de fechas de Firebird?** El CV lo ubica en INOWU (2023–2025); los commits son de 2026 en un repo personal. Hasta que se resuelva, el patrón puede aparecer como habilidad pero no como caso de estudio fechado.

**P6 — ¿Se incluye la tarjeta de estadísticas de GitHub?** Si sí, **una sola** (`Feribarra1`), fuera de la sección de certificaciones, con fecha de "última actualización" — ambas son capturas PNG estáticas que envejecerán.

**P7 — ¿Se acepta la dependencia de `sharp` y el paso de build?** Sin él, la página envía 6.3 MB de forma eager, la restricción de "rápido en un teléfono" falla, y la sección de certificados mantiene una dependencia viva de terceros en `i.imgur.com`.

**P8 — ¿Se regenera el CV desde la lista de 18 certificados?** El CV actual lista solo 12 de DevTalles y usa redacción distinta para los de Microsoft. La lista de 18 debe volverse canónica.

**P9 — La afirmación de "4+ años".** Es del propio CV, pero los roles listados abarcan ~3 años (Sep 2023 – presente). Vale la pena marcarlo en caso de que un reclutador cruce fechas.

**P10 — ¿Se advierte sobre los secretos en los repos legacy?** `Nova Legacy/liverpool-marketplace-front/.env` y `old/liverpool-marketplace-backend/.env` contienen credenciales con aspecto de estar vivas. No es contenido del sitio, pero es una conversación que vale la pena tener.

---

## Apéndice — Archivos que cambian

| Archivo | Cambio |
|---|---|
| `src/globals.css` | Reescritura: paleta, escala tipográfica, easings, `container-page`, bloque de movimiento reducido. Eliminar utilidades de degradado/float/glow y la regla `h1–h6`. |
| `src/App.tsx` | Quitar todos los `<section>` envolventes. Agregar `Metrics`, `Education`, `CvBand`, `Footer`. |
| `src/i18n/es.ts`, `en.ts` | Agregar Rocket Code; corregir fecha de INOWU; reescribir hero; 6 categorías de skills; educación + idiomas; métricas + nota de honestidad; banda de CV; footer; etiquetas de tema; corregir `"Inteligence Artificial"`; agregar el certificado faltante; corregir el id de TanStack; eliminar `Otros`, los 10 objetos `colors` y 3 claves sin uso. |
| `src/i18n/index.tsx` | `Dict = typeof es` (eliminar la unión); sincronizar `html lang`; hacer que `t()` falle ruidosamente en dev. |
| `src/components/navigation.tsx` | Marca tipográfica; subrayado de señal deslizante con `aria-current`; botón de CV; overlay móvil con a11y; quitar el círculo con glow. |
| `src/components/hero-section.tsx` | Reescritura completa. Quitar emoji, blobs, tiles, mousemove, gradient-text. |
| `src/components/experience-section.tsx` | Tarjetas → registro de commits. 3 entradas. |
| `src/components/skills-section.tsx` | Reescritura → ficha técnica mono. Eliminar la calificación de puntos y `max-w-8xl`. |
| `src/components/projects-section.tsx` | Eliminar el "Proyecto Destacado" duplicado; agregar caso de estudio + SVG; grid de 2 columnas; enlaces reales. |
| `src/components/certifications-section.tsx` | Miniaturas, disclosure, lightbox, imágenes auto-alojadas, badge corregido. |
| `src/components/contact-section.tsx` | 3 campos; honeypot funcional; labels + `aria-*`; validación de env; éxito inline. |
| `src/components/theme-toggle.tsx` | Etiquetas i18n; try/catch; arreglar la rama `system`; quitar `font-geist-sans`. |
| `src/components/language-toggle.tsx` | Par de texto `ES / EN` en lugar de botón con ícono de globo. |
| `src/components/ui/input.tsx`, `textarea.tsx` | Restaurar defaults de shadcn. Ambos tienen la variante duplicada `dark:dark:` (`input.tsx:11,13`; `textarea.tsx:10`). |
| `src/components/ui/dropdown-menu.tsx` | Misma variante duplicada `dark:dark:data-[variant=destructive]` en la línea 75. Fue editado a mano a neutros (no usa `--accent`), así que **no** necesita el cambio de token de la corrección #6. |
| `src/components/ui/badge.tsx` | La variante `secondary` ya no asume texto blanco. |
| `index.html` | `lang` sync, título, meta, OG, canonical, JSON-LD, `rel="icon"`, script pre-hidratación del tema. |
| `src/App.css` | **Eliminar.** |
| `src/assets/FILogo2.png` | **Eliminar.** |
| `src/assets/*.png` | Convertir a AVIF/WebP en `public/`. |
| `public/cv/*.pdf`, `public/certifications/*`, `public/projects/*`, `public/og.png`, `public/robots.txt`, `public/sitemap.xml` | **Nuevos.** |
| `scripts/optimize-images.mjs` | **Nuevo** — paso de build con `sharp`. |
| `src/hooks/use-in-view.ts` | **Nuevo** — todo el runtime de animación. |
| `src/components/metrics-section.tsx`, `education-section.tsx`, `cv-band.tsx`, `footer.tsx` | **Nuevos.** |
| `README.md`, `.env.example` | Reemplazar la plantilla de Vite con setup + docs de env. |
