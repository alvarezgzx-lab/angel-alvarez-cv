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
LINKEDIN_URL = "https://www.linkedin.com/in/jesusalvarezgz"
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

    story += section_heading(data["headings"]["objetivo"])
    story.append(Paragraph(data["objetivo"], styles["body"]))
    story.append(Spacer(1, 2 * mm))

    story += section_heading(data["headings"]["formacion"])
    for f in data["formacion"]:
        left = [
            Paragraph(f["titulo"], styles["itemTitle"]),
            Paragraph(f["institucion"], styles["itemMeta"]),
        ]
        story.append(two_col_row(left, f["fecha"]))
        if f.get("nota"):
            nota_text = f["nota"]
            if f.get("enlace"):
                nota_text += (
                    f' <link href="{f["enlace"]["url"]}" color="#A45232">'
                    f'<b>{f["enlace"]["label"]}</b></link>'
                )
            story.append(Paragraph(nota_text, styles["body"]))
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
        descripcion_text = p["descripcion"]
        if p.get("enlace"):
            descripcion_text += (
                f' <link href="{p["enlace"]["url"]}" color="#A45232">'
                f'<b>{p["enlace"]["label"]}</b></link>'
            )
        story.append(Paragraph(descripcion_text, styles["body"]))
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
        "objetivo": "Objetivo profesional",
        "formacion": "Formación académica",
        "certificaciones": "Certificaciones",
        "proyectos": "Proyectos independientes",
        "experiencia": "Experiencia profesional",
        "habilidades": "Habilidades y conocimientos",
        "idiomas": "Idiomas",
    },
    "resumenProfesional": (
        "Licenciado en Educación y Administración, con formación orientada a Gestión del "
        "Talento y Aprendizaje Corporativo. Experiencia liderando grupos numerosos, diseñando "
        "indicadores de desempeño y facilitando procesos de capacitación y desarrollo de "
        "habilidades. Su proyecto de titulación, reconocido por la Cámara Nacional de la "
        "Industria Electrónica, de Telecomunicaciones y Tecnologías de la Información (CANIETI) "
        "Noreste, lo formó en gestión de múltiples stakeholders al colaborar con expertos en "
        "arquitectura de soluciones de IT y ciberseguridad de Microsoft y con la división de "
        "transformación digital de la UMM. Estudios en Economía (UANL, hasta 6.° semestre) "
        "sentaron bases de pensamiento analítico, modelos predictivos y pensamiento estratégico."
    ),
    "objetivo": (
        "Consolidar una trayectoria en People Analytics, Capacitación y Desarrollo, y Business "
        "Intelligence, aplicando conocimientos en gestión de talento humano, diseño "
        "instruccional y análisis de datos — con compromiso genuino hacia las personas y "
        "fluidez tecnológica — para aportar valor estratégico a un equipo de Recursos Humanos."
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
            "enlace": {
                "label": "Ver proyecto",
                "url": "https://drive.google.com/file/d/138Ht-cbE6ZnZXzL2ArrmUQKuodC7XG1t/view?usp=sharing",
            },
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
        },
        {
            "titulo": "AI-Driven Learning Analytics for Workforce — Arizona State University",
            "fecha": "Sep 2026",
            "label": (
                "Coursera · Arizona State University. Aplicación de IA y analítica de "
                "aprendizaje al desarrollo de la fuerza laboral: identificación de brechas de "
                "habilidades, estrategias personalizadas para mejorar desempeño y retención, y "
                "marcos éticos para abordar sesgo, privacidad y transparencia en sistemas de IA."
            ),
        },
    ],
    "proyectos": [
        {
            "titulo": "Casa CoLectiva — Economía del Desarrollo Educativo y del Talento",
            "tipo": "Proyecto propio · sitio en construcción",
            "fecha": "",
            "descripcion": (
                "Línea de investigación y divulgación digital independiente enfocada en factores "
                "macroeconómicos y de mercado laboral en el desarrollo estratégico de talento. "
                'Primera publicación: "Innovación social y educativa para la prosperidad '
                'compartida: el crecimiento del mercado EdTech" (innovación social, Cuádruple '
                "Hélice, EdTech)."
            ),
            "enlace": {
                "label": "Ver publicación",
                "url": "https://drive.google.com/file/d/18sfS9noC6Jzw4UtMlHFNYUhjHRpyqrZu/view?usp=sharing",
            },
        },
        {
            "titulo": "Protocolo CoLectivo — repositorio de skills con IA",
            "tipo": "Proyecto propio",
            "fecha": "",
            "descripcion": (
                "Skills y flujos de trabajo con IA (Claude) que codifican metodologías propias en "
                "economía de la educación, gestión del talento y diseño instruccional; cada "
                "skill automatiza un flujo específico combinando marcos teóricos con estándares "
                "técnicos del sector."
            ),
            "enlace": {
                "label": "Ver repositorio",
                "url": "https://github.com/alvarezgzx-lab/protocolo-colectivo",
            },
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
            "Autor (Easy Generator, Articulate, Genially)",
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
        "objetivo": "Professional objective",
        "formacion": "Education",
        "certificaciones": "Certifications",
        "proyectos": "Independent projects",
        "experiencia": "Professional experience",
        "habilidades": "Skills & knowledge",
        "idiomas": "Languages",
    },
    "resumenProfesional": (
        "Bachelor's degree in Education and Administration, with training focused on Talent "
        "Management and Corporate Learning. Experience leading large groups, designing "
        "performance indicators, and facilitating training and skills-development processes. "
        "His capstone project, recognized by the Northeast chapter of the National Chamber of "
        "the Electronics, Telecommunications, and Information Technology Industry (CANIETI), "
        "gave him experience managing multiple stakeholders while collaborating with Microsoft "
        "IT solutions architecture and cybersecurity experts and with UMM's digital "
        "transformation division. Studies in Economics (UANL, through the 6th semester) built a "
        "foundation in analytical thinking, predictive models, and strategic thinking."
    ),
    "objetivo": (
        "Build a career in People Analytics, Learning & Development, and Business Intelligence, "
        "applying expertise in human talent management, instructional design, and data analysis "
        "— with genuine commitment to people and technological fluency — to bring strategic "
        "value to a Human Resources team."
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
            "enlace": {
                "label": "View project",
                "url": "https://drive.google.com/file/d/138Ht-cbE6ZnZXzL2ArrmUQKuodC7XG1t/view?usp=sharing",
            },
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
        },
        {
            "titulo": "AI-Driven Learning Analytics for Workforce — Arizona State University",
            "fecha": "Sep 2026",
            "label": (
                "Coursera · Arizona State University. Applying AI and learning analytics to "
                "workforce development: identifying skill gaps, personalized strategies to "
                "improve performance and retention, and ethical frameworks addressing bias, "
                "privacy, and transparency in AI systems."
            ),
        },
    ],
    "proyectos": [
        {
            "titulo": "Casa CoLectiva — Economics of Educational and Talent Development",
            "tipo": "Own project · site under construction",
            "fecha": "",
            "descripcion": (
                "Independent research and digital dissemination line focused on macroeconomic "
                "and labor-market factors in strategic talent development. First publication: "
                '"Social and Educational Innovation for Shared Prosperity: The Growth of the '
                'EdTech Market" (social innovation, Quadruple Helix, EdTech).'
            ),
            "enlace": {
                "label": "View publication",
                "url": "https://drive.google.com/file/d/18sfS9noC6Jzw4UtMlHFNYUhjHRpyqrZu/view?usp=sharing",
            },
        },
        {
            "titulo": "Protocolo CoLectivo — AI skills repository",
            "tipo": "Own project",
            "fecha": "",
            "descripcion": (
                "AI (Claude) skills and workflows that encode original methodologies in the "
                "economics of education, talent management, and instructional design; each "
                "skill automates a specific workflow combining recognized theoretical "
                "frameworks with industry technical standards."
            ),
            "enlace": {
                "label": "View repository",
                "url": "https://github.com/alvarezgzx-lab/protocolo-colectivo",
            },
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
