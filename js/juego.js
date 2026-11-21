'use strict';
/* La Red del Grid · lógica del juego.
   Depende de: datos.js (MISIONES, PREGUNTAS_EXTRA, REFERENCIAS, URLS) e ilustraciones.js (ESCENAS). */

// ---------- Configuración ----------
const PENALIZACION_XP = 25;
const AVANCE_RIVAL = 7;
const XP_MISION = 200;
const PAUSA_ACIERTO_MS = 1100;
const TIEMPO_PREGUNTA_S = 20;
const TIEMPO_UNION_S = 45;

const PISTAS = { menu: 'audio/musica/audio.mp3', carrera: 'audio/musica/audio2.mp3' };
const EFECTOS = { correcto: 'audio/sfx/correcto.wav', error: 'audio/sfx/error.wav' };

// En la película el escenario es "el Grid", dividido en zonas: aquí las llamamos sectores.
const SECTORES = [
  { nombre: 'La Arena de las Motos de Luz', tema: 'QoS y QoE', imagen: 'img/sectores/sector1.png',
    misiones: ['Conceptos: QoS y QoE', 'Factores que degradan la calidad', 'Medir la experiencia: MOS y PESQ'], corte: [1, 2], objeto: 'Disco de identidad' },
  { nombre: 'La Ciudad del Grid', tema: 'Monitoreo de infraestructura TI', imagen: 'img/sectores/sector2.jpg',
    misiones: ['Qué es monitorizar', 'Alertas y activos críticos', 'Herramientas: Nagios y agentes'], corte: [2, 3], objeto: 'Casco de luz' },
  { nombre: 'La Torre de E/S', tema: 'Análisis de tráfico con Wireshark', imagen: 'img/sectores/sector3.png',
    misiones: ['Sniffers y modo promiscuo', 'Componentes y filtros', 'TCP en tres pasos'], corte: [2, 4], objeto: 'Llave del portal' },
  { nombre: 'El Portal', tema: 'Infraestructura física y en la nube', imagen: 'img/sectores/sector4.jpg',
    misiones: ['El centro de datos', 'Pilas de monitoreo', 'Series de tiempo y la nube'], corte: [2, 3], objeto: 'Corona del Grid' },
];
const MISIONES_POR_SECTOR = 3;
const ICONO_DISCO = '<svg viewBox="0 0 100 100"><g fill="none" stroke="currentColor" stroke-width="3"><circle cx="50" cy="50" r="42"/><circle cx="50" cy="50" r="28" stroke-dasharray="6 5"/><circle cx="50" cy="50" r="10"/></g></svg>';

// ---------- Estado ----------
const estado = {
  desbloqueadas: 0, sector: 0, mision: 0, pregunta: 1, xp: 0, objetos: [],
  preguntas: [], total: 4, resueltas: 0, avanceRival: 0, lento: false,
  enCarrera: false, intentos: 0, izquierdaElegida: null, pares: [], segundos: 0, segundosTotales: 20,
};
const temporizadores = { rival: null, pregunta: null, siguiente: null, cuenta: null };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const preguntaActual = () => estado.preguntas[estado.pregunta - 1];
const indiceMision = () => estado.sector * MISIONES_POR_SECTOR + estado.mision;
const imagenMision = (sector, mision) => `img/misiones/mision-${sector + 1}-${mision + 1}.svg`;

function barajar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function citar(texto) {
  return texto.replace(/\[(\d)\]/g, (_, n) =>
    `<a class="c" href="${URLS[n - 1]}" target="_blank" rel="noopener" title="Abrir el artículo">[${n}]</a>`);
}

function detenerTemporizadores() {
  Object.values(temporizadores).forEach((id) => { clearInterval(id); clearTimeout(id); });
}

