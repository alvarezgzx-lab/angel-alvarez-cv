"""Regenerate the downloadable CV PDF from the 2026 content, brand-styled, phone number omitted."""
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, ListFlowable, ListItem, KeepTogether
)
from reportlab.lib.styles import ParagraphStyle

NAVY = HexColor('#17324D')
CREAM = HexColor('#F4EFE6')
RUST = HexColor('#A45232')  # rust-ink: AA-safe on cream, used consistently on this print doc too
SAGE = HexColor('#546C56')  # sage-ink
INK = HexColor('#1A1A1A')

PAGE_W, PAGE_H = letter
MARGIN = 0.5 * inch

styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=20, leading=22, textColor=CREAM),
    'headline': ParagraphStyle('headline', fontName='Helvetica', fontSize=9.5, leading=12, textColor=CREAM),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=8, leading=10, textColor=HexColor('#D7DEE6')),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=9, leading=11.5, textColor=RUST,
                               spaceBefore=6.5, spaceAfter=2.5, letterSpacing=0.6),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=8.2, leading=10.6, textColor=INK, alignment=TA_LEFT),
    'itemTitle': ParagraphStyle('itemTitle', fontName='Helvetica-Bold', fontSize=8.6, leading=10.8, textColor=INK),
    'itemSub': ParagraphStyle('itemSub', fontName='Helvetica-Oblique', fontSize=8, leading=10, textColor=HexColor('#3A3A3A')),
    'itemDate': ParagraphStyle('itemDate', fontName='Helvetica', fontSize=7.6, leading=10, textColor=SAGE, alignment=2),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=8.2, leading=10.6, textColor=INK, leftIndent=10),
    'catLabel': ParagraphStyle('catLabel', fontName='Helvetica-Bold', fontSize=7.4, leading=9.5, textColor=NAVY,
                                spaceBefore=3, spaceAfter=0.5, letterSpacing=0.5),
    'catItems': ParagraphStyle('catItems', fontName='Helvetica', fontSize=8, leading=10.4, textColor=INK, spaceAfter=2.5),
}


def header_flowable():
    name = Paragraph('Ángel Álvarez', styles['name'])
    headline = Paragraph(
        'People Analytics &middot; Capacitación y Desarrollo &middot; Reclutamiento y Desarrollo Organizacional',
        styles['headline'],
    )
    contact = Paragraph(
        'Nuevo León, México &middot; alvarezgzx@gmail.com &middot; linkedin.com/in/angelalvarezg97',
        styles['contact'],
    )
    inner = Table(
        [[name], [Spacer(1, 3)], [headline], [Spacer(1, 4)], [contact]],
        colWidths=[PAGE_W - 2 * MARGIN],
    )
    inner.setStyle(TableStyle([
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    band = Table([[inner]], colWidths=[PAGE_W])
    band.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), NAVY),
        ('LEFTPADDING', (0, 0), (-1, -1), MARGIN),
        ('RIGHTPADDING', (0, 0), (-1, -1), MARGIN),
        ('TOPPADDING', (0, 0), (-1, -1), 11),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
    ]))
    return band


def section(title):
    return Paragraph(title, styles['section'])


