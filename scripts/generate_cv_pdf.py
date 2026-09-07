"""Generate the two downloadable CV PDFs (ES/EN) served from public/.

Deliberately excludes phone number and email — the site's Contact button
(copy-to-clipboard + mailto, LinkedIn badge) is the only contact path these
PDFs point visitors back to. Content here must stay in sync with the ES/EN
`Copy` objects in src/data/content.ts; this script does not read that file
(different language/toolchain), so update both by hand when content changes.

Usage:
    python scripts/generate_cv_pdf.py
"""

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
)
from reportlab.lib.styles import ParagraphStyle
from pathlib import Path

NAVY = HexColor("#17324D")
CREAM = HexColor("#F4EFE6")
RUST = HexColor("#B85C38")
RUST_INK = HexColor("#A45232")
SAGE_INK = HexColor("#546C56")
INK = HexColor("#1F1F1F")
MUTED = HexColor("#5A5A5A")

SITE_URL = "https://angel-alvarez-cv.vercel.app"
LINKEDIN_URL = "https://linkedin.com/in/angelalvarezg97"
OUT_DIR = Path(__file__).resolve().parent.parent / "public"

styles = {
    "name": ParagraphStyle(
        "name", fontName="Helvetica-Bold", fontSize=22, leading=24, textColor=CREAM
    ),
    "headline": ParagraphStyle(
        "headline", fontName="Helvetica", fontSize=10, leading=13, textColor=CREAM
    ),
    "contact": ParagraphStyle(
        "contact", fontName="Helvetica", fontSize=8.5, leading=11, textColor=CREAM
    ),
    "sectionHeading": ParagraphStyle(
        "sectionHeading",
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=13,
        textColor=RUST_INK,
        spaceBefore=10,
        spaceAfter=4,
        letterSpacing=0.6,
    ),
    "itemTitle": ParagraphStyle(
        "itemTitle", fontName="Helvetica-Bold", fontSize=10, leading=13, textColor=INK
    ),
    "itemMeta": ParagraphStyle(
        "itemMeta",
        fontName="Helvetica-Oblique",
        fontSize=8.5,
        leading=11,
        textColor=MUTED,
        spaceAfter=2,
    ),
    "body": ParagraphStyle(
        "body", fontName="Helvetica", fontSize=9, leading=12.5, textColor=INK, alignment=TA_LEFT
    ),
    "dateRight": ParagraphStyle(
        "dateRight",
        fontName="Helvetica-Bold",
        fontSize=8,
        leading=11,
        textColor=SAGE_INK,
        alignment=2,
    ),
}


CONTENT_WIDTH = 188 * mm


def header(name, headline, location, linkedin_label, cv_label):
    contact_line = (
        f'{location} &nbsp;·&nbsp; <link href="{LINKEDIN_URL}" color="#F4EFE6">{linkedin_label}</link>'
        f' &nbsp;·&nbsp; <link href="{SITE_URL}" color="#F4EFE6">{cv_label}</link>'
    )
    cell = [
        Paragraph(name, styles["name"]),
        Spacer(1, 2 * mm),
        Paragraph(headline, styles["headline"]),
        Spacer(1, 3 * mm),
        Paragraph(contact_line, styles["contact"]),
    ]
    t = Table([[cell]], colWidths=[CONTENT_WIDTH])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), NAVY),
                ("LEFTPADDING", (0, 0), (-1, -1), 6 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 8 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8 * mm),
            ]
        )
    )
    return t


def section_heading(text):
    return [
        Paragraph(text.upper(), styles["sectionHeading"]),
        HRFlowable(width="100%", thickness=0.75, color=RUST, spaceAfter=4),
    ]


def two_col_row(left_flowables, right_text):
    right = Paragraph(right_text, styles["dateRight"]) if right_text else ""
    t = Table([[left_flowables, right]], colWidths=[148 * mm, 40 * mm])
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
            ]
        )
    )
    return t