// ---------- Audio ----------
let sonidoActivo = true;
let pistaActual = null;
let contextoAudio = null;
const pistas = Object.fromEntries(Object.entries(PISTAS).map(([nombre, ruta]) => {
  const audio = new Audio(ruta);
  audio.loop = true; audio.volume = 0.4; audio.preload = 'auto';
  return [nombre, audio];
}));
const efectos = Object.fromEntries(Object.entries(EFECTOS).map(([nombre, ruta]) => [nombre, new Audio(ruta)]));

function reproducirMusica(nombre) {
  pistaActual = nombre;
  if (!sonidoActivo) return;
  Object.entries(pistas).forEach(([clave, audio]) => { if (clave !== nombre) audio.pause(); });
  if (!pistas[nombre].paused) return;
  pistas[nombre].play().catch((error) => console.warn('El navegador bloqueó el audio hasta que interactúes:', error));
}

function detenerMusica() { Object.values(pistas).forEach((audio) => audio.pause()); }

function sonar(nombre) {
  if (!sonidoActivo) return;
  const copia = efectos[nombre].cloneNode();   // clon: permite solapar sonidos seguidos
  copia.volume = 0.8;
  copia.play().catch((error) => console.warn('No se pudo reproducir el efecto', nombre, error));
}

function pitido(frecuencia, duracion, tipo, volumen) {
  if (!sonidoActivo) return;
  try {
    contextoAudio = contextoAudio || new (window.AudioContext || window.webkitAudioContext)();
    const oscilador = contextoAudio.createOscillator();
    const ganancia = contextoAudio.createGain();
    oscilador.type = tipo; oscilador.frequency.value = frecuencia; ganancia.gain.value = volumen;
    oscilador.connect(ganancia); ganancia.connect(contextoAudio.destination);
    oscilador.start();
    ganancia.gain.exponentialRampToValueAtTime(0.0001, contextoAudio.currentTime + duracion);
    oscilador.stop(contextoAudio.currentTime + duracion);
  } catch (error) {
    console.warn('Audio no disponible', error);
  }
}

// ---------- Utilidades de interfaz ----------
function mostrar(html) {
  const escenario = $('#escenario');
  escenario.innerHTML = html;
  escenario.classList.remove('entrando', 'temblando');
  void escenario.offsetWidth;   // reinicia la animación de entrada
  escenario.classList.add('entrando');
}

function actualizarHud() {
  $('#xp').textContent = estado.xp;
  $('#inventario').textContent = '🎒 Objetos: ' + (estado.objetos.length ? estado.objetos.join(' · ') : 'ninguno todavía');
}

function flotante(texto, tipo) {
  const aviso = document.createElement('div');
  aviso.className = 'flotante ' + tipo;
  aviso.textContent = texto;
  document.body.appendChild(aviso);
  setTimeout(() => aviso.remove(), 1400);
}

function colocar(selector, porcentaje) {
  const elemento = $(selector);
  elemento.style.left = porcentaje + '%';
  elemento.style.transform = `translateX(-${porcentaje}%)`;
}

// ---------- Carrera ----------
function construirCarrera() {
  const carrera = $('#carrera');
  carrera.hidden = false;
  const obstaculos = Array.from({ length: estado.total }, (_, i) =>
    `<b class="obstaculo" id="obstaculo-${i}" style="left:${(i + 1) / estado.total * 100 - 6}%"></b>`).join('');
  carrera.innerHTML = `
    <div class="pista" id="pista">
      <div class="pista-fondo" style="background-image:url(${SECTORES[estado.sector].imagen})"></div>
      <div class="lineas-fx"></div>
      <div class="carril arriba"><i class="estela" id="estela-rival"></i>
        <span class="moto rival" id="moto-rival"><img src="img/motos/moto-roja.png" alt="Moto roja del rival"></span></div>
      <div class="carril abajo"><i class="estela yo" id="estela-yo"></i>${obstaculos}
        <span class="moto" id="moto-yo"><img src="img/motos/moto-azul.png" alt="Tu moto azul"></span></div>
      <i class="meta"></i>
    </div>
    <div class="tiempo"><i id="barra-tiempo"></i></div>
    <small>Tú: azul · Rival: rojo · Cada error o tiempo agotado: −${PENALIZACION_XP} XP y el rival avanza +${AVANCE_RIVAL}%</small>`;
  actualizarCarrera();
}

