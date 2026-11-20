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
const M=[
{t:'Misión 1 · Semana 6',n:'Calidad en el Grid: QoS y QoE',ic:'cycle',
th:[
'La calidad de experiencia (QoE) mide qué tan bien un servicio de red satisface las expectativas y necesidades que percibe el usuario, mientras que la calidad de servicio (QoS) es la medida técnica del rendimiento de la red y la posibilidad de gestionarla para cumplir las prestaciones que exigen las aplicaciones [4].',
'Las degradaciones que sufre el usuario pueden deberse a retardos, jitter (diferencia de retardos) y pérdida de paquetes; también influyen el códec, el eco y el tamaño de los paquetes [4].',
'Los métodos subjetivos recogen la opinión directa de los usuarios y se resumen en el MOS, un promedio de calificaciones de 1 a 5, pero son caros y lentos porque requieren un panel numeroso. Los métodos objetivos miden propiedades de la red para estimar lo que percibiría el usuario y pueden ser intrusivos, como PESQ, o no intrusivos, como P.563 [4].',
'El modelo E de la ITU calcula, a partir de parámetros medibles de la red, un valor R que puede relacionarse con el MOS [4].'],
a:[
{k:'q',q:'¿Cuál describe mejor la QoE?',o:['La medida técnica del rendimiento de la red','Qué tan bien un servicio satisface las expectativas y necesidades del usuario','El ancho de banda contratado con el proveedor'],a:1,w:'La QoE refleja la percepción del usuario; la QoS es la medida técnica.'},
{k:'q',q:'¿Qué método objetivo inyecta una señal conocida y estudia su degradación?',o:['P.563','MOS subjetivo','PESQ','Nagios'],a:2,w:'PESQ es intrusivo: necesita enviar un audio conocido. P.563 no usa señal de referencia.'},
{k:'m',q:'Une cada concepto con su descripción.',p:[['MOS','Promedio de opiniones de usuarios en escala de 1 a 5'],['Jitter','Variación en los retardos de los paquetes'],['PESQ','Método objetivo intrusivo'],['P.563','Método objetivo sin señal de referencia']]},
{k:'f',q:'El modelo E calcula un parámetro ___ que se relaciona con el MOS.',o:['Q','R','Z'],a:1,w:'El parámetro R del modelo E se relaciona con el MOS.'}]},
{t:'Misión 2 · Semana 7',n:'Vigilando la ciudad: monitoreo de TI',ic:'city',
th:[
'Un sistema de monitorización es uno o más sistemas que vigilan la presencia de fallas en otros sistemas y pueden enviar alertas para detectar problemas antes de que se produzca una crisis [1].',
'Su fin es mantener una vigilancia constante de la disponibilidad y la utilización de recursos; además, los datos históricos permiten ver tendencias y planear la renovación o actualización de la infraestructura [1].',
'Conviene priorizar primero los activos críticos y generar información útil, no solo datos; un exceso de alertas termina siendo ignorado y se trata como falsos positivos [1].',
'Nagios es un sistema libre y modular que trabaja con plugins, se configura con archivos de texto y realiza revisiones programadas; entre sus limitaciones están una interfaz base simple y la falta de descubrimiento automático de dispositivos [1].',
'Un agente de recolección capta información de las entidades monitoreadas y la reporta a intervalos regulares; esas entradas se transforman en métricas que se almacenan como series de tiempo [3].'],
a:[
{k:'q',q:'¿Qué conviene hacer primero al implementar un sistema de monitorización?',o:['Instalar alertas en todos los equipos','Priorizar y ordenar los activos críticos','Comprar la herramienta más cara'],a:1,w:'No se puede vigilar todo: primero se monitorizan los activos de mayor criticidad.'},
{k:'q',q:'¿Qué ocurre cuando se configuran demasiadas alertas?',o:['Mejora la disponibilidad','Se reducen los datos recolectados','Terminan ignoradas y tratadas como falsos positivos'],a:2,w:'La saturación de alertas hace que el personal deje de actuar.'},
{k:'m',q:'Une cada término con su significado.',p:[['Nagios Core','Sistema libre y modular que opera con plugins'],['Plugin','Programa que hace una revisión específica en equipos remotos'],['SIEM','Recopila y correlaciona eventos de varias fuentes'],['Información','Conjunto de datos con proceso y significado para el destinatario']]},
{k:'f',q:'Un sistema de monitorización vigila la presencia de ___ en otros sistemas.',o:['usuarios','fallas','licencias'],a:1,w:'Su función es vigilar fallas y alertar antes de una crisis.'}]},
{t:'Misión 3 · Semana 8',n:'Interceptando el tráfico: Wireshark',ic:'disc',
th:[
'Wireshark es un analizador de paquetes de software libre que identifica más de mil protocolos y muestra los campos relevantes de cada paquete capturado [2].',
'Un sniffer captura los datos que pasan por una tarjeta de red; para ver todos los paquetes y no solo los propios, la tarjeta se configura en modo promiscuo [2].',
'Un sniffer se compone de hardware, controladores de captura, un buffer que almacena los datos y una etapa de decodificación que muestra el contenido con texto descriptivo [2].',
'Wireshark ofrece un lenguaje para la captura y otro para la visualización, con filtros por protocolo, campo o valor; así el administrador se concentra en los paquetes de interés y detecta bajo desempeño o conectividad intermitente [2].',
'En TCP la conexión se establece en tres pasos: SYN del cliente, SYN+ACK del servidor y ACK final del cliente [2].'],
a:[
{k:'q',q:'¿Qué modo de la tarjeta de red permite recibir todos los paquetes?',o:['Modo promiscuo','Modo no promiscuo','Modo seguro'],a:0,w:'En modo promiscuo la NIC acepta paquetes aunque no vayan dirigidos a ella.'},
{k:'q',q:'¿Cuáles son los tres pasos de una conexión TCP?',o:['ACK, FIN, SYN','SYN, SYN+ACK, ACK','SYN, ACK, RST'],a:1,w:'Es el saludo de tres vías: SYN, SYN+ACK y ACK.'},
{k:'m',q:'Une cada componente con su función.',p:[['Controladores de captura','Capturan el tráfico del cable, lo filtran y lo guardan'],['Buffer','Almacena los datos capturados de la red'],['Decodificación','Muestra el tráfico con texto descriptivo'],['Filtro de visualización','Oculta paquetes según protocolo, campo o valor']]},
{k:'f',q:'Wireshark es un software ___ que identifica más de mil protocolos.',o:['propietario','libre','de pago'],a:1,w:'Wireshark es de software libre y código abierto.'}]},
{t:'Misión 4 · Semana 9',n:'Evaluando el núcleo: infraestructura física y nube',ic:'chip',
th:[
'La infraestructura de un centro de datos incluye sistemas eléctrico y de aire acondicionado, seguridad física y lógica, y equipos como servidores y telecomunicaciones [1].',
'Al diseñar la monitorización de esa infraestructura hay que considerar los activos críticos, el ancho de banda entre ubicaciones, los recursos disponibles y el crecimiento futuro [1].',
'Las fallas de desempeño de las aplicaciones suelen venir de algoritmos ineficientes, fugas de memoria o poco poder de cómputo del hardware donde se alojan [3].',
'Un estudio comparó cuatro pilas de monitoreo (Prometheus con Grafana, TICK, ELK y Azure Monitor) con pruebas de ingesta de datos; Azure Monitor resultó ideal para recursos alojados en la nube de Azure, pero no para esa plataforma en particular [3].',
'Prometheus e InfluxDB son bases de datos de series de tiempo, adecuadas para métricas; Elasticsearch, orientada a documentos JSON, puede consumir más memoria y elevar costos, y en la prueba InfluxDB logró la mejor ingesta [3].'],
a:[
{k:'q',q:'¿Para qué resultó más adecuado Azure Monitor en el estudio de plataformas?',o:['Capturar paquetes de red','Monitorear recursos alojados en la nube de Azure','Almacenar documentos JSON'],a:1,w:'Se concluyó que es ideal para recursos en Azure, no para esa plataforma concreta.'},
{k:'q',q:'¿Qué tipo de base de datos es InfluxDB?',o:['De series de tiempo','De documentos JSON','De grafos'],a:0,w:'InfluxDB y Prometheus están optimizadas para métricas en series de tiempo.'},
{k:'m',q:'Une cada herramienta con su rol.',p:[['Prometheus','Base de datos de series de tiempo para métricas'],['Elasticsearch','Base NoSQL orientada a documentos JSON'],['Kapacitor','Alertas y detección de anomalías en la pila TICK'],['Grafana','Visualización de métricas en tableros']]},
{k:'f',q:'Un bajo poder de cómputo a nivel de ___ puede causar fallas de desempeño.',o:['hardware','papel','teclado'],a:0,w:'El hardware de los servidores influye directamente en el desempeño.'}]}
];
const S={m:0,s:0,xp:0,en:100,sel:null,pairs:[],tries:0};
const $=q=>document.querySelector(q);
const cite=t=>t.replace(/\[(\d)\]/g,(x,n)=>'<span class="c" title="'+R[n-1].slice(0,95)+'…">['+n+']</span>');
const cur=()=>M[S.m].a[S.s-1];
function stage(h){const e=$('#stage');e.innerHTML=h;e.classList.remove('in');void e.offsetWidth;e.classList.add('in')}
function hud(){
$('#xp').textContent=S.xp;
$('#bar').style.width=S.en+'%';
$('#map').innerHTML=M.map((x,i)=>'<div class="node '+(i<S.m?'done':i===S.m?'now':'')+'">'+ART[x.ic]+'<br>SEMANA '+(6+i)+'</div>').join('')
}
function hit(){
S.en=Math.max(0,S.en-20);hud();
const e=$('#stage');e.classList.remove('shake');void e.offsetWidth;e.classList.add('shake');
if(S.en===0)setTimeout(over,450)
}
function over(){
S.s=0;
stage('<div class="card ctr"><h2>Energía agotada</h2><p>El sistema se reinició. Repasa la teoría de la misión y vuelve a intentarlo.</p><button class="btn" data-go="retry">Reintentar misión</button></div>')
}
function theory(mi){
stage('<div class="card"><div class="ico">'+ART[mi.ic]+'</div><h2>'+mi.t+'</h2><h3>'+mi.n+'</h3>'+mi.th.map(p=>'<p>'+cite(p)+'</p>').join('')+'<button class="btn" data-go="next">Entrar al reto ▶</button></div>')
}
function choose(a){
const q=a.k==='f'?a.q.replace('___','<span id="slot" class="slot">_____</span>'):a.q;
stage('<div class="card"><h3>'+(a.k==='f'?'Completa la palabra':'Pregunta')+'</h3><p class="q">'+q+'</p><div class="opts">'+a.o.map((t,i)=>'<button class="opt" data-o="'+i+'">'+t+'</button>').join('')+'</div><div id="fb"></div></div>')
}
function matchUI(a){
S.sel=null;S.pairs=[];
const order=a.p.map((p,i)=>[p[1],i]).sort(()=>Math.random()-.5);
stage('<div class="card"><h3>Une con líneas</h3><p class="q">'+a.q+'</p><div class="mt" id="mt"><svg id="ln"></svg><div class="col">'+a.p.map((p,i)=>'<button class="opt" data-l="'+i+'">'+p[0]+'</button>').join('')+'</div><div class="col">'+order.map(o=>'<button class="opt" data-r="'+o[1]+'">'+o[0]+'</button>').join('')+'</div></div><div id="fb"></div></div>')
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
const a=cur(),i=+b.dataset.o;
if(i===a.a){
S.xp+=S.tries?50:100;
document.querySelectorAll('[data-o]').forEach(x=>{x.disabled=true});
b.classList.add('ok');
if(a.k==='f'){const s=$('#slot');s.textContent=a.o[a.a];s.classList.add('ok')}
$('#fb').innerHTML='<p class="good">✔ '+a.w+'</p><button class="btn" data-go="next">Siguiente ▶</button>';
hud()
}else{
S.tries++;b.disabled=true;b.classList.add('bad');
$('#fb').innerHTML='<p class="warn">✖ No es esa. Prueba otra opción.</p>';
hit()
}
}
function left(b){
if(b.disabled)return;
document.querySelectorAll('[data-l]').forEach(x=>x.classList.remove('sel'));
S.sel=+b.dataset.l;b.classList.add('sel')
}
function right(b){
if(S.sel===null||b.disabled)return;
const j=+b.dataset.r,lb=document.querySelector('[data-l="'+S.sel+'"]');
if(S.sel===j){
lb.disabled=true;b.disabled=true;lb.classList.remove('sel');lb.classList.add('ok');b.classList.add('ok');
S.pairs.push([S.sel,j]);S.sel=null;draw();
if(S.pairs.length===cur().p.length){
S.xp+=150;hud();
$('#fb').innerHTML='<p class="good">✔ ¡Todas las conexiones son correctas!</p><button class="btn" data-go="next">Siguiente ▶</button>'
}
}else{
lb.classList.remove('sel');S.sel=null;b.classList.add('bad');
setTimeout(()=>b.classList.remove('bad'),500);
hit()
}
}
function done(mi){
S.xp+=200;hud();
stage('<div class="card ctr"><div class="ico big">'+ART[mi.ic]+'</div><h2>Misión superada</h2><p>'+mi.n+' completada. +200 XP de bonificación.</p><button class="btn" data-go="nextm">'+(S.m===M.length-1?'Ver resultado final':'Siguiente misión')+' ▶</button></div>')
}
function end(){
const rank=S.xp>=2300?'Usuario Maestro':S.xp>=1700?'Programa Élite':'Aprendiz del Grid';
stage('<div class="card ctr"><div class="ico big">'+ART.disc+'</div><h2>Has restaurado el Grid</h2><p class="rank">'+rank+' · '+S.xp+' XP</p><p>Completaste las cuatro misiones. Revisa las referencias IEEE al final de la página.</p><button class="btn" data-go="restart">Jugar de nuevo</button></div>')
}
function render(){
hud();
if(S.m>=M.length)return end();
const mi=M[S.m];
if(S.s===0)return theory(mi);
const a=mi.a[S.s-1];
if(!a)return done(mi);
S.tries=0;
if(a.k==='m')matchUI(a);else choose(a)
}
$('#stage').addEventListener('click',e=>{
const b=e.target.closest('button');if(!b)return;
const g=b.dataset.go;
if(g==='next'){S.s++;render()}
else if(g==='nextm'){S.m++;S.s=0;render()}
else if(g==='retry'){S.en=100;S.s=0;render()}
else if(g==='restart'){S.m=0;S.s=0;S.xp=0;S.en=100;render()}
else if(b.dataset.o!==undefined)pick(b);
else if(b.dataset.l!==undefined)left(b);
else if(b.dataset.r!==undefined)right(b)
});
window.addEventListener('resize',draw);
$('#cyc').innerHTML=ART.cycle;
$('#refs').innerHTML=R.map((r,i)=>'<p>['+(i+1)+'] '+r+'</p>').join('');
render();
