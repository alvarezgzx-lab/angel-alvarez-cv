export const persona = {
  name: 'Ángel Álvarez',
  fullName: 'Jesús Ángel Álvarez González',
  headline:
    'Learning Analyst (Associate) | Workforce Enablement & Business Strategy | Cross-Functional HR Operations | Data & Metrics',
  location: 'Nuevo León, México',
  email: 'alvarezgzx@gmail.com',
  linkedin: 'https://linkedin.com/in/angelalvarezg97',
  cvPdf: '/Angel-Alvarez-CV.pdf',
}

export const resumenProfesional =
  'Profesional de la educación, entusiasta de la tecnología y apasionado por el desarrollo de las personas, con formación en ciencias sociales y del comportamiento. Aporta una mentalidad y ética de trabajo basada en la analítica de datos para el diseño de soluciones de aprendizaje que contribuyan a fortalecer las capacidades del talento, a través de la colaboración con diversas áreas estratégicas que impulsen la inteligencia de negocios.'

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
    nota: 'Proyecto de titulación: D.A.T.A. — Development of AI Teaching & Automation; ecosistema multiagente de IA conversacional con piloto institucional de 86–98% de valoración docente, en colaboración con Microsoft y reconocido por CANIETI Noreste (ver Proyectos y Publicaciones y Reconocimiento Institucional).',
  },
  {
    titulo: 'Licenciatura en Economía',
    institucion: 'Universidad Autónoma de Nuevo León (UANL)',
    fecha: 'Hasta 6.° semestre, no concluida',
    nota: 'Publicación académica en revisión (E-Socialis, UMM): análisis de 26 fuentes sobre el mercado EdTech; propone un marco de cuatro pilares (ver Proyectos y Publicaciones).',
  },
]

export interface EnlaceExterno {
  label: string
  url: string
}

export interface Embed {
  title: string
  src: string
  height: number
  width: number
}

export const licenciasCertificaciones: Embed[] = [
  {
    title: 'Certificado de finalización — Workforce Planning Strategy (Microsoft, vía Coursera)',
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7501379217348096000?collapsed=1',
    height: 539,
    width: 504,
  },
]

export interface Reconocimiento {
  label: string
  url: string
  embed: Embed
}

export const reconocimientoInstitucional: Reconocimiento[] = [
  {
    label: 'Reconocido públicamente por la UMM (colaboración con Microsoft)',
    url: 'https://lnkd.in/p/ehyHKwxv',
    embed: {
      title: 'Publicación de LinkedIn — reconocimiento de la UMM',
      src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7310043022786744320?collapsed=1',
      height: 627,
      width: 504,
    },
  },
  {
    label: 'Reconocido públicamente por CANIETI Noreste',
    url: 'https://lnkd.in/p/ea5sMYBe',
    embed: {
      title: 'Publicación de LinkedIn — reconocimiento de CANIETI Noreste',
      src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7321006183450894336?collapsed=1',
      height: 627,
      width: 504,
    },
  },
]

export interface Proyecto {
  titulo: string
  fecha: string
  descripcion: string
  enlacePrincipal: EnlaceExterno
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
  },
  {
    titulo: 'Mis Skills de Claude',
    fecha: '2026 · en desarrollo continuo',
    descripcion:
      'Repositorio personal de skills para Claude orientadas a Recursos Humanos y gestión de talento; incluye una skill para generar Strategic Workforce Planning Briefs mediante un proceso guiado de 7 fases.',
    enlacePrincipal: {
      label: 'Ver repositorio',
      url: 'https://github.com/alvarezgzx-lab/mis-skills-de-claude',
    },
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
    puesto: 'Docencia — Nivel Secundaria',
    organizacion: 'Colegio Regiomontano Contry La Salle (2025–2026) · Colegio Mexicano (2023–2025)',
    fecha: '2023 – 2026',
    bullets: [
      'Automatizó procesos de evaluación y diseñó indicadores de desempeño para dar seguimiento objetivo al progreso individual y grupal.',
      'Gestionó simultáneamente hasta 11 grupos de más de 30 personas, sosteniendo desempeño colectivo bajo múltiples prioridades.',
      'Brindó acompañamiento, tutoría y coaching individual y grupal — fortaleciendo desarrollo de habilidades, manejo de conflictos y liderazgo de iniciativas institucionales (Academia de Ética, procesos electorales estudiantiles).',
    ],
  },
  {
    puesto: 'Practicante en diseño instruccional',
    organizacion: 'Talisis',
    fecha: '2022 – 2023',
    bullets: [
      'Colaboró con equipos de Data Science, Ingeniería de Software e Innovación de Producto en el desarrollo de herramientas de generación de contenido para diseño instruccional (licenciatura y maestría), apoyando detección de necesidades de capacitación y diseño de soluciones de aprendizaje escalables.',
    ],
  },
  {
    puesto: 'Conductor independiente (transporte por aplicación)',
    organizacion: 'Trabajo autónomo',
    fecha: '2019 – 2022',
    bullets: [
      'Autogestionó negocio independiente (ingresos, financiamiento, atención a cliente y manejo del tiempo), desarrollando autogestión y orientación a resultados bajo alta autonomía.',
    ],
  },
  {
    puesto: 'Auxiliar administrativo',
    organizacion: 'Santander Universidades',
    fecha: '2018 – 2019',
    bullets: [
      'Gestionó posicionamiento de productos y eventos de credencialización estudiantil para instituciones del sector universidades (Tec, UDEM, Becas NL, CONALEP), coordinando relaciones multi-institucionales y gestión de cuentas.',
    ],
  },
]

export const habilidades: Record<string, string[]> = {
  'People Analytics, Talento y Desarrollo Organizacional': [
    'Planeación de fuerza laboral',
    'People analytics',
    'Reclutamiento y selección',
    'Onboarding',
    'Desempeño y compensación',
    'Planeación de sucesión',
    'Gestión del cambio y cultura organizacional',
  ],
  'Capacitación y Desarrollo': [
    'Diseño e impartición de capacitación',
    'Detección de necesidades (DNC)',
    'Diseño instruccional',
    'Facilitación',
    'Liderazgo de grupos',
    'Prompt engineering',
  ],
  'Análisis de Datos y Business Intelligence': [
    'Power BI (modelado de datos, dashboards)',
    'Análisis estadístico aplicado a negocio',
    'Excel intermedio-avanzado',
    'Nociones de SQL y Python',
  ],
  'Herramientas y Transferibles': [
    'Word',
    'PowerPoint',
    'Herramientas de autor (Easy Generator, Articulate, Genially)',
    'HTML/React básico',
    'Claude avanzado',
    'Comunicación efectiva y adaptabilidad',
  ],
}

export const idiomas: Record<string, string> = {
  Español: 'Nativo',
  Inglés: 'Intermedio-Avanzado',
}

export const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#perfil', label: 'Perfil' },
  { href: '#formacion', label: 'Formación' },
  { href: '#certificaciones', label: 'Licencias y Certificaciones' },
  { href: '#reconocimiento-institucional', label: 'Reconocimiento Institucional' },
  { href: '#proyectos', label: 'Proyectos y Publicaciones' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#contacto', label: 'Contacto' },
]