function actualizarCarrera() {
  const miProgreso = estado.resueltas / estado.total * 100;
  colocar('#moto-rival', estado.avanceRival);
  colocar('#moto-yo', miProgreso);
  $('#estela-rival').style.width = estado.avanceRival + '%';
  $('#estela-yo').style.width = miProgreso + '%';
  $('#moto-yo').classList.toggle('lenta', estado.lento);
  $('#pista').style.setProperty('--velocidad', estado.lento ? '1.4s' : '.45s');
}

function avanzarRival() {
  const segundosParaLlegar = 80 - 2 * indiceMision();
  estado.avanceRival = Math.min(100, estado.avanceRival + 100 / (segundosParaLlegar * 10));
  actualizarCarrera();
  if (estado.avanceRival >= 100) perder();
}

function iniciarTemporizador() {
  clearInterval(temporizadores.pregunta);
  estado.segundosTotales = preguntaActual().k === 'm' ? TIEMPO_UNION_S : TIEMPO_PREGUNTA_S;
  estado.segundos = estado.segundosTotales;
  temporizadores.pregunta = setInterval(() => {
    estado.segundos -= 0.1;
    $('#barra-tiempo').style.width = Math.max(0, estado.segundos / estado.segundosTotales * 100) + '%';
    if (estado.segundos <= 0) tiempoAgotado();
  }, 100);
}

function registrarError(mensaje) {
  estado.xp = Math.max(0, estado.xp - PENALIZACION_XP);
  estado.avanceRival = Math.min(100, estado.avanceRival + AVANCE_RIVAL);
  estado.lento = true;
  flotante(`${mensaje} −${PENALIZACION_XP} XP · rival +${AVANCE_RIVAL}%`, 'mal');
  sonar('error');
  actualizarHud(); actualizarCarrera();
  const escenario = $('#escenario');
  escenario.classList.remove('temblando'); void escenario.offsetWidth; escenario.classList.add('temblando');
  if (estado.avanceRival >= 100) perder();
}

function tiempoAgotado() {
  clearInterval(temporizadores.pregunta);
  $('#mensaje').innerHTML = '<p class="aviso">⏱ Se acabó el tiempo. Inténtalo de nuevo.</p>';
  registrarError('¡Tiempo agotado!');
  if (estado.enCarrera) iniciarTemporizador();   // la pregunta sigue hasta acertarla
}

function registrarAcierto(puntos) {
  clearInterval(temporizadores.pregunta);
  estado.xp += puntos;
  estado.resueltas++;
  $('#obstaculo-' + (estado.resueltas - 1))?.classList.add('ok');
  flotante(`+${puntos} XP` + (estado.lento ? ' · ¡recuperado! ⚡' : ''), 'ok');
  if (estado.lento) { estado.lento = false; estado.avanceRival = Math.max(0, estado.avanceRival - 3); }
  sonar('correcto');
  if (estado.resueltas >= estado.total) clearInterval(temporizadores.rival);
  actualizarHud(); actualizarCarrera();
  $('#pista').style.setProperty('--velocidad', '.2s');
  // Sin botón "Siguiente": al acertar, la siguiente pregunta aparece sola.
  temporizadores.siguiente = setTimeout(() => {
    if (!estado.enCarrera) return;
    estado.pregunta++;
    mostrarPregunta();
  }, PAUSA_ACIERTO_MS);
}

// ---------- Pantallas de preguntas ----------
const encabezado = (p) => `Pregunta ${estado.pregunta}/${estado.total}` +
  (p.k === 'f' ? ' · Completa la palabra' : p.k === 'm' ? ' · Une con líneas' : '');
