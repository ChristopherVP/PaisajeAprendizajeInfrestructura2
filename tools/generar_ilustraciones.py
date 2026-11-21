"""Genera las 12 ilustraciones animadas de las misiones.

Salida:
  - img/misiones/mision-S-K.svg  (S = sector 1-4, K = misión 1-3)
  - js/ilustraciones.js          (mismas escenas en línea, con puntos interactivos)

Ejecutar desde la raíz del proyecto:  python tools/generar_ilustraciones.py
"""
import json
import math
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
CIAN, NARANJA, VERDE, ROJO = "#19e6ff", "#ff8a1f", "#3dff9a", "#ff3b5c"
PISTA = "Toca los elementos de la imagen para explorar."

ESTILO = """<style>
.n{fill:#0a2233;stroke:#19e6ff;stroke-width:2}
.t{fill:#d9f6ff;font:700 10px Orbitron,system-ui,sans-serif;text-anchor:middle;pointer-events:none}
.s{fill:#7fa8b8;font:9px system-ui,sans-serif;text-anchor:middle;pointer-events:none}
.l{fill:none;stroke:#19e6ff;stroke-opacity:.55;stroke-width:2;stroke-dasharray:6 4;animation:sv-d 1s linear infinite}
@keyframes sv-d{to{stroke-dashoffset:-20}}
.bl{animation:sv-b 1s steps(2) infinite}
@keyframes sv-b{50%{opacity:.2}}
.sh{animation:sv-s .5s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center top}
@keyframes sv-s{from{transform:rotate(-14deg)}to{transform:rotate(14deg)}}
[data-h]{cursor:pointer;outline:none}
[data-h]:hover .n,[data-h]:focus .n,[data-h].on .n{stroke:#ff8a1f;fill:#3a2208}
[data-h].on{filter:drop-shadow(0 0 6px #ff8a1f)}
</style>"""


def caja(x, y, w, h, titulo, sub="", clase="n"):
    r = f'<rect class="{clase}" x="{x}" y="{y}" width="{w}" height="{h}" rx="8"/>'
    if sub:
        return r + f'<text class="t" x="{x + w / 2}" y="{y + h / 2 - 1}">{titulo}</text><text class="s" x="{x + w / 2}" y="{y + h / 2 + 11}">{sub}</text>'
    return r + f'<text class="t" x="{x + w / 2}" y="{y + h / 2 + 4}">{titulo}</text>'


def texto(x, y, t, clase="t"):
    return f'<text class="{clase}" x="{x}" y="{y}">{t}</text>'


def enlace(d, color=CIAN):
    return f'<path class="l" d="{d}" style="stroke:{color}"/>'


def paquete(d, color, dur, a, b, r=5):
    """Esfera que viaja por el camino d entre las fracciones a y b del ciclo (0 a 1)."""
    if b >= 1:
        tiempos, valores = [0, a, min(a + 0.001, 1), 1], [0, 0, 1, 1]
    else:
        tiempos, valores = [0, a, a + 0.001, b, b + 0.001, 1], [0, 0, 1, 1, 0, 0]
    return (
        f'<circle r="{r}" fill="{color}" opacity="0">'
        f'<animateMotion dur="{dur}s" repeatCount="indefinite" path="{d}" keyPoints="0;0;1;1" keyTimes="0;{a};{min(b, 1)};1" calcMode="linear"/>'
        f'<animate attributeName="opacity" dur="{dur}s" repeatCount="indefinite" values="{";".join(map(str, valores))}" '
        f'keyTimes="{";".join(f"{t:g}" for t in tiempos)}"/></circle>'
    )


def punto(i, titulo, interior):
    return f'<g data-h="{i}" tabindex="0" role="button" aria-label="{titulo}">{interior}</g>'


def estrella(cx, cy, r):
    pts = []
    for k in range(10):
        radio = r if k % 2 == 0 else r * 0.45
        ang = -math.pi / 2 + k * math.pi / 5
        pts.append(f"{cx + radio * math.cos(ang):.1f},{cy + radio * math.sin(ang):.1f}")
    return " ".join(pts)