def build(lang: str, data: dict, filename: str):
    doc = SimpleDocTemplate(
        str(OUT_DIR / filename),
        pagesize=LETTER,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=12 * mm,
        bottomMargin=12 * mm,
        title=data["title"],
        author=data["name"],
    )
    story = []
    story.append(header(data["name"], data["headline"], data["location"], data["linkedinLabel"], data["cvLabel"]))
    story.append(Spacer(1, 6 * mm))

    story += section_heading(data["headings"]["perfil"])
    story.append(Paragraph(data["resumenProfesional"], styles["body"]))
    story.append(Spacer(1, 2 * mm))

    story += section_heading(data["headings"]["formacion"])
    for f in data["formacion"]:
        left = [
            Paragraph(f["titulo"], styles["itemTitle"]),
            Paragraph(f["institucion"], styles["itemMeta"]),
        ]
        story.append(two_col_row(left, f["fecha"]))
        if f.get("nota"):
            story.append(Paragraph(f["nota"], styles["body"]))
        story.append(Spacer(1, 2 * mm))

    story += section_heading(data["headings"]["certificaciones"])
    for c in data["certificaciones"]:
        left = [Paragraph(c["titulo"], styles["itemTitle"])]
        story.append(two_col_row(left, c.get("fecha", "")))
        story.append(Paragraph(c["label"], styles["body"]))
        story.append(Spacer(1, 2 * mm))

    story += section_heading(data["headings"]["proyectos"])
    for p in data["proyectos"]:
        left = [Paragraph(f'{p["titulo"]} <font color="#546C56">— {p["tipo"]}</font>', styles["itemTitle"])]
        story.append(two_col_row(left, p["fecha"]))
        story.append(Paragraph(p["descripcion"], styles["body"]))
        story.append(Spacer(1, 2 * mm))

    story += section_heading(data["headings"]["experiencia"])
    for e in data["experiencia"]:
        left = [
            Paragraph(e["puesto"], styles["itemTitle"]),
            Paragraph(e["organizacion"], styles["itemMeta"]),
        ]
        story.append(two_col_row(left, e["fecha"]))
        for b in e["bullets"]:
            story.append(Paragraph(f"&bull;&nbsp; {b}", styles["body"]))
        story.append(Spacer(1, 2 * mm))

    story += section_heading(data["headings"]["habilidades"])
    for group, items in data["habilidades"].items():
        story.append(Paragraph(f"<b>{group}</b>", styles["body"]))
        story.append(Paragraph(" &middot; ".join(items), styles["body"]))
        story.append(Spacer(1, 1.5 * mm))

    story += section_heading(data["headings"]["idiomas"])
    story.append(
        Paragraph(
            " &nbsp;&nbsp; ".join(f"<b>{k}:</b> {v}" for k, v in data["idiomas"].items()),
            styles["body"],
        )
    )

    doc.build(story)
    print(f"Wrote {OUT_DIR / filename}")