const miniatura = () => `<img class="miniatura-pregunta" src="${imagenMision(estado.sector, estado.mision)}" alt="">`;

function mostrarPregunta() {
  actualizarHud();
  const pregunta = preguntaActual();
  if (!pregunta) { ganar(); return; }
  estado.intentos = 0;
  if (pregunta.k === 'm') mostrarUnir(pregunta); else mostrarOpciones(pregunta);
  iniciarTemporizador();
}

function mostrarOpciones(p) {
  const enunciado = p.k === 'f' ? p.q.replace('___', '<span id="hueco" class="hueco">_____</span>') : p.q;
  const orden = barajar(p.o.map((_, i) => i));
  mostrar(`<div class="card">${miniatura()}<h3>${encabezado(p)}</h3><p class="q">${enunciado}</p>
    <div class="opciones">${orden.map((i) => `<button class="opcion" data-opcion="${i}">${p.o[i]}</button>`).join('')}</div>
    <div id="mensaje"></div></div>`);
}

function elegirOpcion(boton) {
  if (!estado.enCarrera) return;
  const p = preguntaActual();
  if (+boton.dataset.opcion === p.a) {
    $$('[data-opcion]').forEach((b) => { b.disabled = true; });
    boton.classList.add('ok');
    if (p.k === 'f') { const hueco = $('#hueco'); hueco.textContent = p.o[p.a]; hueco.classList.add('ok'); }
    $('#mensaje').innerHTML = `<p class="bien">✔ ${p.w || '¡Correcto!'}</p>`;
    registrarAcierto(estado.intentos ? 50 : 100);
  } else {
    estado.intentos++;
    boton.disabled = true;
    boton.classList.add('mal');
    $('#mensaje').innerHTML = `<p class="aviso">✖ No es esa: −${PENALIZACION_XP} XP. Prueba otra opción.</p>`;
    registrarError('Obstáculo');
  }
}

function mostrarUnir(p) {
  estado.izquierdaElegida = null;
  estado.pares = [];
  const derecha = barajar(p.p.map((par, i) => ({ texto: par[1], indice: i })));
  mostrar(`<div class="card">${miniatura()}<h3>${encabezado(p)}</h3><p class="q">${p.q}</p>
    <div class="union" id="union"><svg id="lineas"></svg>
      <div class="col">${p.p.map((par, i) => `<button class="opcion" data-izq="${i}">${par[0]}</button>`).join('')}</div>
      <div class="col">${derecha.map((d) => `<button class="opcion" data-der="${d.indice}">${d.texto}</button>`).join('')}</div>
    </div><div id="mensaje"></div></div>`);
}

function elegirIzquierda(boton) {
  if (!estado.enCarrera || boton.disabled) return;
  $$('[data-izq]').forEach((b) => b.classList.remove('sel'));
  estado.izquierdaElegida = +boton.dataset.izq;
  boton.classList.add('sel');
}

function elegirDerecha(boton) {
  if (!estado.enCarrera || estado.izquierdaElegida === null || boton.disabled) return;
  const derecha = +boton.dataset.der;
  const izquierdaBtn = $(`[data-izq="${estado.izquierdaElegida}"]`);
  if (estado.izquierdaElegida === derecha) {
    izquierdaBtn.disabled = true; boton.disabled = true;
    izquierdaBtn.classList.remove('sel'); izquierdaBtn.classList.add('ok'); boton.classList.add('ok');
    estado.pares = [...estado.pares, [estado.izquierdaElegida, derecha]];
    estado.izquierdaElegida = null;
    dibujarLineas();
    if (estado.pares.length === preguntaActual().p.length) {
      $('#mensaje').innerHTML = '<p class="bien">✔ ¡Todas las conexiones son correctas!</p>';
      registrarAcierto(150);
    }
  } else {
    izquierdaBtn.classList.remove('sel');
    estado.izquierdaElegida = null;
    boton.classList.add('mal');
    setTimeout(() => boton.classList.remove('mal'), 500);
    registrarError('Obstáculo');
  }
}