# ---------- Sector 1: QoS y QoE ----------
def m11():
    puntos = [
        ("Servidor", "El servicio sale del servidor y viaja por la red hasta el usuario."),
        ("QoS", "QoS: medida técnica del rendimiento de la red y posibilidad de gestionarla para cumplir lo que exigen las aplicaciones."),
        ("QoE", "QoE: qué tan bien el servicio satisface las expectativas y necesidades que percibe el usuario."),
        ("Usuario", "El usuario percibe el servicio: de su experiencia depende la QoE."),
    ]
    camino = "M80 135H200H320"
    cuerpo = (
        enlace(camino)
        + '<circle class="n" cx="200" cy="135" r="22"/>' + texto(200, 139, "Red")
        + punto(0, puntos[0][0], caja(20, 110, 60, 50, "Servidor"))
        + punto(3, puntos[3][0], caja(320, 110, 60, 50, "Usuario"))
        + paquete(camino, NARANJA, 3, 0.0, 0.5) + paquete(camino, CIAN, 3, 0.3, 0.8) + paquete(camino, NARANJA, 3, 0.5, 1.0)
        + punto(1, "QoS",
            '<circle class="n" cx="140" cy="45" r="24"/><path d="M122 52A20 20 0 0 1 158 52" fill="none" stroke="#3dff9a" stroke-width="4"/>'
            '<line x1="140" y1="52" x2="140" y2="32" stroke="#ff8a1f" stroke-width="3" stroke-linecap="round">'
            '<animateTransform attributeName="transform" type="rotate" values="-50 140 52;50 140 52;-50 140 52" dur="3s" repeatCount="indefinite"/></line>'
            + texto(140, 88, "QoS"))
        + punto(2, "QoE",
            '<circle class="n" cx="350" cy="45" r="24"/><circle cx="342" cy="40" r="2.5" fill="#d9f6ff"/><circle cx="358" cy="40" r="2.5" fill="#d9f6ff"/>'
            '<path d="M340 52Q350 62 360 52" fill="none" stroke="#3dff9a" stroke-width="3" stroke-linecap="round">'
            '<animate attributeName="d" values="M340 52Q350 62 360 52;M340 56Q350 56 360 56;M340 52Q350 62 360 52" dur="4s" repeatCount="indefinite"/></path>'
            + texto(350, 88, "QoE"))
    )
    return cuerpo, puntos


def m12():
    puntos = [
        ("Retardo", "Retardo: tiempo que tarda un paquete en llegar. Si es alto, el usuario lo nota."),
        ("Jitter", "Jitter: diferencia entre los retardos de los paquetes; llegan con ritmo irregular."),
        ("Pérdida de paquetes", "Pérdida de paquetes: algunos paquetes nunca llegan y el servicio se degrada."),
    ]

    def fila(i, y, nombre, extra):
        return punto(i, puntos[i][0], f'<rect class="n" x="10" y="{y - 24}" width="380" height="48" rx="8" style="fill-opacity:.5"/>' + texto(48, y + 4, nombre) + extra)

    ya, yb, yc = 40, 100, 160
    ca, cb, cc = f"M90 {ya}H370", f"M90 {yb}H370", f"M90 {yc}H370"
    retardo = enlace(ca) + paquete(ca, NARANJA, 6, 0.0, 0.95)
    jitter = enlace(cb) + paquete(cb, CIAN, 4, 0.0, 0.25) + paquete(cb, CIAN, 4, 0.12, 0.37) + paquete(cb, CIAN, 4, 0.55, 0.8)
    perdida = (
        enlace(cc) + paquete(f"M90 {yc}H230", ROJO, 4, 0.0, 0.4) + texto(240, yc + 5, "✖", "t bl")
        + paquete(cc, CIAN, 4, 0.5, 0.95)
    )
    return fila(0, ya, "Retardo", retardo) + fila(1, yb, "Jitter", jitter) + fila(2, yc, "Pérdida", perdida), puntos


