/**
 * Projects data — Portfolio real de MIT Interiorismo
 *
 * SOLO los proyectos que YA ESTABAN en la web antigua de María
 * (GeneraIA-Yago/WEB-MARIA), verificada el 2 jul 2026. Esos 3 proyectos
 * son los que María considera "correctos" para mostrar en la web actual.
 *
 * Los 4 proyectos 2026 (Berceo, EFITAR, Luciano, Haro) NO se muestran
 * en esta versión. Cuando María decida cuáles incluir y cómo,
 * su propio Hermes se los estructurará y los añadirá.
 *
 * NO se han inventado proyectos.
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
  // ────── HISTÓRICOS 2020 (web antigua GeneraIA-Yago/WEB-MARIA) ──────
  {
    slug: 'merendero-lapuebla',
    title: 'Merendero en Lapuebla',
    subtitle: 'Reforma integral · Espacios sociales · Álava 2020',
    type: 'espacios-sociales',
    year: 2020,
    status: 'historico-2020',
    location: 'Lapuebla de Labarca, Álava',
    surface: undefined,
    cover: '/images/instagram/ig-05-lapuebla-01.jpg',
    gallery: [
      '/images/instagram/ig-05-lapuebla-01.jpg',
      '/images/instagram/ig-06-lapuebla-02.jpg',
      '/images/projects/lapuebla/02.jpg',
      '/images/projects/lapuebla/06.jpg',
      '/images/projects/lapuebla/12.jpg',
      '/images/projects/lapuebla/15.jpg',
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
    cover: '/images/instagram/ig-07-kripan-01.jpg',
    gallery: [
      '/images/instagram/ig-07-kripan-01.jpg',
      '/images/instagram/ig-08-kripan-02.jpg',
      '/images/instagram/ig-29-proceso-03.jpg',
      '/images/projects/kripan/03.jpg',
      '/images/projects/kripan/06.jpg',
      '/images/projects/kripan/11.jpg',
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
    cover: '/images/instagram/ig-09-labastida-01.jpg',
    gallery: [
      '/images/instagram/ig-09-labastida-01.jpg',
      '/images/instagram/ig-10-labastida-02.jpg',
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
