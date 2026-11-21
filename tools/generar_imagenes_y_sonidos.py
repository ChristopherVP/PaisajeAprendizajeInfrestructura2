"""Genera sprites de motos, fondos, sectores y efectos de sonido.

Ejecutar desde la raíz del proyecto:  python tools/generar_imagenes_y_sonidos.py
Requiere: pillow, numpy y (solo para recortar motos) rembg + onnxruntime.
"""
import math
import random
import wave
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter

RAIZ = Path(__file__).resolve().parent.parent
FUENTES = RAIZ / "tools" / "fuentes"
CIAN, NARANJA = (25, 230, 255), (255, 138, 31)


def recortar_moto(origen: Path, caja: tuple, destino: Path, alto: int = 220) -> None:
    """Quita el fondo con rembg, voltea la moto para que mire a la derecha y la guarda."""
    from rembg import new_session, remove

    imagen = Image.open(origen).convert("RGB").crop(caja)
    recorte = remove(imagen, session=new_session("u2net"))
    recorte = recorte.crop(recorte.getbbox()).transpose(Image.FLIP_LEFT_RIGHT)
    ancho = round(recorte.width * alto / recorte.height)
    recorte.resize((ancho, alto), Image.LANCZOS).save(destino, optimize=True)


def brillo(capa: Image.Image, radio: int, veces: int = 1) -> Image.Image:
    """Suma un resplandor neón (blur) a una capa RGB sobre negro."""
    resultado = capa
    for _ in range(veces):
        resultado = ImageChops.add(resultado, capa.filter(ImageFilter.GaussianBlur(radio)))
    return resultado


def degradado(ancho: int, alto: int, arriba: tuple, abajo: tuple) -> Image.Image:
    t = np.linspace(0, 1, alto)[:, None, None]
    datos = (np.array(arriba) * (1 - t) + np.array(abajo) * t) * np.ones((1, ancho, 1))
    return Image.fromarray(datos.astype("uint8"), "RGB")


def rejilla_perspectiva(dibujo: ImageDraw.ImageDraw, ancho: int, alto: int, horizonte: int, color: tuple) -> None:
    for i in range(-24, 25):  # líneas que convergen en el punto de fuga
        dibujo.line([(ancho / 2 + i * 14, horizonte), (ancho / 2 + i * ancho / 10, alto)], fill=color, width=2)
    y, paso = horizonte, 4
    while y < alto:  # líneas horizontales cada vez más separadas
        dibujo.line([(0, y), (ancho, y)], fill=color, width=2)
        paso *= 1.28
        y += paso


def ciudad(ancho: int, alto: int, horizonte: int, semilla: int, color: tuple, color2: tuple) -> Image.Image:
    """Fondo de horizonte con edificios neón y suelo en rejilla."""
    azar = random.Random(semilla)
    base = degradado(ancho, alto, (2, 6, 13), (4, 22, 40))
    neon = Image.new("RGB", (ancho, alto), (0, 0, 0))
    d = ImageDraw.Draw(neon)
    x = 0
    while x < ancho:
        w, h = azar.randint(30, 90), azar.randint(60, int(horizonte * 0.8))
        tono = color if azar.random() < 0.7 else color2
        d.rectangle([x, horizonte - h, x + w, horizonte], outline=tono, width=2)
        for wy in range(horizonte - h + 10, horizonte - 8, 14):
            for wx in range(x + 8, x + w - 8, 12):
                if azar.random() < 0.35:
                    d.rectangle([wx, wy, wx + 4, wy + 6], fill=tono)
        x += w + azar.randint(2, 14)
    rejilla_perspectiva(d, ancho, alto, horizonte, color)
    d.line([(0, horizonte), (ancho, horizonte)], fill=color2, width=3)
    return ImageChops.add(base, brillo(neon, 6, 2))


def portal(ancho: int, alto: int) -> Image.Image:
    """Portal de anillos concéntricos naranja y cian."""
    neon = Image.new("RGB", (ancho, alto), (0, 0, 0))
    d = ImageDraw.Draw(neon)
    cx, cy = ancho // 2, int(alto * 0.46)
    for i in range(1, 9):
        r = i * 34
        color = NARANJA if i % 2 else CIAN
        d.ellipse([cx - r * 1.5, cy - r, cx + r * 1.5, cy + r], outline=color, width=3)
    d.ellipse([cx - 40, cy - 28, cx + 40, cy + 28], fill=(255, 220, 160))
    rejilla_perspectiva(d, ancho, alto, int(alto * 0.78), CIAN)
    base = degradado(ancho, alto, (2, 6, 13), (14, 10, 6))
    return ImageChops.add(base, brillo(neon, 8, 2))


def fondo_general(ancho: int = 1920, alto: int = 1080) -> Image.Image:
    return ciudad(ancho, alto, int(alto * 0.58), 7, (25, 140, 190), (255, 138, 31))


def escribir_wav(ruta: Path, senal: np.ndarray, tasa: int = 44100) -> None:
    datos = (np.clip(senal, -1, 1) * 32767).astype("<i2")
    with wave.open(str(ruta), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(tasa)
        w.writeframes(datos.tobytes())


def tono(frecuencia: float, duracion: float, forma: str = "seno", tasa: int = 44100) -> np.ndarray:
    t = np.arange(int(duracion * tasa)) / tasa
    onda = np.sin(2 * math.pi * frecuencia * t)
    if forma == "cuadrada":
        onda = np.sign(onda) * 0.6 + 0.4 * onda
    elif forma == "sierra":
        onda = 2 * ((frecuencia * t) % 1) - 1
    return onda * np.exp(-4.5 * t / duracion) * np.minimum(1, t * 400)


def generar_sonidos() -> None:
    sfx = RAIZ / "audio" / "sfx"
    # Acierto: arpegio ascendente brillante (Do-Mi-Sol-Do).
    notas = [523.25, 659.25, 783.99, 1046.5]
    correcto = np.concatenate([tono(f, 0.14) * 0.5 + tono(f * 2, 0.14) * 0.15 for f in notas] + [tono(1046.5, 0.35) * 0.6])
    escribir_wav(sfx / "correcto.wav", correcto * 0.8)
    # Error: dos notas graves descendentes y ásperas.
    error = np.concatenate([tono(196, 0.18, "sierra") * 0.6, tono(130.8, 0.38, "cuadrada") * 0.6])
    escribir_wav(sfx / "error.wav", error * 0.8)


def main() -> None:
    motos = RAIZ / "img" / "motos"
    recortar_moto(FUENTES / "portada1.png", (255, 50, 585, 235), motos / "moto-azul.png")
    recortar_moto(FUENTES / "mundo3.png", (70, 40, 880, 680), motos / "moto-roja.png")
    fondo_general().convert("RGB").save(RAIZ / "img" / "fondos" / "fondo-grid.jpg", quality=88)
    ciudad(960, 540, 300, 21, (25, 230, 255), (255, 138, 31)).save(RAIZ / "img" / "sectores" / "sector2.jpg", quality=88)
    portal(960, 540).save(RAIZ / "img" / "sectores" / "sector4.jpg", quality=88)
    generar_sonidos()
    print("Imágenes y sonidos generados.")


if __name__ == "__main__":
    main()
