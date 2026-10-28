// Genera páginas de propuesta (borradores) para los servicios de Integra-IO.
// Uso: node scripts/generar-propuestas.mjs
// Escribe en propuestas/ (fuera de public/ a propósito: son borradores, no se despliegan).
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'propuestas');

const MAIL = 'contacto@integra-io.com';
const TEL_DISPLAY = '222 544 7232';
const TEL_TEL = 'tel:+522225447232';
const TEL_WA = 'https://wa.me/522225447232';

// Las páginas públicas llevan la foto del hero embebida en base64 (autocontenidas en producción)
const IMG_MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png' };
const heroImgUri = (s) => {
  if (!s.publico) return IMGS[s.slug].file;
  const file = join(ROOT, 'propuestas', IMGS[s.slug].file);
  return `data:${IMG_MIME[extname(file)] || 'image/jpeg'};base64,` + readFileSync(file).toString('base64');
};

const servicios = [
  {
    slug: 'cableado-estructurado',
    nombre: 'Cableado Estructurado',
    acc: '#3b82f6',
    accDim: 'rgba(59,130,246,.14)',
    eyebrow: 'Certificación Fluke · garantía de fabricante 5 años',
    h1: 'Redes de cobre y fibra listas para auditar',
    lead: 'Instalación certificada Cat6A/Cat7 y fibra óptica para oficinas, plantas y desarrollos, con pruebas por punto y documentación completa de entrega.',
    notes: ['Reporte Fluke por cada enlace instalado', 'Etiquetado y planos as-built incluidos'],
    mockTitle: 'REPORTE DE CERTIFICACIÓN · ENLACE 014',
    mock: `
      <div class="mterm">
        FLUKE DSX · CAT6A U/FTP · 10 Gb/s<br>
        WIRE MAP .......... <span class="ok">PASS</span><br>
        NEXT .............. <span class="ok">PASS</span><br>
        RETURN LOSS ....... <span class="ok">PASS</span><br>
        PROP. DELAY ....... <span class="ok">PASS</span><br>
        RESULTADO ......... <span class="ok">PASS ✓</span>
      </div>
      <div class="mtile-grid">
        <div class="mtile"><b>96</b><span>enlaces certificados</span></div>
        <div class="mtile"><b>0</b><span>fallas de enlace</span></div>
        <div class="mtile"><b>100%</b><span>documentado</span></div>
      </div>`,
    trust: [
      ['Cat6A / Cat7', 'hasta 10 Gbps certificables'],
      ['Fibra OS1 / OM4', 'fusión y certificación óptica'],
      ['Fluke DSX', 'reporte digital por punto'],
      ['TIA-606', 'etiquetado estándar'],
    ],
    features: [
      { tag: 'DISEÑO', t: 'Topología y presupuesto', p: 'Levantamiento de puntos, planos de ruta y lista de material por separado antes de tender un solo metro.' },
      { tag: 'INSTALACIÓN', t: 'Tendido limpio y etiquetado', p: 'Canaleta, bandeja y registro ordenados; cada cable identificado en ambos extremos desde el día uno.' },
      { tag: 'CERTIFICACIÓN', t: 'Pruebas Fluke por enlace', p: 'Cada enlace se prueba y se entrega su reporte digital; si no pasa, no se entrega.' },
      { tag: 'FIBRA ÓPTICA', t: 'Fusión y certificación', p: 'Empalmes por fusión, certificación con OTDR y reflectogramas archivados.' },
      { tag: 'DOCUMENTACIÓN', t: 'As-built y memoria técnica', p: 'Planos finales, matriz de conexiones y etiquetado TIA-606 para mantenimiento futuro.' },
      { tag: 'GARANTÍA', t: 'Respaldo de fabricante', p: 'Hasta 5 años de garantía de canal con los componentes y prácticas certificados.' },
    ],
    steps: [
      { t: 'Levantamiento y diseño', p: 'Visitamos el sitio, definimos puntos y rutas, y entregamos plano y presupuesto cerrado.' },
      { t: 'Tendido y terminación', p: 'Instalación por etapas para no detener tu operación, con limpieza diaria de área.' },
      { t: 'Certificación y entrega', p: 'Pruebas por enlace, planos as-built, reportes digitales y capacitación de 30 minutos.' },
    ],
    highlight: {
      h2: 'Una entrega que sostiene a tu siguiente auditoría',
      p: 'El trabajo no termina cuando el cable está tendado: termina cuando cualquier técnico puede entender la red sin llamarte.',
      list: [
        'Reporte digital de certificación por cada enlace',
        'Planos as-built y matriz de conexiones',
        'Garantía de canal de fabricante registrada',
      ],
      panelTitle: 'LO QUE RECIBES',
      panel: `
        <div class="row"><span class="k">Reportes Fluke</span><span class="v">PDF + formato digital</span></div>
        <div class="row"><span class="k">Planos as-built</span><span class="v">DWG / PDF</span></div>
        <div class="row"><span class="k">Etiquetado</span><span class="v">TIA-606-C</span></div>
        <div class="row"><span class="k">Garantía de canal</span><span class="v">5 años</span></div>`,
    },
    ctaSubject: 'Cotización cableado estructurado',
  },
  {
    slug: 'redes-informaticas',
    nombre: 'Redes Informáticas',
    acc: '#8b5cf6',
    accDim: 'rgba(139,92,246,.14)',
    eyebrow: 'WiFi 6/E · segmentación · SD-WAN',
    h1: 'WiFi y LAN empresarial de alta densidad',
    lead: 'Diseño e implementación de redes cableadas e inalámbricas que aguantan tu operación crítica: segmentación por VLAN, SD-WAN entre sucursales y monitoreo continuo.',
    notes: ['Site survey antes de instalar', 'Interoperable con tu equipo existente'],
    mockTitle: 'TOPOLOGÍA RED · TIEMPO REAL',
    mock: `
      <svg class="topo" viewBox="0 0 480 360" role="img" aria-label="Diagrama: matriz y tres sucursales conectadas por SD-WAN y monitoreadas en línea">
        <path class="ln" d="M240 180 L90 80"/><path class="ln" d="M240 180 L390 80"/><path class="ln" d="M240 180 L90 280"/><path class="ln" d="M240 180 L390 280"/>
        <rect class="core" x="198" y="150" width="84" height="60" rx="8"/>
        <text x="240" y="176" text-anchor="middle">SD-WAN</text><text x="240" y="194" text-anchor="middle">Monitoreo</text>
        <g><rect class="nd" x="40" y="55" width="100" height="50" rx="8"/><text x="90" y="85" text-anchor="middle">Matriz</text><circle class="ok" cx="128" cy="67" r="5"/></g>
        <g><rect class="nd" x="340" y="55" width="100" height="50" rx="8"/><text x="390" y="85" text-anchor="middle">Sucursal A</text><circle class="ok" cx="428" cy="67" r="5"/></g>
        <g><rect class="nd" x="40" y="255" width="100" height="50" rx="8"/><text x="90" y="285" text-anchor="middle">Sucursal B</text><circle class="ok" cx="128" cy="267" r="5"/></g>
        <g><rect class="nd" x="340" y="255" width="100" height="50" rx="8"/><text x="390" y="285" text-anchor="middle">Sucursal C</text><circle class="ok" cx="428" cy="267" r="5"/></g>
        <text x="240" y="346" text-anchor="middle" style="font-weight:500;font-size:12px">Todos los enlaces en línea</text>
      </svg>
      <div class="mrow"><span>SSID Corporativa · WPA3-Enterprise</span><span class="st st-ok">ACTIVA</span></div>
      <div class="mrow"><span>SD-WAN · 3 sucursales interconectadas</span><span class="st st-info">MONITOREO</span></div>`,
    trust: [
      ['WiFi 6/E', 'alta densidad de usuarios'],
      ['VLAN', 'segmentación por área'],
      ['VPN', 'acceso remoto seguro'],
      ['SD-WAN', 'sucursales interconectadas'],
    ],
    features: [
      { tag: 'DIAGNÓSTICO', t: 'Site survey inalámbrico', p: 'Medición de cobertura e interferencias en sitio para colocar cada AP donde rinde, no donde alcanza.' },
      { tag: 'WIFI', t: 'Cobertura de alta densidad', p: 'WiFi 6/E para oficinas, almacenes y áreas públicas con roaming continuo entre access points.' },
      { tag: 'SEGURIDAD', t: 'Segmentación VLAN', p: 'Cámaras, invitados, punto de venta y operación en redes separadas. Si un equipo falla o se infecta, el problema no se propaga.' },
      { tag: 'VPN', t: 'Acceso remoto seguro', p: 'Túneles cifrados para quienes trabajan fuera de la oficina y entre sedes, con usuarios y permisos controlados.' },
      { tag: 'MULTISUCURSAL', t: 'SD-WAN gestionado', p: 'Varios enlaces de internet por sede con failover automático y priorización de tráfico crítico.' },
      { tag: 'OPERACIÓN', t: 'Monitoreo 24/7', p: 'Vigilamos enlaces, equipos y consumo; te avisamos de una falla antes de que tu equipo la note.' },
    ],
    steps: [
      { t: 'Diagnóstico', p: 'Visitamos tus instalaciones, medimos cobertura e interferencias y revisamos lo que ya tienes.' },
      { t: 'Diseño', p: 'Mapa de cobertura, plan de VLANs, lista de equipo y presupuesto cerrado.' },
      { t: 'Instalación', p: 'Configuración y montaje por etapas, con ventana de corte mínima o nula.' },
      { t: 'Monitoreo y ajustes', p: 'Vigilancia continua, alertas tempranas y ajuste de cobertura según el uso real.' },
    ],
    highlight: {
      h2: 'Una red que se explica sola cuando algo falla',
      p: 'Segmentación clara y monitoreo continuo convierten los "se cayó el internet" en un dato concreto con responsable y tiempo de respuesta.',
      list: [
        'Mapa de red y plan de VLANs documentado',
        'Alertas automáticas a tu correo o chat',
        'Reporte mensual de uso y disponibilidad',
      ],
      panelTitle: 'SEGMENTOS TÍPICOS',
      panel: `
        <div class="row"><span class="k">Operación</span><span class="v">VLAN 10 · acceso total</span></div>
        <div class="row"><span class="k">Invitados</span><span class="v">VLAN 20 · solo internet</span></div>
        <div class="row"><span class="k">CCTV</span><span class="v">VLAN 30 · aislada</span></div>
        <div class="row"><span class="k">IoT / acceso</span><span class="v">VLAN 40 · restringida</span></div>`,
    },
    why: {
      title: 'Sucursales conectadas como si fueran una sola oficina',
      lead: 'Con SD-WAN y VPN todas tus sedes comparten sistemas, telefonía y archivos con la misma seguridad.',
      items: [
        { t: 'Si un enlace falla, otro lo cubre', p: 'El tráfico cambia de internet en segundos, sin llamadas al proveedor.' },
        { t: 'Una sola política para todas las sedes', p: 'Reglas de seguridad y acceso administradas desde un panel central.' },
        { t: 'Prioridad a lo importante', p: 'Videollamadas, punto de venta y sistemas internos van primero.' },
      ],
    },
    faq: [
      { q: '¿Qué es una VLAN y para qué sirve en mi empresa?', a: 'Es una forma de dividir una misma red física en varias redes aisladas. Mejora la seguridad y el rendimiento: por ejemplo, que las visitas no vean tus servidores.' },
      { q: '¿Cuándo conviene SD-WAN?', a: 'Cuando tienes dos o más sucursales y dependes de sistemas en la nube o centralizados. Aprovecha varios enlaces de internet y reduce caídas.' },
      { q: '¿Trabajan con empresas pequeñas?', a: 'Sí. Dimensionamos la red según tu tamaño, desde una oficina hasta varias sedes.' },
      { q: '¿Qué incluye el monitoreo continuo?', a: 'Supervisión de enlaces y equipos las 24 horas, alertas ante fallas y revisión del consumo de ancho de banda.' },
      { q: '¿Cómo pido una cotización?', a: 'Escríbenos por WhatsApp o correo, llámanos al 222 544 7232 o usa el botón de cotización de esta página.' },
    ],
    ctaChannels: [
      { label: 'Tel. 222 544 7232', href: 'tel:+522225447232' },
      { label: 'WhatsApp', href: 'https://wa.me/522225447232?text=Hola%2C%20quiero%20cotizar%20una%20red%20para%20mi%20empresa', ext: true },
    ],
    ctaWa: 'https://wa.me/522225447232?text=Hola%2C%20quiero%20cotizar%20una%20red%20para%20mi%20empresa',
    publico: true,
    publicPath: 'redes.html',
    seoTitle: 'Redes informáticas para empresas: VLAN, VPN y SD-WAN | Integra-IO',
    seoDesc: 'Integra-IO diseña e instala redes cableadas e inalámbricas para empresas: segmentación por VLAN, VPN, SD-WAN entre sucursales y monitoreo continuo.',
    footNote: 'Esquemas, cifras y alcances son de referencia y se confirman en cotización personalizada. Capturas y nombres de ejemplo son ilustrativos. Los SLA y alcances finales se fijan por contrato según el caso.',
    jsonld: `<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@graph":[
    {"@type":"Organization","name":"Integra-IO","alternateName":"Sistemas de Integración","email":"contacto@integra-io.com","telephone":"+52-222-544-7232","areaServed":"MX"},
    {"@type":"Service","serviceType":"Redes informáticas","name":"Redes empresariales cableadas e inalámbricas","areaServed":"MX","description":"Diseño e instalación de redes con segmentación VLAN, VPN, SD-WAN entre sucursales y monitoreo continuo."}
  ]
}
</script>`,
    ctaSubject: 'Cotización redes informáticas',
  },
  {
    slug: 'plataformas-saas',
    nombre: 'Plataformas SaaS',
    acc: '#06b6d4',
    accDim: 'rgba(6,182,212,.14)',
    eyebrow: 'Migración a la nube sin perder la operación',
    h1: 'De la oficina al cloud, sin fricción',
    lead: 'Implementamos y migramos tus herramientas a plataformas en la nube: correo, archivos, telefonía y aplicaciones de negocio, con adopción guiada para el equipo.',
    notes: ['Migración por fases, sin corte operativo', 'Capacitación incluida para usuarios'],
    mockTitle: 'TABLERO DE MIGRACIÓN',
    mock: `
      <div class="mtile-grid">
        <div class="mtile"><b>120</b><span>usuarios migrados</span></div>
        <div class="mtile"><b>8</b><span>aplicaciones</span></div>
        <div class="mtile"><b>99.9%</b><span>disponibilidad</span></div>
      </div>
      <div class="mrow"><span>Correo y calendario</span><span class="st st-ok">COMPLETO</span></div>
      <div class="mrow"><span>Archivos compartidos · 1.2 TB</span><span class="st st-ok">COMPLETO</span></div>
      <div class="mrow"><span>Telefonía IP</span><span class="st st-warn">EN CURSO · FASE 3</span></div>
      <div class="mrow"><span>Inicio de sesión único (SSO)</span><span class="st st-info">CONFIGURADO</span></div>`,
    trust: [
      ['Migración', 'por fases y verificada'],
      ['Disponibilidad', 'alta · sin corte operativo'],
      ['SSO', 'una identidad por usuario'],
      ['Costos', 'licenciamiento optimizado'],
    ],
    features: [
      { tag: 'EVALUACIÓN', t: 'Inventario y plan de fases', p: 'Levantamos qué usa la empresa hoy y definimos el orden de migración que no detiene la operación.' },
      { tag: 'CORREO', t: 'Correo y colaboración', p: 'Migración de buzones, calendarios y contactos con verificación por usuario.' },
      { tag: 'ARCHIVOS', t: 'Archivos y documentación', p: 'Estructura de carpetas, permisos por área y sincronización de equipos.' },
      { tag: 'IDENTIDAD', t: 'SSO y políticas de acceso', p: 'Un solo acceso para todas las plataformas, con MFA obligatorio.' },
      { tag: 'TELEFONÍA', t: 'Telefonía IP en la nube', p: 'Extensiones, grabación y colas sin central física; números portados sin perderlos.' },
      { tag: 'ADOPCIÓN', t: 'Capacitación y soporte', p: 'Sesiones por rol, guías rápidas y acompañamiento las primeras semanas.' },
    ],
    steps: [
      { t: 'Evaluación y plan', p: 'Inventario de cuentas, datos y aplicaciones; cronograma por fases acordado.' },
      { t: 'Migración por fases', p: 'Cortes cortos y validados, área por área, con esquema de reversa por si algo no cuadra.' },
      { t: 'Adopción y optimización', p: 'Capacitación, ajuste de licencias al uso real y soporte post-migración.' },
    ],
    highlight: {
      h2: 'La migración no termina en el corte: termina cuando el equipo adopta',
      p: 'Cada fase termina con validación conjunta y capacitación del área migrada; ninguna fase avanza con pendientes ocultos.',
      list: [
        'Bitácora de migración compartida y visible',
        'Validación por área al cierre de cada fase',
        'Optimización de licencias al uso real',
      ],
      panelTitle: 'FASES TÍPICAS',
      panel: `
        <div class="row"><span class="k">Fase 1</span><span class="v">Identidad y correo</span></div>
        <div class="row"><span class="k">Fase 2</span><span class="v">Archivos y colaboración</span></div>
        <div class="row"><span class="k">Fase 3</span><span class="v">Telefonía y apps de negocio</span></div>
        <div class="row"><span class="k">Cierre</span><span class="v">Optimización y capacitación</span></div>`,
    },
    ctaSubject: 'Cotización plataformas SaaS',
  },
  {
    slug: 'servidores-vps',
    nombre: 'Servidores VPS',
    acc: '#10b981',
    accDim: 'rgba(16,185,129,.14)',
    eyebrow: 'Administrados 24/7 · respaldos diarios',
    h1: 'Servidores virtuales administrados de verdad',
    lead: 'Configuramos, aseguramos y operamos tus servidores VPS: hardening inicial, respaldos diarios, monitoreo permanente y un equipo que responde cuando algo se enciende en rojo.',
    notes: ['Hardening y certificados desde la entrega', 'Respaldos probados con restauración'],
    mockTitle: 'MONITOR · SRV-APPS-01',
    mock: `
      <div class="mterm">
        <b>srv-apps-01</b> · Ubuntu 24.04 LTS · UPTIME 142 días<br>
        nginx ....... <span class="ok">active (running)</span><br>
        postgres .... <span class="ok">active (running)</span><br>
        certbot ..... <span class="ok">renovado hace 6 días</span><br>
        backup ...... <span class="ok">completado 02:00</span>
      </div>
      <div class="mbar">CPU <span class="tr"><i style="width:32%"></i></span></div>
      <div class="mbar">RAM <span class="tr"><i style="width:58%"></i></span></div>
      <div class="mbar">DISCO <span class="tr"><i style="width:41%"></i></span></div>`,
    trust: [
      ['Monitoreo', '24/7 con alertas reales'],
      ['Respaldos', 'diarios y probados'],
      ['Hardening', 'aplicado en la entrega'],
      ['Escalabilidad', 'crece sin rehacer'],
    ],
    features: [
      { tag: 'APROVISIONAMIENTO', t: 'Dimensionado correcto', p: 'Elegimos vCPU, RAM y disco según tu carga real, con ruta de crecimiento sin migraciones traumáticas.' },
      { tag: 'SEGURIDAD', t: 'Hardening inicial', p: 'Firewall, acceso por llaves, fail2ban, actualizaciones de seguridad y mínima superficie expuesta.' },
      { tag: 'RESPALDOS', t: 'Respaldos con restauración', p: 'Copias diarias con retención definida y prueba de restauración periódica: un backup sin prueba no es backup.' },
      { tag: 'MONITOREO', t: 'Alertas que alguien atiende', p: 'CPU, disco, servicios y certificados vigilados 24/7; si algo se sale de umbral, ya lo sabemos antes que tú.' },
      { tag: 'APLICACIONES', t: 'Deploy de tus servicios', p: 'Publicación de sitios, APIs y bases de datos con SSL renovado automático.' },
      { tag: 'REPORTES', t: 'Reporte mensual', p: 'Disponibilidad, consumo y acciones realizadas, en lenguaje claro.' },
    ],
    steps: [
      { t: 'Diagnóstico y plan', p: 'Revisamos tu aplicación y carga actual; definimos tamaño, esquema de respaldo y políticas.' },
      { t: 'Configuración y entrega', p: 'Servicio hardened, monitoreado y con respaldo activo; entrega con credenciales y documentación.' },
      { t: 'Operación continua', p: 'Parches, monitoreo, atención de incidentes y reporte mensual de estado.' },
    ],
    highlight: {
      h2: 'Que el servidor sea lo que menos te preocupe',
      p: 'La meta es simple: que tu única interacción con el servidor sea el reporte mensual, no las madrugadas de reinicios.',
      list: [
        'Esquema 3-2-1 de respaldo documentado',
        'Prueba de restauración programada',
        'Ventanas de mantenimiento acordadas',
      ],
      panelTitle: 'ESQUEMA DE RESPALDO',
      panel: `
        <div class="row"><span class="k">Diario</span><span class="v">retención 14 días</span></div>
        <div class="row"><span class="k">Semanal</span><span class="v">retención 8 semanas</span></div>
        <div class="row"><span class="k">Mensual</span><span class="v">retención 12 meses</span></div>
        <div class="row"><span class="k">Prueba de restauración</span><span class="v">trimestral</span></div>`,
    },
    ctaSubject: 'Cotización servidores VPS',
  },
  {
    slug: 'mesa-de-ayuda',
    nombre: 'Mesa de Ayuda',
    acc: '#f59e0b',
    accDim: 'rgba(245,158,11,.14)',
    eyebrow: 'Soporte 24/7 · SLA por severidad',
    h1: 'Soporte técnico que responde y documenta',
    lead: 'Atención remota y en sitio con tiempos de respuesta comprometidos por severidad, bitácora por ticket y medición de satisfacción de tus usuarios.',
    notes: ['Tickets con bitácora visible', 'Escalamiento claro por severidad'],
    mockTitle: 'COLA DE TICKETS · HOY',
    mock: `
      <div class="mrow"><span>#1042 · Servidor de archivos lento</span><span class="st st-warn">CRÍTICO · 12 min</span></div>
      <div class="mrow"><span>#1041 · Outlook no sincroniza</span><span class="st st-info">ALTO · 40 min</span></div>
      <div class="mrow"><span>#1040 · Nueva contratación: alta de equipo</span><span class="st st-ok">MEDIO · hoy</span></div>
      <div class="mchat">
        <p class="in">Buenas tardes, ya no puedo imprimir en la recepción.</p>
        <p class="out">Recibido, abrí el ticket #1043. Revisamos la cola de impresión y te respondo en breve.</p>
        <p class="in">Perfecto, gracias.</p>
      </div>`,
    trust: [
      ['SLA', 'tiempos por severidad'],
      ['24/7', 'incluyendo guardias'],
      ['Mixto', 'remoto y en sitio'],
      ['CSAT', 'satisfacción medida'],
    ],
    features: [
      { tag: 'CANAL ÚNICO', t: 'Un solo punto de entrada', p: 'Correo, teléfono o portal: todo se convierte en ticket con folio, sin solicitudes perdidas en WhatsApp.' },
      { tag: 'SLA', t: 'Tiempos por severidad', p: 'Respuesta y solución comprometidas según el impacto real del incidente, no por orden de llegada.' },
      { tag: 'REMOTO', t: 'Resolución remota inmediata', p: 'La mayoría de incidentes se resuelven en la misma llamada, con control de pantalla autorizado.' },
      { tag: 'EN SITIO', t: 'Visitas cuando aplican', p: 'Si el incidente lo requiere, técnico en sitio dentro de la ventana acordada.' },
      { tag: 'BITÁCORA', t: 'Historial por equipo', p: 'Cada ticket documenta qué pasó, qué se hizo y qué equipo participa: base real para renovaciones.' },
      { tag: 'MÉTRICAS', t: 'Reporte y satisfacción', p: 'Mensual: volumen, tiempos cumplidos vs SLA y encuesta de satisfacción por ticket.' },
    ],
    steps: [
      { t: 'Levantamiento', p: 'Inventario de equipos y usuarios, catálogo de severidades y firmas del SLA.' },
      { t: 'Puesta en marcha', p: 'Alta de usuarios en el canal, guías de contacto y arranque en paralelo con tu soporte actual.' },
      { t: 'Operación y mejora', p: 'Atención continua, revisión mensual de métricas y ajuste del catálogo de servicios.' },
    ],
    highlight: {
      h2: 'Compromisos de tiempo, no buenas intenciones',
      p: 'Cada severidad tiene respuesta y solución comprometidas por escrito; el incumplimiento se reporta, no se disimula.',
      list: [
        'Catálogo de severidades firmado',
        'Bitácora abierta por ticket',
        'Reporte mensual de cumplimiento',
      ],
      panelTitle: 'SLA DE REFERENCIA',
      panel: `
        <div class="row"><span class="k">Crítico · operación detenida</span><span class="v">respuesta 15 min · 4 h</span></div>
        <div class="row"><span class="k">Alto · área afectada</span><span class="v">respuesta 1 h · 8 h</span></div>
        <div class="row"><span class="k">Medio · usuario afectado</span><span class="v">respuesta 4 h · 24 h</span></div>
        <div class="row"><span class="k">Bajo · solicitud</span><span class="v">respuesta 8 h · 72 h</span></div>`,
    },
    ctaSubject: 'Cotización mesa de ayuda',
  },
  {
    slug: 'casa-inteligente',
    nombre: 'Casa Inteligente',
    acc: '#ec4899',
    accDim: 'rgba(236,72,153,.14)',
    eyebrow: 'Automatización residencial · control total',
    h1: 'Tu casa, bajo control desde el celular',
    lead: 'Iluminación, clima, cortinas, cámaras y entretenimiento integrados en una sola app, con escenas automáticas que funcionan incluso si se va el internet.',
    notes: ['Escenas que operan sin conexión', 'Compatible con asistentes de voz'],
    mockTitle: 'CASA · CONTROL GENERAL',
    mock: `
      <div class="mrow"><span>Luces sala · cálida al 40%</span><span class="st st-ok">ENCENDIDA</span></div>
      <div class="mrow"><span>Clima · planta baja</span><span class="st st-info">22.5°C</span></div>
      <div class="mrow"><span>Cortinas recámara</span><span class="st st-ok">ABIERTAS</span></div>
      <div class="mrow"><span>Cámara de entrada · grabando</span><span class="st st-warn">REC</span></div>
      <div class="mrow"><span>Escena "Buenas noches"</span><span class="st st-info">PROGRAMADA 23:00</span></div>`,
    trust: [
      ['Integrado', 'una app para todo'],
      ['Offline', 'escenas locales'],
      ['Voz', 'Alexa y Google'],
      ['Eficiente', 'ahorro energético'],
    ],
    features: [
      { tag: 'ILUMINACIÓN', t: 'Luces con escenas', p: 'Ambientes por horario o actividad, con regulación y apagados automáticos por zona.' },
      { tag: 'CLIMA', t: 'Climatización inteligente', p: 'Programación por habitación y horario real de uso, con apagado si no hay nadie.' },
      { tag: 'SEGURIDAD', t: 'Cámaras y acceso', p: 'Cámaras, chapa eléctrica y timbre con vista remota y grabación de eventos.' },
      { tag: 'CORTINAS', t: 'Control de cortinas', p: 'Apertura y cierre programado o por escena, integrado a rutinas de luz y clima.' },
      { tag: 'VOZ', t: 'Asistentes de voz', p: 'Comandos por voz coherentes con las escenas de la casa, sin apps duplicadas.' },
      { tag: 'ENERGÍA', t: 'Eficiencia medible', p: 'Reportes de consumo por zona y automatizaciones que recortan la factura.' },
    ],
    steps: [
      { t: 'Visita y propuesta', p: 'Recorrido por la casa, entendemos rutinas y proponemos zonas, escenas y equipo.' },
      { t: 'Instalación', p: 'Instalación limpia por zonas, sin obra mayor cuando es posible, con pruebas por área.' },
      { t: 'Entrega y ajustes', p: 'Capacitación a la familia, escenas afinadas al uso real y soporte posterior.' },
    ],
    highlight: {
      h2: 'Automatización que se siente, no que estorba',
      p: 'Las escenas se diseñan a partir de tus rutinas reales; la casa funciona igual de simple para quien la vive todos los días.',
      list: [
        'Escenas por horario, presencia o un solo toque',
        'Funcionamiento local si se cae el internet',
        'Crecimiento por etapas: empieza por una zona',
      ],
      panelTitle: 'ESCENA "BUENAS NOCHES"',
      panel: `
        <div class="row"><span class="k">23:00</span><span class="v">luces apagadas por zona</span></div>
        <div class="row"><span class="k">23:00</span><span class="v">clima a 22°C recámara</span></div>
        <div class="row"><span class="k">23:00</span><span class="v">cortinas cerradas</span></div>
        <div class="row"><span class="k">23:00</span><span class="v">perímetro armado</span></div>`,
    },
    ctaSubject: 'Cotización casa inteligente',
  },
  {
    slug: 'ensamble-y-reparacion',
    nombre: 'Ensamble y Reparación',
    acc: '#ef4444',
    accDim: 'rgba(239,68,68,.14)',
    eyebrow: 'Equipos a la medida · reparación especializada',
    h1: 'Equipos armados a la medida y reparados con diagnóstico',
    lead: 'Ensamble de PCs de trabajo y gaming con componentes seleccionados, reparación de hardware con diagnóstico por pieza y mantenimiento preventivo programado.',
    notes: ['Diagnóstico por componente, sin adivinanzas', 'Garantía por reparación entregada'],
    mockTitle: 'DIAGNÓSTICO · PC-GERENCIA-02',
    mock: `
      <div class="mterm">
        MEMORIA .... 32 GB DDR5 <span class="ok">OK</span><br>
        SSD NVMe ... 1 TB · salud 97% <span class="ok">OK</span><br>
        GPU ........ picos de 87°C <span class="am">REVISAR</span><br>
        FUENTE ..... ripple fuera de rango <span class="am">CAMBIO SUGERIDO</span><br>
        CONCLUSIÓN .. mantenimiento + cambio de pasta
      </div>
      <div class="mrow"><span>Presupuesto de reparación antes de intervenir</span><span class="st st-info">POR APROBACIÓN</span></div>`,
    trust: [
      ['Componentes', 'originales y nuevos'],
      ['Diagnóstico', 'por componente'],
      ['Garantía', 'por reparación'],
      ['Preventivo', 'programas a medida'],
    ],
    features: [
      { tag: 'ENSAMBLE', t: 'PC a la medida', p: 'Estaciones de trabajo y equipos de gaming armados según tu uso y presupuesto real, no según inventario.' },
      { tag: 'DIAGNÓSTICO', t: 'Detección por componente', p: 'Pruebas de memoria, disco, fuente y temperatura; sabrás qué falla y por qué, antes de gastar.' },
      { tag: 'REPARACIÓN', t: 'Reparación con presupuesto', p: 'Ninguna intervención sin tu aprobación del presupuesto; refacciones originales o equivalentes documentadas.' },
      { tag: 'MIGRACIÓN', t: 'Migración de datos', p: 'Traslado de información y sesiones al equipo nuevo, verificado contigo antes de entregar.' },
      { tag: 'PREVENTIVO', t: 'Mantenimiento programado', p: 'Limpieza interna, pasta térmica y revisión de salud de discos por ciclo acordado.' },
      { tag: 'GARANTÍA', t: 'Respaldo por servicio', p: 'Garantía explícita sobre reparación y refacción, por escrito en tu ticket.' },
    ],
    steps: [
      { t: 'Recepción y diagnóstico', p: 'El equipo entra con folio; pruebas por componente y reporte claro de hallazgos.' },
      { t: 'Presupuesto y aprobación', p: 'Cotización detallada; nada se toca sin tu visto bueno por escrito.' },
      { t: 'Reparación y entrega', p: 'Intervención, pruebas de estabilidad y entrega con garantía y recomendaciones.' },
    ],
    highlight: {
      h2: 'Sin sorpresas: primero el diagnóstico, después la decisión',
      p: 'Cada servicio sale con reporte de lo encontrado, lo realizado y lo que conviene vigilar; el historial de tu equipo queda documentado.',
      list: [
        'Reporte de diagnóstico por componente',
        'Presupuesto aprobado antes de intervenir',
        'Garantía por escrito sobre la reparación',
      ],
      panelTitle: 'SERVICIOS Y RESPALDO',
      panel: `
        <div class="row"><span class="k">Diagnóstico</span><span class="v">reporte por componente</span></div>
        <div class="row"><span class="k">Reparación</span><span class="v">garantía 90 días</span></div>
        <div class="row"><span class="k">Refacciones</span><span class="v">originales · garantía fabricante</span></div>
        <div class="row"><span class="k">Ensamble a medida</span><span class="v">garantía por pieza</span></div>`,
    },
    ctaSubject: 'Cotización ensamble y reparación',
  },
  {
    slug: 'cloud-backup',
    nombre: 'Cloud Backup',
    acc: '#6366f1',
    accDim: 'rgba(99,102,241,.14)',
    eyebrow: 'Respaldo en la nube · recuperación probada',
    h1: 'Respaldos que se restauran, no que solo existen',
    lead: 'Respaldo en la nube de servidores y estaciones con cifrado AES-256, retención definida y pruebas de restauración periódicas: recuperas tu operación, no solo tus archivos.',
    notes: ['Cifrado en tránsito y en reposo', 'Pruebas de restauración programadas'],
    mockTitle: 'ESTADO DE RESPALDOS',
    mock: `
      <div class="mtile-grid">
        <div class="mtile"><b>hace 2 h</b><span>último respaldo</span></div>
        <div class="mtile"><b>30 días</b><span>retención diaria</span></div>
        <div class="mtile"><b>12/12</b><span>restauraciones OK</span></div>
      </div>
      <div class="mrow"><span>Servidor de archivos · 840 GB</span><span class="st st-ok">AL DÍA</span></div>
      <div class="mrow"><span>Base de datos · incremental cada hora</span><span class="st st-ok">AL DÍA</span></div>
      <div class="mrow"><span>Microsoft 365 · 24 buzones</span><span class="st st-ok">AL DÍA</span></div>
      <div class="mrow"><span>Prueba de restauración trimestral</span><span class="st st-info">PROGRAMADA</span></div>`,
    trust: [
      ['AES-256', 'cifrado extremo a extremo'],
      ['3-2-1', 'regla documentada'],
      ['M365 / Workspace', 'correo y archivos'],
      ['RPO / RTO', 'definidos por dato'],
    ],
    features: [
      { tag: 'ALCANCE', t: 'Todo lo que opera tu negocio', p: 'Servidores físicos y virtuales, bases de datos, Microsoft 365 y Google Workspace, laptops y carpetas compartidas o NAS.' },
      { tag: 'POLÍTICA', t: 'Retención por tipo de dato', p: 'Diario, semanal y mensual con plazos definidos contigo; nada de retenciones "por si acaso".' },
      { tag: 'SEGURIDAD', t: 'Cifrado AES-256', p: 'Los respaldos viajan y descansan cifrados; las llaves las controlas tú.' },
      { tag: 'RESCATE', t: 'Antirransomware', p: 'Guardamos versiones anteriores: si algo cifra tus archivos, limpiamos el equipo y restauramos la última copia sana.' },
      { tag: 'CONTINUIDAD', t: 'RPO / RTO por sistema', p: 'Definimos cuánta información puedes perder y cuánto puede tardar la recuperación, por sistema.' },
      { tag: 'PRUEBAS', t: 'Restauración comprobada', p: 'Cada trimestre restauramos un conjunto real y lo documentamos; el reporte mensual deja el estado a la vista.' },
    ],
    steps: [
      { t: 'Diagnóstico', p: 'Revisamos qué información tienes, dónde vive y cuánto tiempo puedes estar sin ella.' },
      { t: 'Configuración', p: 'Instalamos y programamos los respaldos, con cifrado AES-256 y la retención acordada.' },
      { t: 'Respaldo automático', p: 'Se ejecuta solo y lo vigilamos: si algo falla, lo corregimos y te avisamos.' },
      { t: 'Prueba de restauración', p: 'Recuperamos archivos de muestra con regularidad para confirmar que tus copias funcionan.' },
    ],
    highlight: {
      h2: 'La diferencia la marca la restauración, no el respaldo',
      p: 'Cualquier herramienta guarda copias; lo que da tranquilidad es poder recuperar operación en el tiempo acordado, comprobado.',
      list: [
        'RPO y RTO definidos por sistema',
        'Restauraciones de prueba documentadas',
        'Reporte mensual de estado de respaldos',
      ],
      panelTitle: 'OBJETIVOS DE REFERENCIA',
      panel: `
        <div class="row"><span class="k">Base de datos</span><span class="v">RPO 1 h · RTO 2 h</span></div>
        <div class="row"><span class="k">Archivos compartidos</span><span class="v">RPO 24 h · RTO 4 h</span></div>
        <div class="row"><span class="k">Correo</span><span class="v">RPO 24 h · RTO 8 h</span></div>
        <div class="row"><span class="k">Estaciones clave</span><span class="v">RPO 24 h · RTO 24 h</span></div>`,
    },
    fxGears: true,
    rule321: {
      title: 'El estándar que seguimos',
      lead: 'Un respaldo de verdad no es una sola copia: es una estrategia. Aplicamos la regla 3-2-1 a toda tu información y la documentamos contigo.',
      cardTitle: 'La regla 3-2-1',
      items: [
        { n: '3', t: 'copias de tus datos: la original y dos respaldos.' },
        { n: '2', t: 'tipos de almacenamiento distintos, por ejemplo local y nube.' },
        { n: '1', t: 'copia fuera de tu oficina, a salvo de robo, incendio o falla eléctrica.' },
      ],
    },
    why: {
      title: 'Por qué Integra-IO',
      items: [
        { t: 'Trato directo', p: 'Hablas con quien configura tu respaldo, sin call centers ni tickets sin respuesta.' },
        { t: 'A la medida de tu empresa', p: 'Pagas por proteger lo que necesitas, sin paquetes llenos de funciones que no vas a usar.' },
        { t: 'Integración real', p: 'Somos una empresa de integración: conectamos el respaldo con tu infraestructura actual.' },
        { t: 'Tú controlas el acceso', p: 'La información viaja y descansa cifrada; tú decides quién puede restaurarla.' },
      ],
    },
    faq: [
      { q: '¿Qué es un Cloud Backup?', a: 'Es una copia de tus datos guardada fuera de tu oficina, en servidores en la nube. Si hay una falla, un robo, un error humano o un ransomware, recuperas tu información desde ahí.' },
      { q: '¿Qué puedo respaldar?', a: 'Servidores físicos y virtuales, bases de datos, equipos de escritorio y laptops, carpetas compartidas o NAS, y cuentas de Microsoft 365 y Google Workspace.' },
      { q: '¿Qué pasa si sufro un ransomware?', a: 'Conservamos varias versiones anteriores de tus archivos. Después de limpiar el equipo, se restaura la última versión sana.' },
      { q: '¿Cuánto cuesta?', a: 'Depende de cuánta información respaldes y por cuánto tiempo la conserves. Cuéntanos tu caso y te enviamos una cotización.' },
      { q: '¿Cómo solicito una cotización?', a: 'Escríbenos a contacto@integra-io.com, llámanos al 222 544 7232 o manda un WhatsApp desde el botón de esta página.' },
    ],
    ctaChannels: [
      { label: 'Tel. 222 544 7232', href: 'tel:+522225447232' },
      { label: 'WhatsApp', href: 'https://wa.me/522225447232?text=Hola%2C%20quiero%20cotizar%20Cloud%20Backup', ext: true },
    ],
    nas: {
      title: 'El repositorio local, a su medida',
      lead: 'La copia local de restauración rápida se instala como prefiera: comprada, en comodato o alojada en nuestras oficinas en Puebla.',
      opciones: [
        { tag: 'VENDIDO', t: 'El equipo es suyo', p: 'Dimensionamos, proveemos e instalamos el NAS en sus instalaciones. Restauraciones a velocidad de red local y equipo que queda en su activo.', ideal: 'sitios estables con buen clima, energía regulada y espacio.' },
        { tag: 'COMODATO', t: 'Sin desembolso inicial', p: 'Integra-IO aporta y mantiene el equipo en su oficina bajo contrato de uso, con opción de compra al terminar. La falla del hardware no es su problema.', ideal: 'clientes que prefieren mensualidades sin inversión inicial.' },
        { tag: 'ALOJADO AQUÍ', t: 'La copia vive en nuestras oficinas', p: 'El NAS reside en nuestro sitio en Puebla con acceso controlado, clima y energía protegida. La copia rápida queda fuera de su oficina, a metros del equipo técnico.', ideal: 'oficinas pequeñas sin condiciones para equipo propio.' },
      ],
      nota: 'En el diagnóstico evaluamos espacio, energía, clima, riesgo de robo y ancho de banda para recomendar la modalidad, pero la decisión final siempre es del cliente y queda documentada en la constancia de servicio.',
    },
    privacidad: {
      title: 'Su información no pasa por nuestras manos',
      lead: 'Integra-IO opera el conducto —infraestructura, software, monitoreo y pruebas— sin leer el contenido.',
      puntos: [
        'Cifrado AES-256 antes de salir de sus equipos: viaja y descansa ilegible sin su llave.',
        'Llave exclusiva del cliente por defecto (modelo zero-knowledge); opcionalmente sobreguardada en sobre cerrado firmado.',
        'NAS alojado = volúmenes cifrados: sin su llave, cualquier disco es ilegible, incluso para nosotros.',
        'Cada intervención técnica queda registrada en bitácora con la autorización del cliente.',
        'Cláusula contractual de no acceso (encargado conforme a la LFPDPPP) y derecho de auditoría del cliente.',
      ],
    },
    paquetes: {
      title: 'Paquetes por nivel',
      lead: 'Gestión todo incluido con precios de referencia; el alcance y el precio final se confirman en cotización personalizada.',
      items: [
        { nombre: 'Esencial PYME', perfil: '1 sitio · hasta ~15 personas · ≤ 2 TB', precio: 'Desde USD 35', unidad: '/TB/mes', min: 'mínimo ~USD 49/mes', puntos: ['Archivos, NAS, laptops y 1 base de datos pequeña', 'RPO 24 h · RTO 8 h', 'Retención 30 días', 'Prueba de restauración trimestral', 'Soporte siguiente día hábil'] },
        { nombre: 'Negocio', destacado: true, perfil: '1–2 sitios · hasta ~50 personas · 3–10 TB', precio: 'Desde USD 65', unidad: '/TB/mes', min: '+ licencias Veeam y SaaS por usuario', puntos: ['Servidores/VMs, BDs, NAS, M365/Workspace y laptops', 'RPO 4–12 h · RTO 2–4 h', 'Retención 30 diarios + 12 mensuales', 'Pruebas trimestrales con tiempos medidos', 'Respuesta ≤ 4 h hábiles'] },
        { nombre: 'Crítico', perfil: 'Multi-sitio o regulado (salud/fintech) · 10+ TB', precio: 'Desde USD 110', unidad: '/TB/mes', min: 'cotización por alcance', puntos: ['Todo lo de Negocio + BDs cada hora + DR documentado', 'RPO 1–4 h · RTO 1–2 h', '90 diarios + 12 mensuales + 7 anuales, inmutables', 'Pruebas mensuales + simulacro anual de desastre', 'Respuesta ≤ 1 h con guardia 24/7'] },
      ],
    },
    ctaWa: 'https://wa.me/522225447232?text=Hola%2C%20quiero%20cotizar%20Cloud%20Backup',
    publico: true,
    publicPath: 'backup.html',
    pdfHref: 'backup-estrategia.pdf',
    seoTitle: 'Cloud Backup para empresas en México | Integra-IO',
    seoDesc: 'Respaldo en la nube para servidores, bases de datos, Microsoft 365, Google Workspace y equipos. Cifrado AES-256, regla 3-2-1 y pruebas de restauración. NAS vendido, en comodato o alojado.',
    footNote: 'Esquemas, cifras y precios son de referencia y se confirman en cotización personalizada. Precios de terceros verificados el 13/10/2026 en fuentes oficiales y sujetos a cambio. Integra-IO opera el servicio como encargado conforme a la LFPDPPP; el cumplimiento normativo final depende de la configuración y los procesos del cliente.',
    jsonld: `<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@graph":[
    {"@type":"Organization","name":"Integra-IO","alternateName":"Sistemas de Integración","email":"contacto@integra-io.com","telephone":"+52-222-544-7232","areaServed":"MX"},
    {"@type":"Service","serviceType":"Cloud Backup","name":"Cloud Backup empresarial","areaServed":"MX","description":"Respaldo en la nube de servidores, bases de datos, correo y equipos, con cifrado y pruebas de restauración."},
    {"@type":"FAQPage","mainEntity":[
      {"@type":"Question","name":"¿Qué es un Cloud Backup?","acceptedAnswer":{"@type":"Answer","text":"Es una copia de tus datos guardada fuera de tu oficina, en servidores en la nube, para recuperarla ante fallas, robos, errores humanos o ransomware."}},
      {"@type":"Question","name":"¿Qué puedo respaldar?","acceptedAnswer":{"@type":"Answer","text":"Servidores físicos y virtuales, bases de datos, equipos de escritorio y laptops, carpetas compartidas o NAS, y cuentas de Microsoft 365 y Google Workspace."}},
      {"@type":"Question","name":"¿Qué pasa si sufro un ransomware?","acceptedAnswer":{"@type":"Answer","text":"Conservamos varias versiones anteriores de tus archivos y se restaura la última versión sana tras limpiar el equipo."}}
    ]}
  ]
}
</script>`,
    ctaSubject: 'Cotización cloud backup',
  },
  {
    slug: 'ciberseguridad',
    nombre: 'Ciberseguridad',
    acc: '#34d399',
    accDim: 'rgba(52,211,153,.14)',
    eyebrow: 'Defensa en capas · respuesta documentada',
    h1: 'Protección integral para tu operación',
    lead: 'Firewall gestionado, EDR en cada equipo, capacitación antiphishing y auditorías periódicas: seguridad que se sostiene en el día a día, no en una instalación única.',
    notes: ['Incidentes con bitácora y respuesta', 'Capacitación al usuario final'],
    mockTitle: 'MONITOR DE AMENAZAS · SEMANA',
    mock: `
      <div class="mtile-grid">
        <div class="mtile"><b>148</b><span>intentos bloqueados</span></div>
        <div class="mtile"><b>42</b><span>endpoints con EDR</span></div>
        <div class="mtile"><b>100%</b><span>parches al día</span></div>
      </div>
      <div class="mterm">
        [lun 09:12] BLOQUEADO acceso desde IP <span class="am">sospechosa</span> · regla geo<br>
        [mar 15:47] EDR cuarentena <span class="am">macro maliciosa</span> · correo RRHH<br>
        [jue 11:03] Parche crítico aplicado a 12 equipos<br>
        [vie 18:20] <span class="ok">Sin incidentes abiertos</span>
      </div>`,
    trust: [
      ['Firewall', 'gestionado y con bitácora'],
      ['EDR', 'por endpoint'],
      ['Phishing', 'simulacros y capacitación'],
      ['Auditoría', 'revisión periódica'],
    ],
    features: [
      { tag: 'PERÍMETRO', t: 'Firewall gestionado', p: 'Reglas documentadas, VPN para acceso remoto y revisión periódica de lo que realmente necesita estar expuesto.' },
      { tag: 'EQUIPOS', t: 'EDR empresarial', p: 'Detección y respuesta en cada endpoint, con cuarentena automática y consola centralizada.' },
      { tag: 'CORREO', t: 'Antiphishing y simulacros', p: 'Filtro de correo malicioso y campañas de simulacro para medir y entrenar a tu equipo.' },
      { tag: 'PARCHEO', t: 'Actualizaciones gestionadas', p: 'Política de parches por anillo y ventana, con verificación de aplicación real.' },
      { tag: 'RESPUESTA', t: 'Incidentes con protocolo', p: 'Qué hacer, quién lo hace y en qué orden; bitácora completa de cada incidente atendido.' },
      { tag: 'MEJORA', t: 'Auditorías periódicas', p: 'Revisión de cuentas, permisos y configuraciones con plan de correcciones priorizado.' },
    ],
    steps: [
      { t: 'Diagnóstico inicial', p: 'Revisión de perímetro, equipos, cuentas y respaldos; reporte de riesgos priorizado.' },
      { t: 'Implantación por capas', p: 'Firewall, EDR, correo y parcheo por etapas, sin frenar la operación.' },
      { t: 'Operación y cultura', p: 'Monitoreo, simulacros periódicos y auditorías con seguimiento de hallazgos.' },
    ],
    highlight: {
      h2: 'Seguridad que se demuestra en la bitácora',
      p: 'Cada capa deja evidencia: qué se bloqueó, cuándo y qué se hizo. Ese historial vale tanto para la operación como para tus clientes.',
      list: [
        'Bitácora de incidentes y bloqueos',
        'Simulacros de phishing con métricas',
        'Plan priorizado de corrección de riesgos',
      ],
      panelTitle: 'CICLO DE SEGURIDAD',
      panel: `
        <div class="row"><span class="k">Prevenir</span><span class="v">firewall · EDR · parches</span></div>
        <div class="row"><span class="k">Detectar</span><span class="v">alertas · monitoreo</span></div>
        <div class="row"><span class="k">Responder</span><span class="v">protocolo · bitácora</span></div>
        <div class="row"><span class="k">Mejorar</span><span class="v">auditoría · capacitación</span></div>`,
    },
    ctaSubject: 'Cotización ciberseguridad',
  },
];

