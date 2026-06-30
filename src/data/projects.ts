/**
 * Projects data — Portfolio de MIT Interiorismo
 *
 * DATOS VERIFICADOS el 30 jun 2026 a partir del brief de investigación
 * (archivos locales, PDFs, presupuesto, fotos de estado actual).
 * NO se han inventado proyectos — solo los 4 documentados.
 *
 * Nota importante:
 * - NO hay fotos de proyectos terminados online. Los renders son preliminares.
 * - Luciano: hay 6 fotos reales del estado actual (NO terminadas).
 * - EFITAR: hay fotos de fachada + 3 moodboards de la propuesta.
 * - Berceo: solo hay un render plano del proyecto.
 * - Haro: sin fotos (es asesoría técnica, no reforma).
 */

export interface Project {
  slug: string;
  title: string;
  /** Subtítulo editorial para mostrar en la home */
  subtitle: string;
  type:
    | 'reforma-integral'
    | 'reforma-comercial'
    | 'cambio-uso'
    | 'asesoria-tecnica'
    | 'consultoria';
  year: number;
  status: 'en-curso' | 'presupuesto' | 'completado' | 'anteproyecto';
  location: string;
  surface?: number; // m²
  cover: string;
  gallery?: string[];
  featured: boolean;
  description: string;
  /** Bullet points de datos duros (m², presupuesto, etc.) */
  facts?: string[];
  tags?: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'vivienda-gonzalo-berceo',
    title: 'Vivienda Gonzalo de Berceo',
    subtitle: 'Reforma integral con aerotermia — Logroño',
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
      'Aerotermia por fancoils (sistema principal de climatización)',
      '10 circuitos eléctricos dimensionados',
      'Instalación completa: fontanería, electricidad, climatización',
    ],
    tags: ['vivienda', 'reforma', 'aerotermia', 'logroño'],
  },

  {
    slug: 'oficina-tecnica-efitar',
    title: 'Oficina Técnica EFITAR',
    subtitle: 'Cambio de uso comercial → oficina técnica de ingeniería — Logroño',
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
    subtitle: 'Cambio de uso oficinas → 2 viviendas + oficina — Logroño',
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
    subtitle: 'Ahorro del 68% frente a presupuesto de instalador local',
    type: 'asesoria-tecnica',
    year: 2026,
    status: 'completado',
    location: 'Haro, La Rioja',
    cover: '/images/projects/berceo/plano.png', // placeholder — Haro no tiene foto (es asesoría)
    gallery: [],
    featured: false,
    description:
      'Asesoría técnica para la sustitución del equipo de aire acondicionado de una vivienda unifamiliar en Haro. El instalador local proponía un Daikin Emura 1 (descatalogado) por 5.063€+IVA. Tras comparar opciones y analizar la necesidad real (5,8 kW para salón-comedor-cocina, ~40 m²), mi propuesta: Daikin Emura 3 actual por 1.615€+IVA. Resultado: 4.172€ de ahorro (-68%) para el cliente, equipo mejor y más nuevo.',
    facts: [
      'Ahorro para el cliente: 4.172€ (-68%)',
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
  consultoria: 'Consultoría',
};

export const PROJECT_STATUS: Record<Project['status'], string> = {
  'en-curso': 'En curso',
  presupuesto: 'En presupuesto',
  completado: 'Completado',
  anteproyecto: 'Anteproyecto',
};

export const getFeaturedProjects = (): Project[] =>
  PROJECTS.filter((p) => p.featured);

export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);
