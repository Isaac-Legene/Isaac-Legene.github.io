"""Extract images from CS6746 reports (PDF/PPTX) into portfolio images folder."""
from __future__ import annotations

import shutil
import zipfile
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    fitz = None

SRC = Path(r"C:\Projects\cs6746 - Computer Vision\Computer vision")
EXTRA_PDF = [
    Path(r"C:\Projects\cs6746 - Computer Vision\project-1-student\ilegene3_proj1.pdf"),
    Path(r"C:\Projects\cs6746 - Computer Vision\project-2-student\docs\ilegene3_proj2.pdf"),
]
OUT = Path(
    r"C:\Users\isaac\Documents\Isaac-Legene.github.io\ilegene3\public\legacy\class-projects\cs6746-cv\images\from-reports"
)
OUT.mkdir(parents=True, exist_ok=True)


def extract_pptx(pptx: Path) -> list[Path]:
    saved: list[Path] = []
    media_dir = OUT / f"{pptx.stem}_pptx"
    media_dir.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(pptx, "r") as zf:
        for name in zf.namelist():
            if not name.startswith("ppt/media/"):
                continue
            data = zf.read(name)
            if len(data) < 8_000:
                continue
            out = media_dir / Path(name).name
            out.write_bytes(data)
            saved.append(out)
    return saved


def extract_pdf(pdf: Path) -> list[Path]:
    if fitz is None or not pdf.exists():
        return []
    saved: list[Path] = []
    media_dir = OUT / f"{pdf.stem}_pdf"
    media_dir.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(pdf)
    for page_index in range(len(doc)):
        for img_index, img in enumerate(doc.get_page_images(page_index)):
            xref = img[0]
            base = doc.extract_image(xref)
            ext = base["ext"]
            if ext in ("jfif",):
                ext = "jpg"
            data = base["image"]
            if len(data) < 8_000:
                continue
            out = media_dir / f"page{page_index + 1:02d}_img{img_index + 1:02d}.{ext}"
            out.write_bytes(data)
            saved.append(out)
    doc.close()
    return saved


def main() -> None:
    all_saved: list[Path] = []
    for pptx in sorted(SRC.glob("*.pptx")):
        all_saved.extend(extract_pptx(pptx))
        print(f"PPTX {pptx.name}: extracted to {OUT / pptx.stem}_pptx")
    for pdf in sorted(SRC.glob("*.pdf")):
        all_saved.extend(extract_pdf(pdf))
        print(f"PDF {pdf.name}: extracted to {OUT / pdf.stem}_pdf")
    for pdf in EXTRA_PDF:
        if pdf.exists():
            all_saved.extend(extract_pdf(pdf))
            print(f"PDF {pdf.name}: extracted")
    print(f"Total images: {len(all_saved)}")
    for p in sorted(all_saved)[:30]:
        print(f"  {p.name} ({p.stat().st_size // 1024} KB) @ {p.parent.name}")


if __name__ == "__main__":
    main()
