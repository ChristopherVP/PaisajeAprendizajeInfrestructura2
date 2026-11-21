# La Red del Grid · Paisaje de aprendizaje

Juego educativo (HTML + CSS + JavaScript) sobre infraestructura de TI: QoS/QoE, monitoreo, Wireshark y nube.

## Cómo ejecutarlo
Abre `index.html` en el navegador (o usa Live Server en VS Code). Pulsa **START** (el audio solo puede arrancar tras un clic).

## Estructura
```
index.html
css/estilos.css
js/datos.js            contenido académico y preguntas (editable)
js/ilustraciones.js    GENERADO por tools/generar_ilustraciones.py
js/juego.js            lógica del juego
img/fondos/            portada.png, fondo-grid.jpg
img/sectores/          una imagen por sector
img/motos/             moto-azul.png (jugador), moto-roja.png (rival)
img/misiones/          12 ilustraciones SVG animadas (mision-sector-mision.svg)
audio/musica/          audio.mp3 (menús), audio2.mp3 (carrera)
audio/sfx/             correcto.wav, error.wav
tools/                 scripts para regenerar imágenes, sonidos e ilustraciones
```

## Regenerar recursos (opcional)
```
pip install pillow numpy rembg onnxruntime
python tools/generar_imagenes_y_sonidos.py
python tools/generar_ilustraciones.py
```

## Prueba manual
1. Portada: solo se ve START. 2. Sectores → Misión 1 → toca los elementos de la ilustración.
3. Carrera: un error suena distinto, resta XP y la pregunta se queda; un acierto suena y pasa solo a la siguiente.
4. Botón 🔊: silencia o reactiva la música.