/* ---------- imágenes por servicio ---------- */

const IMGS = {
  'cableado-estructurado': { file: 'img/cableado-estructurado.jpg', alt: 'Patch panel CAT.6 con cable peinado y puertos etiquetados', cap: 'CAT.6 · PATCH PANEL ETIQUETADO' },
  'redes-informaticas': { file: 'img/redes-informaticas.jpg', alt: 'Técnico trabajando en los gabinetes de red de un cuarto de datos', cap: 'CUARTO DE DATOS · IMPLEMENTACIÓN' },
  'plataformas-saas': { file: 'img/plataformas-saas.jpg', alt: 'Equipo colaborando alrededor de una laptop en oficina moderna', cap: 'ADOPCIÓN · EQUIPO EN MIGRACIÓN' },
  'servidores-vps': { file: 'img/servidores-vps.png', alt: 'Pasillo simétrico de gabinetes de servidores con acentos verdes', cap: 'NODO · CENTRO DE DATOS' },
  'mesa-de-ayuda': { file: 'img/mesa-de-ayuda.png', alt: 'Centro de soporte con agentes con diadema en sus estaciones', cap: 'MESA DE AYUDA · OPERACIÓN 24/7' },
  'casa-inteligente': { file: 'img/casa-inteligente.jpg', alt: 'Sala con iluminación ambiental cálida al anochecer', cap: 'ESCENAS · AMBIENTE NOCTURNO' },
  'ensamble-y-reparacion': { file: 'img/ensamble-y-reparacion.jpg', alt: 'Escritorio con gabinete RGB y silla gamer en ambiente de neón', cap: 'ENSAMBLE · PC A LA MEDIDA' },
  'cloud-backup': { file: 'img/cloud-backup.jpg', alt: 'Gabinetes negros de servidores en un centro de datos', cap: 'RESGUARDO · INFRAESTRUCTURA' },
  'ciberseguridad': { file: 'img/ciberseguridad.jpg', alt: 'Candado digital azul luminoso sobre una malla de partículas', cap: 'PERÍMETRO · DEFENSA ACTIVA' },
};