def formacion_entry(titulo, institucion, fecha, nota=None):
    row = Table(
        [[Paragraph(titulo, styles['itemTitle']), Paragraph(fecha, styles['itemDate'])]],
        colWidths=[PAGE_W - 2 * MARGIN - 1.6 * inch, 1.6 * inch],
    )
    row.setStyle(TableStyle([
        ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    flows = [row, Paragraph(institucion, styles['itemSub'])]
    if nota:
        flows.append(Spacer(1, 1.5))
        flows.append(Paragraph(nota, styles['body']))
    flows.append(Spacer(1, 4))
    return KeepTogether(flows)


def experiencia_entry(puesto, organizacion, fecha, bullets):
    row = Table(
        [[Paragraph(puesto, styles['itemTitle']), Paragraph(fecha, styles['itemDate'])]],
        colWidths=[PAGE_W - 2 * MARGIN - 1.6 * inch, 1.6 * inch],
    )
    row.setStyle(TableStyle([
        ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    items = [ListItem(Paragraph(b, styles['bullet']), leftIndent=10, value='•', bulletColor=RUST) for b in bullets]
    lf = ListFlowable(items, bulletType='bullet', start='•', bulletFontSize=8, bulletColor=RUST,
                       leftIndent=12, spaceAfter=1.5)
    flows = [row, Paragraph(organizacion, styles['itemSub']), Spacer(1, 1.5), lf, Spacer(1, 4)]
    return KeepTogether(flows)


def habilidades_block(categoria, items):
    return [
        Paragraph(categoria.upper(), styles['catLabel']),
        Paragraph(' &middot; '.join(items), styles['catItems']),
    ]


def build():
    doc = SimpleDocTemplate(
        'public/Angel-Alvarez-CV.pdf',
        pagesize=letter,
        leftMargin=MARGIN, rightMargin=MARGIN, topMargin=0, bottomMargin=0.28 * inch,
        title='Ángel Álvarez — CV', author='Ángel Álvarez',
    )

    story = [header_flowable(), Spacer(1, 7)]

    def body_block(text):
        story.append(Paragraph(text, styles['body']))

    story.append(section('PERFIL PROFESIONAL'))
    body_block(
        'Licenciado en Educación y Administración, con formación orientada a Gestión del Talento y Aprendizaje '
        'Corporativo. Experiencia liderando grupos numerosos, diseñando indicadores de desempeño y facilitando '
        'procesos de capacitación y desarrollo de habilidades. Su proyecto de titulación, reconocido por la Cámara '
        'Nacional de la Industria Electrónica, de Telecomunicaciones y Tecnologías de la Información (CANIETI) '
        'Noreste, lo formó en gestión de múltiples stakeholders al colaborar con expertos en arquitectura de '
        'soluciones de IT y ciberseguridad de Microsoft y con la división de transformación digital de la UMM. '
        'Estudios en Economía (UANL, hasta 6.° semestre) sentaron bases de pensamiento analítico, modelos '
        'predictivos y pensamiento estratégico.'
    )

    story.append(section('OBJETIVO PROFESIONAL'))
    body_block(
        'Consolidar una trayectoria en People Analytics, Capacitación y Desarrollo, y Business Intelligence, '
        'aplicando conocimientos en gestión de talento humano, diseño instruccional y análisis de datos — con '
        'compromiso genuino hacia las personas y fluidez tecnológica — para aportar valor estratégico a un equipo '
        'de Recursos Humanos.'
    )

    story.append(section('FORMACIÓN ACADÉMICA'))
    story.append(formacion_entry(
        'Licenciatura en Educación y Administración de Centros Educativos',
        'Universidad Metropolitana de Monterrey (UMM)',
        'AGO 2025',
        'Proyecto de titulación: D.A.T.A. — Development of AI Teaching &amp; Automation; ecosistema multiagente de '
        'IA conversacional con piloto institucional de 86–98% de valoración docente, en colaboración con Microsoft '
        'y reconocido por CANIETI Noreste.',
    ))
    story.append(formacion_entry(
        'Licenciatura en Economía',
        'Universidad Autónoma de Nuevo León (UANL)',
        'HASTA 6.° SEM.',
        'Publicación académica en revisión (E-Socialis, UMM): análisis de 26 fuentes sobre el mercado EdTech; '
        'propone un marco de cuatro pilares.',
    ))

    story.append(section('HABILIDADES Y CONOCIMIENTOS'))
    for cat, items in [
        ('People Analytics, Talento y Desarrollo Organizacional', [
            'Planeación de fuerza laboral', 'people analytics', 'reclutamiento y selección', 'onboarding',
            'desempeño y compensación', 'planeación de sucesión', 'gestión del cambio y cultura organizacional',
        ]),
        ('Capacitación y Desarrollo', [
            'Diseño e impartición de capacitación', 'detección de necesidades (DNC)', 'diseño instruccional',
            'facilitación', 'liderazgo de grupos', 'prompt engineering',
        ]),
        ('Análisis de Datos y Business Intelligence', [
            'Power BI (modelado de datos, dashboards)', 'análisis estadístico aplicado a negocio',
            'Excel intermedio-avanzado', 'nociones de SQL y Python',
        ]),
        ('Herramientas y Transferibles', [
            'Word', 'PowerPoint', 'autor (Easy Generator, Articulate, Genially)', 'HTML/React básico',
            'Claude avanzado', 'comunicación efectiva y adaptabilidad',
        ]),
    ]:
        story.extend(habilidades_block(cat, items))

    story.append(section('EXPERIENCIA PROFESIONAL'))
    story.append(experiencia_entry(
        'Docencia — Nivel Secundaria', 'Colegio Regiomontano Contry La Salle (2025–2026) · Colegio Mexicano (2023–2025)',
        '2023 – 2026',
        [
            'Automatizó procesos de evaluación y diseñó indicadores de desempeño para dar seguimiento objetivo al '
            'progreso individual y grupal.',
            'Gestionó simultáneamente hasta 11 grupos de más de 30 personas, sosteniendo desempeño colectivo bajo '
            'múltiples prioridades.',
            'Brindó acompañamiento, tutoría y coaching individual y grupal — fortaleciendo desarrollo de '
            'habilidades, manejo de conflictos y liderazgo de iniciativas institucionales (Academia de Ética, '
            'procesos electorales estudiantiles).',
        ],
    ))
    story.append(experiencia_entry(
        'Practicante en diseño instruccional', 'Talisis', '2022 – 2023',
        [
            'Colaboró con equipos de Data Science, Ingeniería de Software e Innovación de Producto en el '
            'desarrollo de herramientas de generación de contenido para diseño instruccional (licenciatura y '
            'maestría), apoyando detección de necesidades de capacitación y diseño de soluciones de aprendizaje '
            'escalables.',
        ],
    ))
    story.append(experiencia_entry(
        'Conductor independiente (transporte por aplicación)', 'Trabajo autónomo', '2019 – 2022',
        [
            'Autogestionó negocio independiente (ingresos, financiamiento, atención a cliente y manejo del '
            'tiempo), desarrollando autogestión y orientación a resultados bajo alta autonomía.',
        ],
    ))
    story.append(experiencia_entry(
        'Auxiliar administrativo', 'Santander Universidades', '2018 – 2019',
        [
            'Gestionó posicionamiento de productos y eventos de credencialización estudiantil para instituciones '
            'del sector universidades (Tec, UDEM, Becas NL, CONALEP), coordinando relaciones multi-institucionales '
            'y gestión de cuentas.',
        ],
    ))

    story.append(section('IDIOMAS'))
    body_block('Español: Nativo &middot; Inglés: Intermedio-Avanzado')

    doc.build(story)


if __name__ == '__main__':
    build()
    print('Wrote public/Angel-Alvarez-CV.pdf')
