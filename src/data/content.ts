export type Lang = "es" | "en";

export const persona = {
  name: "Jesús Álvarez",
  fullName: "Jesús Ángel Álvarez González",
  email: "alvarezgzx@gmail.com",
  linkedin: "https://www.linkedin.com/in/jesusalvarezgz",
  linkedinBadge: "https://mx.linkedin.com/in/jesusalvarezgz?trk=profile-badge",
  photo: "/images/angel-photo.webp",
};

export interface Formacion {
  titulo: string;
  institucion: string;
  fecha: string;
  nota?: string;
  enlace?: { label: string; url: string };
}

export interface Embed {
  title: string;
  src: string;
  height: number;
  width: number;
}

export type InsigniaIcono = "graduacion" | "chip" | "certificado";
export type InsigniaColor = "rust" | "sage" | "cream";

// Shared shape for both Reconocimiento Institucional and Licencias y
// Certificaciones: a circular icon badge that opens a modal with a
// description + external link (and an embed when one is embeddable —
// Coursera share links aren't, LinkedIn posts are).
export interface Insignia {
  titulo: string;
  label: string;
  fecha?: string;
  url: string;
  linkText: string;
  color: InsigniaColor;
  icono: InsigniaIcono;
  embed?: Embed;
}

export interface Proyecto {
  titulo: string;
  tipo: string;
  fecha: string;
  descripcion: string;
  enlacePrincipal?: { label: string; url: string };
}

export interface Experiencia {
  puesto: string;
  organizacion: string;
  fecha: string;
  bullets: string[];
}

export interface Copy {
  htmlLang: string;
  title: string;
  metaDescription: string;
  skipToContent: string;
  location: string;
  headline: string;
  resumenProfesional: string;
  objetivoLabel: string;
  objetivo: string;
  navAriaLabel: string;
  openMenu: string;
  closeMenu: string;
  close: string;
  languageToggleLabel: string;
  photoAlt: string;
  ctaCv: string;
  cvPdfUrl: string;
  ctaContact: string;
  navLinks: { href: string; label: string }[];
  headings: {
    formacion: string;
    certificaciones: string;
    reconocimiento: string;
    proyectos: string;
    experiencia: string;
    habilidades: string;
    contacto: string;
  };
  reconocimientoHint: string;
  reconocimientoAria: (t: string) => string;
  proyectosHint: string;
  formacion: Formacion[];
  licenciasCertificaciones: Insignia[];
  reconocimientoInstitucional: Insignia[];
  proyectosPublicaciones: Proyecto[];
  experiencia: Experiencia[];
  habilidades: Record<string, string[]>;
  idiomasTitulo: string;
  idiomas: Record<string, string>;
  contactoPrompt: string;
  emailLabel: string;
  emailAria: string;
  emailCopied: string;
  linkedinLabel: string;
  badgeLocale: string;
  footer: string;
}

const ummEmbed = {
  src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7310043022786744320?collapsed=1",
  height: 627,
  width: 504,
} satisfies Omit<Embed, "title">;

const canietiEmbed = {
  src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7321006183450894336?collapsed=1",
  height: 627,
  width: 504,
} satisfies Omit<Embed, "title">;

const workforceAnalyticsEmbed = {
  src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7503151834350604288?collapsed=1",
  height: 531,
  width: 504,
} satisfies Omit<Embed, "title">;


