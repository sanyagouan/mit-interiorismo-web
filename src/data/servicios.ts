export interface Servicio {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  includes: string[];
  duration: string;
  fromPrice?: string;
}

export const SERVICIOS: Servicio[] = [
  {
    id: 'reforma-integral',
    title: 'Reforma integral',
    subtitle: 'Vivienda o local de principio a fin.',
    description:
      'Tomas las llaves de un espacio vacío o en bruto y te lo entrego habitable: distribución, instalaciones (electricidad, fontanería, climatización), acabados, mobiliario y decoración. Dirección única, un único interlocutor, una única factura.',
    includes: [
      'Levantamiento de planos y medición en obra',
      'Proyecto técnico y de ejecución',
      'Coordinación de gremios (albañilería, fontanería, electricidad, climatización)',
      'Licencia municipal y tramitaciones',
      'Dirección de obra con visitas semanales',
      'Recepción final y acta de entrega',
    ],
    duration: '3 a 8 meses según superficie',
    fromPrice: 'Desde 850 €/m² (honorarios de proyecto)',
  },
  {
    id: 'cambio-uso',
    title: 'Cambio de uso',
    subtitle: 'Terciario → residencial. La especialización más demandada.',
    description:
      'Convertir oficinas, locales o naves en viviendas (o viceversa) en municipios donde el planeamiento lo permite. Trabajo con la normativa urbanística autonómica, el CTE, el REBT, el RITE y la normativa de habitabilidad del País Vasco o La Rioja según el caso.',
    includes: [
      'Estudio de viabilidad urbanística',
      'Proyecto arquitectónico con cumplimiento del CTE-DB-SI, DB-HR, DB-HE',
      'Cálculo de instalaciones: electricidad, fontanería, climatización',
      'Memoria y planos para licencia',
      'Tramitación de la declaración de obra nueva',
    ],
    duration: '4 a 6 meses de proyecto + obra',
  },
  {
    id: 'espacio-comercial',
    title: 'Espacio comercial y oficina',
    subtitle: 'Donde la marca se vuelve experiencia física.',
    description:
      'Diseño de retail, oficinas, despachos profesionales, clínicas y locales de restauración. Cada metro cuadrado se trabaja para que el cliente perciba la identidad de marca desde el primer paso.',
    includes: [
      'Concepto espacial vinculado a la identidad de marca',
      'Diseño de mobiliario a medida',
      'Iluminación técnica y decorativa',
      'Carpintería y elementos fijos',
      'Coordinación con la imagen gráfica (cartas, lonas, vinilos)',
    ],
    duration: '6 a 12 semanas',
  },
  {
    id: 'consultoria',
    title: 'Consultoría y asesoría técnica',
    subtitle: 'Cuando solo necesitas criterio profesional.',
    description:
      'Para clientes que han comprado un inmueble, están negociando una reforma o quieren un segundo diagnóstico antes de licitar obra. Honorarios por horas o por informe.',
    includes: [
      'Informe técnico de viabilidad',
      'Revisión de proyecto ajeno',
      'Peritación y tasación de obra',
      'Asesoría en compraventa',
      'Auditoría energética',
    ],
    duration: 'Por horas o por informe',
    fromPrice: 'Desde 60 €/h',
  },
  {
    id: 'renderizado',
    title: 'Renderizado 3D y documentación',
    subtitle: 'Vender el proyecto antes de empezar obra.',
    description:
      'Generamos imágenes fotorrealistas y planimetría ejecutiva para que tu reforma se apruebe en comunidad de propietarios, en licencia municipal, o ante tu pareja sin necesidad de explicarla veinte veces.',
    includes: [
      'Modelo 3D en SketchUp',
      'Render fotorrealista con V-Ray 5',
      'Planos ejecutivos DXF/PDF',
      'Memoria técnica',
      'Animación walk-through 3D (opcional)',
    ],
    duration: '2 a 4 semanas',
    fromPrice: 'Desde 290 € por imagen',
  },
  {
    id: 'diseno-interior',
    title: 'Diseño de interior y ambientación',
    subtitle: 'Estilo y calidez para hogares habitables.',
    description:
      'Sin tocar instalaciones ni obra mayor: selección de materiales, colores, iluminación, textiles, mobiliario y decoración. Para clientes que quieren mejorar su casa sin meterse en obras.',
    includes: [
      'Moodboard personalizado',
      'Selección de paleta, materiales y mobiliario',
      'Lista de proveedores y presupuestos',
      'Acompañamiento en compras y montaje',
    ],
    duration: '4 a 8 semanas',
    fromPrice: 'Desde 450 €',
  },
];