/* ---------- plantillas ---------- */

const css = `
  :root{
    box-sizing:border-box;
    --bg:#0A1018; --bg-2:#101928; --surface:#141F31; --surface-2:#1B2A40;
    --line:#26374F; --text:#E7ECF3; --text-dim:#93A1B8; --text-faint:#5E6E86;
    --acc:ACC_ACC; --acc-dim:ACC_DIM;
    --font-display:'Space Grotesk','Segoe UI',system-ui,sans-serif;
    --font-body:'IBM Plex Sans','Segoe UI',system-ui,sans-serif;
    --font-data:'IBM Plex Mono','Consolas',monospace;
  }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;}
  body{background:var(--bg);color:var(--text);font-family:var(--font-body);line-height:1.55;-webkit-font-smoothing:antialiased;}
  a{color:inherit;}
  .wrap{max-width:1180px;margin:0 auto;padding:0 24px;}
  .ribbon{position:sticky;top:0;z-index:50;background:#431407;color:#FDBA74;font-family:var(--font-data);font-size:.68rem;letter-spacing:.08em;text-align:center;padding:7px 12px;text-transform:uppercase;}
  .topbar{display:flex;align-items:center;justify-content:space-between;padding:22px 0;border-bottom:1px solid var(--line);}
  .brand{display:flex;align-items:center;gap:12px;font-family:var(--font-display);font-weight:600;font-size:1.05rem;}
  .topbar-cta{font-weight:500;font-size:.92rem;padding:9px 18px;border-radius:7px;border:1px solid var(--acc-dim);background:transparent;color:var(--text);white-space:nowrap;text-decoration:none;}
  .hero{padding:64px 0 56px;display:grid;grid-template-columns:1.05fr 1fr;gap:52px;align-items:center;}
  .eyebrow{font-size:.86rem;color:var(--text-dim);display:flex;align-items:center;gap:8px;margin-bottom:18px;}
  .eyebrow .dot{width:6px;height:6px;border-radius:50%;background:var(--acc);flex:none;}
  h1{font-family:var(--font-display);font-weight:600;font-size:2.7rem;line-height:1.1;margin:0 0 20px;letter-spacing:-0.01em;max-width:16ch;}
  .hero p.lead{color:var(--text-dim);font-size:1.08rem;max-width:46ch;margin:0 0 30px;}
  .cta-row{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:34px;}
  .btn-primary{background:var(--acc);color:#08131A;font-weight:600;padding:13px 22px;border-radius:7px;font-size:.96rem;border:none;text-decoration:none;}
  .btn-secondary{padding:13px 22px;border-radius:7px;font-size:.96rem;border:1px solid var(--line);color:var(--text);text-decoration:none;}
  .hero-notes{display:flex;gap:22px;flex-wrap:wrap;font-size:.85rem;color:var(--text-faint);}
  .hero-notes span{display:flex;align-items:center;gap:7px;}
  .hero-notes svg{width:14px;height:14px;flex:none;}
  .hero-visual{position:relative;}
  .hero-photo{margin:0;position:relative;border-radius:10px;overflow:hidden;border:1px solid var(--line);box-shadow:0 30px 70px -30px rgba(0,0,0,.7);aspect-ratio:16/9;}
  .hero-photo img{width:100%;height:100%;object-fit:cover;display:block;}
  .hero-photo::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,16,24,0) 45%,rgba(10,16,24,.62) 100%);}
  .hero-photo figcaption{position:absolute;left:14px;bottom:12px;z-index:2;font-family:var(--font-data);font-size:.62rem;letter-spacing:.06em;color:var(--text);background:rgba(10,16,24,.75);border:1px solid var(--line);padding:4px 10px;border-radius:5px;}
  .hero-visual .mock{margin:-60px 18px 0;position:relative;z-index:2;}
  .trustbar{border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:20px 0;}
  .trustbar .wrap{display:flex;flex-wrap:wrap;gap:28px;align-items:center;justify-content:space-between;}
  .trustbar-item{font-size:.85rem;color:var(--text-dim);}
  .trustbar-item strong{color:var(--text);font-weight:600;}
  section{padding:72px 0;border-top:1px solid var(--line);}
  section:nth-of-type(1){border-top:none;}
  .section-head{max-width:56ch;margin-bottom:42px;}
  .section-head h2{font-family:var(--font-display);font-weight:600;font-size:1.9rem;margin:0 0 14px;letter-spacing:-0.01em;}
  .section-head p{color:var(--text-dim);margin:0;font-size:1rem;}
  .grid-features{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);}
  .feat{background:var(--bg);padding:28px 26px;border-left:2px solid transparent;}
  .feat.a{border-left-color:var(--acc);}
  .feat h3{font-family:var(--font-display);font-size:1.05rem;font-weight:600;margin:0 0 10px;}
  .feat p{color:var(--text-dim);font-size:.92rem;margin:0;}
  .feat .tag{display:inline-block;font-size:.7rem;color:var(--text-faint);font-family:var(--font-data);margin-bottom:12px;}
  .steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:36px;}
  .step{position:relative;padding-top:20px;}
  .step-num{font-family:var(--font-display);font-size:.85rem;font-weight:600;color:var(--acc);border:1px solid var(--acc-dim);width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
  .step h3{font-family:var(--font-display);font-size:1.05rem;margin:0 0 8px;font-weight:600;}
  .step p{color:var(--text-dim);font-size:.9rem;margin:0;}
  .share-section{display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:center;}
  .share-copy h2{font-family:var(--font-display);font-size:1.7rem;margin:0 0 16px;font-weight:600;letter-spacing:-0.01em;}
  .share-copy p{color:var(--text-dim);margin:0 0 22px;max-width:44ch;}
  .share-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;}
  .share-list li{display:flex;gap:10px;font-size:.92rem;color:var(--text);align-items:flex-start;}
  .share-list svg{flex:none;margin-top:3px;width:15px;height:15px;color:var(--acc);}
  .panel{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:22px;}
  .panel-title{font-family:var(--font-data);font-size:.68rem;color:var(--text-faint);letter-spacing:.06em;margin:0 0 8px;}
  .ptable{border:1px solid var(--line);border-radius:8px;overflow:hidden;}
  .ptable .row{display:flex;justify-content:space-between;gap:14px;padding:10px 14px;border-top:1px solid var(--line);font-size:.85rem;}
  .ptable .row:first-child{border-top:none;}
  .ptable .k{color:var(--text-faint);}
  .ptable .v{font-family:var(--font-data);color:var(--text);text-align:right;}
  .final-cta{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:52px;display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap;}
  .final-cta h2{font-family:var(--font-display);font-size:1.7rem;margin:0 0 10px;font-weight:600;max-width:22ch;}
  .final-cta p{color:var(--text-dim);margin:0;max-width:40ch;}
  footer{border-top:1px solid var(--line);padding:34px 0 44px;}
  footer .wrap{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;align-items:flex-start;}
  .foot-brand{font-family:var(--font-display);font-weight:600;}
  .foot-note{color:var(--text-faint);font-size:.78rem;max-width:52ch;line-height:1.6;}
  .foot-links{display:flex;flex-direction:column;gap:6px;margin-top:14px;font-size:.88rem;}
  .foot-links a{color:var(--acc);text-decoration:none;}
  .foot-links a:hover{text-decoration:underline;}
  /* ---- mocks ---- */
  .mock{background:#04070B;border:1px solid var(--line);border-radius:10px;overflow:hidden;box-shadow:0 30px 70px -30px rgba(0,0,0,.7);}
  .mock-bar{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid #182233;font-family:var(--font-data);font-size:.66rem;color:var(--text-faint);}
  .mock-bar .dots{display:flex;gap:5px;}
  .mock-bar .dots i{width:9px;height:9px;border-radius:50%;background:#26374F;display:block;}
  .mock-bar .dots i:first-child{background:#B0503F;}
  .mock-bar .dots i:nth-child(2){background:#B08A4F;}
  .mock-bar .dots i:nth-child(3){background:#4F8A66;}
  .mock-body{padding:18px;display:flex;flex-direction:column;gap:10px;}
  .mrow{display:flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:10px 12px;font-size:.85rem;color:var(--text);}
  .mrow .st{margin-left:auto;font-family:var(--font-data);font-size:.66rem;padding:2px 8px;border-radius:4px;white-space:nowrap;}
  .st-ok{color:#7FD9A8;background:rgba(62,138,107,.25);}
  .st-warn{color:var(--amber,#E3A55E);background:rgba(227,165,94,.12);}
  .st-info{color:var(--acc);background:var(--acc-dim);}
  .mterm{font-family:var(--font-data);font-size:.72rem;line-height:1.9;color:var(--text-dim);background:#04070B;border:1px solid var(--line);border-radius:8px;padding:14px;}
  .mterm b{color:var(--acc);font-weight:500;}
  .mterm .ok{color:#7FD9A8;}
  .mterm .am{color:#E3A55E;}
  .mbar{font-size:.72rem;color:var(--text-dim);display:grid;gap:5px;}
  .mbar .tr{height:6px;border-radius:3px;background:#1B2A40;overflow:hidden;}
  .mbar .tr i{display:block;height:100%;background:linear-gradient(90deg,var(--acc),var(--acc-dim));}
  .mtile-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
  .mtile{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:12px;}
  .mtile b{display:block;font-family:var(--font-display);font-size:1.1rem;color:var(--text);}
  .mtile span{font-size:.66rem;color:var(--text-faint);}
  .mchat{display:flex;flex-direction:column;gap:8px;}
  .mchat p{margin:0;max-width:88%;padding:9px 12px;border-radius:10px;font-size:.82rem;line-height:1.45;}
  .mchat .in{align-self:flex-start;background:var(--surface-2);border:1px solid var(--line);color:var(--text-dim);}
  .mchat .out{align-self:flex-end;background:var(--acc-dim);color:var(--text);border:1px solid var(--acc-dim);}
  /* ---- diagrama de topología animado ---- */
  .topo{width:100%;height:auto;display:block;background:var(--surface-2);border-radius:8px;border:1px solid var(--line);}
  .topo .ln{stroke:var(--acc);stroke-width:2.5;fill:none;stroke-dasharray:7 7;animation:flow 1.4s linear infinite;}
  .topo .nd{fill:var(--bg);stroke:var(--text-dim);stroke-width:2.5;}
  .topo .core{fill:var(--acc);stroke:var(--text-dim);stroke-width:2.5;}
  .topo text{fill:var(--text);font:600 13px var(--font-display),sans-serif;}
  .topo .ok{fill:#3E8A6B;}
  @keyframes flow{to{stroke-dashoffset:-14}}
  @media (prefers-reduced-motion:reduce){.topo .ln{animation:none;}}
  /* ---- componentes opcionales ---- */
  .hero-zone{position:relative;overflow:hidden;padding-bottom:56px;}
  .hero-zone .wrap.hero{position:relative;z-index:1;}
  .gear{position:absolute;z-index:0;pointer-events:none;}
  .gear.g1{right:-170px;top:-120px;width:560px;height:560px;opacity:.5;animation:turn 90s linear infinite;}
  .gear.g2{left:-200px;bottom:-220px;width:320px;height:320px;opacity:.3;animation:turn 45s linear infinite reverse;}
  @keyframes turn{to{transform:rotate(360deg)}}
  @media (prefers-reduced-motion:reduce){.gear.g1,.gear.g2{animation:none;}}
  .rule-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;}
  .rule-grid .copy h2{font-family:var(--font-display);font-weight:600;font-size:1.9rem;margin:0 0 14px;letter-spacing:-0.01em;}
  .rule-grid .copy p{color:var(--text-dim);margin:0;font-size:1rem;max-width:44ch;}
  .rule321{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:26px;box-shadow:0 0 0 6px var(--acc-dim);}
  .rule321 h2{font-size:1.5rem;color:var(--acc);margin:0;}
  .rule321 ol{list-style:none;padding:0;margin:16px 0 0;display:grid;gap:14px;}
  .rule321 li{display:grid;grid-template-columns:54px 1fr;gap:14px;align-items:center;font-size:.94rem;color:var(--text-dim);}
  .rule321 b{font-family:var(--font-display);font-weight:700;font-size:2.2rem;color:#fff;line-height:1;}
  .why{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px 48px;}
  .why div{padding:16px 0;border-top:1px solid var(--line);}
  .why h3{font-family:var(--font-display);font-size:1.05rem;font-weight:600;margin:0;}
  .why p{margin:6px 0 0;color:var(--text-dim);font-size:.92rem;}
  .faq-wrap{max-width:820px;}
  .faq details{border-bottom:1px solid var(--line);padding:16px 0;}
  .faq summary{cursor:pointer;font-family:var(--font-display);font-weight:600;font-size:1.05rem;display:flex;justify-content:space-between;gap:16px;list-style:none;}
  .faq summary::-webkit-details-marker{display:none;}
  .faq summary::after{content:"+";color:var(--acc);font-size:1.4rem;line-height:1;}
  .faq details[open] summary::after{content:"–";}
  .faq details p{margin:10px 0 0;color:var(--text-dim);max-width:46em;}
  .cta-channels{display:flex;flex-wrap:wrap;gap:18px;margin-top:16px;font-size:.95rem;}
  .cta-channels a{color:var(--acc);font-weight:600;text-decoration:none;}
  .cta-channels a:hover{text-decoration:underline;}
  .wa{position:fixed;right:18px;bottom:18px;z-index:60;background:var(--acc);color:#08131A;font-weight:600;font-size:.92rem;padding:11px 18px;border-radius:999px;text-decoration:none;box-shadow:0 6px 18px rgba(0,0,0,.4);}
  /* ---- paquetes y modalidades ---- */
  .pkg-grid,.mod-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
  .pkg{background:var(--surface);border:1px solid var(--line);border-top:4px solid var(--acc);border-radius:10px;padding:24px;display:flex;flex-direction:column;}
  .pkg.destacado{border-top-color:#F7941D;box-shadow:0 0 0 5px rgba(247,148,29,.12);}
  .pkg h3,.mod h3{font-family:var(--font-display);font-size:1.12rem;font-weight:600;margin:0 0 4px;}
  .pkg .perfil,.mod .ideal{font-size:.8rem;color:var(--text-faint);margin:0 0 12px;}
  .pkg .precio{font-family:var(--font-display);font-size:1.65rem;font-weight:700;color:var(--text);line-height:1.15;}
  .pkg .precio small{display:block;font-size:.8rem;color:var(--text-dim);font-weight:400;margin-top:2px;}
  .pkg ul,.mod ul{list-style:none;padding:0;margin:14px 0 0;display:flex;flex-direction:column;gap:8px;}
  .pkg li,.mod li{display:flex;gap:9px;font-size:.87rem;color:var(--text-dim);align-items:flex-start;}
  .pkg li svg,.mod li svg{flex:none;margin-top:3px;width:14px;height:14px;color:var(--acc);}
  .mod{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:22px;}
  .mod .tag2{font-family:var(--font-data);font-size:.68rem;color:var(--acc);letter-spacing:.08em;display:block;margin-bottom:8px;}
  .mod .ideal{margin-top:12px;}
  .nota-decision{margin-top:22px;padding:14px 18px;border-left:3px solid var(--acc);background:var(--surface);border-radius:0 8px 8px 0;font-size:.92rem;color:var(--text-dim);}
  @media (max-width:880px){.pkg-grid,.mod-grid{grid-template-columns:1fr;}}
  @media (max-width:880px){
    .hero{grid-template-columns:1fr;padding-top:40px;}
    h1{font-size:2.1rem;max-width:none;}
    .grid-features{grid-template-columns:1fr;}
    .steps{grid-template-columns:1fr;}
    .share-section{grid-template-columns:1fr;}
    .final-cta{padding:32px;}
    .hero-visual .mock{margin:-40px 12px 0;}
    .rule-grid{grid-template-columns:1fr;gap:28px;}
    .gear.g1{right:-260px;opacity:.35;}
    .gear.g2{display:none;}
  }
  @media (prefers-reduced-motion:reduce){ *{animation:none!important;} }
`;