export const es: Copy = {
  htmlLang: "es-MX",
  title: "Jesús Álvarez | Especialista en Aprendizaje y People Analytics",
  metaDescription:
    "CV digital de Jesús Álvarez: People Analytics, Habilitación de Fuerza Laboral y Estrategia de Negocio, investigación independiente en economía de la educación y el talento. Proyectos, publicaciones y experiencia verificables.",
  skipToContent: "Saltar al contenido principal",
  location: "Nuevo León, México",
  headline:
    "Especialista en Aprendizaje y People Analytics | Habilitación de Fuerza Laboral y Estrategia de Negocio | Investigador Independiente en Economía de la Educación y el Talento",
  resumenProfesional:
    "Licenciado en Educación y Administración, con formación orientada a Gestión del Talento y Aprendizaje Corporativo. Experiencia liderando grupos numerosos, diseñando indicadores de desempeño y facilitando procesos de capacitación y desarrollo de habilidades. Su proyecto de titulación, reconocido por la Cámara Nacional de la Industria Electrónica, de Telecomunicaciones y Tecnologías de la Información (CANIETI) Noreste, lo formó en gestión de múltiples stakeholders al colaborar con expertos en arquitectura de soluciones de IT y ciberseguridad de Microsoft y con la división de transformación digital de la UMM. Estudios en Economía (UANL, hasta 6.° semestre) sentaron bases de pensamiento analítico, modelos predictivos y pensamiento estratégico.",
  objetivoLabel: "Objetivo profesional",
  objetivo:
    "Consolidar una trayectoria en People Analytics, Capacitación y Desarrollo, y Business Intelligence, aplicando conocimientos en gestión de talento humano, diseño instruccional y análisis de datos — con compromiso genuino hacia las personas y fluidez tecnológica — para aportar valor estratégico a un equipo de Recursos Humanos.",
  navAriaLabel: "Navegación principal",
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
  close: "Cerrar",
  languageToggleLabel: "Cambiar idioma a inglés",
  photoAlt: "Retrato de Jesús Álvarez",
  ctaCv: "Ver CV en PDF",
  cvPdfUrl: "/CV-Jesus-Alvarez-ES.pdf",
  ctaContact: "Contactar",
  navLinks: [
    { href: "#inicio", label: "Inicio" },
    { href: "#perfil", label: "Perfil" },
    { href: "#formacion", label: "Formación" },
    { href: "#certificaciones", label: "Licencias y Certificaciones" },
    { href: "#reconocimiento-institucional", label: "Reconocimiento Institucional" },
    { href: "#proyectos", label: "Proyectos Independientes" },
    { href: "#experiencia", label: "Experiencia" },
    { href: "#habilidades", label: "Habilidades" },
    { href: "#contacto", label: "Contacto" },
  ],
  headings: {
    formacion: "Formación",
    certificaciones: "Licencias y Certificaciones",
    reconocimiento: "Reconocimiento Institucional",
    proyectos: "Proyectos Independientes",
    experiencia: "Experiencia",
    habilidades: "Habilidades",
    contacto: "Contacto",
  },
  reconocimientoHint: "Haz clic en cada insignia para ver el reconocimiento completo",
  reconocimientoAria: (t) => `Ver reconocimiento: ${t}`,
  proyectosHint:
    "Los documentos de Drive están abiertos a comentarios — compárteme tus ideas u observaciones.",
  formacion: [
    {
      titulo: "Licenciatura en Educación y Administración de Centros Educativos",
      institucion: "Universidad Metropolitana de Monterrey (UMM)",
      fecha: "Titulado, agosto 2025",
      nota: "Proyecto de titulación: D.A.T.A. — Development of AI Teaching & Automation; ecosistema multiagente de IA conversacional con piloto institucional de 86–98% de valoración docente, en colaboración con Microsoft y reconocido por CANIETI Noreste.",
      enlace: {
        label: "Ver proyecto",
        url: "https://drive.google.com/file/d/138Ht-cbE6ZnZXzL2ArrmUQKuodC7XG1t/view?usp=sharing",
      },
    },
    {
      titulo: "Licenciatura en Economía (no concluida)",
      institucion: "Universidad Autónoma de Nuevo León (UANL)",
      fecha: "Hasta 6.° semestre",
    },
  ],
  licenciasCertificaciones: [
    {
      titulo: "Workforce Planning Strategy — Microsoft",
      label:
        "Coursera · Curso 1 de la especialización Strategic Workforce Planning. Planeación de fuerza laboral con métricas de éxito claras, dashboards en Power BI con KPIs y fórmulas DAX, análisis de señales de engagement y riesgo de rotación, e impacto de la IA en las necesidades de talento.",
      fecha: "Sep 2026",
      url: "https://coursera.org/share/1173e7e3ea7497b4d355b6487be5ddbc",
      linkText: "Ver certificado",
      color: "rust",
      icono: "certificado",
    },
    {
      titulo: "AI-Driven Learning Analytics for Workforce — Arizona State University",
      label:
        "Coursera · Arizona State University. Aplicación de IA y analítica de aprendizaje al desarrollo de la fuerza laboral: identificación de brechas de habilidades, estrategias personalizadas para mejorar desempeño y retención, y marcos éticos para abordar sesgo, privacidad y transparencia en sistemas de IA.",
      fecha: "Sep 2026",
      url: "https://www.coursera.org/account/accomplishments/verify/8YY3BK67ECFT",
      linkText: "Ver certificado",
      color: "sage",
      icono: "certificado",
      embed: {
        title: "Publicación de LinkedIn — certificación AI-Driven Learning Analytics for Workforce",
        ...workforceAnalyticsEmbed,
      },
    },
  ],
  reconocimientoInstitucional: [
    {
      titulo: "UMM · Microsoft Monterrey",
      label:
        "Reconocimiento público otorgado por la UMM en colaboración con Microsoft Monterrey, destacando mi participación en un proyecto de innovación educativa y STEM (2025).",
      url: "https://lnkd.in/p/ehyHKwxv",
      linkText: "Ver en LinkedIn",
      color: "rust",
      icono: "graduacion",
      embed: {
        title: "Publicación de LinkedIn — reconocimiento de la UMM",
        ...ummEmbed,
      },
    },
    {
      titulo: "CANIETI Noreste",
      label:
        "Reconocimiento público otorgado por la Cámara Nacional de la Industria Electrónica, de Telecomunicaciones y Tecnologías de la Información, destacando mi participación en iniciativas de innovación tecnológica y educación digital.",
      url: "https://lnkd.in/p/ea5sMYBe",
      linkText: "Ver en LinkedIn",
      color: "sage",
      icono: "chip",
      embed: {
        title: "Publicación de LinkedIn — reconocimiento de CANIETI Noreste",
        ...canietiEmbed,
      },
    },
    {
      titulo: "Instructor — Taller IA",
      label:
        "Reconocimiento de la Facultad de Filosofía y Letras (UANL) por mi participación como instructor, en el marco de la Semana Académica del 75.º aniversario de la Facultad (31 de marzo de 2025).",
      url: "/Constancia-Taller-IA.pdf",
      linkText: "Ver constancia (PDF)",
      color: "cream",
      icono: "certificado",
    },
  ],
  proyectosPublicaciones: [
    {
      titulo: "Casa CoLectiva — Economía del Desarrollo Educativo y del Talento",
      tipo: "Proyecto propio",
      fecha: "Sitio en construcción",
      descripcion:
        'Línea de investigación y divulgación digital independiente enfocada en factores macroeconómicos y de mercado laboral en el desarrollo estratégico de talento. Primera publicación: "Innovación social y educativa para la prosperidad compartida: el crecimiento del mercado EdTech" (innovación social, Cuádruple Hélice, EdTech).',
      enlacePrincipal: {
        label: "Ver publicación",
        url: "https://drive.google.com/file/d/18sfS9noC6Jzw4UtMlHFNYUhjHRpyqrZu/view?usp=sharing",
      },
    },
    {
      titulo: "Protocolo CoLectivo — repositorio de skills con IA",
      tipo: "Proyecto propio",
      fecha: "",
      descripcion:
        "Skills y flujos de trabajo con IA (Claude) que codifican metodologías propias en economía de la educación, gestión del talento y diseño instruccional; cada skill automatiza un flujo específico combinando marcos teóricos con estándares técnicos del sector.",
      enlacePrincipal: {
        label: "Ver repositorio",
        url: "https://github.com/alvarezgzx-lab/protocolo-colectivo",
      },
    },
  ],
  experiencia: [
    {
      puesto: "Docencia — Nivel Secundaria",
      organizacion:
        "Colegio Regiomontano Contry La Salle (2025–2026) · Colegio Mexicano (2023–2025)",
      fecha: "2023 – 2026",
      bullets: [
        "Automatizó procesos de evaluación y diseñó indicadores de desempeño para dar seguimiento objetivo al progreso individual y grupal.",
        "Gestionó simultáneamente hasta 11 grupos de más de 30 personas, sosteniendo desempeño colectivo bajo múltiples prioridades.",
        "Brindó acompañamiento, tutoría y coaching individual y grupal — fortaleciendo desarrollo de habilidades, manejo de conflictos y liderazgo de iniciativas institucionales (Academia de Ética, procesos electorales estudiantiles).",
      ],
    },
    {
      puesto: "Practicante en diseño instruccional",
      organizacion: "Talisis",
      fecha: "2022 – 2023",
      bullets: [
        "Colaboró con equipos de Data Science, Ingeniería de Software e Innovación de Producto en el desarrollo de herramientas de generación de contenido para diseño instruccional (licenciatura y maestría), apoyando detección de necesidades de capacitación y diseño de soluciones de aprendizaje escalables.",
      ],
    },
    {
      puesto: "Conductor independiente (transporte por aplicación)",
      organizacion: "Trabajo autónomo",
      fecha: "2019 – 2022",
      bullets: [
        "Autogestionó negocio independiente (ingresos, financiamiento, atención a cliente y manejo del tiempo), desarrollando autogestión y orientación a resultados bajo alta autonomía.",
      ],
    },
    {
      puesto: "Auxiliar administrativo",
      organizacion: "Santander Universidades",
      fecha: "2018 – 2019",
      bullets: [
        "Gestionó posicionamiento de productos y eventos de credencialización estudiantil para instituciones del sector universidades (Tec, UDEM, Becas NL, CONALEP), coordinando relaciones multi-institucionales y gestión de cuentas.",
      ],
    },
  ],
  habilidades: {
    "People Analytics, Talento y Desarrollo Organizacional": [
      "Planeación de fuerza laboral",
      "People analytics",
      "Desempeño y compensación",
      "Planeación de sucesión",
      "Gestión del cambio y cultura organizacional",
      "Pensamiento estratégico y de negocios",
    ],
    "Capacitación y Desarrollo": [
      "Diseño e impartición de capacitación",
      "Detección de necesidades (DNC)",
      "Diseño instruccional",
      "Liderazgo de grupos",
      "Frameworks de LXD (Learning Experience Design)",
      "Estándares e-learning (xAPI/SCORM/LRS)",
      "Analítica de aprendizaje impulsada por IA para fuerza laboral",
    ],
    "Análisis de Datos y Business Intelligence": [
      "Power BI (modelado de datos, dashboards)",
      "Estadística (descriptiva, inferencial y predictiva) aplicada a negocio",
      "Excel intermedio-avanzado",
      "Nociones de SQL y Python",
      "Bases de micro y macroeconomía",
    ],
    "Herramientas y Transferibles": [
      "Word",
      "PowerPoint",
      "Autor (Easy Generator, Articulate, Genially)",
      "HTML/React",
      "Llamadas a API en JSX de React",
      "Vibe coding",
      "Prompt engineering",
      "Comunicación efectiva y adaptabilidad",
    ],
  },
  idiomasTitulo: "Idiomas",
  idiomas: { Español: "Nativo", Inglés: "Intermedio-Avanzado" },
  contactoPrompt:
    "¿Conversamos sobre una oportunidad en People Analytics, Workforce Enablement o Estrategia de Negocio?",
  emailLabel: "Email",
  emailAria: "Email — copiar dirección de correo y abrir cliente de correo",
  emailCopied: "Correo copiado — puedes pegarlo donde prefieras escribirme",
  linkedinLabel: "LinkedIn",
  badgeLocale: "es_ES",
  footer: "Jesús Álvarez",
};