ES = {
    "name": "Jesús Álvarez",
    "title": "Jesús Álvarez | CV",
    "headline": (
        "Especialista en Aprendizaje y People Analytics | Habilitación de Fuerza Laboral y "
        "Estrategia de Negocio | Investigador Independiente en Economía de la Educación y el Talento"
    ),
    "location": "Nuevo León, México",
    "linkedinLabel": "Perfil de LinkedIn",
    "cvLabel": "angel-alvarez-cv.vercel.app",
    "headings": {
        "perfil": "Perfil profesional",
        "formacion": "Formación académica",
        "certificaciones": "Certificaciones",
        "proyectos": "Proyectos independientes y publicaciones",
        "experiencia": "Experiencia profesional",
        "habilidades": "Habilidades y conocimientos",
        "idiomas": "Idiomas",
    },
    "resumenProfesional": (
        "Licenciado en Educación y Administración de Centros Educativos, reconocido por "
        "instituciones como la UMM y CANIETI por mi colaboración interdisciplinaria con equipos "
        "de transformación digital —incluyendo Microsoft— aportando visión estratégica para "
        "automatizar procesos de gestión en educación superior. También reconocido por la "
        "Facultad de Filosofía y Letras de la UANL como instructor en IA aplicada al aula, "
        "formando profesionales resilientes para la transformación digital y la Sociedad 5.0."
    ),
    "formacion": [
        {
            "titulo": "Licenciatura en Educación y Administración de Centros Educativos",
            "institucion": "Universidad Metropolitana de Monterrey (UMM)",
            "fecha": "Ago 2025",
            "nota": (
                "Proyecto de titulación: D.A.T.A. — Development of AI Teaching & Automation; "
                "ecosistema multiagente de IA conversacional con piloto institucional de 86–98% "
                "de valoración docente, en colaboración con Microsoft y reconocido por CANIETI "
                "Noreste."
            ),
        },
        {
            "titulo": "Licenciatura en Economía (no concluida)",
            "institucion": "Universidad Autónoma de Nuevo León (UANL)",
            "fecha": "Hasta 6.° sem.",
        },
    ],
    "certificaciones": [
        {
            "titulo": "Workforce Planning Strategy — Microsoft",
            "fecha": "Sep 2026",
            "label": (
                "Coursera · Curso 1 de la especialización Strategic Workforce Planning. "
                "Planeación de fuerza laboral con métricas de éxito claras, dashboards en Power "
                "BI con KPIs y fórmulas DAX, análisis de señales de engagement y riesgo de "
                "rotación, e impacto de la IA en las necesidades de talento."
            ),
        }
    ],
    "proyectos": [
        {
            "titulo": "D.A.T.A. — Development of AI Teaching & Automation",
            "tipo": "Proyecto",
            "fecha": "Abril 2025",
            "descripcion": (
                "Ecosistema multiagente de IA conversacional para planificación, evaluación y "
                "personalización del aprendizaje; piloto institucional con 86–98% de valoración "
                "docente."
            ),
        },
        {
            "titulo": "Casa CoLectiva — Economía del Desarrollo Educativo y del Talento",
            "tipo": "Proyecto propio · sitio en construcción",
            "fecha": "",
            "descripcion": (
                "Línea de investigación y divulgación digital independiente enfocada en factores "
                "macroeconómicos y de mercado laboral en el desarrollo estratégico de talento."
            ),
        },
        {
            "titulo": "Protocolo CoLectivo — repositorio de skills con IA",
            "tipo": "Proyecto propio",
            "fecha": "",
            "descripcion": (
                "Skills y flujos de trabajo con IA (Claude) que codifican metodologías propias en "
                "economía de la educación, gestión del talento y diseño instruccional."
            ),
        },
        {
            "titulo": (
                "Innovación Social y Educativa para la Prosperidad Compartida: El Crecimiento "
                "del Mercado EdTech"
            ),
            "tipo": "Publicación independiente",
            "fecha": "E-Socialis, UMM",
            "descripcion": (
                "Primera publicación de Casa CoLectiva: revisión de 26 fuentes académicas sobre "
                "la tensión entre lógica de mercado y equidad social en el crecimiento del sector "
                "EdTech; propone un marco de cuatro pilares."
            ),
        },
    ],
    "experiencia": [
        {
            "puesto": "Docencia — Nivel Secundaria",
            "organizacion": "Colegio Regiomontano Contry La Salle (2025–2026) · Colegio Mexicano (2023–2025)",
            "fecha": "2023 – 2026",
            "bullets": [
                "Automatizó procesos de evaluación y diseñó indicadores de desempeño para dar "
                "seguimiento objetivo al progreso individual y grupal.",
                "Gestionó simultáneamente hasta 11 grupos de más de 30 personas, sosteniendo "
                "desempeño colectivo bajo múltiples prioridades.",
                "Brindó acompañamiento, tutoría y coaching individual y grupal — fortaleciendo "
                "desarrollo de habilidades, manejo de conflictos y liderazgo de iniciativas "
                "institucionales.",
            ],
        },
        {
            "puesto": "Practicante en diseño instruccional",
            "organizacion": "Talisis",
            "fecha": "2022 – 2023",
            "bullets": [
                "Colaboró con equipos de Data Science, Ingeniería de Software e Innovación de "
                "Producto en el desarrollo de herramientas de generación de contenido para "
                "diseño instruccional, apoyando detección de necesidades de capacitación y "
                "diseño de soluciones de aprendizaje escalables."
            ],
        },
        {
            "puesto": "Conductor independiente (transporte por aplicación)",
            "organizacion": "Trabajo autónomo",
            "fecha": "2019 – 2022",
            "bullets": [
                "Autogestionó negocio independiente (ingresos, financiamiento, atención a "
                "cliente y manejo del tiempo), desarrollando autogestión y orientación a "
                "resultados bajo alta autonomía."
            ],
        },
        {
            "puesto": "Auxiliar administrativo",
            "organizacion": "Santander Universidades",
            "fecha": "2018 – 2019",
            "bullets": [
                "Gestionó posicionamiento de productos y eventos de credencialización "
                "estudiantil para instituciones del sector universidades, coordinando "
                "relaciones multi-institucionales y gestión de cuentas."
            ],
        },
    ],
    "habilidades": {
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
            "Frameworks de LXD",
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
            "Herramientas de autor (Easy Generator, Articulate, Genially)",
            "HTML/React",
            "Llamadas a API en JSX de React",
            "Vibe coding",
            "Prompt engineering",
            "Comunicación efectiva y adaptabilidad",
        ],
    },
    "idiomas": {"Español": "Nativo", "Inglés": "Intermedio-Avanzado"},
}