function dibujarLineas() {
  const contenedor = $('#union');
  if (!contenedor) return;
  const base = contenedor.getBoundingClientRect();
  $('#lineas').innerHTML = estado.pares.map(([izq, der]) => {
    const a = $(`[data-izq="${izq}"]`).getBoundingClientRect();
    const b = $(`[data-der="${der}"]`).getBoundingClientRect();
    return `<line x1="${a.right - base.left}" y1="${a.top + a.height / 2 - base.top}" x2="${b.left - base.left}" y2="${b.top + b.height / 2 - base.top}"/>`;
  }).join('');
}

// ---------- Navegación ----------
function mostrarPortada() {
  detenerTemporizadores();
  document.body.classList.add('en-portada');
  $('#carrera').hidden = true;
  mostrar(`<div class="portada"><span class="etiqueta">ARCADE EDUCATIVO</span>
    <h2 class="titulo-grande">LA RED DEL GRID</h2>
    <p class="lead">Corre en motos de luz, responde bajo presión y recorre cuatro sectores para dominar la infraestructura de TI.</p>
    <button class="btn btn-start" data-ir="empezar">START</button></div>`);
}

function mostrarSectores() {
  detenerTemporizadores();
  estado.enCarrera = false;
  $('#carrera').hidden = true;
  reproducirMusica('menu');
  actualizarHud();
  mostrar(`<h3 class="ttl">Elige tu sector</h3><div class="cuadricula">${SECTORES.map((s, i) => {
    const abierto = i * MISIONES_POR_SECTOR <= estado.desbloqueadas;
    const hechas = Math.max(0, Math.min(MISIONES_POR_SECTOR, estado.desbloqueadas - i * MISIONES_POR_SECTOR));
    return `<button class="tarjeta${abierto ? '' : ' bloqueada'}" data-sector="${i}"
      style="background-image:linear-gradient(rgba(2,6,13,.35),rgba(2,6,13,.88)),url(${s.imagen})"${abierto ? '' : ' disabled'}>
      <b>${abierto ? '' : '🔒 '}${s.nombre}</b><span>${s.tema}</span><small>${hechas}/${MISIONES_POR_SECTOR} misiones</small></button>`;
  }).join('')}</div>`);
}

function mostrarMisiones(sector) {
  estado.sector = sector;
  const datos = SECTORES[sector];
  mostrar(`<h3 class="ttl">${datos.nombre}</h3><p class="mu">${datos.tema}</p><div class="cuadricula">${datos.misiones.map((titulo, k) => {
    const global = sector * MISIONES_POR_SECTOR + k;
    const abierta = global <= estado.desbloqueadas;
    const marca = global < estado.desbloqueadas ? '✔ ' : abierta ? '▶ ' : '🔒 ';
    return `<button class="tarjeta con-miniatura${abierta ? '' : ' bloqueada'}" data-mision="${k}"${abierta ? '' : ' disabled'}>
      <img class="miniatura" src="${imagenMision(sector, k)}" alt=""><b>${marca}Misión ${k + 1}</b><span>${titulo}</span></button>`;
  }).join('')}</div><button class="btn alt" data-ir="sectores">◀ Sectores</button>`);
}

