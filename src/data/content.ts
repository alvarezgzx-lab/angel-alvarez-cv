export type Lang = "es" | "en";

export const persona = {
  name: "Ángel Álvarez",
  fullName: "Jesús Ángel Álvarez González",
  headline:
    "Learning Analyst (Associate) | Workforce Enablement & Business Strategy | Cross-Functional HR Operations | Data & Metrics",
  email: "alvarezgzx@gmail.com",
  linkedin: "https://linkedin.com/in/angelalvarezg97",
  linkedinBadge: "https://mx.linkedin.com/in/angelalvarezg97?trk=profile-badge",
  cvPdf: "/Angel-Alvarez-CV.pdf",
  photo: "/images/angel-photo.webp",
};

export interface Formacion {
  titulo: string;
  institucion: string;
  fecha: string;
  nota?: string;
}

export interface Embed {
  title: string;
  src: string;
  height: number;
  width: number;
}

export type ReconocimientoIcono = "graduacion" | "chip" | "certificado";
export type ReconocimientoColor = "rust" | "sage" | "cream";

export interface Reconocimiento {
  titulo: string;
  label: string;
  url: string;
  linkText: string;
  color: ReconocimientoColor;
  icono: ReconocimientoIcono;
  embed?: Embed;
}

export interface Proyecto {
  titulo: string;
  tipo: string;
  fecha: string;
  descripcion: string;
  enlacePrincipal: { label: string; url: string };
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
  resumenProfesional: string;
  navAriaLabel: string;
  openMenu: string;
  closeMenu: string;
  close: string;
  languageToggleLabel: string;
  photoAlt: string;
  ctaCv: string;
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
  formacion: Formacion[];
  licenciasCertificaciones: Embed[];
  reconocimientoInstitucional: Reconocimiento[];
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


export const es: Copy = {
  htmlLang: "es-MX",
  title:
    "Ángel Álvarez | Learning Analyst (Associate) | Workforce Enablement & Business Strategy",
  metaDescription:
    "CV digital de Ángel Álvarez: People Analytics, Capacitación y Desarrollo, Reclutamiento y Desarrollo Organizacional. Proyectos, publicaciones y experiencia verificables.",
  skipToContent: "Saltar al contenido principal",
  location: "Nuevo León, México",
  resumenProfesional:
    "Profesional de la educación, entusiasta de la tecnología y apasionado por el desarrollo de las personas, con formación en ciencias sociales y del comportamiento. Aporta una mentalidad y ética de trabajo basada en la analítica de datos para el diseño de soluciones de aprendizaje como de gestión de la fuerza laboral que contribuyan a fortalecer las capacidades del talento y el desarrollo organizacional, a través de la colaboración con diversas áreas estratégicas con el objetivo de impulsar la inteligencia de negocios para la toma de decisiones.",
  navAriaLabel: "Navegación principal",
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
  close: "Cerrar",
  languageToggleLabel: "Cambiar idioma a inglés",
  photoAlt: "Retrato de Ángel Álvarez",
  ctaCv: "Ver CV en PDF",
  ctaContact: "Contactar",
  navLinks: [
    { href: "#inicio", label: "Inicio" },
    { href: "#perfil", label: "Perfil" },
    { href: "#formacion", label: "Formación" },
    { href: "#certificaciones", label: "Licencias y Certificaciones" },
    { href: "#reconocimiento-institucional", label: "Reconocimiento Institucional" },
    { href: "#proyectos", label: "Proyectos y Publicaciones" },
    { href: "#experiencia", label: "Experiencia" },
    { href: "#habilidades", label: "Habilidades" },
    { href: "#contacto", label: "Contacto" },
  ],
  headings: {
    formacion: "Formación",
    certificaciones: "Licencias y Certificaciones",
    reconocimiento: "Reconocimiento Institucional",
    proyectos: "Proyectos y Publicaciones",
    experiencia: "Experiencia",
    habilidades: "Habilidades",
    contacto: "Contacto",
  },
  reconocimientoHint: "Haz clic en cada insignia para ver el reconocimiento completo",
  reconocimientoAria: (t) => `Ver reconocimiento: ${t}`,
  formacion: [
    {
      titulo: "Licenciatura en Educación y Administración de Centros Educativos",
      institucion: "Universidad Metropolitana de Monterrey (UMM)",
      fecha: "Titulado, agosto 2025",
      nota: "Proyecto de titulación: D.A.T.A. — Development of AI Teaching & Automation; ecosistema multiagente de IA conversacional con piloto institucional de 86–98% de valoración docente, en colaboración con Microsoft y reconocido por CANIETI Noreste (ver Proyectos y Publicaciones y Reconocimiento Institucional).",
    },
    {
      titulo: "Licenciatura en Economía",
      institucion: "Universidad Autónoma de Nuevo León (UANL)",
      fecha: "Hasta 6.° semestre, no concluida",
      nota: "Publicación académica en revisión (E-Socialis, UMM): análisis de 26 fuentes sobre el mercado EdTech; propone un marco de cuatro pilares (ver Proyectos y Publicaciones).",
    },
  ],
  licenciasCertificaciones: [
    {
      title:
        "Certificado de finalización — Workforce Planning Strategy (Microsoft, vía Coursera)",
      src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7501379217348096000?collapsed=1",
      height: 539,
      width: 504,
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
      titulo: "D.A.T.A. — Development of AI Teaching & Automation",
      tipo: "Proyecto",
      fecha: "Abril 2025",
      descripcion:
        "Ecosistema multiagente de IA conversacional para planificación, evaluación y personalización del aprendizaje; piloto institucional con 86–98% de valoración docente.",
      enlacePrincipal: {
        label: "Ver proyecto",
        url: "https://drive.google.com/file/d/138Ht-cbE6ZnZXzL2ArrmUQKuodC7XG1t/view?usp=sharing",
      },
    },
    {
      titulo: "Mis Skills de Claude",
      tipo: "Proyecto",
      fecha: "2026 · en desarrollo continuo",
      descripcion:
        "Repositorio personal de skills para Claude orientadas a Recursos Humanos y gestión de talento; incluye una skill para generar Strategic Workforce Planning Briefs mediante un proceso guiado de 7 fases.",
      enlacePrincipal: {
        label: "Ver repositorio",
        url: "https://github.com/alvarezgzx-lab/mis-skills-de-claude",
      },
    },
    {
      titulo:
        "Innovación Social y Educativa para la Prosperidad Compartida: El Crecimiento del Mercado EdTech",
      tipo: "Publicación independiente",
      fecha: "E-Socialis, UMM · aprobada, vol. 1 (pendiente de publicación)",
      descripcion:
        "Revisión de 26 fuentes académicas sobre la tensión entre lógica de mercado y equidad social en el crecimiento del sector EdTech; propone un marco de cuatro pilares.",
      enlacePrincipal: {
        label: "Ver artículo",
        url: "https://drive.google.com/file/d/18sfS9noC6Jzw4UtMlHFNYUhjHRpyqrZu/view?usp=sharing",
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
      "Reclutamiento y selección",
      "Onboarding",
      "Desempeño y compensación",
      "Planeación de sucesión",
      "Gestión del cambio y cultura organizacional",
    ],
    "Capacitación y Desarrollo": [
      "Diseño e impartición de capacitación",
      "Detección de necesidades (DNC)",
      "Diseño instruccional",
      "Facilitación",
      "Liderazgo de grupos",
      "Prompt engineering",
    ],
    "Análisis de Datos y Business Intelligence": [
      "Power BI (modelado de datos, dashboards)",
      "Análisis estadístico aplicado a negocio",
      "Excel intermedio-avanzado",
      "Nociones de SQL y Python",
    ],
    "Herramientas y Transferibles": [
      "Word",
      "PowerPoint",
      "Herramientas de autor (Easy Generator, Articulate, Genially)",
      "HTML/React básico",
      "Claude avanzado",
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
  footer: "Ángel Álvarez",
};

export const en: Copy = {
  htmlLang: "en",
  title:
    "Ángel Álvarez | Learning Analyst (Associate) | Workforce Enablement & Business Strategy",
  metaDescription:
    "Ángel Álvarez's digital CV: People Analytics, Training & Development, Recruitment and Organizational Development. Verifiable projects, publications, and experience.",
  skipToContent: "Skip to main content",
  location: "Nuevo León, Mexico",
  resumenProfesional:
    "An education professional, technology enthusiast, and advocate for people development, with a background in social and behavioral sciences. Brings a data-driven mindset and work ethic to designing learning and workforce management solutions that strengthen talent capabilities and organizational development, through collaboration across strategic areas aimed at driving business intelligence for decision-making.",
  navAriaLabel: "Main navigation",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  close: "Close",
  languageToggleLabel: "Switch language to Spanish",
  photoAlt: "Portrait of Ángel Álvarez",
  ctaCv: "View CV (PDF)",
  ctaContact: "Contact",
  navLinks: [
    { href: "#inicio", label: "Home" },
    { href: "#perfil", label: "Profile" },
    { href: "#formacion", label: "Education" },
    { href: "#certificaciones", label: "Licenses & Certifications" },
    { href: "#reconocimiento-institucional", label: "Institutional Recognition" },
    { href: "#proyectos", label: "Projects & Publications" },
    { href: "#experiencia", label: "Experience" },
    { href: "#habilidades", label: "Skills" },
    { href: "#contacto", label: "Contact" },
  ],
  headings: {
    formacion: "Education",
    certificaciones: "Licenses & Certifications",
    reconocimiento: "Institutional Recognition",
    proyectos: "Projects & Publications",
    experiencia: "Experience",
    habilidades: "Skills",
    contacto: "Contact",
  },
  reconocimientoHint: "Click each badge to view the full recognition",
  reconocimientoAria: (t) => `View recognition: ${t}`,
  formacion: [
    {
      titulo: "Bachelor's Degree in Education and Educational Center Administration",
      institucion: "Universidad Metropolitana de Monterrey (UMM)",
      fecha: "Graduated, August 2025",
      nota: "Capstone project: D.A.T.A. — Development of AI Teaching & Automation; a conversational multi-agent AI ecosystem with an institutional pilot rated 86–98% by faculty, developed in collaboration with Microsoft and recognized by CANIETI Noreste (see Projects & Publications and Institutional Recognition).",
    },
    {
      titulo: "Bachelor's Degree in Economics",
      institucion: "Universidad Autónoma de Nuevo León (UANL)",
      fecha: "Through 6th semester, not completed",
      nota: "Academic publication under review (E-Socialis, UMM): a review of 26 sources on the EdTech market proposing a four-pillar framework (see Projects & Publications).",
    },
  ],
  licenciasCertificaciones: [
    {
      title:
        "Completion Certificate — Workforce Planning Strategy (Microsoft, via Coursera)",
      src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7501379217348096000?collapsed=1",
      height: 539,
      width: 504,
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
      titulo: "D.A.T.A. — Development of AI Teaching & Automation",
      tipo: "Project",
      fecha: "April 2025",
      descripcion:
        "A conversational multi-agent AI ecosystem for learning planning, assessment, and personalization; institutional pilot rated 86–98% by faculty.",
      enlacePrincipal: {
        label: "View project",
        url: "https://drive.google.com/file/d/138Ht-cbE6ZnZXzL2ArrmUQKuodC7XG1t/view?usp=sharing",
      },
    },
    {
      titulo: "My Claude Skills",
      tipo: "Project",
      fecha: "2026 · ongoing development",
      descripcion:
        "Personal repository of Claude skills focused on Human Resources and talent management; includes a skill for generating Strategic Workforce Planning Briefs through a guided 7-phase process.",
      enlacePrincipal: {
        label: "View repository",
        url: "https://github.com/alvarezgzx-lab/mis-skills-de-claude",
      },
    },
    {
      titulo:
        "Social and Educational Innovation for Shared Prosperity: The Growth of the EdTech Market",
      tipo: "Independent publication",
      fecha: "E-Socialis, UMM · approved, vol. 1 (pending publication)",
      descripcion:
        "A review of 26 academic sources on the tension between market logic and social equity in the growth of the EdTech sector; proposes a four-pillar framework.",
      enlacePrincipal: {
        label: "View article",
        url: "https://drive.google.com/file/d/18sfS9noC6Jzw4UtMlHFNYUhjHRpyqrZu/view?usp=sharing",
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
        "Simultaneously managed up to 11 groups of more than 30 people, sustaining collective performance under multiple priorities.",
        "Provided individual and group mentoring, tutoring, and coaching — strengthening skills development, conflict management, and leadership of institutional initiatives (Ethics Academy, student electoral processes).",
      ],
    },
    {
      puesto: "Instructional Design Intern",
      organizacion: "Talisis",
      fecha: "2022 – 2023",
      bullets: [
        "Collaborated with Data Science, Software Engineering, and Product Innovation teams to develop content-generation tools for instructional design (undergraduate and graduate levels), supporting training needs assessment and the design of scalable learning solutions.",
      ],
    },
    {
      puesto: "Independent Driver (app-based transportation)",
      organizacion: "Self-employed",
      fecha: "2019 – 2022",
      bullets: [
        "Self-managed an independent business (income, financing, customer service, and time management), developing self-direction and results orientation under high autonomy.",
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
      "Recruitment and selection",
      "Onboarding",
      "Performance and compensation",
      "Succession planning",
      "Change management and organizational culture",
    ],
    "Training & Development": [
      "Training design and delivery",
      "Training needs assessment (TNA)",
      "Instructional design",
      "Facilitation",
      "Group leadership",
      "Prompt engineering",
    ],
    "Data Analysis & Business Intelligence": [
      "Power BI (data modeling, dashboards)",
      "Business-applied statistical analysis",
      "Intermediate-advanced Excel",
      "Working knowledge of SQL and Python",
    ],
    "Tools & Transferable Skills": [
      "Word",
      "PowerPoint",
      "Authoring tools (Easy Generator, Articulate, Genially)",
      "Basic HTML/React",
      "Advanced Claude",
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
  footer: "Ángel Álvarez",
};

export const copyByLang: Record<Lang, Copy> = { es, en };