EN = {
    "name": "Jesús Álvarez",
    "title": "Jesús Álvarez | CV",
    "headline": (
        "Learning & People Analyst | Workforce Enablement & Business Strategy | Independent "
        "Researcher in Education and Talent Economics"
    ),
    "location": "Nuevo León, Mexico",
    "linkedinLabel": "LinkedIn Profile",
    "cvLabel": "angel-alvarez-cv.vercel.app",
    "headings": {
        "perfil": "Professional profile",
        "formacion": "Education",
        "certificaciones": "Certifications",
        "proyectos": "Independent projects & publications",
        "experiencia": "Professional experience",
        "habilidades": "Skills & knowledge",
        "idiomas": "Languages",
    },
    "resumenProfesional": (
        "I hold a degree in Education and Administration, recognized by institutions like UMM "
        "and CANIETI for interdisciplinary collaboration with digital-transformation teams — "
        "including Microsoft — bringing strategic vision to automating higher-education "
        "management processes. Also recognized by UANL's Facultad de Filosofía y Letras as an "
        "AI-in-the-classroom instructor, shaping resilient professionals for digital "
        "transformation and Society 5.0."
    ),
    "formacion": [
        {
            "titulo": "Bachelor's Degree in Education and Educational Center Administration",
            "institucion": "Universidad Metropolitana de Monterrey (UMM)",
            "fecha": "Aug 2025",
            "nota": (
                "Capstone project: D.A.T.A. — Development of AI Teaching & Automation; a "
                "multi-agent conversational AI ecosystem with an institutional pilot rated "
                "86–98% by faculty, developed in collaboration with Microsoft and recognized by "
                "CANIETI Noreste."
            ),
        },
        {
            "titulo": "Bachelor's Degree in Economics (not completed)",
            "institucion": "Universidad Autónoma de Nuevo León (UANL)",
            "fecha": "Through 6th sem.",
        },
    ],
    "certificaciones": [
        {
            "titulo": "Workforce Planning Strategy — Microsoft",
            "fecha": "Sep 2026",
            "label": (
                "Coursera · Course 1 of the Strategic Workforce Planning specialization. "
                "Workforce planning with clear success metrics, Power BI dashboards with KPIs "
                "and DAX formulas, analysis of engagement and turnover-risk signals, and the "
                "impact of AI on talent needs."
            ),
        }
    ],
    "proyectos": [
        {
            "titulo": "D.A.T.A. — Development of AI Teaching & Automation",
            "tipo": "Project",
            "fecha": "April 2025",
            "descripcion": (
                "A conversational multi-agent AI ecosystem for learning planning, assessment, "
                "and personalization; institutional pilot rated 86–98% by faculty."
            ),
        },
        {
            "titulo": "Casa CoLectiva — Economics of Educational and Talent Development",
            "tipo": "Own project · site under construction",
            "fecha": "",
            "descripcion": (
                "Independent research and digital dissemination line focused on macroeconomic "
                "and labor-market factors in strategic talent development."
            ),
        },
        {
            "titulo": "Protocolo CoLectivo — AI skills repository",
            "tipo": "Own project",
            "fecha": "",
            "descripcion": (
                "AI (Claude) skills and workflows that encode original methodologies in the "
                "economics of education, talent management, and instructional design."
            ),
        },
        {
            "titulo": (
                "Social and Educational Innovation for Shared Prosperity: The Growth of the "
                "EdTech Market"
            ),
            "tipo": "Independent publication",
            "fecha": "E-Socialis, UMM",
            "descripcion": (
                "Casa CoLectiva's first publication: a review of 26 academic sources on the "
                "tension between market logic and social equity in the growth of the EdTech "
                "sector; proposes a four-pillar framework."
            ),
        },
    ],
    "experiencia": [
        {
            "puesto": "Teaching — Secondary Level",
            "organizacion": "Colegio Regiomontano Contry La Salle (2025–2026) · Colegio Mexicano (2023–2025)",
            "fecha": "2023 – 2026",
            "bullets": [
                "Automated assessment processes and designed performance indicators to "
                "objectively track individual and group progress.",
                "Simultaneously managed up to 11 groups of over 30 students each, sustaining "
                "collective performance under multiple competing priorities.",
                "Provided individual and group mentoring, tutoring, and coaching — "
                "strengthening skills development and conflict management, and leading "
                "institutional initiatives.",
            ],
        },
        {
            "puesto": "Instructional Design Intern",
            "organizacion": "Talisis",
            "fecha": "2022 – 2023",
            "bullets": [
                "Collaborated with Data Science, Software Engineering, and Product Innovation "
                "teams to develop content-generation tools for instructional design, supporting "
                "training-needs assessment and the design of scalable learning solutions."
            ],
        },
        {
            "puesto": "Independent Driver (Ride-hailing)",
            "organizacion": "Self-employed",
            "fecha": "2019 – 2022",
            "bullets": [
                "Self-managed an independent business (income, financing, customer service, "
                "and time management), building self-management skills and a "
                "results-oriented approach under high autonomy."
            ],
        },
        {
            "puesto": "Administrative Assistant",
            "organizacion": "Santander Universidades",
            "fecha": "2018 – 2019",
            "bullets": [
                "Managed product positioning and student credentialing events for "
                "university-sector institutions, coordinating multi-institutional "
                "relationships and account management."
            ],
        },
    ],
    "habilidades": {
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
            "LXD frameworks",
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
    "idiomas": {"Spanish": "Native", "English": "Intermediate-Advanced"},
}


if __name__ == "__main__":
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    build("es", ES, "CV-Jesus-Alvarez-ES.pdf")
    build("en", EN, "CV-Jesus-Alvarez-EN.pdf")