function mostrarTeoria(sector, mision) {
  detenerTemporizadores();
  estado.sector = sector; estado.mision = mision; estado.enCarrera = false;
  $('#carrera').hidden = true;
  const datos = SECTORES[sector];
  const cortes = [0, datos.corte[0], datos.corte[1], 99];
  const parrafos = MISIONES[sector].th.slice(cortes[mision], cortes[mision + 1]);
  const escena = ESCENAS[sector * MISIONES_POR_SECTOR + mision];
  const esUltima = mision === MISIONES_POR_SECTOR - 1;
  mostrar(`<div class="card"><h2>Misión ${mision + 1}: ${datos.misiones[mision]}</h2><h3>${datos.nombre}</h3>
    <figure class="escena" id="escena">${escena.svg}<figcaption id="leyenda" aria-live="polite">${escena.pista}</figcaption></figure>
    ${parrafos.map((p) => `<p>${citar(p)}</p>`).join('')}
    <p class="prize">🏆 Gana la carrera para completar la misión${esUltima ? ` y obtener: <b>${datos.objeto}</b>` : ''}.</p>
    <p>Cada pregunta es un obstáculo con tiempo límite: si fallas pierdes ${PENALIZACION_XP} XP, tu moto se frena y el rival avanza ${AVANCE_RIVAL}%; si aciertas, pasas a la siguiente.</p>
    <button class="btn" data-ir="iniciar">Iniciar carrera ▶</button> <button class="btn alt" data-sector="${sector}">◀ Misiones</button></div>`);
}

function resaltarPunto(punto) {
  $$('#escena [data-h]').forEach((p) => p.classList.remove('on'));
  punto.classList.add('on');
  const escena = ESCENAS[indiceMision()];
  $('#leyenda').textContent = escena.puntos[+punto.dataset.h].x;
}

function cuentaRegresiva() {
  detenerTemporizadores();
  $('#carrera').hidden = true;
  const clasePreguntas = MISIONES[estado.sector].a.concat(PREGUNTAS_EXTRA[estado.sector]);
  estado.preguntas = clasePreguntas.slice(estado.mision * 4, estado.mision * 4 + 4);
  estado.total = estado.preguntas.length;
  let numero = 3;
  mostrar('<div class="card ctr"><h3>Preparados en la línea de salida</h3><div class="cuenta" id="cuenta">3</div></div>');
  reproducirMusica('carrera');
  pitido(440, 0.2, 'square', 0.05);
  temporizadores.cuenta = setInterval(() => {
    numero--;
    if (numero > 0) { $('#cuenta').textContent = numero; pitido(440, 0.2, 'square', 0.05); }
    else if (numero === 0) { $('#cuenta').textContent = '¡GO!'; pitido(880, 0.4, 'square', 0.06); }
    else { clearInterval(temporizadores.cuenta); comenzarCarrera(); }
  }, 800);
}

function comenzarCarrera() {
  Object.assign(estado, { pregunta: 1, resueltas: 0, avanceRival: 0, lento: false, enCarrera: true });
  construirCarrera();
  temporizadores.rival = setInterval(avanzarRival, 100);
  mostrarPregunta();
}

function ganar() {
  estado.enCarrera = false;
  detenerTemporizadores();
  $('#carrera').hidden = true;
  const { sector, mision } = estado;
  const datos = SECTORES[sector];
  const esUltima = mision === MISIONES_POR_SECTOR - 1;
  const esFinal = sector === SECTORES.length - 1 && esUltima;
  estado.xp += XP_MISION;
  if (indiceMision() === estado.desbloqueadas) estado.desbloqueadas++;
  if (esUltima && !estado.objetos.includes(datos.objeto)) estado.objetos = [...estado.objetos, datos.objeto];
  actualizarHud();
  reproducirMusica('menu');
  const destino = esFinal ? 'fin' : esUltima ? 'sectores' : 'siguiente-mision';
  const textoBoton = esFinal ? 'Ver resultado final' : esUltima ? 'Ir al mapa de sectores' : 'Siguiente misión';
  mostrar(`<div class="card ctr"><img class="trofeo" src="${imagenMision(sector, mision)}" alt="">
    <h2>MISIÓN ${mision + 1}: COMPLETADA</h2><p class="lead">${datos.misiones[mision]}</p>
    <p>+${XP_MISION} XP${esUltima ? ` · Objeto: <b class="rank">${datos.objeto}</b>` : ''}</p>
    ${esUltima ? `<p>¡Sector completado!${esFinal ? '' : ' Se desbloqueó el siguiente.'}</p>` : ''}
    <button class="btn" data-ir="${destino}">${textoBoton} ▶</button></div>`);
  [1, 1.25, 1.5, 2].forEach((factor, i) => setTimeout(() => pitido(523 * factor, 0.25, 'triangle', 0.08), i * 180));
}

