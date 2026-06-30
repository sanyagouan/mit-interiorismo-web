/**
 * Projects data — Portfolio real de MIT Interiorismo
 *
 * Datos VERIFICADOS del repositorio GeneraIA-Yago/WEB-MARIA (11 commits, 120MB
 * assets, incluido FOTO DE MARÍA + LinkedIn PDF + 38 imágenes históricas)
 * cruzado con los proyectos activos documentados en
 * /root/.hermes/profiles/maria/proyectos/ (jun 2026).
 *
 * Estructura:
 * - 4 proyectos activos 2026 en La Rioja (Berceo, EFITAR, Luciano, Haro)
 * - 3 proyectos históricos 2020 (Lapuebla, Kripan, Labastida)
 *
 * NO se han inventado proyectos. Solo los documentados.
 */

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  type:
    | 'reforma-integral'
    | 'reforma-comercial'
    | 'cambio-uso'
    | 'asesoria-tecnica'
    | 'espacios-sociales'
    | 'residencial';
  year: number;
  status: 'en-curso' | 'presupuesto' | 'completado' | 'anteproyecto' | 'historico-2020';
  location: string;
  surface?: number; // m²
  cover: string;
  /** Lista completa de imágenes para la galería del detalle */
  gallery?: string[];
  /** Es la imagen principal que se ve en la home y en el listado */
  featured: boolean;
  description: string;
  /** Bullet points de datos duros del proyecto */
  facts?: string[];
  tags?: string[];
}

