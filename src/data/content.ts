export const persona = {
  name: 'Ángel Álvarez',
  fullName: 'Jesús Ángel Álvarez González',
  headline: 'Licenciado en Educación y Administración de Centros Educativos',
  targetRoles: [
    'Capacitación y Desarrollo',
    'Learning Analytics',
    'Reclutamiento',
    'Desarrollo Organizacional',
    'People Analytics',
  ],
  location: 'Nuevo León, México',
  email: 'alvarezgzx@gmail.com',
  linkedin: 'https://linkedin.com/in/angelalvarezg97',
  cvPdf: '/Angel-Alvarez-CV.pdf',
}

export const perfil =
  'Licenciado en Educación y Administración de Centros Educativos por la Universidad Metropolitana de Monterrey (UMM), reconocido públicamente por la Cámara Nacional de la Industria Electrónica, de Telecomunicaciones y Tecnologías de la Información (CANIETI) Noreste por su proyecto de titulación, y autor de una publicación académica sobre innovación social y mercado EdTech. Su experiencia docente 2023–2026 le dio soltura para liderar grupos, diseñar capacitación y facilitar diseño instruccional — habilidades que dirige hacia Recursos Humanos, con genuino interés en investigación educativa y ciencias sociales. Busca consolidar carrera en Capacitación y Learning Analytics, Reclutamiento, Desarrollo Organizacional o People Analytics, en una empresa con estabilidad a largo plazo, consolidación del rol a corto plazo y crecimiento a mediano plazo. Aporta compromiso, creatividad y gusto genuino por el trabajo con personas, con interés en industrias en transformación.'

export interface Formacion {
  titulo: string
  institucion: string
  fecha: string
  nota?: string
}

export const formacion: Formacion[] = [
  {
    titulo: 'Licenciatura en Educación y Administración de Centros Educativos',
    institucion: 'Universidad Metropolitana de Monterrey (UMM)',
    fecha: 'Titulado, agosto 2025',
    nota: 'Proyecto de titulación: D.A.T.A. — Development of AI Teaching & Automation (ver Proyectos y Publicaciones).',
  },
  {
    titulo: 'Licenciatura en Economía',
    institucion: 'Universidad Autónoma de Nuevo León (UANL)',
    fecha: 'Hasta 6.° semestre, no concluida',
  },
]

export interface EnlaceExterno {
  label: string
  url: string
}

export interface Proyecto {
  titulo: string
  fecha: string
  descripcion: string
  enlacePrincipal: EnlaceExterno
  reconocimientos?: EnlaceExterno[]
}

export const proyectosPublicaciones: Proyecto[] = [
  {
    titulo: 'D.A.T.A. — Development of AI Teaching & Automation',
    fecha: 'Abril 2025',
    descripcion:
      'Ecosistema multiagente de IA conversacional para planificación, evaluación y personalización del aprendizaje; piloto institucional con 86–98% de valoración docente.',
    enlacePrincipal: {
      label: 'Ver proyecto',
      url: 'https://drive.google.com/file/d/138Ht-cbE6ZnZXzL2ArrmUQKuodC7XG1t/view?usp=sharing',
    },
    reconocimientos: [
      {
        label: 'Reconocido públicamente por la UMM (colaboración con Microsoft)',
        url: 'https://lnkd.in/p/ehyHKwxv',
      },
      {
        label: 'Reconocido públicamente por CANIETI Noreste',
        url: 'https://lnkd.in/p/ea5sMYBe',
      },
    ],
  },
  {
    titulo:
      'Innovación Social y Educativa para la Prosperidad Compartida: El Crecimiento del Mercado EdTech',
    fecha: 'E-Socialis, UMM · aprobada, vol. 1 (pendiente de publicación)',
    descripcion:
      'Revisión de 26 fuentes académicas sobre la tensión entre lógica de mercado y equidad social en el crecimiento del sector EdTech; propone un marco de cuatro pilares.',
    enlacePrincipal: {
      label: 'Ver artículo',
      url: 'https://drive.google.com/file/d/18sfS9noC6Jzw4UtMlHFNYUhjHRpyqrZu/view?usp=sharing',
    },
  },
]

export interface Experiencia {
  puesto: string
  organizacion: string
  fecha: string
  bullets: string[]
}

export const experiencia: Experiencia[] = [
  {
    puesto: 'Docente de Español',
    organizacion: 'Colegio Regiomontano Contry La Salle',
    fecha: '2025 – 2026',
    bullets: [
      'Docente titular de Español, nivel secundaria.',
      'Liderazgo de la Academia de Ética, Naturaleza y Sociedades; organización de elecciones del Consejo Estudiantil.',
    ],
  },
  {
    puesto: 'Docente de World History y MUN',
    organizacion: 'Colegio Mexicano',
    fecha: '2024 – 2025',
    bullets: ['Docente titular de World History y Modelo de Naciones Unidas (MUN), secundaria.'],
  },
  {
    puesto: 'Practicante en diseño instruccional',
    organizacion: 'Talisis',
    fecha: '2022 – 2023',
    bullets: [
      'Colaboración con Data Science, Ingeniería de Software e Innovación de Producto en herramienta de generación de contenido para diseño instruccional; apoyo a SMEs en licenciatura y maestría.',
    ],
  },
  {
    puesto: 'Conductor independiente (transporte por aplicación)',
    organizacion: 'Trabajo autónomo',
    fecha: '2019 – 2022',
    bullets: [
      'Autogestión de negocio independiente: ingresos, financiamiento de auto, atención a cliente y manejo del tiempo.',
    ],
  },
  {
    puesto: 'Auxiliar administrativo',
    organizacion: 'Santander Universidades',
    fecha: '2018 – 2019',
    bullets: [
      'Gestión de posicionamiento de productos del sector universidades (Tec, UDEM, Becas NL, CONALEP); organización de eventos de credencialización estudiantil.',
    ],
  },
]

export const habilidades: Record<string, string[]> = {
  'Capacitación y Desarrollo': [
    'Diseño e impartición de capacitación',
    'Detección de necesidades (DNC)',
    'Diseño instruccional',
    'Facilitación',
    'Prompt engineering',
  ],
  'Desarrollo Organizacional': [
    'Gestión del cambio',
    'Cultura organizacional',
    'Liderazgo de grupos',
    'Coordinación multidisciplinaria',
  ],
  'Recursos Humanos — Transferibles': [
    'Comunicación efectiva',
    'Adaptabilidad',
    'Autogestión y resiliencia',
    'Pensamiento conceptual',
  ],
  Herramientas: [
    'Excel intermedio-avanzado',
    'Word',
    'PowerPoint',
    'Herramientas de autor (Easy Generator, Articulate, Genially)',
    'HTML/React básico',
    'Claude avanzado',
    'Nociones de xAPI, SCORM, SQL, Python, Power BI',
  ],
}

export const idiomas: Record<string, string> = {
  Español: 'Nativo',
  Inglés: 'Intermedio',
}

export const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#perfil', label: 'Perfil' },
  { href: '#formacion', label: 'Formación' },
  { href: '#proyectos', label: 'Proyectos y Publicaciones' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#contacto', label: 'Contacto' },
]