function checkSvg(size) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`;
}

const GEAR_PATH = 'M-12-96h24l4 17a80 80 0 0 1 17 7l15-9 17 17-9 15a80 80 0 0 1 7 17l17 4v24l-17 4a80 80 0 0 1-7 17l9 15-17 17-15-9a80 80 0 0 1-17 7l-4 17h-24l-4-17a80 80 0 0 1-17-7l-15 9-17-17 9-15a80 80 0 0 1-7-17l-17-4v-24l17-4a80 80 0 0 1 7-17l-9-15 17-17 15 9a80 80 0 0 1 17-7z';

function gearSvg(s) {
  return `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <g id="gearA"><path fill="${s.acc}" fill-rule="evenodd" d="${GEAR_PATH}M0-46a46 46 0 1 0 .1 0z"/></g>
    <g id="gearB"><path fill="${s.acc}" fill-rule="evenodd" d="${GEAR_PATH}M0-40a40 40 0 1 0 .1 0z"/></g>
  </defs></svg>
  <svg class="gear g1" viewBox="-100 -100 200 200" aria-hidden="true"><use href="#gearA"/></svg>
  <svg class="gear g2" viewBox="-100 -100 200 200" aria-hidden="true"><use href="#gearB"/></svg>`;
}

function page(s) {
  const cssFinal = css.replace('ACC_ACC', s.acc).replace('ACC_DIM', s.accDim);
  return `<!DOCTYPE html>