def m13():
    nombres = ["Mala", "Pobre", "Aceptable", "Buena", "Excelente"]
    puntos = [(f"MOS {i + 1}", f"MOS {i + 1}: calificación en la escala de 1 a 5; el MOS es el promedio de las opiniones de los usuarios ({nombres[i].lower()}).") for i in range(5)]
    puntos += [
        ("PESQ", "PESQ: método objetivo intrusivo; envía una señal conocida y estudia cuánto se degrada."),
        ("P.563", "P.563: método objetivo no intrusivo; estima la calidad sin señal de referencia."),
    ]
    estrellas = "".join(
        punto(i, puntos[i][0],
              f'<polygon points="{estrella(110 + i * 45, 58, 18)}" fill="#ff8a1f" stroke="#ff8a1f" stroke-width="2">'
              f'<animate attributeName="fill-opacity" values=".15;1;.15" dur="2.5s" begin="{i * 0.35}s" repeatCount="indefinite"/></polygon>'
              + texto(110 + i * 45, 92, str(i + 1), "s"))
        for i in range(5)
    )
    onda = "M178 150Q190 125 202 150T226 150"
    cuerpo = (
        texto(200, 20, "MOS: escala de 1 a 5") + estrellas
        + punto(5, "PESQ", caja(25, 120, 130, 56, "PESQ", "señal conocida"))
        + punto(6, "P.563", caja(245, 120, 130, 56, "P.563", "sin referencia"))
        + f'<path d="{onda}" fill="none" stroke="#19e6ff" stroke-width="3" stroke-dasharray="6 4"><animate attributeName="stroke-dashoffset" to="-20" dur="1s" repeatCount="indefinite"/></path>'
    )
    return cuerpo, puntos


