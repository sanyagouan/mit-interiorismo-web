/**
 * Site data — Single Source of Truth
 *
 * Datos VERIFICADOS del repositorio GeneraIA-Yago/WEB-MARIA (12 commits, 120MB
 * assets): incluye PERFIL LINKEDIN PDF, FOTO DE MARÍA, formación ESDIR, trayectoria
 * profesional completa, 3 proyectos históricos 2020 en Álava.
 *
 * Más los 4 proyectos activos 2026 en La Rioja documentados en
 * /root/.hermes/profiles/maria/proyectos/.
 */

export const SITE = {
  name: 'mit interiorismo',
  legalName: 'mit interiorismo · María Iturbe Sánchez',
  title: 'mit interiorismo — Diseño de interiores boutique en La Rioja y País Vasco',
  description:
    'Estudio boutique de interiorismo en Yécora (Álava). Reformas integrales, espacios corporativos y consultoría técnica en La Rioja y País Vasco. Más de 17 años de experiencia uniendo diseño, técnica e instalaciones.',
  shortDescription:
    'Estudio boutique de interiorismo en Yécora (Álava). Diseño + técnica + ingeniería.',
  url: 'https://www.mitinteriorismo.studio',
  ogImage: '/og/og-default.jpg',
  email: 'hola@mitinteriorismo.studio',
  emailPersonal: 'info@mitinteriorismo.studio',
  phone: '+34 637 86 98 90',
  phoneDisplay: '637 86 98 90',
  phoneRaw: '+34637869890',
  whatsapp: '34637869890',
  address: {
    street: 'Calle Mayor',
    city: 'Yécora',
    region: 'Álava · País Vasco',
    postalCode: '01322',
    country: 'ES',
  },
  founded: 2008, // Inicio trayectoria profesional en Echazarreta Construcciones
  experienceYears: 17, // 2008 → 2025 actual
  social: {
    linkedin: 'https://www.linkedin.com/in/mar%C3%ADaiturbe/',
    instagram: 'https://www.instagram.com/mit.interiorismo/',
  },
  claims: [
    'Diseño que transforma. Técnica que construye.',
    'Reformas inteligentes. Presupuestos transparentes.',
    'Donde el diseño encuentra a la ingeniería.',
  ] as const,
  primaryClaim: 'Donde el diseño encuentra a la ingeniería',
} as const;