<html lang="es-MX">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="${s.publico ? 'index,follow' : 'noindex,nofollow'}">
<title>${s.seoTitle || `[PROPUESTA] Integra-IO · ${s.nombre} — borrador para revisión`}</title>
${s.seoDesc ? `<meta name="description" content="${s.seoDesc}">` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${cssFinal}</style>
${s.jsonld || ''}
</head>
<body>

${s.publico ? '' : '<div class="ribbon">Propuesta de diseño · borrador para revisión · no integrado al sitio</div>'}

<div class="wrap topbar">
  <div class="brand">Integra-IO · ${s.nombre}</div>
  <a class="topbar-cta" href="#demo">Agendar demostración</a>
</div>

${s.fxGears ? '<div class="hero-zone">' + gearSvg(s) : ''}
<div class="wrap hero">
  <div>
    <div class="eyebrow"><span class="dot"></span>${s.eyebrow}</div>
    <h1>${s.h1}</h1>
    <p class="lead">${s.lead}</p>
    <div class="cta-row">
      <a class="btn-primary" href="mailto:${MAIL}?subject=${encodeURIComponent(s.ctaSubject)}">Solicitar cotización</a>
      <a class="btn-secondary" href="#caracteristicas">Ver características</a>
      ${s.pdfHref ? `<a class="btn-secondary" href="${s.pdfHref}" download>Descargar estrategia completa (PDF)</a>` : ''}
    </div>
    <div class="hero-notes">
      <span>${checkSvg(14)}${s.notes[0]}</span>
      <span>${checkSvg(14)}${s.notes[1]}</span>
    </div>
  </div>
  <div class="hero-visual">
    <figure class="hero-photo">
      <img src="${heroImgUri(s)}" alt="${IMGS[s.slug].alt}" loading="eager">
      <figcaption>${IMGS[s.slug].cap}</figcaption>
    </figure>
    <div class="mock">
      <div class="mock-bar"><span class="dots"><i></i><i></i><i></i></span><span>${s.mockTitle}</span></div>
      <div class="mock-body">${s.mock}</div>
    </div>
  </div>
</div>
${s.fxGears ? '</div>' : ''}

<div class="trustbar">
  <div class="wrap">
    ${s.trust.map(([b, t]) => `<div class="trustbar-item"><strong>${b}</strong> · ${t}</div>`).join('\n    ')}
  </div>
</div>

${s.rule321 ? `
<section class="wrap">
  <div class="rule-grid">
    <div class="copy">
      <h2>${s.rule321.title}</h2>
      <p>${s.rule321.lead}</p>
    </div>
    <aside class="rule321" aria-label="${s.rule321.cardTitle}">
      <h2>${s.rule321.cardTitle}</h2>
      <ol>
        ${s.rule321.items.map((it) => `<li><b>${it.n}</b><span>${it.t}</span></li>`).join('\n        ')}
      </ol>
    </aside>
  </div>
</section>` : ''}

<section id="caracteristicas" class="wrap">
  <div class="section-head">
    <h2>Qué incluye el servicio</h2>
    <p>Componentes que podemos ajustar a tu operación: cada bloque se contrata completo o por etapas.</p>
  </div>
  <div class="grid-features">
    ${s.features.map((f, i) => `<div class="feat ${i % 3 === 0 ? 'a' : ''}">
      <span class="tag">${f.tag}</span>
      <h3>${f.t}</h3>
      <p>${f.p}</p>
    </div>`).join('\n    ')}
  </div>
</section>

<section class="wrap">
  <div class="section-head">
    <h2>Cómo trabajamos</h2>
    <p>El mismo flujo en tres pasos, con entregables claros en cada uno.</p>
  </div>
  <div class="steps">
    ${s.steps.map((st, i) => `<div class="step">
      <div class="step-num">${i + 1}</div>
      <h3>${st.t}</h3>
      <p>${st.p}</p>
    </div>`).join('\n    ')}
  </div>
</section>

${s.why ? `
<section class="wrap">
  <div class="section-head">
    <h2>${s.why.title}</h2>
    ${s.why.lead ? `<p>${s.why.lead}</p>` : ''}
  </div>
  <div class="why">
    ${s.why.items.map((w) => `<div><h3>${w.t}</h3><p>${w.p}</p></div>`).join('\n    ')}
  </div>
</section>` : ''}

<section class="wrap share-section">
  <div class="share-copy">
    <h2>${s.highlight.h2}</h2>
    <p>${s.highlight.p}</p>
    <ul class="share-list">
      ${s.highlight.list.map((li) => `<li>${checkSvg(15)}${li}</li>`).join('\n      ')}
    </ul>
  </div>
  <div class="panel">
    <p class="panel-title">${s.highlight.panelTitle}</p>
    <div class="ptable">${s.highlight.panel}</div>
  </div>
</section>

${s.nas ? `
<section class="wrap">
  <div class="section-head">
    <h2>${s.nas.title}</h2>
    <p>${s.nas.lead}</p>
  </div>
  <div class="mod-grid">
    ${s.nas.opciones.map((o) => `<div class="mod">
      <span class="tag2">${o.tag}</span>
      <h3>${o.t}</h3>
      <p style="color:var(--text-dim);font-size:.9rem;margin:0;">${o.p}</p>
      <p class="ideal">Ideal para: ${o.ideal}</p>
    </div>`).join('\n    ')}
  </div>
  <p class="nota-decision">${s.nas.nota}</p>
</section>` : ''}

${s.privacidad ? `
<section class="wrap">
  <div class="section-head">
    <h2>${s.privacidad.title}</h2>
    <p>${s.privacidad.lead}</p>
  </div>
  <ul class="share-list" style="max-width:720px;">
    ${s.privacidad.puntos.map((p) => `<li>${checkSvg(15)}${p}</li>`).join('\n    ')}
  </ul>
</section>` : ''}

${s.paquetes ? `
<section class="wrap">
  <div class="section-head">
    <h2>${s.paquetes.title}</h2>
    <p>${s.paquetes.lead}</p>
  </div>
  <div class="pkg-grid">
    ${s.paquetes.items.map((p) => `<div class="pkg${p.destacado ? ' destacado' : ''}">
      <h3>${p.nombre}</h3>
      <p class="perfil">${p.perfil}</p>
      <p class="precio">${p.precio} <small>${p.unidad} · ${p.min}</small></p>
      <ul>
        ${p.puntos.map((pt) => `<li>${checkSvg(14)}${pt}</li>`).join('\n        ')}
      </ul>
    </div>`).join('\n    ')}
  </div>
</section>` : ''}

${s.faq ? `
<section class="wrap faq">
  <div class="section-head">
    <h2>Preguntas frecuentes</h2>
    <p>Lo que más nos preguntan antes de contratar un respaldo.</p>
  </div>
  <div class="faq-wrap">
    ${s.faq.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('\n    ')}
  </div>
</section>` : ''}

<section class="wrap" id="demo">
  <div class="final-cta">
    <div>
      <h2>${s.h1.startsWith('Tu casa') ? 'Agenda una visita de evaluación' : 'Hablemos de tu proyecto'}</h2>
      <p>Escríbenos y agendamos una llamada de 30 minutos para revisar tu caso y darte un presupuesto cerrado.</p>
      ${s.ctaChannels ? `<div class="cta-channels">${s.ctaChannels.map((c) => `<a href="${c.href}"${c.ext ? ' rel="noopener"' : ''}>${c.label}</a>`).join('\n      ')}</div>` : ''}
    </div>
    <a class="btn-primary" href="mailto:${MAIL}?subject=${encodeURIComponent(s.ctaSubject)}">Solicitar cotización</a>
  </div>
</section>

<footer>
  <div class="wrap">
    <div>
      <div class="foot-brand">Integra-IO · ${s.nombre}</div>
      <div class="foot-links">
        <a href="mailto:${MAIL}">${MAIL}</a>
        <a href="../public/pacs.html">Ejemplo de página publicada: Integra-IO PACS</a>
      </div>
    </div>
    <div class="foot-note">${s.footNote || 'Página de propuesta, aún no integrada al sitio. Capturas, cifras y nombres son ilustrativos. Los alcances y SLA mostrados son de referencia y se fijan por contrato según el caso.'}</div>
  </div>
</footer>

${s.ctaWa ? `<a class="wa" href="${s.ctaWa}" rel="noopener">WhatsApp</a>` : ''}

</body>
</html>
`;
}

function index(list) {
  return `<!DOCTYPE html>
<html lang="es-MX">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>[PROPUESTAS] Integra-IO — landings de servicios para revisión</title>
<style>
  body{margin:0;background:#0A1018;color:#E7ECF3;font-family:'Segoe UI',system-ui,sans-serif;line-height:1.5;}
  .ribbon{background:#431407;color:#FDBA74;font-family:Consolas,monospace;font-size:.7rem;letter-spacing:.08em;text-align:center;padding:7px 12px;text-transform:uppercase;}
  h1{font-size:1.8rem;margin:28px 0 8px;}
  .sub{color:#93A1B8;margin:0 0 32px;max-width:60ch;}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;}
  a.card{display:block;background:#141F31;border:1px solid #26374F;border-radius:10px;overflow:hidden;text-decoration:none;color:inherit;transition:border-color .15s;}
  a.card:hover{border-color:#4CC9F0;}
  .thumb{width:100%;height:120px;object-fit:cover;display:block;border-bottom:1px solid #26374F;}
  .card .body{display:block;padding:14px 16px 16px;}
  .card b{font-size:1.02rem;display:block;margin-bottom:6px;}
  .card span{color:#93A1B8;font-size:.85rem;}
  .note{margin-top:36px;color:#5E6E86;font-size:.82rem;max-width:70ch;}
</style>
</head>
<body>
<div class="ribbon">Propuestas · borradores para revisión · no integrados al sitio</div>
<div class="wrap">
  <h1>Landings propuestas por servicio</h1>
  <p class="sub">Borradores con el mismo lenguaje de diseño que la página publicada de Integra-IO PACS. Ábrelas, anota ajustes y las que apruebes se integran como servicios clicables, igual que el PACS.</p>
  <div class="grid">
    ${list.map((s) => `<a class="card" href="${s.slug}.html"><img class="thumb" src="${IMGS[s.slug].file}" alt="${IMGS[s.slug].alt}"><span class="body"><b>${s.nombre}</b><span>${s.eyebrow}</span></span></a>`).join('\n    ')}
  </div>
  <p class="note">Para regenerarlas tras editar contenido: <code>node scripts/generar-propuestas.mjs</code>. Los archivos viven en <code>propuestas/</code> (fuera de <code>public/</code>), así que no se despliegan hasta integrarse.</p>
</div>
</body>
</html>
`;
}

mkdirSync(OUT, { recursive: true });
let borradores = 0;
for (const s of servicios) {
  if (s.publicPath) {
    writeFileSync(join(ROOT, 'public', s.publicPath), page(s));
    console.log(`✓ public/${s.publicPath} (pública)`);
    continue;
  }
  writeFileSync(join(OUT, `${s.slug}.html`), page(s));
  borradores++;
  console.log(`✓ propuestas/${s.slug}.html`);
}
writeFileSync(join(OUT, 'index.html'), index(servicios.filter((s) => !s.publicPath)));
console.log(`✓ propuestas/index.html (${borradores} propuestas)`);