# ---------- Sector 2: monitoreo ----------
def m21():
    puntos = [
        ("Sistemas vigilados", "Los sistemas funcionan mientras el monitor vigila su disponibilidad y el uso de recursos."),
        ("Falla detectada", "Un sistema de monitorización detecta fallas y envía alertas antes de que se produzca una crisis."),
        ("Monitor", "El monitor mantiene vigilancia constante; sus datos históricos muestran tendencias para planear la renovación."),
    ]
    xs, hs = [20, 60, 100, 140, 180, 220], [70, 100, 60, 90, 50, 80]

    def edif(i, color=None):
        x, h = xs[i], hs[i]
        estilo = f' style="stroke:{color}"' if color else ""
        vent = "".join(f'<rect x="{x + 7 + c * 13}" y="{170 - h + 8 + r * 14}" width="5" height="7" fill="{color or CIAN}" opacity=".7"/>' for c in range(2) for r in range(max(1, (h - 16) // 14)))
        return f'<rect class="n" x="{x}" y="{170 - h}" width="34" height="{h}"{estilo}/>' + vent

    bien = "".join(edif(i) for i in (0, 1, 2, 4, 5))
    falla = edif(3, ROJO) + f'<text x="157" y="{170 - hs[3] - 6}" fill="{ROJO}" font-size="16" class="bl">⚠</text>'
    radar = (
        '<circle class="n" cx="335" cy="115" r="46"/><circle cx="335" cy="115" r="28" fill="none" stroke="#19e6ff" stroke-opacity=".4"/>'
        '<line x1="335" y1="115" x2="335" y2="69" stroke="#3dff9a" stroke-width="3" stroke-linecap="round">'
        '<animateTransform attributeName="transform" type="rotate" from="0 335 115" to="360 335 115" dur="3s" repeatCount="indefinite"/></line>'
        + texto(335, 185, "Monitor")
    )
    barrido = '<rect y="0" width="8" height="170" fill="#19e6ff" opacity=".15"><animate attributeName="x" from="0" to="290" dur="4s" repeatCount="indefinite"/></rect>'
    return (
        '<line x1="0" y1="170" x2="400" y2="170" stroke="#19e6ff" stroke-opacity=".5"/>' + barrido
        + punto(0, puntos[0][0], bien) + punto(1, puntos[1][0], falla) + punto(2, puntos[2][0], radar)
    ), puntos


def m22():
    puntos = [
        ("Activo crítico", "Los activos críticos se priorizan y se monitorizan primero: de ellos depende el servicio."),
        ("Activo crítico", "Conviene ordenar los activos por criticidad: no se puede vigilar todo con la misma intensidad."),
        ("Activo medio", "Los activos de importancia media se vigilan después de los críticos."),
        ("Activo de baja prioridad", "Los activos de baja prioridad no deben llenar el sistema de alertas innecesarias."),
        ("Exceso de alertas", "Demasiadas alertas terminan ignoradas y tratadas como falsos positivos."),
    ]
    etiquetas = [("Crítico", NARANJA), ("Crítico", NARANJA), ("Medio", CIAN), ("Bajo", "#7fa8b8")]
    racks = ""
    for i, (nombre, color) in enumerate(etiquetas):
        x = 20 + i * 92
        leds = "".join(f'<circle cx="{x + 14}" cy="{80 + r * 20}" r="3" fill="{VERDE if (r + i) % 3 else color}"><animate attributeName="opacity" values="1;.2;1" dur="{1 + r * 0.4}s" repeatCount="indefinite"/></circle><rect x="{x + 24}" y="{76 + r * 20}" width="40" height="8" rx="2" fill="#19e6ff" opacity=".25"/>' for r in range(4))
        racks += punto(i, puntos[i][0], f'<rect class="n" x="{x}" y="62" width="72" height="96" rx="6" style="stroke:{color};stroke-width:{3 if i < 2 else 2}"/>' + leds + texto(x + 36, 176, nombre))
    campana = punto(4, puntos[4][0],
        f'<g class="sh"><path d="M200 10C188 10 186 28 182 34H218C214 28 212 10 200 10Z" fill="{NARANJA}"/><circle cx="200" cy="38" r="3" fill="{NARANJA}"/></g>'
        + '<circle cx="222" cy="14" r="8" fill="#ff3b5c"/>' + texto(222, 18, "!", "t")
        + '<rect class="n" x="150" y="0" width="100" height="46" rx="8" style="fill-opacity:0;stroke-opacity:0"/>')
    return racks + campana, puntos


def m23():
    puntos = [
        ("Agentes", "Un agente capta información de las entidades monitoreadas y la reporta a intervalos regulares."),
        ("Nagios Core", "Nagios: sistema libre y modular que trabaja con plugins y revisiones programadas, configurado con archivos de texto."),
        ("Plugins", "Un plugin es un programa que realiza una revisión específica en equipos remotos."),
        ("Serie de tiempo", "Las métricas recolectadas se almacenan como series de tiempo para ver tendencias."),
    ]
    xs, centro = [70, 185, 300], 185
    enlaces, agentes, chips = "", "", ""
    for i, x in enumerate(xs):
        c = f"M{x} 132L{centro} 60"
        enlaces += enlace(c) + paquete(c, NARANJA if i != 1 else CIAN, 3, i * 0.15, i * 0.15 + 0.5)
        agentes += f'<circle class="n" cx="{x}" cy="150" r="20"/>' + texto(x, 154, "agente", "s")
        chips += f'<rect class="n" x="{(x + centro) / 2 - 22}" y="87" width="44" height="16" rx="5"/>' + texto((x + centro) / 2, 99, "plugin", "s")
    grafica = (
        '<rect class="n" x="290" y="8" width="100" height="52" rx="8"/>'
        + '<path d="M298 52L315 36L330 44L350 22L368 32L382 18" fill="none" stroke="#3dff9a" stroke-width="3" stroke-dasharray="130" stroke-dashoffset="130">'
        '<animate attributeName="stroke-dashoffset" values="130;0;0" keyTimes="0;.7;1" dur="3s" repeatCount="indefinite"/></path>'
    )
    return (
        enlaces + punto(0, puntos[0][0], agentes) + punto(2, puntos[2][0], chips)
        + punto(1, puntos[1][0], caja(130, 14, 110, 44, "Nagios", "Core"))
        + punto(3, puntos[3][0], grafica)
    ), puntos


# ---------- Sector 3: Wireshark ----------
def m31():
    puntos = [
        ("Tarjeta de red", "El sniffer captura los datos que pasan por la tarjeta de red."),
        ("Modo promiscuo", "En modo promiscuo la tarjeta acepta todos los paquetes, aunque no vayan dirigidos a ella."),
        ("Paquete propio", "Paquete dirigido a este equipo: cualquier tarjeta lo recibe."),
        ("Paquete ajeno", "Paquete para otro equipo: solo se ve si la tarjeta está en modo promiscuo."),
    ]
    cable = "M10 100H390"
    flujo = "".join(paquete(cable, NARANJA if i % 2 else CIAN, 6, i / 8, i / 8 + 0.35, 6) for i in range(5))
    interruptor = punto(1, puntos[1][0],
        '<rect class="n" x="150" y="148" width="60" height="28" rx="14"/>'
        '<circle cy="162" r="10" fill="#3dff9a"><animate attributeName="cx" values="165;195;195;165;165" keyTimes="0;.2;.5;.7;1" dur="5s" repeatCount="indefinite"/></circle>'
        + texto(280, 166, "Modo promiscuo"))
    leyenda = (
        punto(2, puntos[2][0], f'<rect x="20" y="16" width="14" height="14" rx="3" fill="{NARANJA}"/>' + texto(75, 28, "propio", "s") + '<rect class="n" x="14" y="10" width="86" height="26" rx="6" style="fill-opacity:0;stroke-opacity:0"/>')
        + punto(3, puntos[3][0], f'<rect x="120" y="16" width="14" height="14" rx="3" fill="{CIAN}"/>' + texto(171, 28, "ajeno", "s") + '<rect class="n" x="114" y="10" width="86" height="26" rx="6" style="fill-opacity:0;stroke-opacity:0"/>')
    )
    return enlace(cable) + flujo + punto(0, puntos[0][0], caja(150, 68, 100, 64, "Tarjeta", "de red")) + interruptor + leyenda, puntos


def m32():
    puntos = [
        ("Hardware", "Un sniffer se compone de hardware que accede al medio de red."),
        ("Controladores de captura", "Los controladores capturan el tráfico del cable, lo filtran y lo guardan."),
        ("Buffer", "El buffer almacena los datos capturados de la red."),
        ("Decodificación", "La decodificación muestra el contenido con texto descriptivo."),
        ("Filtros", "Los filtros por protocolo, campo o valor ocultan lo que no interesa y dejan los paquetes de interés."),
    ]
    nombres = [("Hardware", ""), ("Captura", "drivers"), ("Buffer", ""), ("Decodif.", ""), ("Filtros", "vista")]
    cajas = "".join(punto(i, puntos[i][0], caja(8 + i * 78, 75, 66, 50, n, s)) for i, (n, s) in enumerate(nombres))
    uniones = "".join(enlace(f"M{74 + i * 78} 100H{86 + i * 78}") for i in range(4))
    flujo = paquete("M8 100H392", NARANJA, 5, 0.0, 1.0, 5)
    return cajas + uniones + flujo + texto(200, 160, "Tuberías de un sniffer", "s"), puntos


def m33():
    puntos = [
        ("SYN", "Paso 1: el cliente envía SYN para iniciar la conexión."),
        ("SYN+ACK", "Paso 2: el servidor acepta y responde con SYN+ACK."),
        ("ACK", "Paso 3: el cliente confirma con ACK y la conexión queda establecida."),
    ]
    p = [("M70 62L330 82", 0.0, 0.22, NARANJA, 62, "SYN"), ("M330 98L70 118", 0.3, 0.52, CIAN, 98, "SYN+ACK"), ("M70 134L330 154", 0.6, 0.82, VERDE, 134, "ACK")]
    flechas = ""
    for i, (d, a, b, color, y, nombre) in enumerate(p):
        flechas += punto(i, nombre,
            f'<path d="{d}" stroke="{color}" stroke-width="2" stroke-dasharray="5 4" fill="none"/>' + paquete(d, color, 8, a, b, 6)
            + f'<rect class="n" x="165" y="{y + 2}" width="70" height="18" rx="5"/>' + texto(200, y + 15, nombre, "s"))
    return (
        '<line x1="60" y1="35" x2="60" y2="185" stroke="#19e6ff" stroke-opacity=".5"/><line x1="340" y1="35" x2="340" y2="185" stroke="#19e6ff" stroke-opacity=".5"/>'
        + caja(20, 6, 80, 26, "Cliente") + caja(300, 6, 80, 26, "Servidor") + flechas
        + '<g class="bl">' + texto(200, 182, "✔ Conexión establecida", "s") + "</g>"
    ), puntos


# ---------- Sector 4: infraestructura y nube ----------
def m41():
    puntos = [
        ("Servidores", "Los servidores son equipos de la infraestructura del centro de datos."),
        ("Sistema eléctrico", "El sistema eléctrico alimenta los equipos del centro de datos."),
        ("Aire acondicionado", "El aire acondicionado mantiene los equipos en una temperatura segura."),
        ("Seguridad", "La seguridad física y lógica protege el centro de datos."),
        ("Telecomunicaciones", "Los equipos de telecomunicaciones conectan el centro de datos con otras ubicaciones."),
    ]
    cx = [65, 140, 215, 290, 355]
    servidores = "".join(f'<rect class="n" x="40" y="{50 + r * 24}" width="50" height="18" rx="3"/><circle cx="50" cy="{59 + r * 24}" r="3" fill="{VERDE}"><animate attributeName="opacity" values="1;.2;1" dur="{0.8 + r * 0.3}s" repeatCount="indefinite"/></circle>' for r in range(4))
    rayo = f'<polygon class="n" points="140,50 126,98 138,98 132,140 156,88 143,88" style="fill:#3a2208;stroke:{NARANJA}"><animate attributeName="opacity" values="1;.4;1" dur="1.2s" repeatCount="indefinite"/></polygon>'
    copo = '<g><animateTransform attributeName="transform" type="rotate" from="0 215 95" to="360 215 95" dur="6s" repeatCount="indefinite"/>' + "".join(f'<line x1="215" y1="65" x2="215" y2="125" stroke="#19e6ff" stroke-width="3" transform="rotate({a} 215 95)"/>' for a in (0, 60, 120)) + '</g><circle class="n" cx="215" cy="95" r="8"/>'
    escudo = f'<path class="n" d="M290 60L316 70V98C316 114 302 124 290 130C278 124 264 114 264 98V70Z"/><path d="M279 96L288 105L303 86" fill="none" stroke="{VERDE}" stroke-width="4"/>'
    antena = '<line x1="355" y1="130" x2="355" y2="80" stroke="#19e6ff" stroke-width="4"/>' + "".join(f'<path class="n" d="M{355 - r} {80 - r // 2}Q355 {70 - r} {355 + r} {80 - r // 2}" style="fill:none"><animate attributeName="opacity" values="0;1;0" dur="1.6s" begin="{i * 0.3}s" repeatCount="indefinite"/></path>' for i, r in enumerate((8, 15, 22)))
    iconos = [servidores, rayo, copo, escudo, antena]
    cuerpo = '<rect x="10" y="10" width="380" height="180" rx="12" fill="none" stroke="#19e6ff" stroke-opacity=".4" stroke-dasharray="6 5"/>'
    for i, ic in enumerate(iconos):
        cuerpo += punto(i, puntos[i][0], f'<rect x="{cx[i] - 31}" y="30" width="62" height="132" rx="8" fill="#0a2233" fill-opacity=".01" class="n" style="fill-opacity:.35"/>' + ic + texto(cx[i], 180, ["Servidores", "Eléctrico", "Clima", "Seguridad", "Telecom."][i], "s"))
    return cuerpo, puntos


def m42():
    puntos = [
        ("Prometheus + Grafana", "Prometheus guarda métricas como series de tiempo y Grafana las muestra en tableros."),
        ("TICK", "La pila TICK usa InfluxDB para series de tiempo y Kapacitor para alertas y detección de anomalías."),
        ("ELK", "ELK se apoya en Elasticsearch, orientada a documentos JSON; puede consumir más memoria y elevar costos."),
        ("Azure Monitor", "Azure Monitor resultó ideal para recursos alojados en la nube de Azure."),
    ]
    datos = [("Prometheus + Grafana", "series de tiempo + tableros"), ("TICK", "InfluxDB + Kapacitor"), ("ELK", "Elasticsearch · JSON"), ("Azure Monitor", "recursos en la nube")]
    pos = [(15, 18), (210, 18), (15, 106), (210, 106)]
    cuerpo = ""
    for i, ((n, s), (x, y)) in enumerate(zip(datos, pos)):
        ruta = f"M{x + 12} {y + 62}H{x + 163}"
        cuerpo += punto(i, puntos[i][0], caja(x, y, 175, 74, n, s) + paquete(ruta, [NARANJA, CIAN, VERDE, "#d9f6ff"][i], 2.5 + i * 0.4, 0.0, 1.0, 4))
    return cuerpo, puntos


def m43():
    puntos = [
        ("Serie de tiempo", "Prometheus e InfluxDB son bases de datos de series de tiempo, adecuadas para métricas."),
        ("Nube", "Azure Monitor sirve para monitorear recursos alojados en la nube de Azure."),
        ("InfluxDB", "En la prueba de ingesta de datos, InfluxDB logró el mejor resultado."),
        ("Elasticsearch", "Elasticsearch almacena documentos JSON y puede consumir más memoria y elevar costos."),
    ]
    grafica = (
        '<rect class="n" x="15" y="20" width="190" height="150" rx="8"/><path d="M30 150H195M30 150V35" stroke="#7fa8b8" fill="none"/>'
        '<path d="M32 135L58 112L84 122L112 80L140 92L168 54L192 62" fill="none" stroke="#3dff9a" stroke-width="3" stroke-dasharray="220" stroke-dashoffset="220">'
        '<animate attributeName="stroke-dashoffset" values="220;0;0" keyTimes="0;.7;1" dur="4s" repeatCount="indefinite"/></path>' + texto(110, 165, "métrica en el tiempo", "s")
    )
    nube = '<path class="n" d="M255 80C235 80 235 56 257 56C260 36 290 34 298 52C320 50 326 80 306 80Z"/>' + texto(280, 72, "Azure", "s") + paquete("M205 100Q240 100 275 82", NARANJA, 3, 0.0, 1.0, 4)
    return (
        punto(0, puntos[0][0], grafica) + punto(1, puntos[1][0], nube)
        + punto(2, puntos[2][0], caja(222, 120, 80, 36, "InfluxDB"))
        + punto(3, puntos[3][0], caja(312, 120, 80, 36, "Elastic", "{ JSON }"))
    ), puntos


ESCENAS = [
    ("Calidad en el Grid: QoS y QoE", m11), ("Factores que degradan la calidad", m12), ("Medir la experiencia: MOS y PESQ", m13),
    ("Qué es monitorizar", m21), ("Alertas y activos críticos", m22), ("Nagios y agentes", m23),
    ("Sniffers y modo promiscuo", m31), ("Componentes y filtros", m32), ("TCP en tres pasos", m33),
    ("El centro de datos", m41), ("Pilas de monitoreo", m42), ("Series de tiempo y la nube", m43),
]


def svg_completo(titulo, cuerpo, identificador):
    fondo = (
        f'<defs><pattern id="g{identificador}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#19e6ff" stroke-opacity=".12"/>'
        '<animateTransform attributeName="patternTransform" type="translate" from="0 0" to="20 0" dur="2s" repeatCount="indefinite"/></pattern></defs>'
        f'<rect width="400" height="200" fill="#04101c"/><rect width="400" height="200" fill="url(#g{identificador})"/>'
    )
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" role="img" aria-label="{titulo}">{ESTILO}{fondo}{cuerpo}</svg>'


def main():
    carpeta = RAIZ / "img" / "misiones"
    carpeta.mkdir(parents=True, exist_ok=True)
    escenas = []
    for n, (titulo, fabrica) in enumerate(ESCENAS):
        cuerpo, puntos = fabrica()
        sector, mision = n // 3 + 1, n % 3 + 1
        svg = svg_completo(titulo, cuerpo, f"{sector}{mision}")
        (carpeta / f"mision-{sector}-{mision}.svg").write_text(svg, encoding="utf-8")
        escenas.append({"titulo": titulo, "pista": PISTA, "puntos": [{"t": t, "x": x} for t, x in puntos], "svg": svg})
    salida = "// Archivo generado por tools/generar_ilustraciones.py. No editar a mano.\nconst ESCENAS = " + json.dumps(escenas, ensure_ascii=False) + ";\n"
    (RAIZ / "js" / "ilustraciones.js").write_text(salida, encoding="utf-8")
    print(f"{len(escenas)} ilustraciones generadas.")


if __name__ == "__main__":
    main()
