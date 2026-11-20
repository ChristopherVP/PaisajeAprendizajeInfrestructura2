const ART={
cycle:'<svg viewBox="0 0 200 90"><g fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="45" cy="62" r="20"/><circle cx="155" cy="62" r="20"/><path d="M45 62L80 40L125 40L155 62M80 40L95 22L125 22L135 40"/></g></svg>',
disc:'<svg viewBox="0 0 100 100"><g fill="none" stroke="currentColor" stroke-width="3"><circle cx="50" cy="50" r="42"/><circle cx="50" cy="50" r="28" stroke-dasharray="6 5"/><circle cx="50" cy="50" r="10"/></g></svg>',
city:'<svg viewBox="0 0 200 90"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M5 85V50h20v35M25 85V30h25v55M50 85V58h18v27M68 85V18h28v67M96 85V44h20v41M116 85V26h24v59M140 85V56h22v29M162 85V38h30v47"/></g></svg>',
chip:'<svg viewBox="0 0 100 100"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><rect x="25" y="25" width="50" height="50" rx="4"/><rect x="40" y="40" width="20" height="20"/><path d="M35 25V10M50 25V10M65 25V10M35 90V75M50 90V75M65 90V75M25 35H10M25 50H10M25 65H10M90 35H75M90 50H75M90 65H75"/></g></svg>'
};
const R=[
'M. I. Quintero Martínez y S. A. Tovar Balderas, “Monitorización de infraestructura tecnológica como mejora en centros de datos,” TIES, Revista de Tecnología e Innovación en Educación Superior, n.º 3, abr. 2021, doi: 10.22201/dgtic.26832968e.2021.3.2.',
'S. A. Alvernia Acevedo y D. Rico Bautista, “Análisis de una red en un entorno IPv6: una mirada desde las intrusiones de red y el modelo TCP/IP,” Revista Colombiana de Tecnologías de Avanzada, vol. 1, n.º 29, pp. 81–91, 2017.',
'C. E. Gordillo, B. Florian-Gaviria y E. M. Aristizábal, “Estudio de plataformas de monitoreo para seleccionar la pila tecnológica base de un sistema de analíticas especializado para pruebas de software,” Ingeniería y Competitividad, vol. 24, n.º 1, p. e201811086, ene.–jul. 2022, doi: 10.25100/iyc.v24i1.11086.',
'J. Joskowicz y R. Sotelo, “Medida de la calidad de voz en redes IP,” Universidad de Montevideo, Montevideo, Uruguay, s. f. [En línea]. Disponible: https://revistas.um.edu.uy/index.php/ingenieria/article/download/252/311/801'
];
const U=[
'https://www.ties.unam.mx/num03/pdf/Monitorizacion.pdf',
'https://core.ac.uk/download/230756387.pdf',
'https://dialnet.unirioja.es/descarga/articulo/8637734.pdf',
'https://revistas.um.edu.uy/index.php/ingenieria/article/download/252/311/801'
];
const M=[
{t:'Misión 1',n:'Calidad en el Grid: QoS y QoE',ic:'cycle',c:'Calidad: QoS y QoE',
th:[
'La calidad de experiencia (QoE) mide qué tan bien un servicio de red satisface las expectativas y necesidades que percibe el usuario, mientras que la calidad de servicio (QoS) es la medida técnica del rendimiento de la red y la posibilidad de gestionarla para cumplir las prestaciones que exigen las aplicaciones [4].',
'Las degradaciones que sufre el usuario pueden deberse a retardos, jitter (diferencia de retardos) y pérdida de paquetes; también influyen el códec, el eco y el tamaño de los paquetes [4].',
'Los métodos subjetivos recogen la opinión directa de los usuarios y se resumen en el MOS, un promedio de calificaciones de 1 a 5, pero son caros y lentos porque requieren un panel numeroso. Los métodos objetivos miden propiedades de la red para estimar lo que percibiría el usuario y pueden ser intrusivos, como PESQ, o no intrusivos, como P.563 [4].',
'El modelo E de la ITU calcula, a partir de parámetros medibles de la red, un valor R que puede relacionarse con el MOS [4].'],
a:[
{k:'q',q:'¿Cuál describe mejor la QoE?',o:['La medida técnica del rendimiento de la red','Qué tan bien un servicio satisface las expectativas y necesidades del usuario','El ancho de banda contratado con el proveedor'],a:1,w:'La QoE refleja la percepción del usuario; la QoS es la medida técnica.'},
{k:'q',q:'¿Qué método objetivo inyecta una señal conocida y estudia su degradación?',o:['P.563','MOS subjetivo','PESQ','Nagios'],a:2,w:'PESQ es intrusivo: necesita enviar un audio conocido. P.563 no usa señal de referencia.'},
{k:'q',q:'Retardo, jitter y pérdida de paquetes degradan principalmente la…',o:['QoE percibida por el usuario','Capacidad del disco duro','Temperatura del servidor'],a:0,w:'Son factores técnicos que afectan lo que el usuario percibe.'},
{k:'m',q:'Une cada concepto con su descripción.',p:[['MOS','Promedio de opiniones de usuarios en escala de 1 a 5'],['Jitter','Variación en los retardos de los paquetes'],['PESQ','Método objetivo intrusivo'],['P.563','Método objetivo sin señal de referencia']]},
{k:'f',q:'El modelo E calcula un parámetro ___ que se relaciona con el MOS.',o:['Q','R','Z'],a:1,w:'El parámetro R del modelo E se relaciona con el MOS.'}]},
{t:'Misión 2',n:'Vigilando la ciudad: monitoreo de TI',ic:'city',c:'Monitoreo de TI',
th:[
'Un sistema de monitorización es uno o más sistemas que vigilan la presencia de fallas en otros sistemas y pueden enviar alertas para detectar problemas antes de que se produzca una crisis [1].',
'Su fin es mantener una vigilancia constante de la disponibilidad y la utilización de recursos; además, los datos históricos permiten ver tendencias y planear la renovación o actualización de la infraestructura [1].',
'Conviene priorizar primero los activos críticos y generar información útil, no solo datos; un exceso de alertas termina siendo ignorado y se trata como falsos positivos [1].',
'Nagios es un sistema libre y modular que trabaja con plugins, se configura con archivos de texto y realiza revisiones programadas; entre sus limitaciones están una interfaz base simple y la falta de descubrimiento automático de dispositivos [1].',
'Un agente de recolección capta información de las entidades monitoreadas y la reporta a intervalos regulares; esas entradas se transforman en métricas que se almacenan como series de tiempo [3].'],
a:[
{k:'q',q:'¿Qué conviene hacer primero al implementar un sistema de monitorización?',o:['Instalar alertas en todos los equipos','Priorizar y ordenar los activos críticos','Comprar la herramienta más cara'],a:1,w:'No se puede vigilar todo: primero se monitorizan los activos de mayor criticidad.'},
{k:'q',q:'¿Qué ocurre cuando se configuran demasiadas alertas?',o:['Mejora la disponibilidad','Se reducen los datos recolectados','Terminan ignoradas y tratadas como falsos positivos'],a:2,w:'La saturación de alertas hace que el personal deje de actuar.'},
{k:'q',q:'¿Para qué sirven los datos históricos de un sistema de monitorización?',o:['Para ver tendencias y planear la actualización de la infraestructura','Para eliminar las alertas','Para reemplazar a los administradores'],a:0,w:'Permiten ver tendencias y proyectar renovaciones.'},
{k:'m',q:'Une cada término con su significado.',p:[['Nagios Core','Sistema libre y modular que opera con plugins'],['Plugin','Programa que hace una revisión específica en equipos remotos'],['SIEM','Recopila y correlaciona eventos de varias fuentes'],['Información','Conjunto de datos con proceso y significado para el destinatario']]},
{k:'f',q:'Un sistema de monitorización vigila la presencia de ___ en otros sistemas.',o:['usuarios','fallas','licencias'],a:1,w:'Su función es vigilar fallas y alertar antes de una crisis.'}]},
{t:'Misión 3',n:'Interceptando el tráfico: Wireshark',ic:'disc',c:'Tráfico con Wireshark',
th:[
'Wireshark es un analizador de paquetes de software libre que identifica más de mil protocolos y muestra los campos relevantes de cada paquete capturado [2].',
'Un sniffer captura los datos que pasan por una tarjeta de red; para ver todos los paquetes y no solo los propios, la tarjeta se configura en modo promiscuo [2].',
'Un sniffer se compone de hardware, controladores de captura, un buffer que almacena los datos y una etapa de decodificación que muestra el contenido con texto descriptivo [2].',
'Wireshark ofrece un lenguaje para la captura y otro para la visualización, con filtros por protocolo, campo o valor; así el administrador se concentra en los paquetes de interés y detecta bajo desempeño o conectividad intermitente [2].',
'En TCP la conexión se establece en tres pasos: SYN del cliente, SYN+ACK del servidor y ACK final del cliente [2].'],
a:[
{k:'q',q:'¿Qué modo de la tarjeta de red permite recibir todos los paquetes?',o:['Modo promiscuo','Modo no promiscuo','Modo seguro'],a:0,w:'En modo promiscuo la NIC acepta paquetes aunque no vayan dirigidos a ella.'},
{k:'q',q:'¿Cuáles son los tres pasos de una conexión TCP?',o:['ACK, FIN, SYN','SYN, SYN+ACK, ACK','SYN, ACK, RST'],a:1,w:'Es el saludo de tres vías: SYN, SYN+ACK y ACK.'},
{k:'q',q:'¿Cuál NO es un componente básico de un sniffer?',o:['Buffer','Decodificación','Impresora láser'],a:2,w:'Los componentes son hardware, controladores de captura, buffer y decodificación.'},
{k:'m',q:'Une cada componente con su función.',p:[['Controladores de captura','Capturan el tráfico del cable, lo filtran y lo guardan'],['Buffer','Almacena los datos capturados de la red'],['Decodificación','Muestra el tráfico con texto descriptivo'],['Filtro de visualización','Oculta paquetes según protocolo, campo o valor']]},
{k:'f',q:'Wireshark es un software ___ que identifica más de mil protocolos.',o:['propietario','libre','de pago'],a:1,w:'Wireshark es de software libre y código abierto.'}]},
{t:'Misión 4',n:'Evaluando el núcleo: infraestructura física y nube',ic:'chip',c:'Infraestructura y nube',
th:[
'La infraestructura de un centro de datos incluye sistemas eléctrico y de aire acondicionado, seguridad física y lógica, y equipos como servidores y telecomunicaciones [1].',
'Al diseñar la monitorización de esa infraestructura hay que considerar los activos críticos, el ancho de banda entre ubicaciones, los recursos disponibles y el crecimiento futuro [1].',
'Las fallas de desempeño de las aplicaciones suelen venir de algoritmos ineficientes, fugas de memoria o poco poder de cómputo del hardware donde se alojan [3].',
'Un estudio comparó cuatro pilas de monitoreo (Prometheus con Grafana, TICK, ELK y Azure Monitor) con pruebas de ingesta de datos; Azure Monitor resultó ideal para recursos alojados en la nube de Azure, pero no para esa plataforma en particular [3].',
'Prometheus e InfluxDB son bases de datos de series de tiempo, adecuadas para métricas; Elasticsearch, orientada a documentos JSON, puede consumir más memoria y elevar costos, y en la prueba InfluxDB logró la mejor ingesta [3].'],
a:[
{k:'q',q:'¿Para qué resultó más adecuado Azure Monitor en el estudio de plataformas?',o:['Capturar paquetes de red','Monitorear recursos alojados en la nube de Azure','Almacenar documentos JSON'],a:1,w:'Se concluyó que es ideal para recursos en Azure, no para esa plataforma concreta.'},
{k:'q',q:'¿Qué tipo de base de datos es InfluxDB?',o:['De series de tiempo','De documentos JSON','De grafos'],a:0,w:'InfluxDB y Prometheus están optimizadas para métricas en series de tiempo.'},
{k:'q',q:'¿Qué desventaja se señaló de Elasticsearch para métricas?',o:['Puede consumir más memoria y elevar costos','No almacena JSON','Solo funciona en la nube de Azure'],a:0,w:'Al estar orientada a documentos, puede ser menos eficiente que una base de series de tiempo.'},
{k:'m',q:'Une cada herramienta con su rol.',p:[['Prometheus','Base de datos de series de tiempo para métricas'],['Elasticsearch','Base NoSQL orientada a documentos JSON'],['Kapacitor','Alertas y detección de anomalías en la pila TICK'],['Grafana','Visualización de métricas en tableros']]},
{k:'f',q:'Un bajo poder de cómputo a nivel de ___ puede causar fallas de desempeño.',o:['hardware','papel','teclado'],a:0,w:'El hardware de los servidores influye directamente en el desempeño.'}]}
];
const PEN=25,JMP=7;
const SCALES=[[110,165,220,262,220,165,196,247],[98,147,196,233,196,147,175,220],[130,196,262,311,262,196,233,294],[87,131,175,208,175,131,156,196]];
const Q_=(q,...o)=>({k:'q',q,o,a:0}),F_=(q,...o)=>({k:'f',q,o,a:0}),P_=(q,...p)=>({k:'m',q,p});
const X=[
[Q_('¿Qué escala usa el MOS?','De 1 a 5','De 0 a 100','De A a F'),
F_('El ___ es la diferencia entre los retardos de los paquetes.','jitter','códec','eco'),
Q_('¿Por qué los métodos subjetivos son poco prácticos?','Son caros y lentos porque requieren un panel numeroso','No consideran al usuario','Solo funcionan con video'),
P_('Une cada concepto con su descripción.',['QoS','Medida técnica del rendimiento de la red'],['QoE','Satisfacción percibida por el usuario'],['Modelo E','Calcula un valor R relacionado con el MOS'],['Método subjetivo','Opinión directa de los usuarios']),
Q_('¿Qué tipo de método es P.563?','Objetivo no intrusivo','Subjetivo','Objetivo intrusivo'),
F_('Los métodos ___ miden propiedades de la red para estimar lo que percibiría el usuario.','objetivos','subjetivos','manuales'),
Q_('¿Qué factores influyen en la calidad de voz además del retardo?','Códec, eco y tamaño de los paquetes','Color del cable y marca del router','Solo el volumen')],
[Q_('¿Qué ventaja tiene detectar fallas antes de una crisis?','Se envían alertas para actuar a tiempo','Se evita instalar servidores','Desaparecen los datos históricos'),
F_('Nagios se configura mediante archivos de ___.','texto','video','audio'),
Q_('¿Qué limitación se señaló de Nagios?','No descubre dispositivos automáticamente','No usa plugins','Solo funciona con licencia de pago'),
P_('Une cada término con su significado.',['Disponibilidad','Que el servicio esté operativo cuando se necesita'],['Utilización','Uso que se hace de los recursos de los equipos'],['Agente','Recolecta datos de las entidades y los reporta a intervalos'],['Falso positivo','Alerta que no corresponde a una falla real']),
Q_('¿Cómo se almacenan normalmente las métricas recolectadas?','Como series de tiempo','Como imágenes','Como correos'),
F_('Los activos ___ deben monitorizarse con prioridad.','críticos','antiguos','externos'),
Q_('¿Qué diferencia a la información de los datos?','Tiene proceso y significado para quien la recibe','Es más pesada','No necesita análisis')],
[Q_('¿Cuántos lenguajes de filtro ofrece Wireshark?','Dos: captura y visualización','Uno solo','Tres: red, enlace y aplicación'),
F_('En TCP, el servidor responde al SYN con un ___.','SYN+ACK','RST','FIN'),
Q_('¿Para qué sirve analizar el tráfico de red?','Detectar bajo desempeño y conectividad intermitente','Aumentar el brillo de pantalla','Eliminar paquetes legítimos'),
P_('Une cada paso con su significado.',['SYN','El cliente inicia la conexión'],['SYN+ACK','El servidor acepta y responde'],['ACK','El cliente confirma y queda establecida'],['Modo promiscuo','La tarjeta recibe todos los paquetes']),
Q_('¿Qué hace un filtro de captura?','Limita qué paquetes se guardan al capturar','Cambia el color de los paquetes','Apaga la tarjeta de red'),
F_('Un ___ captura los datos que pasan por una tarjeta de red.','sniffer','router','firewall'),
Q_('¿Qué muestra la etapa de decodificación?','El contenido del tráfico con texto descriptivo','La temperatura del equipo','Las contraseñas del usuario')],
[Q_('¿Cuál NO forma parte de la infraestructura de un centro de datos?','Pantalla de cine','Sistema de aire acondicionado','Servidores'),
F_('En la prueba de ingesta de datos, ___ logró el mejor resultado.','InfluxDB','Elasticsearch','Excel'),
Q_('¿Qué pilas de monitoreo se compararon en el estudio?','Prometheus-Grafana, TICK, ELK y Azure Monitor','Solo Nagios y Zabbix','Windows, Linux y macOS'),
P_('Une cada concepto con su descripción.',['Fuga de memoria','El programa consume memoria sin liberarla'],['Algoritmo ineficiente','Procesa más de lo necesario'],['Azure Monitor','Monitoreo de recursos en la nube de Azure'],['Centro de datos','Alberga servidores y telecomunicaciones']),
Q_('¿Qué formato de datos usa principalmente Elasticsearch?','Documentos JSON','Series de tiempo','Imágenes'),
F_('Prometheus e InfluxDB son bases de datos de ___ de tiempo.','series','tablas','juegos'),
Q_('¿Qué conviene considerar al monitorear una infraestructura que crece?','El crecimiento futuro y los recursos disponibles','Solo el color del servidor','Nada: no cambia')]
];
const W=[
{n:'La Arena de las Motos de Luz',s:'QoS y QoE',bg:'img/tunel.png',ms:['Conceptos: QoS y QoE','Factores que degradan la calidad','Medir la experiencia: MOS y PESQ'],cut:[1,2],pz:'Disco de identidad'},
{n:'La Ciudad del Grid',s:'Monitoreo de infraestructura TI',bg:'img/moto-azul.png',ms:['Qué es monitorizar','Alertas y activos críticos','Herramientas: Nagios y agentes'],cut:[2,3],pz:'Casco de luz'},
{n:'La Torre de E/S',s:'Análisis de tráfico con Wireshark',bg:'img/moto-roja.png',ms:['Sniffers y modo promiscuo','Componentes y filtros','TCP en tres pasos'],cut:[2,4],pz:'Llave del portal'},
{n:'El Portal',s:'Infraestructura física y en la nube',bg:'img/tunel.png',ms:['El centro de datos','Pilas de monitoreo','Series de tiempo y la nube'],cut:[2,3],pz:'Corona del Grid'}
];
const S={g:0,w:0,k:0,s:0,xp:0,items:[],acts:[],done:0,n:4,r:0,slow:false,live:false,tries:0,sel:null,pairs:[],t:0,tq:20};
let ac,mu=true,mi,tm,tv,iv,ti=0;
const au=new Audio();au.volume=.5;
const $=q=>document.querySelector(q);
const cite=t=>t.replace(/\[(\d)\]/g,(x,n)=>'<a class="c" href="'+U[n-1]+'" target="_blank" rel="noopener" title="Abrir el artículo">['+n+']</a>');
const cur=()=>S.acts[S.s-1];
function beep(f,d,t,v){
if(!mu)return;
try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.type=t;o.frequency.value=f;g.gain.value=v;o.connect(g);g.connect(ac.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+d);o.stop(ac.currentTime+d)}catch(e){console.warn('Audio no disponible',e)}
}
function synth(){
let k=0;const sc=SCALES[ti%4];
mi=setInterval(()=>{beep(sc[k%8],.3,'sawtooth',.035);if(k%4===0)beep(sc[0]/2,.8,'square',.04);k++},250)
}
function music(on){
clearInterval(mi);clearTimeout(tm);au.pause();
if(!on)return;
const next=()=>{tm=setTimeout(()=>{ti++;music(mu)},60000)};
au.src='audio/pista'+(ti%4+1)+'.mp3';
const p=au.play();
if(p&&p.then)p.then(next).catch(()=>{if(mu){synth();next()}});else next()
}
function stage(h){const e=$('#stage');e.innerHTML=h;e.classList.remove('in');void e.offsetWidth;e.classList.add('in')}
function bg(w){
const u=w<0?['img/portada.jpg','img/moto-azul.png']:['img/mundo'+(w+1)+'.jpg',W[w].bg];
document.body.style.backgroundImage='linear-gradient(rgba(2,6,13,.55),rgba(2,6,13,.55)),'+u.map(x=>'url('+x+')').join(',')
}
function hud(){
$('#xp').textContent=S.xp;
$('#inv').textContent='🎒 Objetos: '+(S.items.length?S.items.join(' · '):'ninguno todavía')
}
function pop(t,c){const e=document.createElement('div');e.className='fl '+c;e.textContent=t;document.body.appendChild(e);setTimeout(()=>e.remove(),1400)}
function place(id,p){const e=$(id);e.style.left=p+'%';e.style.transform='translateX(-'+p+'%)'}
function upd(){
const p=S.done/S.n*100;
place('#rv',S.r);place('#me',p);
$('#tr1').style.width=S.r+'%';$('#tr2').style.width=p+'%';
$('#me').classList.toggle('slow',S.slow);
$('#sc').style.setProperty('--sp',S.slow?'1.4s':'.45s')
}
function spr(id,src){
const e=$(id),i=new Image();
i.alt='';i.onerror=()=>{e.innerHTML=ART.cycle};i.src=src;
e.innerHTML='';e.appendChild(i)
}
function build(){
const r=$('#race');r.hidden=false;
r.innerHTML='<div class="scene" id="sc"><div class="bgs" style="background-image:url('+W[S.w].bg+')"></div><div class="fx"></div><div class="lane l1"><i class="tr" id="tr1"></i><span class="cy rival" id="rv"></span></div><div class="lane l2"><i class="tr me" id="tr2"></i>'+Array.from({length:S.n},(_,i)=>'<b class="ob" id="ob'+i+'" style="left:'+((i+1)/S.n*100-6)+'%"></b>').join('')+'<span class="cy me" id="me"></span></div><i class="fin"></i></div><div class="tm"><i id="tb"></i></div><small>Tú: azul · Rival: rojo · Cada error o tiempo agotado: −'+PEN+' XP y el rival avanza +'+JMP+'%</small>';
spr('#me','img/moto-azul.png');spr('#rv','img/moto-roja.png');upd()
}
function tick(){
S.r=Math.min(100,S.r+100/((80-2*(S.w*3+S.k))*10));upd();
if(S.r>=100)lose()
}
function startQ(){
clearInterval(tv);
S.tq=cur().k==='m'?45:20;S.t=S.tq;
tv=setInterval(()=>{
S.t-=.1;$('#tb').style.width=Math.max(0,S.t/S.tq*100)+'%';
if(S.t<=0){clearInterval(tv);timeout()}
},100)
}
function mark(ok){const o=$('#ob'+(S.done-1));if(o)o.classList.add(ok?'ok':'bad')}
function fail(m){
S.xp=Math.max(0,S.xp-PEN);S.r=Math.min(100,S.r+JMP);S.slow=true;
pop(m+' −'+PEN+' XP · rival +'+JMP+'%','bad');beep(110,.35,'square',.06);hud();upd();
const c=$('#stage');c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake');
if(S.r>=100)lose()
}
function good(pts){
clearInterval(tv);
S.xp+=pts;S.done++;mark(true);
pop('+'+pts+' XP'+(S.slow?' · ¡recuperado! ⚡':''),'ok');
if(S.slow){S.slow=false;S.r=Math.max(0,S.r-3)}
beep(660,.12,'sine',.07);setTimeout(()=>beep(880,.15,'sine',.07),110);
if(S.done>=S.n)clearInterval(iv);
hud();upd();
$('#sc').style.setProperty('--sp','.2s');
setTimeout(()=>{if(S.live)upd()},1200)
}
function timeout(){
const a=cur();
document.querySelectorAll('[data-o],[data-l],[data-r]').forEach(x=>{x.disabled=true});
if(a.k!=='m'){
const c=document.querySelector('[data-o="'+a.a+'"]');if(c)c.classList.add('ok');
if(a.k==='f'){const s=$('#slot');s.textContent=a.o[a.a];s.classList.add('ok')}
}
S.done++;mark(false);
$('#fb').innerHTML='<p class="warn">⏱ Se acabó el tiempo: −'+PEN+' XP. '+(a.w||'')+'</p><button class="btn" data-go="next">Siguiente ▶</button>';
if(S.done>=S.n)clearInterval(iv);
fail('¡Tiempo agotado!')
}
function cover(){
bg(-1);$('#race').hidden=true;
stage('<div class="card ctr cover"><span class="tag">ARCADE EDUCATIVO</span><h2 class="big">LA RED DEL GRID</h2><p class="lead">Corre en motos de luz, responde bajo presión y recorre cuatro mundos para dominar la infraestructura de TI.</p><button class="btn" data-go="worlds">START</button></div>')
}
function worlds(){
clearInterval(iv);clearInterval(tv);S.live=false;$('#race').hidden=true;bg(-1);hud();
stage('<h3 class="ttl">Elige tu mundo</h3><div class="wg">'+W.map((x,i)=>{
const open=i*3<=S.g,dn=Math.max(0,Math.min(3,S.g-i*3));
return '<button class="wc'+(open?'':' lock')+'" data-w="'+i+'" style="background-image:linear-gradient(rgba(2,6,13,.4),rgba(2,6,13,.88)),url('+x.bg+')"'+(open?'':' disabled')+'><b>'+(open?'':'🔒 ')+x.n+'</b><span>'+x.s+'</span><small>'+dn+'/3 misiones</small></button>'
}).join('')+'</div>')
}
function missions(w){
S.w=w;bg(w);
stage('<h3 class="ttl">'+W[w].n+'</h3><p class="mu">'+W[w].s+'</p><div class="wg">'+W[w].ms.map((t,k)=>{
const g=w*3+k,open=g<=S.g;
return '<button class="wc'+(open?'':' lock')+'" data-k="'+k+'"'+(open?'':' disabled')+'><b>'+(g<S.g?'✔ ':open?'▶ ':'🔒 ')+'Misión '+(k+1)+'</b><span>'+t+'</span></button>'
}).join('')+'</div><button class="btn alt" data-go="worlds">◀ Mundos</button>')
}
function theory(w,k){
S.w=w;S.k=k;bg(w);
const b=[0,W[w].cut[0],W[w].cut[1],99],th=M[w].th.slice(b[k],b[k+1]);
stage('<div class="card th"><img class="side" src="'+W[w].bg+'" alt=""><div><h2>Misión '+(k+1)+': '+W[w].ms[k]+'</h2><h3>'+W[w].n+'</h3>'+th.map(p=>'<p>'+cite(p)+'</p>').join('')+'<p class="prize">🏆 Gana la carrera para completar la misión'+(k===2?' y obtener: <b>'+W[w].pz+'</b>':'')+'.</p><p>Cada pregunta es un obstáculo con tiempo límite: si fallas pierdes '+PEN+' XP, tu moto se frena y el rival avanza '+JMP+'%; si aciertas, te recuperas.</p><button class="btn" data-go="start">Iniciar carrera ▶</button> <button class="btn alt" data-w="'+w+'">◀ Misiones</button></div></div>')
}
function countdown(){
clearInterval(iv);clearInterval(tv);$('#race').hidden=true;
S.acts=M[S.w].a.concat(X[S.w]).slice(S.k*4,S.k*4+4);S.n=S.acts.length;
let n=3;
stage('<div class="card ctr"><h3>Preparados en la línea de salida</h3><div class="cd" id="cd">3</div></div>');
beep(440,.2,'square',.05);
const c=setInterval(()=>{
n--;
if(n>0){$('#cd').textContent=n;beep(440,.2,'square',.05)}
else if(n===0){$('#cd').textContent='¡GO!';beep(880,.4,'square',.06)}
else{clearInterval(c);S.s=1;S.done=0;S.r=0;S.slow=false;S.live=true;build();iv=setInterval(tick,100);render()}
},800)
}
const hd=a=>'Pregunta '+S.s+'/'+S.n+(a.k==='f'?' · Completa la palabra':a.k==='m'?' · Une con líneas':'');
function choose(a){
const q=a.k==='f'?a.q.replace('___','<span id="slot" class="slot">_____</span>'):a.q;
const ord=a.o.map((_,i)=>i).sort(()=>Math.random()-.5);
stage('<div class="card"><h3>'+hd(a)+'</h3><p class="q">'+q+'</p><div class="opts">'+ord.map(i=>'<button class="opt" data-o="'+i+'">'+a.o[i]+'</button>').join('')+'</div><div id="fb"></div></div>')
}
function matchUI(a){
S.sel=null;S.pairs=[];
const order=a.p.map((p,i)=>[p[1],i]).sort(()=>Math.random()-.5);
stage('<div class="card"><h3>'+hd(a)+'</h3><p class="q">'+a.q+'</p><div class="mt" id="mt"><svg id="ln"></svg><div class="col">'+a.p.map((p,i)=>'<button class="opt" data-l="'+i+'">'+p[0]+'</button>').join('')+'</div><div class="col">'+order.map(o=>'<button class="opt" data-r="'+o[1]+'">'+o[0]+'</button>').join('')+'</div></div><div id="fb"></div></div>')
}
function draw(){
const mt=$('#mt');if(!mt)return;
const r=mt.getBoundingClientRect();
$('#ln').innerHTML=S.pairs.map(p=>{
const A=document.querySelector('[data-l="'+p[0]+'"]').getBoundingClientRect();
const B=document.querySelector('[data-r="'+p[1]+'"]').getBoundingClientRect();
return '<line x1="'+(A.right-r.left)+'" y1="'+(A.top+A.height/2-r.top)+'" x2="'+(B.left-r.left)+'" y2="'+(B.top+B.height/2-r.top)+'"/>'
}).join('')
}
function pick(b){
if(!S.live)return;
const a=cur(),i=+b.dataset.o;
if(i===a.a){
document.querySelectorAll('[data-o]').forEach(x=>{x.disabled=true});
b.classList.add('ok');
if(a.k==='f'){const s=$('#slot');s.textContent=a.o[a.a];s.classList.add('ok')}
$('#fb').innerHTML='<p class="good">✔ '+(a.w||'¡Correcto!')+'</p><button class="btn" data-go="next">Siguiente ▶</button>';
good(S.tries?50:100)
}else{
S.tries++;b.disabled=true;b.classList.add('bad');
$('#fb').innerHTML='<p class="warn">✖ No es esa: −'+PEN+' XP. Prueba otra opción.</p>';
fail('Obstáculo')
}
}
function left(b){
if(!S.live||b.disabled)return;
document.querySelectorAll('[data-l]').forEach(x=>x.classList.remove('sel'));
S.sel=+b.dataset.l;b.classList.add('sel')
}
function right(b){
if(!S.live||S.sel===null||b.disabled)return;
const j=+b.dataset.r,lb=document.querySelector('[data-l="'+S.sel+'"]');
if(S.sel===j){
lb.disabled=true;b.disabled=true;lb.classList.remove('sel');lb.classList.add('ok');b.classList.add('ok');
S.pairs.push([S.sel,j]);S.sel=null;draw();
if(S.pairs.length===cur().p.length){
$('#fb').innerHTML='<p class="good">✔ ¡Todas las conexiones son correctas!</p><button class="btn" data-go="next">Siguiente ▶</button>';
good(150)
}
}else{
lb.classList.remove('sel');S.sel=null;b.classList.add('bad');
setTimeout(()=>b.classList.remove('bad'),500);
fail('Obstáculo')
}
}
function win(){
S.live=false;clearInterval(iv);clearInterval(tv);$('#race').hidden=true;
const w=S.w,k=S.k,last=k===2,fin=w===3&&last;
S.xp+=200;if(w*3+k===S.g)S.g++;
if(last&&!S.items.includes(W[w].pz))S.items.push(W[w].pz);
hud();
stage('<div class="card ctr"><div class="ico big">'+ART[M[w].ic]+'</div><h2>MISIÓN '+(k+1)+': COMPLETADA</h2><p class="lead">'+W[w].ms[k]+'</p><p>+200 XP'+(last?' · Objeto: <b class="rank">'+W[w].pz+'</b>':'')+'</p>'+(last?'<p>¡Mundo completado!'+(fin?'':' Se desbloqueó el siguiente.')+'</p>':'')+'<button class="btn" data-go="'+(fin?'end':last?'worlds':'nextm')+'">'+(fin?'Ver resultado final':last?'Ir al mapa de mundos':'Siguiente misión')+' ▶</button></div>');
[1,1.25,1.5,2].forEach((f,i)=>setTimeout(()=>beep(523*f,.25,'triangle',.08),i*180))
}
function lose(){
S.live=false;clearInterval(iv);clearInterval(tv);
stage('<div class="card ctr"><h2>El rival cruzó la meta</h2><p>Perdiste la carrera, pero puedes intentarlo otra vez. Responde más rápido y evita los errores.</p><button class="btn" data-go="again">Reintentar carrera</button> <button class="btn alt" data-go="worlds">Mapa de mundos</button></div>');
beep(90,.6,'sawtooth',.07)
}
function end(){
$('#race').hidden=true;bg(-1);
const rank=S.xp>=5500?'Usuario Maestro':S.xp>=4000?'Programa Élite':'Aprendiz del Grid';
stage('<div class="card ctr"><div class="ico big">'+ART.disc+'</div><h2>Has restaurado el Grid</h2><p class="rank">'+rank+' · '+S.xp+' XP</p><p>Objetos: '+S.items.join(' · ')+'</p><p>Revisa las referencias al final de la página.</p><button class="btn" data-go="restart">Jugar de nuevo</button></div>')
}
function render(){
hud();
const a=cur();
if(!a)return win();
S.tries=0;
if(a.k==='m')matchUI(a);else choose(a);
startQ()
}
$('#stage').addEventListener('click',e=>{
const b=e.target.closest('button');if(!b)return;
const d=b.dataset,g=d.go;
if(g==='worlds')worlds();
else if(g==='next'){S.s++;render()}
else if(g==='start'||g==='again')countdown();
else if(g==='nextm')theory(S.w,S.k+1);
else if(g==='end')end();
else if(g==='restart'){S.g=0;S.xp=0;S.items=[];hud();worlds()}
else if(d.w!==undefined)missions(+d.w);
else if(d.k!==undefined)theory(S.w,+d.k);
else if(d.o!==undefined)pick(b);
else if(d.l!==undefined)left(b);
else if(d.r!==undefined)right(b)
});
$('#snd').addEventListener('click',e=>{
e.stopPropagation();mu=!mu;
e.currentTarget.textContent=mu?'🔊':'🔇';
e.currentTarget.setAttribute('aria-pressed',String(!mu));
music(mu)
});
$('#home').addEventListener('click',worlds);
document.addEventListener('click',()=>{if(mu)music(true)},{once:true});
window.addEventListener('resize',draw);
$('#cyc').innerHTML=ART.cycle;
$('.pen').textContent='Cada error: −'+PEN+' XP';
$('#refs').innerHTML=R.map((r,i)=>'<p>['+(i+1)+'] '+r+' <a href="'+U[i]+'" target="_blank" rel="noopener">Abrir artículo ↗</a></p>').join('');
hud();cover();