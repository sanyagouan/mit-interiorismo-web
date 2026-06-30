/**
 * Site data — Configuración global del sitio
 * SSoT (Single Source of Truth) para datos que se usan en múltiples lugares.
 *
 * Datos VERIFICADOS el 30 jun 2026 a partir del brief de investigación
 * (archivos locales, PDFs, web scraping). No inventar nada.
 */

export const SITE = {
  name: 'mit interiorismo',
  legalName: 'MIT Interiorismo — María Iturbe Sánchez',
  title: 'mit interiorismo — Diseño de interiores boutique en La Rioja y País Vasco',
  description:
    'Estudio boutique de interiorismo en Yécora (Álava). Reformas integrales, espacios corporativos y consultoría técnica en La Rioja y País Vasco. Más de 11 años de experiencia uniendo diseño y normativa.',
  shortDescription:
    'Estudio boutique de interiorismo en Yécora (Álava). Diseño + técnica + ingeniería.',
  url: 'https://www.mitinteriorismo.studio',
  ogImage: '/og/og-default.jpg',
  email: 'hola@mitinteriorismo.studio',
  phone: '', // Pendiente confirmar con María — no aparece en ningún archivo
  whatsapp: '', // Pendiente confirmar con María
  address: {
    city: 'Yécora',
    region: 'Álava — País Vasco',
    country: 'ES',
  },
  founded: 2020, // Deducido de los proyectos. María tiene 11+ años de experiencia total.
  social: {
    instagram: '', // No encontrada activa
    linkedin: '',  // No encontrada activa
    pinterest: '',
    houzz: '',
  },
  // Claims adaptados al perfil técnico real de María
  claims: [
    'Diseño que transforma. Técnica que construye.',
    'Reformas inteligentes. Precios transparentes.',
    'Donde el diseño encuentra a la ingeniería.',
  ] as const,
  /** Claim principal para el hero (resumen ejecutivo del brief) */
  primaryClaim: 'Donde el diseño encuentra a la ingeniería',
} as const;

export const NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Proceso', href: '/proceso' },
  { label: 'Contacto', href: '/contacto' },
] as const;

export const SERVICES = [
  {
    id: 'reforma-integral',
    title: 'Reforma integral',
    description:
      'Dirección completa del proyecto: distribución, instalaciones (climatización, electricidad, fontanería), materiales, mobiliario y coordinación de gremios. Cumplimiento normativo CTE, REBT y RITE.',
    icon: 'home',
    evidence: 'Vivienda Gonzalo de Berceo (Logroño) — reforma 80 m² con aerotermia.',
  },
  {
    id: 'reforma-comercial',
    title: 'Reforma de espacios comerciales y oficinas',
    description:
      'Transformación de locales y oficinas técnicas. Cambios de uso, licencias, instalaciones industriales y diseño de mobiliario corporativo a medida.',
    icon: 'building',
    evidence:
      'Oficina técnica EFITAR (Logroño) — 107 m². Cambio de uso comercial → oficina técnica de ingeniería.',
  },
  {
    id: 'cambio-uso',
    title: 'Cambio de uso (terciario → residencial)',
    description:
      'Tramitación y proyecto para transformar locales u oficinas en viviendas. Cumplimiento del CTE 2026, gestión con comunidades de propietarios y licencias municipales.',
    icon: 'key',
    evidence:
      'Proyecto Luciano (Logroño) — oficinas → 2 viviendas + oficina. 133 m².',
  },
  {
    id: 'asesoria-tecnica',
    title: 'Asesoría técnica y consultoría',
    description:
      'Comparativa de presupuestos de instaladores, supervisión de ofertas, defensa técnica del cliente frente a propuestas abusivas. Traducción de normativa CTE/REBT/RITE.',
    icon: 'compass',
    evidence:
      'Vivienda en Haro — ahorro 68% (4.172€) al comparar presupuesto de instalador.',
  },
  {
    id: 'renderizacion',
    title: 'Renderizado 3D y documentación',
    description:
      'Renders fotorrealistas (V-Ray 5), memorias técnicas, presupuestos desglosados (Presto) y planos ejecutivos (AutoCAD + SketchUp). Visualiza el proyecto antes de ejecutar.',
    icon: 'image',
    evidence: 'Memorias técnicas, presupuestos y planos ejecutivos para todos los proyectos activos.',
  },
  {
    id: 'identidad-corporativa',
    title: 'Identidad corporativa para estudios',
    description:
      'Diseño de marca completo para estudios y proyectos de interiorismo: logo, paleta, tipografía y aplicaciones (cartas, lonas de obra, etc.).',
    icon: 'sparkle',
    evidence: 'Logo MIT Interiorismo — 7 iteraciones, paleta teal + beige, formato apaisado para lona.',
  },
] as const;

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Conversamos',
    description:
      'Nos sentamos contigo para entender qué necesitas, cómo vives (o trabajas) y qué esperas del espacio. Cuanto más concreto, mejor encajaremos la propuesta. Sin compromiso.',
  },
  {
    number: '02',
    title: 'Levantamos y analizamos',
    description:
      'Tomo medidas reales del espacio, analizo instalaciones existentes (cuadro eléctrico, fontanería, climatización) y reviso la normativa aplicable (CTE, REBT, RITE, DB-SI, DB-HR, DB-HE).',
  },
  {
    number: '03',
    title: 'Proyectamos con planos y presupuesto',
    description:
      'Te entrego planos ejecutivos (AutoCAD), renders fotorrealistas (V-Ray 5) y un presupuesto desglosado partida a partida (Presto). Todo claro, todo firmado. Sin sorpresas.',
  },
  {
    number: '04',
    title: 'Ejecutamos y entregamos',
    description:
      'Coordino gremios, superviso la obra y resuelvo lo inesperado. Defensa técnica del cliente frente a desviaciones. Entrega llave en mano.',
  },
] as const;

/** Diferenciadores — extraídos del brief, evidencias reales */
export const DIFFERENTIATORS = [
  {
    title: 'Diseño + técnica, juntos',
    body: 'La mayoría de interioristas trabajan solo con la estética. Yo proyecto también las instalaciones: eléctricas, climatización, fontanería. Todo con normativa.',
  },
  {
    title: 'Presupuestos transparentes',
    body: 'Cada partida, cada medición, cada proveedor. Si un instalador te cobra de más, te lo digo y te ahorro el dinero (Haro: -68%).',
  },
  {
    title: 'Defensa técnica del cliente',
    body: 'Soy tu aliada frente a gremios, proveedores y posibles sorpresas. No acepto presupuestos inflados ni soluciones a medias.',
  },
  {
    title: 'Boutique, no franquicia',
    body: 'Un solo interlocutor, de principio a fin. Sin intermediarios, sin subcontratas, sin comisiones ocultas. Honorarios fijos y claros.',
  },
] as const;
