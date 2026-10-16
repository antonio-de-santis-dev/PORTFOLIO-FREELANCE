"""Bozza del CV pubblico REDATTO, da sottoporre ad approvazione.

Uso: python3 -I scripts/cv-draft.py drafts/cv-pubblico-BOZZA.pdf

Esclusi deliberatamente: documento d'identità, indirizzo, luogo e data di nascita, telefono,
WhatsApp, email personale, nomi dei datori di lavoro non informatici.
Il file resta in drafts/ e NON va copiato in public/ finché non è approvato.
"""

import sys

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

INK = HexColor("#16180f")
MUTED = HexColor("#555a4c")
ACCENT = HexColor("#4d6b12")

h1 = ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=22, leading=26, textColor=INK)
role = ParagraphStyle("role", fontName="Helvetica", fontSize=12, leading=16, textColor=MUTED)
h2 = ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=11.5, leading=15, textColor=ACCENT, spaceBefore=12, spaceAfter=4)
item = ParagraphStyle("item", fontName="Helvetica-Bold", fontSize=10, leading=13.5, textColor=INK, spaceBefore=4)
body = ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, leading=13.5, textColor=MUTED)

story = [
    Paragraph("Antonio De Santis", h1),
    Paragraph("Full Stack Web Developer (Junior) · Italia, disponibile da remoto", role),
    Paragraph("Contatti: [DA APPROVARE — email/LinkedIn da inserire solo dopo consenso]", body),
    Paragraph("Profilo", h2),
    Paragraph(
        "Sviluppatore full stack junior. Realizzo siti web, menu digitali e web app per attività locali e piccole "
        "imprese, con React e TypeScript sul front-end e Java / Spring Boot sul back-end. Background di diversi anni "
        "a contatto con i clienti nella ristorazione e nella vendita.",
        body,
    ),
    Paragraph("Esperienza nello sviluppo", h2),
    Paragraph("Developer — tirocinio di inserimento lavorativo · Zerodd · dal 2026", item),
    Paragraph("Tirocinio come sviluppatore all'interno di un team.", body),
    Paragraph("Progetti personali (2026)", item),
    Paragraph(
        "GymPlanner (web app per palestre: Java 21, Spring Boot, PostgreSQL, React, TypeScript) · BollettaLAB "
        "(confronto bollette luce e gas a microservizi: Spring Boot, MySQL, React, Docker) · Agriturismo La Morò "
        "(sito one-page HTML/CSS/JS) · MenuDigitale (menù bilingue per ristorante) · BoardRoom (prenotazione sale, "
        "progetto collaborativo in team di due: Spring Boot, JHipster, Angular).",
        body,
    ),
    Paragraph("Formazione", h2),
    Paragraph("ITS Academy — Tecnico superiore, sviluppo software · 2024–2026", item),
    Paragraph("Percorso di 1.800 ore. Voto finale 101/110. [DA VERIFICARE con l'attestato]", body),
    Paragraph("Diploma di istituto tecnico economico, articolazione Sistemi Informativi Aziendali · 2021", item),
    Paragraph("Altre esperienze", h2),
    Paragraph(
        "2021–2025: diverse stagioni come cameriere in ristoranti e stabilimenti; rappresentante tecnico-commerciale "
        "nel settore telecomunicazioni (2023–2024).",
        body,
    ),
    Paragraph("Competenze", h2),
    Paragraph(
        "React · TypeScript · JavaScript · HTML · CSS · Java · Spring Boot · API REST · MySQL · PostgreSQL · "
        "MongoDB (base) · Docker · Git · Playwright · UI/UX e accessibilità · Angular (in team)",
        body,
    ),
    Paragraph("Lingue", h2),
    Paragraph("Italiano madrelingua · Inglese B2", body),
    Spacer(1, 10 * mm),
    Paragraph("BOZZA REDATTA — non pubblicare prima dell'approvazione di Antonio De Santis.", body),
]


def main(out: str) -> None:
    doc = SimpleDocTemplate(
        out,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
        title="Antonio De Santis — CV (bozza redatta)",
        author="",
        subject="",
        creator="",
        producer="",
        keywords="",
    )
    doc.build(story)


if __name__ == "__main__":
    main(sys.argv[1])
