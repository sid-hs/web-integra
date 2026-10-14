#!/usr/bin/env python
# Exporta propuestas/estrategia-respaldo-cloud.md a PDF con estilos de marca Integra-IO.
# Uso: ~/.venvs/pdfgen/bin/python scripts/exportar-estrategia-pdf.py
import base64
import markdown
from pathlib import Path
from weasyprint import HTML

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'propuestas' / 'estrategia-respaldo-cloud.md'
LOGO = ROOT / 'scripts' / 'activo-logo-integra.png'
OUT = ROOT / 'public' / 'backup-estrategia.pdf'

body = markdown.markdown(SRC.read_text(encoding='utf-8'), extensions=['tables', 'fenced_code', 'sane_lists'])
logo_uri = 'data:image/png;base64,' + base64.b64encode(LOGO.read_bytes()).decode()
brand = f'<div class="brand-head"><img class="brand-logo" src="{logo_uri}" alt="Integra-IO · Sistemas de Integración"></div>'

css = """
@page {
  size: A4;
  margin: 2cm 1.8cm 2.2cm;
  @bottom-left { content: "contacto@integra-io.com · 33 4944 4224 · Puebla, México"; font-size: 7.5pt; color: #8a9299; }
  @bottom-right { content: "página " counter(page) " de " counter(pages); font-size: 7.5pt; color: #8a9299; }
}
* { box-sizing: border-box; }
body { font-family: "Segoe UI", "DejaVu Sans", sans-serif; font-size: 10pt; line-height: 1.55; color: #23292e; }
.brand-head { border-bottom: 3px solid #F7941D; padding-bottom: 8pt; margin-bottom: 14pt; }
.brand-logo { height: 46pt; width: auto; }
h1 { font-size: 21pt; color: #16191c; margin: 0 0 4pt; letter-spacing: -0.01em; }
h2 { font-size: 13.5pt; color: #D97A06; border-bottom: 2px solid #F7941D; padding-bottom: 3pt; margin: 20pt 0 8pt; page-break-after: avoid; }
h3 { font-size: 11.5pt; color: #16191c; margin: 14pt 0 6pt; page-break-after: avoid; }
p { margin: 6pt 0; }
strong { color: #16191c; }
table { width: 100%; border-collapse: collapse; table-layout: fixed; margin: 10pt 0; font-size: 7pt; line-height: 1.4; }
th { background: #F7941D; color: #fff; text-align: left; padding: 4pt 5pt; overflow-wrap: normal; }
td { border: 1px solid #d9dee2; padding: 3.5pt 5pt; vertical-align: top; overflow-wrap: normal; }
tr:nth-child(even) td { background: #f6f7f8; }
tr { page-break-inside: avoid; }
pre { background: #10161b; color: #d7e2ea; font-family: "DejaVu Sans Mono", monospace; font-size: 7pt; line-height: 1.35; padding: 8pt; border-radius: 4pt; white-space: pre-wrap; overflow-wrap: break-word; page-break-inside: avoid; }
code { font-family: "DejaVu Sans Mono", monospace; font-size: 8.5pt; background: #eef1f3; padding: 1pt 3pt; border-radius: 2pt; }
pre code { background: none; padding: 0; font-size: 7pt; }
ul, ol { margin: 6pt 0; padding-left: 16pt; }
li { margin: 3pt 0; }
hr { border: none; border-top: 1px solid #d9dee2; margin: 14pt 0; }
blockquote { margin: 8pt 0; padding: 6pt 10pt; border-left: 3px solid #F7941D; background: #fdf3e6; }
"""

html = f"<!DOCTYPE html><html lang='es-MX'><head><meta charset='utf-8'><style>{css}</style></head><body>{brand}{body}</body></html>"
HTML(string=html, base_url=str(SRC.parent)).write_pdf(OUT)
print(f"PDF generado: {OUT}")
