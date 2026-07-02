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
  // Las imágenes son las MISMAS de la web antigua (mismo MD5): la web
  // antigua las tenía en DESCARGAS-LINKELIND/{carpeta}/{name}-images-N.jpg.
  // Aquí se referencian como /images/projects/{slug}/NN.jpg que son
  // exactamente esos mismos archivos.
  {
    slug: 'merendero-lapuebla',
    title: 'Merendero en Lapuebla',
    subtitle: 'Reforma integral · Espacio social rural · Álava 2020',
    type: 'espacios-sociales',
    year: 2020,
    status: 'historico-2020',
    location: 'Lapuebla de Labarca, Álava',
    surface: undefined,
    cover: '/images/projects/lapuebla/05.jpg', // MERENDERO LAPUEBLA-images-5.jpg (la de portada en web antigua)
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
      'Proyecto de reforma integral de un merendero en Lapuebla de Labarca. La intervención se centra en la creación de un espacio social acogedor y funcional, optimizando la distribución y modernizando las instalaciones existentes. El diseño incorpora elementos contemporáneos mientras mantiene la esencia tradicional del espacio.',
    facts: [
      'Diseño de distribución espacial',
      'Selección de materiales y acabados',
      'Diseño de mobiliario a medida',
      'Planificación de iluminación',
      'Desarrollo de documentación técnica',
      'Visualización 3D y renderizado',
    ],
    tags: ['merendero', 'espacio-social', 'álava'],
  },

  {
    slug: 'txoko-kripan',
    title: 'Txoko en Kripan',
    subtitle: 'Reforma integral de espacio social · Álava 2020',
    type: 'espacios-sociales',
    year: 2020,
    status: 'historico-2020',
    location: 'Kripan, Álava',
    cover: '/images/projects/kripan/03.jpg', // PROYECTO TXOKO-images-3.jpg (la de portada en web antigua)
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
      'Transformación integral de un txoko tradicional en Kripan, combinando funcionalidad y estética moderna. El proyecto abarca la renovación completa del espacio, incluyendo cocina, zona de comedor y área de estar, creando un ambiente acogedor y versátil para reuniones sociales.',
    facts: [
      'Diseño integral del espacio',
      'Planificación de cocina funcional',
      'Diseño de mobiliario personalizado',
      'Selección de materiales y acabados',
      'Desarrollo de planos técnicos',
      'Visualización 3D y renderizado fotorrealista',
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
    cover: '/images/projects/labastida/exterior.jpg', // "Propuesta exterior para apartamentos vacacionales.jpg"
    gallery: [
      '/images/projects/labastida/exterior.jpg',
      '/images/projects/labastida/bano-01.jpg',
      '/images/projects/labastida/bano-02.jpg',
      '/images/projects/labastida/moodboard.jpg',
      '/images/projects/labastida/sketch.jpg',
    ],
    featured: true,
    description:
      'Proyecto integral de renovación para apartamentos vacacionales que combina diseño contemporáneo con funcionalidad. El alcance abarca desde la transformación exterior del edificio hasta el diseño detallado de los espacios interiores, con especial énfasis en las zonas de baño. La propuesta exterior moderniza la fachada manteniendo la esencia arquitectónica de la región, mientras que los interiores destacan por un cuidadoso diseño de baños que incorpora materiales de alta calidad y soluciones innovadoras.',
    facts: [
      'Renovación de fachada y diseño exterior',
      'Diseño integral de baños',
      'Selección de materiales y acabados',
      'Desarrollo de moodboards y propuestas visuales',
      'Planificación espacial',
      'Documentación técnica detallada',
      'Visualización 3D y renderizado fotorrealista',
    ],
    tags: ['apartamentos', 'vacacional', 'álava'],
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