export const PROJECTS: Project[] = [
  // ────── HISTÓRICOS 2020 ──────
  {
    slug: 'merendero-lapuebla',
    title: 'Merendero en Lapuebla',
    subtitle: 'Reforma integral · Espacios sociales · Álava 2020',
    type: 'espacios-sociales',
    year: 2020,
    status: 'historico-2020',
    location: 'Lapuebla de Labarca, Álava',
    surface: undefined,
    cover: '/images/projects/lapuebla/02.jpg',
    gallery: [
      '/images/projects/lapuebla/00.jpg',
      '/images/projects/lapuebla/01.jpg',
      '/images/projects/lapuebla/02.jpg',
      '/images/projects/lapuebla/03.jpg',
      '/images/projects/lapuebla/04.jpg',
      '/images/projects/lapuebla/05.jpg',
      '/images/projects/lapuebla/06.jpg',
      '/images/projects/lapuebla/07.jpg',
      '/images/projects/lapuebla/08.jpg',
      '/images/projects/lapuebla/09.jpg',
      '/images/projects/lapuebla/10.jpg',
      '/images/projects/lapuebla/11.jpg',
      '/images/projects/lapuebla/12.jpg',
      '/images/projects/lapuebla/13.jpg',
      '/images/projects/lapuebla/14.jpg',
      '/images/projects/lapuebla/15.jpg',
      '/images/projects/lapuebla/16.jpg',
      '/images/projects/lapuebla/17.jpg',
      '/images/projects/lapuebla/18.jpg',
      '/images/projects/lapuebla/19.jpg',
    ],
    featured: true,
    description:
      'Reforma integral de un merendero creando un espacio social acogedor y funcional. La intervención se centró en optimizar la distribución y modernizar las instalaciones existentes, incorporando elementos contemporáneos que respetan la esencia tradicional del espacio rural alavés.',
    facts: [
      'Tipo: merendero rural',
      'Diseño de mobiliario a medida',
      'Planificación de iluminación',
      'Renderizado fotorrealista completo',
    ],
    tags: ['merendero', 'reforma', 'espacio-social', 'álava'],
  },

  {
    slug: 'txoko-kripan',
    title: 'Txoko en Kripan',
    subtitle: 'Diseño de espacios sociales · Álava 2020',
    type: 'espacios-sociales',
    year: 2020,
    status: 'historico-2020',
    location: 'Kripan, Álava',
    cover: '/images/projects/kripan/03.jpg',
    gallery: [
      '/images/projects/kripan/00.jpg',
      '/images/projects/kripan/01.jpg',
      '/images/projects/kripan/02.jpg',
      '/images/projects/kripan/03.jpg',
      '/images/projects/kripan/04.jpg',
      '/images/projects/kripan/05.jpg',
      '/images/projects/kripan/06.jpg',
      '/images/projects/kripan/07.jpg',
      '/images/projects/kripan/08.jpg',
      '/images/projects/kripan/09.jpg',
      '/images/projects/kripan/10.jpg',
      '/images/projects/kripan/11.jpg',
      '/images/projects/kripan/12.jpg',
    ],
    featured: true,
    description:
      'Transformación integral de un txoko tradicional combinando funcionalidad y estética moderna. La renovación cubre cocina, zona de comedor y área de estar, creando un ambiente acogedor y versátil para reuniones sociales. Proyecto que demuestra cómo la tradición vasca puede convivir con un lenguaje arquitectónico limpio y actualizado.',
    facts: [
      'Programa: txoko · cocina + comedor + estar',
      'Diseño de mobiliario personalizado',
      'Selección de materiales · acabados nobles',
      'Desarrollo de planos técnicos completos',
    ],
    tags: ['txoko', 'cocina', 'espacio-social', 'álava'],
  },

  {
    slug: 'apartamentos-labastida',
    title: 'Apartamentos en Labastida',
    subtitle: 'Reforma residencial vacacional · Álava 2020',
    type: 'residencial',
    year: 2020,
    status: 'historico-2020',
    location: 'Labastida, Álava',
    surface: undefined,
    cover: '/images/projects/labastida/exterior.jpg',
    gallery: [
      '/images/projects/labastida/exterior.jpg',
      '/images/projects/labastida/moodboard.jpg',
      '/images/projects/labastida/bano-01.jpg',
      '/images/projects/labastida/bano-02.jpg',
      '/images/projects/labastida/sketch.jpg',
    ],
    featured: true,
    description:
      'Proyecto integral de renovación para apartamentos vacacionales que combina diseño contemporáneo con funcionalidad. Modernización de fachada manteniendo la esencia arquitectónica regional, con especial énfasis en zonas húmedas de baño. La propuesta interior destaca por un cuidadoso diseño de materiales de alta calidad y soluciones innovadoras para espacios pequeños.',
    facts: [
      'Renovación de fachada + diseño exterior',
      'Diseño integral de baños',
      'Selección de materiales premium',
      'Moodboards + propuestas visuales',
      'Documentación técnica completa',
    ],
    tags: ['apartamentos', 'reforma', 'vacacional', 'álava'],
  },

  // ────── ACTIVOS 2026 ──────
  {
    slug: 'vivienda-gonzalo-berceo',
    title: 'Vivienda Gonzalo de Berceo',
    subtitle: 'Reforma integral con aerotermia · Logroño 2026',
    type: 'reforma-integral',
    year: 2026,
    status: 'en-curso',
    location: 'Logroño, La Rioja',
    surface: 80,
    cover: '/images/projects/berceo/plano.png',
    gallery: ['/images/projects/berceo/plano.png'],
    featured: true,
    description:
      'Reforma integral de una vivienda de 80 m² en el centro de Logroño. El proyecto incorpora aerotermia por fancoils como sistema principal de climatización — eficiente, silenciosa y compacta. Redistribución completa de la vivienda para ganar amplitud, incorporar vestidor y abrir la cocina al salón, con instalaciones eléctricas dimensionadas para los nuevos usos (10 circuitos, cuadro general en cocina).',
    facts: [
      '80 m² · 7 estancias',
      'Aerotermia por fancoils',
      '10 circuitos eléctricos nuevos',
      'Instalación completa: fontanería, electricidad, climatización',
    ],
    tags: ['vivienda', 'reforma', 'aerotermia', 'logroño'],
  },

  {
    slug: 'oficina-tecnica-efitar',
    title: 'Oficina Técnica EFITAR',
    subtitle: 'Cambio de uso comercial → oficina técnica · Logroño 2026',
    type: 'reforma-comercial',
    year: 2026,
    status: 'presupuesto',
    location: 'Logroño, La Rioja',
    surface: 107,
    cover: '/images/projects/efitar/moodboard-3.png',
    gallery: [
      '/images/projects/efitar/moodboard-3.png',
      '/images/projects/efitar/moodboard-1.png',
      '/images/projects/efitar/moodboard-2.png',
      '/images/projects/efitar/fachada-01.jpg',
      '/images/projects/efitar/fachada-02.jpg',
    ],
    featured: true,
    description:
      'Transformación de un local comercial en oficina técnica de ingeniería eléctrica en Logroño. La propuesta abandona la estética industrial oscura por un lenguaje arquitectónico claro, luminoso y tecnológico — roble natural, microcemento claro, acero blanco texturizado, iluminación 3000K. Incluye cubierta interior sobre uralita sin manipulación del fibrocemento, logo EFITAR retroiluminado en fachada (color coral corporativo) y un cuadro decorativo de instalaciones a la vista como guiño técnico.',
    facts: [
      '107,26 m² útiles',
      'Programa: Open Office (4 puestos CAD), Despacho/Sala reuniones, Almacén eléctrico, Aseo, Coffee Point, 2 altillos',
      'Presupuesto estimado: 147.575 – 163.785 € (sin IVA)',
      'Luminaria exclusiva diseñada para EFITAR',
    ],
    tags: ['oficina', 'corporativo', 'ingeniería', 'logroño'],
  },

  {
    slug: 'proyecto-luciano',
    title: 'Proyecto Luciano',
    subtitle: 'Cambio de uso oficinas → 2 viviendas + oficina · Logroño 2026',
    type: 'cambio-uso',
    year: 2026,
    status: 'anteproyecto',
    location: 'Logroño, La Rioja',
    surface: 133,
    cover: '/images/projects/luciano/foto-04-oficina-principal.jpg',
    gallery: [
      '/images/projects/luciano/foto-04-oficina-principal.jpg',
      '/images/projects/luciano/foto-06-edificio.jpg',
      '/images/projects/luciano/foto-01-cocina.jpg',
      '/images/projects/luciano/foto-02-oficina.jpg',
      '/images/projects/luciano/foto-05-rejillas.jpg',
    ],
    featured: true,
    description:
      'Transformación de un local de oficinas (proyecto original visado COAATR en 2011) en 2 apartamentos tipo suite para venta o alquiler más una oficina técnica en entreplanta. Fachada ya cuenta con aislamiento (lana de roca + barrera de vapor). Implica cambio de uso con nueva licencia municipal, cumplimiento del CTE 2026 (DB-SI, DB-HR, DB-HE, DB-HS 3) y aprobación de la comunidad de propietarios.',
    facts: [
      '133 m² totales · PB 87 m² + entreplanta 46 m²',
      '2 viviendas tipo suite (≈31,5 m² cada una) + oficina',
      'CTE 2026: DB-SI, DB-HR, DB-HE, DB-HS 3',
      'Aprobación comunidad de propietarios (mayoría 3/5)',
    ],
    tags: ['cambio-uso', 'residencial', 'logroño'],
  },

  {
    slug: 'asesoria-climatizacion-haro',
    title: 'Asesoría climatización — Haro',
    subtitle: 'Ahorro del 68% frente a presupuesto de instalador local · 2026',
    type: 'asesoria-tecnica',
    year: 2026,
    status: 'completado',
    location: 'Haro, La Rioja',
    cover: '/images/projects/efitar/fachada-02.jpg', // reuse fachada como placeholder
    gallery: [],
    featured: false,
    description:
      'Asesoría técnica para la sustitución del equipo de aire acondicionado de una vivienda unifamiliar en Haro. El instalador local proponía un Daikin Emura 1 (descatalogado) por 5.063€+IVA. Tras comparar opciones y analizar la necesidad real (5,8 kW para salón-comedor-cocina, ~40 m²), mi propuesta: Daikin Emura 3 actual por 1.615€+IVA. Resultado: 4.172€ de ahorro (-68%) para el cliente, equipo mejor y más nuevo.',
    facts: [
      'Ahorro para el cliente: 4.172 € (-68%)',
      'Equipo recomendado: Daikin Emura 3 (5,8 kW)',
      'Superficie climatizada: 40 m²',
      'Entrega: presupuesto + comparativa + memoria técnica',
    ],
    tags: ['asesoría', 'climatización', 'ahorro', 'haro'],
  },
];

export const PROJECT_TYPES: Record<Project['type'], string> = {
  'reforma-integral': 'Reforma integral',
  'reforma-comercial': 'Reforma comercial',
  'cambio-uso': 'Cambio de uso',
  'asesoria-tecnica': 'Asesoría técnica',
  'espacios-sociales': 'Espacios sociales',
  residencial: 'Residencial',
};

export const PROJECT_STATUS: Record<Project['status'], string> = {
  'en-curso': 'En curso',
  presupuesto: 'En presupuesto',
  completado: 'Completado',
  anteproyecto: 'Anteproyecto',
  'historico-2020': '2020 · Histórico',
};

export const getFeaturedProjects = (): Project[] =>
  PROJECTS.filter((p) => p.featured);

export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);