export const en: Copy = {
  htmlLang: "en",
  title: "Jesús Álvarez | Learning & People Analyst",
  metaDescription:
    "Jesús Álvarez's digital CV: People Analytics, Workforce Enablement & Business Strategy, independent research in education and talent economics. Verifiable projects, publications, and experience.",
  skipToContent: "Skip to main content",
  location: "Nuevo León, Mexico",
  headline:
    "Learning & People Analyst | Workforce Enablement & Business Strategy | Independent Researcher in Education and Talent Economics",
  resumenProfesional:
    "Bachelor's degree in Education and Administration, with training focused on Talent Management and Corporate Learning. Experience leading large groups, designing performance indicators, and facilitating training and skills-development processes. His capstone project, recognized by the Northeast chapter of the National Chamber of the Electronics, Telecommunications, and Information Technology Industry (CANIETI), gave him experience managing multiple stakeholders while collaborating with Microsoft IT solutions architecture and cybersecurity experts and with UMM's digital transformation division. Studies in Economics (UANL, through the 6th semester) built a foundation in analytical thinking, predictive models, and strategic thinking.",
  objetivoLabel: "Professional Objective",
  objetivo:
    "Build a career in People Analytics, Learning & Development, and Business Intelligence, applying expertise in human talent management, instructional design, and data analysis — with genuine commitment to people and technological fluency — to bring strategic value to a Human Resources team.",
  navAriaLabel: "Main navigation",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  close: "Close",
  languageToggleLabel: "Switch language to Spanish",
  photoAlt: "Portrait of Jesús Álvarez",
  ctaCv: "View CV (PDF)",
  cvPdfUrl: "/CV-Jesus-Alvarez-EN.pdf",
  ctaContact: "Contact",
  navLinks: [
    { href: "#inicio", label: "Home" },
    { href: "#perfil", label: "Profile" },
    { href: "#formacion", label: "Education" },
    { href: "#certificaciones", label: "Licenses & Certifications" },
    { href: "#reconocimiento-institucional", label: "Institutional Recognition" },
    { href: "#proyectos", label: "Independent Projects" },
    { href: "#experiencia", label: "Experience" },
    { href: "#habilidades", label: "Skills" },
    { href: "#contacto", label: "Contact" },
  ],
  headings: {
    formacion: "Education",
    certificaciones: "Licenses & Certifications",
    reconocimiento: "Institutional Recognition",
    proyectos: "Independent Projects",
    experiencia: "Experience",
    habilidades: "Skills",
    contacto: "Contact",
  },
  reconocimientoHint: "Click each badge to view the full recognition",
  reconocimientoAria: (t) => `View recognition: ${t}`,
  proyectosHint:
    "The Drive documents are open to comments — feel free to share your thoughts.",
  formacion: [
    {
      titulo: "Bachelor's Degree in Education and Educational Center Administration",
      institucion: "Universidad Metropolitana de Monterrey (UMM)",
      fecha: "Graduated, August 2025",
      nota: "Capstone project: D.A.T.A. — Development of AI Teaching & Automation; a conversational multi-agent AI ecosystem with an institutional pilot rated 86–98% by faculty, developed in collaboration with Microsoft and recognized by CANIETI Noreste.",
      enlace: {
        label: "View project",
        url: "https://drive.google.com/file/d/138Ht-cbE6ZnZXzL2ArrmUQKuodC7XG1t/view?usp=sharing",
      },
    },
    {
      titulo: "Bachelor's Degree in Economics (not completed)",
      institucion: "Universidad Autónoma de Nuevo León (UANL)",
      fecha: "Through 6th semester",
    },
  ],
  licenciasCertificaciones: [
    {
      titulo: "Workforce Planning Strategy — Microsoft",
      label:
        "Coursera · Course 1 of the Strategic Workforce Planning specialization. Workforce planning with clear success metrics, Power BI dashboards with KPIs and DAX formulas, analysis of engagement and turnover-risk signals, and the impact of AI on talent needs.",
      fecha: "Sep 2026",
      url: "https://coursera.org/share/1173e7e3ea7497b4d355b6487be5ddbc",
      linkText: "View certificate",
      color: "rust",
      icono: "certificado",
    },
    {
      titulo: "AI-Driven Learning Analytics for Workforce — Arizona State University",
      label:
        "Coursera · Arizona State University. Applying AI and learning analytics to workforce development: identifying skill gaps, personalized strategies to improve performance and retention, and ethical frameworks addressing bias, privacy, and transparency in AI systems.",
      fecha: "Sep 2026",
      url: "https://www.coursera.org/account/accomplishments/verify/8YY3BK67ECFT",
      linkText: "View certificate",
      color: "sage",
      icono: "certificado",
      embed: {
        title: "LinkedIn post — AI-Driven Learning Analytics for Workforce certification",
        ...workforceAnalyticsEmbed,
      },
    },
  ],
  reconocimientoInstitucional: [
    {
      titulo: "UMM · Microsoft Monterrey",
      label:
        "Public recognition from UMM in collaboration with Microsoft Monterrey, highlighting my participation in an educational innovation and STEM project (2025).",
      url: "https://lnkd.in/p/ehyHKwxv",
      linkText: "View on LinkedIn",
      color: "rust",
      icono: "graduacion",
      embed: {
        title: "LinkedIn post — recognition from UMM",
        ...ummEmbed,
      },
    },
    {
      titulo: "CANIETI Noreste",
      label:
        "Public recognition from the National Chamber of the Electronics, Telecommunications, and Information Technology Industry (CANIETI), highlighting my participation in technological innovation and digital education initiatives.",
      url: "https://lnkd.in/p/ea5sMYBe",
      linkText: "View on LinkedIn",
      color: "sage",
      icono: "chip",
      embed: {
        title: "LinkedIn post — recognition from CANIETI Noreste",
        ...canietiEmbed,
      },
    },
    {
      titulo: "Instructor — AI Workshop",
      label:
        "Recognition from the Facultad de Filosofía y Letras (UANL) for my participation as an instructor, as part of the Faculty's 75th-anniversary Academic Week (March 31, 2025).",
      url: "/Constancia-Taller-IA.pdf",
      linkText: "View certificate (PDF)",
      color: "cream",
      icono: "certificado",
    },
  ],
  proyectosPublicaciones: [
    {
      titulo: "Casa CoLectiva — Economics of Educational and Talent Development",
      tipo: "Own project",
      fecha: "Site under construction",
      descripcion:
        'Independent research and digital dissemination line focused on macroeconomic and labor-market factors in strategic talent development. First publication: "Social and Educational Innovation for Shared Prosperity: The Growth of the EdTech Market" (social innovation, Quadruple Helix, EdTech).',
      enlacePrincipal: {
        label: "View publication",
        url: "https://drive.google.com/file/d/18sfS9noC6Jzw4UtMlHFNYUhjHRpyqrZu/view?usp=sharing",
      },
    },
    {
      titulo: "Protocolo CoLectivo — AI skills repository",
      tipo: "Own project",
      fecha: "",
      descripcion:
        "AI (Claude) skills and workflows that encode original methodologies in the economics of education, talent management, and instructional design; each skill automates a specific workflow combining recognized theoretical frameworks with industry technical standards.",
      enlacePrincipal: {
        label: "View repository",
        url: "https://github.com/alvarezgzx-lab/protocolo-colectivo",
      },
    },
  ],
  experiencia: [
    {
      puesto: "Teaching — Secondary Level",
      organizacion:
        "Colegio Regiomontano Contry La Salle (2025–2026) · Colegio Mexicano (2023–2025)",
      fecha: "2023 – 2026",
      bullets: [
        "Automated assessment processes and designed performance indicators to objectively track individual and group progress.",
        "Simultaneously managed up to 11 groups of over 30 students each, sustaining collective performance under multiple competing priorities.",
        "Provided individual and group mentoring, tutoring, and coaching — strengthening skills development and conflict management, and leading institutional initiatives (Ethics Academy, student council elections).",
      ],
    },
    {
      puesto: "Instructional Design Intern",
      organizacion: "Talisis",
      fecha: "2022 – 2023",
      bullets: [
        "Collaborated with Data Science, Software Engineering, and Product Innovation teams to develop content-generation tools for instructional design (undergraduate and graduate programs), supporting training-needs assessment and the design of scalable learning solutions.",
      ],
    },
    {
      puesto: "Independent Driver (Ride-hailing)",
      organizacion: "Self-employed",
      fecha: "2019 – 2022",
      bullets: [
        "Self-managed an independent business (income, financing, customer service, and time management), building self-management skills and a results-oriented approach under high autonomy.",
      ],
    },
    {
      puesto: "Administrative Assistant",
      organizacion: "Santander Universidades",
      fecha: "2018 – 2019",
      bullets: [
        "Managed product positioning and student credentialing events for university-sector institutions (Tec, UDEM, Becas NL, CONALEP), coordinating multi-institutional relationships and account management.",
      ],
    },
  ],
  habilidades: {
    "People Analytics, Talent & Organizational Development": [
      "Workforce planning",
      "People analytics",
      "Performance and compensation",
      "Succession planning",
      "Change management and organizational culture",
      "Strategic and business thinking",
    ],
    "Training & Development": [
      "Training design and delivery",
      "Training needs assessment (TNA)",
      "Instructional design",
      "Group leadership",
      "LXD (Learning Experience Design) frameworks",
      "E-learning standards (xAPI/SCORM/LRS)",
      "AI-driven learning analytics for workforce",
    ],
    "Data Analysis & Business Intelligence": [
      "Power BI (data modeling, dashboards)",
      "Statistics (descriptive, inferential, and predictive) applied to business",
      "Intermediate-advanced Excel",
      "Working knowledge of SQL and Python",
      "Micro- and macroeconomics fundamentals",
    ],
    "Tools & Transferable Skills": [
      "Word",
      "PowerPoint",
      "Authoring tools (Easy Generator, Articulate, Genially)",
      "HTML/React",
      "API calls in React JSX",
      "Vibe coding",
      "Prompt engineering",
      "Effective communication and adaptability",
    ],
  },
  idiomasTitulo: "Languages",
  idiomas: { Spanish: "Native", English: "Intermediate-Advanced" },
  contactoPrompt:
    "Let's talk about an opportunity in People Analytics, Workforce Enablement, or Business Strategy?",
  emailLabel: "Email",
  emailAria: "Email — copy email address and open mail client",
  emailCopied: "Email copied — paste it anywhere you'd like to reach me",
  linkedinLabel: "LinkedIn",
  badgeLocale: "en_US",
  footer: "Jesús Álvarez",
};

export const copyByLang: Record<Lang, Copy> = { es, en };
