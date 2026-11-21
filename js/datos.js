// Contenido académico del juego (teoría, preguntas y referencias IEEE).
// MISIONES: una por sector; 'th' = teoría con citas [n], 'a' = preguntas base.
// Tipos de pregunta: k:'q' opción múltiple, k:'f' completar, k:'m' unir con líneas.
// PREGUNTAS_EXTRA: 7 preguntas más por sector. Q_/F_/P_ son atajos para crearlas (la respuesta correcta es siempre la primera opción y se baraja al mostrarla).

const REFERENCIAS=[
'M. I. Quintero Martínez y S. A. Tovar Balderas, “Monitorización de infraestructura tecnológica como mejora en centros de datos,” TIES, Revista de Tecnología e Innovación en Educación Superior, n.º 3, abr. 2021, doi: 10.22201/dgtic.26832968e.2021.3.2.',
'S. A. Alvernia Acevedo y D. Rico Bautista, “Análisis de una red en un entorno IPv6: una mirada desde las intrusiones de red y el modelo TCP/IP,” Revista Colombiana de Tecnologías de Avanzada, vol. 1, n.º 29, pp. 81–91, 2017.',
'C. E. Gordillo, B. Florian-Gaviria y E. M. Aristizábal, “Estudio de plataformas de monitoreo para seleccionar la pila tecnológica base de un sistema de analíticas especializado para pruebas de software,” Ingeniería y Competitividad, vol. 24, n.º 1, p. e201811086, ene.–jul. 2022, doi: 10.25100/iyc.v24i1.11086.',
'J. Joskowicz y R. Sotelo, “Medida de la calidad de voz en redes IP,” Universidad de Montevideo, Montevideo, Uruguay, s. f. [En línea]. Disponible: https://revistas.um.edu.uy/index.php/ingenieria/article/download/252/311/801'
];
const URLS=[
'https://www.ties.unam.mx/num03/pdf/Monitorizacion.pdf',
'https://core.ac.uk/download/230756387.pdf',
'https://dialnet.unirioja.es/descarga/articulo/8637734.pdf',
'https://revistas.um.edu.uy/index.php/ingenieria/article/download/252/311/801'
];
const MISIONES=[
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
const Q_=(q,...o)=>({k:'q',q,o,a:0}),F_=(q,...o)=>({k:'f',q,o,a:0}),P_=(q,...p)=>({k:'m',q,p});
const PREGUNTAS_EXTRA=[
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