// ────── María ──────
export const MARIA = {
  fullName: 'María Iturbe Sánchez',
  shortName: 'María',
  role: 'Interior Design Specialist',
  city: 'Yécora, Álava',
  zone: 'La Rioja · Álava · País Vasco',
  photo: '/team/maria.jpg',
  bio: `Diseñadora de interiores con sede en Yécora (Álava) y más de 17 años de experiencia. Su estudio no proyecta solo la estética — proyecta también las instalaciones eléctricas, climatización y fontanería, y las tramita con la normativa vigente (CTE, REBT, RITE). Esto le permite defender técnicamente a cada cliente frente a gremios, proveedores y sorpresas de obra.`,
  bioFull: `Diseñadora de interiores con más de 17 años de experiencia,擅动ando desde Yécora (Álava) sobre La Rioja y País Vasco. La intervención une lo que normalmente va separado: <strong>diseño + ingeniería</strong>. Mi trabajo no proyecta solo la estética — proyecta también las instalaciones (eléctricas, climatización, fontanería) y las tramita con la normativa vigente: CTE, REBT, RITE, DB-SI, DB-HR, DB-HE.

Esto me permite defender técnicamente a cada cliente frente a gremios, proveedores y posibles sorpresas de obra. Mi rol en cada proyecto es claro: <em>aliada técnica del cliente</em>.

Mi software de cabecera: AutoCAD, SketchUp, V-Ray 5, Presto. Esto se traduce en planos ejecutivos, renders fotorrealistas y presupuestos desglosados partida a partida — entregados a cada cliente antes de empezar obra, sin sorpresas.

Modelo boutique: un solo interlocutor, de principio a fin, en La Rioja y País Vasco.`,
  trajectory: [
    {
      from: 'Agosto 2020',
      to: 'Presente',
      role: 'Interior Design Specialist',
      company: 'mit interiorismo',
      description: 'Estudio propio. Proyectos de diseño de interiores, planos técnicos, renderizados y gestión integral.',
    },
    {
      from: 'Septiembre 2020',
      to: 'Diciembre 2021',
      role: 'Diseñadora de interiores',
      company: 'COOK cocina y baño',
      description: 'Diseño de espacios de cocina y baño con las mejores marcas y fabricantes más innovadores, implementando soluciones de diseño audaces y funcionales.',
    },
    {
      from: 'Diciembre 2008',
      to: 'Noviembre 2020',
      role: 'Diseñadora de interiores',
      company: 'Echazarreta Construcciones, SC',
      description: 'Reforma y diseño de interiores en proyectos como Casa en Lanciego, Unifamiliar en Viñaspre y Txoko en Yécora. AUTOCAD, PRESTO, modelado 3D, dirección de obra y asesoramiento directo con clientes.',
    },
    {
      from: 'Febrero 2019',
      to: 'Mayo 2019',
      role: 'Estudiante en prácticas',
      company: 'BLURARQUITECTURA',
      description: 'Desarrollo de propuestas de diseño, planos en Autocad, modelado 3D con Sketchup, renderizado con Vray, uso de Presto para presupuestos y otras herramientas técnicas.',
    },
  ],
  education: [
    {
      from: 'Septiembre 2015',
      to: 'Enero 2020',
      title: 'Enseñanzas Superiores de Diseño',
      institution: 'ESDIR — Escuela Superior de Diseño de La Rioja',
      detail: 'Especialización en Diseño de Interiores. Calificación: 8,41 (Notable alto).',
    },
  ],
  skills: [
    { skill: 'Autocad', desc: 'Planos técnicos y documentación detallada' },
    { skill: 'Modelado 3D', desc: 'Modelos tridimensionales realistas (SketchUp)' },
    { skill: 'Renderizado', desc: 'Visualización fotorrealista (V-Ray 5)' },
    { skill: 'Presto', desc: 'Presupuestos detallados y mediciones' },
    { skill: 'InDesign', desc: 'Memorias técnicas y presentaciones' },
    { skill: 'Photoshop', desc: 'Edición de imágenes' },
    { skill: 'Moodboards', desc: 'Paneles de inspiración y propuestas visuales' },
    { skill: 'Coordinación', desc: 'Gestión de equipos y gremios' },
    { skill: 'Normativa', desc: 'CTE / REBT / RITE / DB-SI · defensa del cliente' },
  ],
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
    id: 'espacios-sociales',
    title: 'Espacios sociales y viviendas',
    description:
      'Diseño de merenderos, txokos, viviendas vacacionales y apartamentos. Reformas residenciales con atención a detalles de cocinas y baños.',
    icon: 'home',
    evidence: 'Merendero Lapuebla, Txoko Kripan, Apartamentos Labastida (2020).',
  },
  {
    id: 'identidad-corporativa',
    title: 'Identidad corporativa para estudios',
    description:
      'Diseño de marca completo para estudios y proyectos de interiorismo: logo, paleta, tipografía y aplicaciones (cartas, lonas de obra, etc.).',
    icon: 'sparkle',
    evidence: 'Logo MIT Interiorismo — 7 iteraciones, paleta teal + beige.',
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

export const DIFFERENTIATORS = [
  {
    title: 'Diseño + técnica, juntos',
    body: 'La mayoría de interioristas trabajan solo con la estética. Yo proyecto también las instalaciones: eléctricas, climatización, fontanería. Todo con normativa.',
  },
  {
    title: 'Presupuestos transparentes',
    body: 'Cada partida, cada medición, cada proveedor. Si un instalador te cobra de más, te lo digo y te ahorro el dinero (ver caso Haro — 68% de ahorro frente a presupuesto de instalador local).',
  },
  {
    title: 'Defensa técnica del cliente',
    body: 'Soy tu aliada frente a gremios, proveedores y posibles sorpresas. Cuando surge un problema en obra, te lo explico, te propongo soluciones y te defiendo frente a desviaciones.',
  },
  {
    title: 'Boutique, no franquicia',
    body: 'Un solo interlocutor, de principio a fin. Sin intermediarios, sin subcontratas, sin comisiones ocultas. Honorarios fijos y claros (en torno al 11% s/ PEM para proyectos boutique).',
  },
  {
    title: '17 años de experiencia',
    body: 'Desde 2008, he pasado por estudio grande (Echazarreta Construcciones), showrooms premium (COOK cocina y baño), prácticas (BLURARQUITECTURA) y mi propio estudio (mit interiorismo desde 2020).',
  },
] as const;