function perder() {
  estado.enCarrera = false;
  detenerTemporizadores();
  mostrar(`<div class="card ctr"><h2>El rival cruzó la meta</h2>
    <p>Perdiste la carrera, pero puedes intentarlo otra vez. Responde más rápido y evita los errores.</p>
    <button class="btn" data-ir="reintentar">Reintentar carrera</button> <button class="btn alt" data-ir="sectores">Mapa de sectores</button></div>`);
  pitido(90, 0.6, 'sawtooth', 0.07);
}

function mostrarFinal() {
  $('#carrera').hidden = true;
  const rango = estado.xp >= 5500 ? 'Usuario Maestro' : estado.xp >= 4000 ? 'Programa Élite' : 'Aprendiz del Grid';
  mostrar(`<div class="card ctr"><div class="disco">${ICONO_DISCO}</div><h2>Has restaurado el Grid</h2>
    <p class="rank">${rango} · ${estado.xp} XP</p><p>Objetos: ${estado.objetos.join(' · ')}</p>
    <p>Revisa las referencias al final de la página.</p><button class="btn" data-ir="reiniciar">Jugar de nuevo</button></div>`);
}

// ---------- Eventos ----------
const ACCIONES = {
  empezar: () => { document.body.classList.remove('en-portada'); reproducirMusica('menu'); mostrarSectores(); },
  sectores: mostrarSectores,
  iniciar: cuentaRegresiva,
  reintentar: cuentaRegresiva,
  'siguiente-mision': () => mostrarTeoria(estado.sector, estado.mision + 1),
  fin: mostrarFinal,
  reiniciar: () => { Object.assign(estado, { desbloqueadas: 0, xp: 0, objetos: [] }); mostrarSectores(); },
};

$('#escenario').addEventListener('click', (evento) => {
  const punto = evento.target.closest('[data-h]');
  if (punto) { resaltarPunto(punto); return; }
  const boton = evento.target.closest('button');
  if (!boton) return;
  const d = boton.dataset;
  if (d.ir) ACCIONES[d.ir]?.();
  else if (d.sector !== undefined) mostrarMisiones(+d.sector);
  else if (d.mision !== undefined) mostrarTeoria(estado.sector, +d.mision);
  else if (d.opcion !== undefined) elegirOpcion(boton);
  else if (d.izq !== undefined) elegirIzquierda(boton);
  else if (d.der !== undefined) elegirDerecha(boton);
});

$('#escenario').addEventListener('keydown', (evento) => {
  if ((evento.key === 'Enter' || evento.key === ' ') && evento.target.matches('[data-h]')) {
    evento.preventDefault();
    resaltarPunto(evento.target);
  }
});

$('#boton-sonido').addEventListener('click', (evento) => {
  sonidoActivo = !sonidoActivo;
  evento.currentTarget.textContent = sonidoActivo ? '🔊' : '🔇';
  evento.currentTarget.setAttribute('aria-pressed', String(!sonidoActivo));
  if (sonidoActivo && pistaActual) reproducirMusica(pistaActual); else detenerMusica();
});

$('#boton-sectores').addEventListener('click', mostrarSectores);
window.addEventListener('resize', dibujarLineas);

// ---------- Arranque ----------
$('#ciclos').innerHTML = '<img src="img/motos/moto-azul.png" alt=""><img src="img/motos/moto-roja.png" alt="">';
$('.penalizacion').textContent = `Cada error: −${PENALIZACION_XP} XP`;
$('#referencias').innerHTML = REFERENCIAS.map((r, i) =>
  `<p>[${i + 1}] ${r} <a href="${URLS[i]}" target="_blank" rel="noopener">Abrir artículo ↗</a></p>`).join('');
actualizarHud();
mostrarPortada();
