# Estrategia Técnico-Comercial de Respaldos en la Nube

## Integra-IO — Integración Tecnológica

**Documento de material comercial / "más información" del servicio Cloud Backup**

| | |
|---|---|
| **Empresa** | Integra-IO (integra-io.com) |
| **Ubicación** | Puebla, México |
| **Contacto** | contacto@integra-io.com · 222 544 7232 |
| **Fecha del documento** | 13 de octubre de 2026 |
| **Fecha de consulta de precios** | 13 de octubre de 2026 (fuentes oficiales de cada proveedor) |

> **Aviso sobre precios:** todos los precios citados son **de referencia**, verificados en las páginas oficiales de los proveedores en la fecha indicada y **sujetos a cambio sin previo aviso**. Los precios finales de Integra-IO se confirman en cotización personalizada. Tipo de cambio referencial usado para conversiones: **1 USD ≈ 18.5 MXN** (verificar al momento de facturar).

---

## Resumen ejecutivo

Integra-IO ofrece un servicio gestionado de **respaldo en la nube para empresas mexicanas** que cubre: servidores físicos y virtuales (Windows/Linux), bases de datos (SQL Server, MySQL, PostgreSQL), Microsoft 365, Google Workspace, laptops de usuarios y carpetas compartidas o NAS. El servicio se sustenta en cinco compromisos:

1. **Cifrado AES-256 de extremo a extremo** — los datos viajan y se almacenan cifrados; el proveedor de nube no puede leerlos.
2. **Regla 3-2-1** — tres copias de los datos, en dos medios distintos, con una fuera del sitio (nube).
3. **RPO/RTO definidos por sistema** — cada sistema crítico tiene metas documentadas de pérdida máxima de datos (RPO) y tiempo máximo de recuperación (RTO).
4. **Pruebas de restauración trimestrales** — un respaldo sin prueba de restauración no es un respaldo: se verifica periódicamente que los datos se recuperan, midiendo tiempos.
5. **Protección antirransomware con versionado** — históricos inmutables/retención extendida que permiten regresar a un punto anterior al ataque.
6. **Repositorio local a la medida y sin miradas** — el NAS se entrega **vendido, en comodato o alojado en nuestras oficinas**, según lo que prefiera el cliente; en todos los casos la información viaja y descansa cifrada con llaves del cliente: Integra-IO opera el servicio **sin acceder al contenido**.

**Conclusiones clave de la investigación:**

- El **backend de almacenamiento principal recomendado es Backblaze B2** (USD 6.95/TB/mes, API compatible con S3, sin mínimos de permanencia ni cargos de API, egreso gratuito hasta 3× el volumen almacenado): el mejor costo total para el 90 % de los clientes PYME y mediana empresa.
- Para clientes **regulados (salud, fintech) que exigen soberanía de datos en México**, el backend recomendado es **AWS S3 en la región México Central (mx-central-1)** — abierta en enero de 2025 — o **Azure Blob en Mexico Central**.
- La **combinación de software recomendada**: **Veeam** (Community/Essentials) para servidores, VMs y bases de datos; **Kopia o MSP360** para laptops y equipos de usuario; y **Veeam Backup for Microsoft 365 (Community o licenciado) / Synology Active Backup** para Microsoft 365 y Google Workspace.
- El modelo de arquitectura estándar es **híbrido**: repositorio local (NAS/servidor de staging) para restauraciones rápidas + bucket S3-compatible en nube para retención y desastres.
- Se proponen **tres paquetes** (Esencial PYME, Negocio, Crítico) con precios referenciales desde ~USD 35/TB/mes gestionado.

---

## 1. Almacenamiento: comparación de backends en la nube

El "backend" es donde viven físicamente los datos respaldados. Integra-IO es agnóstico: usa cualquier destino compatible con la API de Amazon S3, lo que permite elegir por costo, cumplimiento o ubicación.

### Tabla comparativa (precios de referencia, USD, consultados el 13-oct-2026)

| Criterio | **Backblaze B2** | **AWS S3 Standard** | **AWS S3 Standard-IA** | **AWS Glacier Instant Retrieval** | **Wasabi** | **Azure Blob Cool** | **Azure Blob Cold** |
|---|---|---|---|---|---|---|---|
| **Precio mensual** | **USD 6.95/TB/mes** (≈ MXN 129) | USD 23.55/TB/mes ($0.023/GB) | USD 12.80/TB/mes ($0.0125/GB) | USD 4.10/TB/mes ($0.004/GB) | USD 7.99/TB/mes (≈ MXN 148) | ≈ USD 11.06–11.78/TB/mes | ≈ USD 4.61/TB/mes |
| **Egreso / descarga** | **Gratis hasta 3× el promedio mensual almacenado**; después USD 0.01/GB (~USD 10.24/TB) | 100 GB/mes gratis; después $0.09/GB (~USD 92/TB) | ídem + **cargo de recuperación $0.01/GB** | ídem + **cargo de recuperación $0.03/GB** | **Gratis** (uso razonable: egreso ≈ volumen almacenado) | ~$0.087/GB + recuperación ~$0.01/GB | ~$0.087/GB + recuperación ~$0.02–0.03/GB |
| **Transacciones API** | **Gratis** en plan pay-as-you-go (clase D: 2,500/día gratis, luego $0.004/10 mil) | PUT $0.005/1,000 · GET $0.0004/1,000 | PUT $0.01/1,000 · GET $0.001/1,000 | PUT $0.01/1,000 · GET $0.01/1,000 | **Gratis** | ~$0.004–0.013/10,000 según nivel | ~$0.01–0.013/10,000 |
| **Mínimo de permanencia** | **Ninguno** | Ninguno | 30 días (borrado anticipado se cobra) | 90 días | **90 días** | 30 días | 90 días |
| **Mínimo contratado** | Ninguno | Ninguno | Ninguno | Ninguno | Ninguno (pay-as-you-go) | Ninguno | Ninguno |
| **API compatible con S3** | **Sí** | Nativa | Nativa | Nativa | **Sí** | **No** (API propia de Azure; requiere gateway/herramienta nativa) | **No** |
| **Regiones relevantes para México** | EE.UU. Oeste (Sacramento), EE.UU. Este (Cleveland), Canadá (Toronto), UE (Fránkfort). **Sin región en México** | 30+ regiones, incluye **México Central (mx-central-1, abierta ene-2025)** | ídem | ídem | EE.UU. (este/central/oeste), Canadá, UE, APAC. **Sin región en México** | 60+ regiones, incluye **Mexico Central** | ídem |
| **Ideal para** | **Uso general: mejor costo total** para respaldos PYME/mediana empresa | Clientes que ya viven en AWS o exigen soberanía MX | Retención media con accesos ocasionales | Retención larga (12+ meses) con acceso inmediato pero poco frecuente | Volumen estable con egreso alto esperado | Clientes con ecosistema Microsoft y requisito de datos en MX | Archivo/retención extendida en Azure |

### Lectura comercial para el cliente

- **Costo de "salvar el rescate":** en un evento de ransomware hay que descargar mucho volumen rápido. Con Backblaze B2, descargar 1 TB cuesta ~USD 10 (y gratis si está dentro de la cuota de 3×); en AWS S3 Standard puede costar ~USD 92 por TB + peticiones. **En una emergencia, el backend barato de egreso es el que importa.**
- **Costo de ciclo de vida:** una estrategia típica guarda 30–90 días de históricos en caliente y 12 meses en frío. Ejemplo referencial por TB: B2 plano = USD 6.95/mes; en AWS, 60 días Standard + 300 días Glacier IR ≈ USD (1.96 + 1.23) + cargos de recuperación al restaurar. B2 gana en simplicidad; AWS gana si se requiere región México o integración nativa.
- **Soberanía de datos (salud/fintech):** para clientes bajo NOM-004 (expediente clínico electrónico), lineamientos CNBV o políticas internas de residencia de datos, se usa **AWS mx-central-1 o Azure Mexico Central**, donde los datos permanecen jurídicamente en territorio mexicano. Backblaze y Wasabi solo tienen regiones en EE.UU./Canadá/UE: aptas para la mayoría de los clientes comerciales, no para los que exigen residencia en México.
- **Inmutabilidad antirransomware:** los cuatro proveedores soportan retención de objetos (Object Lock en B2/S3/Wasabi, inmutabilidad con políticas en Azure), que impide borrar o sobrescribir respaldos durante el período definido incluso con credenciales comprometidas. Integra-IO lo activa por defecto en los históricos.

---

## 2. Software de respaldo: comparación

### Tabla comparativa (costos de referencia, consultados 13-oct-2026)

| Software | Plataformas | Imagen / equipo completo | VSS para SQL Server | Cifrado | Dedup. | Versionado | Consola multi-cliente | Licencia (referencia) | Perfil de cliente ideal |
|---|---|---|---|---|---|---|---|---|---|
| **Restic** (OSS) | Win/Linux/macOS (CLI) | No (archivos) | Parcial (scripts + VSS en Windows) | **AES-256 obligatoria** (cliente) | Sí, a nivel bloque | Sí (snapshots) | No (CLI/scripting) | **Gratis** | Servidores Linux, clientes técnicos, integración por scripts |
| **Kopia** (OSS) | Win/Linux/macOS, GUI + CLI | No (archivos) | VSS en Windows | **AES-256 obligatoria** | Sí (65–82 % eficiencia) | Sí | **Kopia Server** para gestionar muchos endpoints | **Gratis** | Laptops y servidores de archivos con consola central sin costo |
| **Duplicati** (OSS) | Win/Linux/macOS, web UI | No | VSS en Windows | AES-256 | Sí | Sí | No (una instancia por equipo) | **Gratis** | Equipos individuales con GUI web; estabilidad histórica irregular |
| **Veeam Data Platform** (Community / Essentials) | Windows/Linux, VMware, Hyper-V, Proxmox, NAS, laptops | **Sí (bare-metal + VMs)** | **Sí, nativa (SQL, Exchange, Oracle)** | Sí (en repositorio y tránsito) | Sí | Sí, con GFS (semanal/mensual/anual) | **Sí (consola empresarial)** | **Community: gratis hasta 10 cargas** · Essentials ≈ USD 95/instancia/año (paquetes de 5) · VUL ≈ USD 155+/carga/año | **Servidores, VMs y bases de datos: el estándar del mercado** |
| **MSP360 (CloudBerry) Managed Backup** | Win/Linux/macOS, SQL, VMs | Sí (edición server) | Sí | AES-256 cliente | Sí (block-level) | Sí | **Sí, consola MSP multi-cliente** | ≈ USD 2.50/equipo/mes (mín. USD 30/mes) · standalone ≈ USD 25–240/año según edición | MSPs con muchos clientes pequeños; almacenamiento propio (B2/Wasabi) |
| **Acronis Cyber Protect** | Win/Linux/macOS, VMs, móvil | Sí | Sí | Sí | Sí | Sí | Sí (consola MSP en nube Acronis) | Por carga protegida vía MSP (referencias de mercado ≈ USD 25–300+/carga/año según tier; lista no pública) | Clientes que quieren respaldo + antimalware todo-en-uno |
| **UrBackup** (OSS) | Win/Linux/macOS (cliente/servidor) | Sí (imágenes + archivos) | VSS en Windows | Opcional (en internet-mode; no forzada) | Sí | Sí | Sí (servidor central web) | **Gratis** | Servidor de staging local en LAN para muchas PCs |
| **Synology Active Backup for Business** | Win/Mac/Linux, VMware/Hyper-V, SMB, M365/GWS (apps hermanas) | Sí | Sí (VSS) | Sí (en tránsito y repositorio) | Sí (Btrfs) | Sí | Sí (dashboard en el NAS) | **Gratis con NAS Synology** (sin licencias por equipo) | Clientes que ya tienen (o Integra-IO les provee) un NAS Synology |

### Combinación principal recomendada por Integra-IO

**Servidores y bases de datos → Veeam (Community Edition hasta 10 cargas; Essentials/VUL a partir de 11):**

- Respaldo a nivel imagen con **VSS consciente de aplicaciones**: SQL Server, MySQL/PostgreSQL (agentes) y VMs completas se respaldan en caliente y de forma transaccional.
- Restaura **granulares** (archivo, objeto de base de datos, VM completa) y **bare-metal** con medios de arranque.
- Cadena 3-2-1 nativa: repositorio local (restauración rápida) + **copy job a bucket S3-compatible** (B2/AWS) con Object Lock.
- El Community Edition gratuito (10 cargas) permite arrancar clientes pequeños sin CAPEX de licencia; el escalado a Essentials (~USD 95/instancia/año) es predecible.

**Laptops y equipos de usuario → Kopia (gestionado desde Kopia Server) o MSP360 cuando el cliente exige consola comercial soportada:**

- Cifrado AES-256 de cliente obligatorio (la llave nunca sale del equipo/gestor de secretos), deduplicación global y respaldo continuo o programado.
- Kopia: costo cero de licencia, consola central para decenas de endpoints, destino S3-compatible directo (B2).
- MSP360: se elige cuando el cliente valora soporte comercial, integración con RMM y facturación por endpoint (~USD 2.50/equipo/mes) usando el mismo bucket de Integra-IO.

**NAS y carpetas compartidas → Synology Active Backup for Business** cuando el sitio ya cuenta con NAS Synology (costo de software cero; sincronización del repositorio del NAS hacia B2), o el copy job de Veeam hacia el bucket.

**¿Por qué esta combinación?** Cubre el 100 % del alcance prometido con costo de licencia marginal (la mayoría del software es gratuito o de bajo costo), consolida el destino en un solo bucket S3-compatible por cliente (facturación y auditoría simples), y deja una ruta de crecimiento comercial clara: Community → Essentials → VUL según crece el cliente.

---

## 3. Respaldo de Microsoft 365 y Google Workspace

**Por qué es necesario:** la responsabilidad de los datos en M365/Workspace es del cliente (modelo de responsabilidad compartida). Microsoft y Google **no respaldan** ante borrado de usuarios, malware, sincronizaciones erróneas o salidas de personal malintencionadas; sus sistemas de retención (bandeja de recuperables, Vault en ediciones altas) no sustituyen un respaldo independiente restaurable por elemento.

| Solución | Qué cubre | RPO típico | Costo referencial (consultado 13-oct-2026) | Observaciones |
|---|---|---|---|---|
| **Veeam Backup for Microsoft 365 — Community Edition** | Exchange Online, OneDrive, Teams (10) y SharePoint (1 TB fuente) — hasta **10 usuarios gratis** | Diaria (programable) | **Gratis** (solo el almacenamiento en B2/S3) | Ideal como oferta de entrada; corre en un Windows Server pequeño de Integra-IO o del cliente; restore granular por elemento |
| **Veeam VB365 licenciado** | Ídem, sin límite de usuarios | Cada 1–4 h | Licencias ≈ USD 23–35/usuario/año (lista, según edición) | Para clientes >10 usuarios que ya usan Veeam en servidores |
| **Afi.ai** | M365 y Google Workspace completos: correo, calendario, Drive/OneDrive, SharePoint, Teams; proteg. antiransomware, 3 respaldos/día | Hasta 8 h (3×/día) | **Desde ≈ USD 3/usuario/mes** (50 GB agrupados por usuario; mínimo 5 usuarios) | SaaS 100 %, sin infraestructura local; buena para Workspace; SLA enterprise |
| **SkyKick Cloud Backup** | M365 completo (Exchange, OneDrive, SharePoint, Teams) | Varias veces al día | **≈ USD 2–4/usuario/mes**, almacenamiento ilimitado (canal MSP/distribuidores) | Solo vía MSP; panel de marca propia; muy usado por partners |
| **Synology Active Backup for Microsoft 365 / Google Workspace** | Gmail, Drive, Calendario, Contactos (GWS); Exchange Online, OneDrive, SharePoint, Teams (M365) | Diaria | **Gratis con NAS Synology** (software) | Descarga al NAS del cliente; el NAS se replica a B2 → 3-2-1 completo sin costo de SaaS |
| **Export manual / API (Graph API, Purview, Google Takeout/Vault)** | Correo y datos según servicio | Manual (no confiable como RPO) | Gratis (Vault incluido en Business Plus/Enterprise) | Sirve como último recurso o cumplimiento puntual; **no** es un servicio de respaldo: sin versionado ni automatización |

**Recomendación:** **Veeam VB365 Community** como estándar de entrada (costo cero hasta 10 usuarios, misma marca que el respaldo de servidores); **SkyKick o Afi.ai** para clientes con 10+ usuarios que quieren SaaS gestionado; **Synology Active Backup for Google Workspace** para clientes con NAS que usan Google. En todos los casos el destino final cumple la regla 3-2-1 (repositorio local + B2/AWS).

---

## 4. Tipos de registro y documentación por cliente

Cada cuenta de Cloud Backup de Integra-IO lleva un expediente documental estandarizado (formato digital en el repositorio del cliente + copia en el CRM interno). Sirve para auditorías, renovaciones, siniestros y transiciones.

| # | Documento | Contenido mínimo | Frecuencia de actualización |
|---|---|---|---|
| 1 | **Inventario de activos protegidos** | Hostname, rol, SO, IP, criticidad, tamaño de datos, agente/software instalado y versión, destino (bucket/repo), owner del sistema | En cada alta/baja/cambio; revisión mensual |
| 2 | **Matriz RPO/RTO por sistema** | Sistema → criticidad → frecuencia de respaldo → RPO objetivo → RTO objetivo → retención → responsable; firmada por el cliente | En el alta y ante cambios de criticidad |
| 3 | **Bitácora de ejecución de respaldos** | Fecha/hora, job, origen, destino, resultado (éxito/falla/advertencia), bytes, alertas generadas y su atención | Automática diaria (export del software); resumen semanal |
| 4 | **Registro de pruebas de restauración** | Fecha, sistema, tipo de prueba (archivo/BD/equipo/buzón), punto restaurado, **tiempo medido vs. RTO**, resultado, hallazgos, acciones correctivas, firma de quien presenció | **Trimestral** (mensual en paquete Crítico) |
| 5 | **Reporte mensual tipo** | Ver plantilla abajo | Mensual |
| 6 | **Constancia de aceptación y retención firmada** | Alcance contratado, periodos de retención por tipo de dato, política de borrado/entrega al terminar el contrato, tratamiento de llaves de cifrado, aceptación de RPO/RTO y de precios | En la firma del contrato y en cada renovación |

### Plantilla de reporte mensual (secciones sugeridas)

1. **Resumen ejecutivo** — % de éxito de jobs, incidentes del mes, semáforo de cumplimiento RPO/RTO.
2. **Cobertura** — activos protegidos vs. inventario (altas/bajas).
3. **Consumo** — TB almacenados por destino y tendencia, alertas de capacidad.
4. **Pruebas de restauración** — la del mes/trimestre: qué se probó, tiempo medido, resultado.
5. **Incidentes y alertas** — fallas, causa, corrección, pendientes.
6. **Recomendaciones** — ajustes de alcance, retención o arquitectura.

---

## 5. Arquitectura y conexiones sugeridas

### Esquema A — Agente en cada equipo → bucket S3-compatible directo (con caché local)

Adecuado para clientes sin infraestructura local relevante o con muchos sitios pequeños.

```
 [Servidor físico Windows]──agent──┐
 [Servidor Linux]──────────agent───┤                      HTTPS:443
 [VMware/Hyper-V]──────────agent───┼────► [Caché local     ┌──────────────────┐
 [Laptops usuarios]────────agent───┘       (disco temp,     │ Bucket S3-compat │
                                            10–100 GB) ────► │ Backblaze B2 /   │
                                                             │ AWS S3 (Object   │
   [MS365 / Google Workspace] ── conector/API ─────────────► │ Lock ON)         │
                                                             └──────────────────┘
```

- **Puertos:** saliente TCP 443 (S3/HTTPS) desde cada agente; opcional 53 DNS interno.
- **Caché local** (Kopia/MSP360) acelera subidas incrementales y evita re-subir tras cortes.
- **Pros:** simple, sin CAPEX local. **Contras:** restauraciones grandes dependen del ancho de banda de internet.

### Esquema B — Servidor de respaldo local (staging/NAS) que replica al bucket

Adecuado para clientes con red local sólida y múltiples servidores.

```
 [Agentes Veeam/Kopia]──LAN──► ┌────────────────────────┐
   SQL · VMs · archivos        │ Servidor de respaldo / │  copia síncrona
                               │ NAS staging (Btrfs/    │──────────────►  Bucket S3-compat
                               │ repositorio Veeam)     │  (copy job)     (B2/AWS, Object Lock)
                               └────────────────────────┘
                                        ▲
                          [Consola de gestión + alertas Integra-IO]
```

- **Puertos:** LAN TCP 445 (SMB), 1433 (SQL Server), 3306 (MySQL), 5432 (PostgreSQL), 902/443 (VMware), Veeam 9392/9399; hacia internet solo 443 desde el servidor de staging (nunca agentes expuestos).
- **Pros:** respaldos y restauraciones a velocidad LAN; un solo punto que habla con la nube. **Contras:** requiere equipo local (NAS o servidor).

### Esquema C — Híbrido (recomendado por defecto)

Repositorio local para restauraciones rápidas + nube para retención/desastre, con inmutabilidad en ambos.

```
                        ┌─────────────────────── SITIO CLIENTE ───────────────────────┐
  [Servidores/VMs] ───► │  Repositorio local (NAS/Srv staging)   retención 14–30 días │
  [Bases de datos] ───► │  Veeam repo · dedup · cifrado · snapshots inmutables cortos  │
  [Laptops] ───────────►│        (Kopia/MSP360 → carpeta/NAS o bucket cache)           │
                        └───────────────┬──────────────────────────────────────────────┘
                                        │ copy job cifrado (HTTPS 443)
                                        ▼
                        ┌──────────── NUBE (fuera del sitio) ─────────────┐
                        │  Backblaze B2 o AWS S3 (mx-central-1 si aplica) │
                        │  Object Lock 30–365 días · 3-2-1 · versionado   │
                        └───────────────┬─────────────────────────────────┘
                                        │ restauración: granular / equipo completo / BD
                                        ▼
                     [Destino de restauración: repo local, equipo nuevo o staging en nube]
```

- **Puertos:** igual que B; además 443 saliente permanente del repositorio a la nube y, si se usa DR en nube, sitio-a-sitio VPN (IPsec 500/4500) opcional.
- **Manejo de llaves de cifrado:** las llaves/contraseñas de cifrado **se generan por cliente y se custodian en el gestor de secretos de Integra-IO** con acceso registrado (quién, cuándo); se entrega sobreguardado ("escrow") de llave al cliente en sobre cerrado o bóveda acordada en la constancia firmada. El cliente decide en contrato entre custodia Integra-IO (respuesta rápida) o llave exclusiva del cliente (máxima confidencialidad; Integra-IO no puede restaurar sin ella).
- **Rutas de restauración:** (1) **granular de archivos** — del snapshot local o nube, minuto(s); (2) **equipo completo (bare-metal)** — medios de arranque USB/ISO + repositorio, horas según tamaño; (3) **base de datos** — restore transaccional a punto en el tiempo con cadenas de log; (4) **buzón/elemento M365-GWS** — desde el respaldo SaaS, por carpeta, elemento o buzón completo.

### Modalidades del repositorio local (NAS): vendido, en comodato o alojado en Integra-IO

La copia local de restauración rápida (esquemas B y C) puede implementarse de tres maneras, **a gusto del cliente**:

| Aspecto | **Vendido al cliente** | **En comodato** | **Alojado en oficinas de Integra-IO** |
|---|---|---|---|
| **Propiedad del equipo** | Del cliente | De Integra-IO (préstamo de uso) | Del cliente o de Integra-IO, según se acuerde |
| **Inversión inicial** | Hardware + instalación | Nula (equipo incluido en la mensualidad) | Espacio mensual + equipo según modalidad elegida |
| **Ubicación de la copia local** | Oficinas del cliente | Oficinas del cliente | Oficinas de Integra-IO en Puebla (espacio asegurado: acceso controlado, clima, UPS) |
| **Restauración local** | A velocidad de red local | A velocidad de red local | Por internet (en emergencia, traslado físico del equipo cifrado) |
| **Mantenimiento del hardware** | Integra-IO, dentro del plan | Integra-IO (reemplazo incluido ante falla) | Integra-IO (el equipo nunca sale del sitio sin autorización del cliente) |
| **Ideal para** | Sitios estables con condiciones adecuadas (espacio, clima, energía regulada) | Clientes que no quieren desembolso inicial | Oficinas pequeñas sin condiciones ni espacio para equipo propio, o que quieren la copia rápida fuera de su sitio |
| **Al terminar el contrato** | El equipo ya es del cliente | El equipo se devuelve o se ejerce opción de compra | Se entrega la información cifrada y/o se muda el equipo con aviso acordado |

**Cómo se decide:** en el diagnóstico se evalúan espacio, energía, clima, riesgo de robo y ancho de banda; con eso se recomienda la modalidad, pero **la decisión final siempre es del cliente** y queda documentada en la constancia de servicio.

---

## 6. Compromiso de privacidad: Integra-IO no visualiza su información

El servicio está diseñado para que Integra-IO **opere el conducto sin leer el contenido**: infraestructura, software, programación, monitoreo de jobs, pruebas y reportes sí; **archivos, bases de datos, correos y documentos del cliente, no**.

**Medidas técnicas**

1. **Cifrado del lado del cliente:** la información se cifra con AES-256 **antes de salir de los equipos del cliente**; viaja y se almacena cifrada. Sin la llave, el contenido es ilegible para cualquiera —incluido Integra-IO y el proveedor de nube.
2. **Llaves del cliente por defecto:** la llave de cifrado se genera y custodia **en poder del cliente** (modelo "sin conocimiento" o *zero-knowledge*). Opcionalmente, si el cliente prefiere restauraciones sin su intervención, la llave se entrega sobreguardada en sobre cerrado firmado; en ambos casos queda documentado en la constancia de servicio quién puede descifrar.
3. **NAS alojado en nuestras oficinas = volumen cifrado:** el equipo almacena volúmenes cifrados; sin la llave del cliente, cualquier disco del NAS es ilegible. Las credenciales de administración del NAS son del cliente (o de doble control acordado), y el equipo **no sale del sitio ni se conecta a ningún destino distinto al acordado** sin autorización expresa y por escrito del cliente.
4. **Bitácora de intervenciones:** toda intervención técnica sobre el NAS o el repositorio (actualización, mantenimiento, cambio de disco) se registra: fecha, técnico, motivo y autorización del cliente.

**Medidas contractuales y de proceso**

- **Cláusula de confidencialidad y no acceso** en el contrato de servicio: Integra-IO actúa como **encargado** en términos de la LFPDPPP, con prohibición expresa de acceder, copiar o tratar el contenido para fines distintos a la operación del respaldo.
- **Personal firmado a confidencialidad**, con principio de acceso mínimo: nadie de Integra-IO tiene credenciales de lectura del contenido del cliente.
- **Derecho de auditoría del cliente:** el cliente puede verificar en cualquier momento la configuración de cifrado, la bitácora de accesos e intervenciones, y presenciar cualquier prueba de restauración.

---

## 7. Paquetes por nivel (precios de referencia)

Precios en **USD** (facturables en MXN al tipo de cambio del día; **referenciales**, sujetos a cambio y a cotización final). Almacenamiento gestionado incluye: backend en nube, licencias de software indicadas, configuración, monitoreo, alertas, bitácora, reporte mensual y pruebas de restauración.

| Componente | **Esencial PYME** | **Negocio** | **Crítico** |
|---|---|---|---|
| **Perfil del cliente** | 1 sitio, hasta ~15 personas, datos ≤ 2 TB | 1–2 sitios, hasta ~50 personas, 3–10 TB, servidores + M365 | Multi-sitio o regulado (salud/fintech), 10+ TB, sistemas críticos |
| **Qué se respalda** | Archivos, carpetas compartidas/NAS, laptops, 1 BD pequeña | Servidores físicos/VMs, BDs (SQL/MySQL/PG), NAS, M365/Workspace, laptops | Todo lo de Negocio + BDs críticas con respaldo cada hora + DR documentado |
| **Software** | Kopia/MSP360 + B2 | Veeam Community/Essentials + staging local + B2; VB365 Community | Veeam Essentials/VUL + Afi.ai/SkyKick; backend AWS mx-central-1 o B2 según compliance |
| **RPO / RTO objetivo** | 24 h / 8 h | 4–12 h / 2–4 h | 1–4 h / 1–2 h (por sistema, en matriz firmada) |
| **Retención** | 30 días diarios | 30 diarios + 12 mensuales | 90 diarios + 12 mensuales + 7 anuales, con inmutabilidad 30+ días |
| **Pruebas de restauración** | Trimestral (1 sistema) | Trimestral (2 sistemas, tiempos medidos) | **Mensual** (por sistema crítico) + simulacro anual de desastre |
| **Soporte incluido** | Siguiente día hábil (horario) | Respuesta ≤ 4 h hábiles | Respuesta ≤ 1 h, guardia para emergencias 24/7 |
| **Precio referencial** | **Desde USD 35/TB/mes** (mínimo ~USD 49/mes) + USD 3/usuario/mes por M365/Workspace | **Desde USD 65/TB/mes** + licencias Veeam (~USD 8/instancia/mes) + USD 2.5–4/usuario/mes SaaS | **Desde USD 110/TB/mes** + licencias premium + SaaS por usuario; cotización por alcance |
| **Equivalencia aprox.** | 2 TB ≈ MXN 1,850/mes | 5 TB ≈ MXN 6,000–7,500/mes | 10 TB ≈ MXN 20,000+/mes (según alcance) |

> Los precios de licencias externas (Veeam ≈ USD 95/instancia/año; Afi ≈ USD 3/usuario/mes; SkyKick ≈ USD 2–4/usuario/mes; MSP360 ≈ USD 2.50/equipo/mes) se traslapan al cliente a precio de lista o mejor, y se verifican en cada cotización.

---

## Recomendación para Integra-IO

**Backend principal: Backblaze B2.** Con los datos verificados, B2 ofrece la mejor relación costo/función para el servicio gestionado: USD 6.95/TB/mes, **sin cargos de API** en pay-as-you-go, **sin mínimos de permanencia** (crítico para rotar históricos con agilidad) y **egreso gratis hasta 3× el almacenado**, lo que abarata precisamente el escenario más importante para el cliente: restaurar tras un incidente. Su API S3-compatible funciona con toda la pila recomendada (Veeam, Kopia, MSP360, UrBackup, Synology) y soporta Object Lock para antirransomware.

**Backend secundario/compliance: AWS S3 en mx-central-1** (y Azure Blob Mexico Central como alternativa cuando el cliente ya es de ecosistema Azure): se ofrece de forma diferenciada a clientes de salud y fintech que requieren residencia de datos en México. AWS se complementa con políticas de ciclo de vida (Standard → Glacier Instant Retrieval) para retenciones largas en clientes grandes.

**Pila de software:** Veeam (servidores/BDs/VMs) + Kopia o MSP360 (equipos de usuario) + VB365 Community/SkyKick/Afi (SaaS) + Synology Active Backup donde ya exista NAS. Arquitectura híbrida (esquema C) como estándar de venta.

**Modelo comercial:** vender por paquete mensual gestionado (no por TB crudo): el margen está en la gestión, las pruebas de restauración y el reporte — que es exactamente lo que un PYME no puede hacer solo. Usar el Community de Veeam (10 cargas) y el de VB365 (10 usuarios) como puerta de entrada de bajo costo con ruta clara de ampliación.

---

## Preguntas de diagnóstico para levantar el caso del cliente

1. ¿Cuántos servidores (físicos/virtuales), bases de datos y equipos de usuario tiene hoy, y qué sistema no podría estar caído más de 2 horas?
2. ¿Qué tipo de datos maneja? ¿Hay información clínica, financiera o datos personales sujetos a regulación (NOM-004, CNBV, LFPDPPP)?
3. ¿Cuánta información, en GB/TB, considera crítica hoy, y cuánto crece al mes?
4. ¿Qué ancho de banda de internet tiene (subida) y hay enlace secundario?
5. ¿Tiene NAS o servidor disponible para mantener una copia local de restauración rápida?
6. ¿Usa Microsoft 365 o Google Workspace? ¿Cuántos usuarios activos?
7. ¿Cuándo fue la **última vez que restauró** algo de su respaldo actual y cuánto tardó?
8. ¿Quién administra hoy los respaldos y qué pasa si esa persona no está?
9. ¿Tiene política de retención definida (cuánto tiempo debe conservar cada tipo de información)?
10. ¿Ha sufrido incidentes de ransomware, borrados accidentales o salidas de personal con borrado de información?

---

## Preguntas frecuentes (FAQ)

**1. Uso Microsoft 365 / Google Workspace: ¿no ya está respaldado?**
No. Microsoft y Google garantizan la disponibilidad del servicio, no la recuperación de sus datos ante borrados, sincronizaciones, malware o cuentas comprometidas; su responsabilidad compartida lo deja en manos del cliente. Un respaldo independiente permite restaurar por elemento y a una fecha anterior al problema.

**2. ¿Qué pasa si me infectan de ransomware?**
El versionado con retención inmutable (Object Lock) conserva copias anteriores al ataque que el propio ransomware —o un atacante con credenciales— no puede borrar. Integra-IO restaura a la última copia limpia midiendo el RTO acordado; por eso las pruebas trimestrales son parte del servicio.

**3. ¿Quién puede leer mis datos respaldados?**
Nadie más que usted. Todo se cifra con AES-256 **antes de salir de sus equipos** y así viaja y se almacena. Por defecto la llave es exclusiva del cliente (modelo *zero-knowledge*); si prefiere restauraciones sin su intervención, se entrega sobreguardada en sobre cerrado. El proveedor de nube no puede leer el contenido y Integra-IO opera el servicio sin acceder a él; esto incluye el NAS alojado en nuestras oficinas, que guarda volúmenes cifrados ilegibles sin su llave.

**4. ¿Dónde están físicamente mis datos?**
Por defecto en centros de datos de Backblaze en EE.UU., cifrados. Si su industria exige datos en México (salud, fintech), los alojamos en la región AWS o Azure de México Central, abiertas en 2025, y así se documenta en su constancia de servicio.

**5. ¿Cuánto tarda una restauración?**
Depende del volumen y del ancho de banda; por eso definimos un RTO por sistema y lo medimos. Con la copia local híbrida, archivos y bases de datos pequeñas se restauran en minutos a velocidad de red local; equipos completos de cientos de GB toman horas. Cada prueba trimestral deja el tiempo medido por escrito.

**6. ¿Los respaldos ralentizan mis equipos o mi red?**
Se programan en ventanas acordadas, con limitación de ancho de banda y deduplicación a nivel de bloque: después del primer respaldo solo se transfieren los cambios. Las laptops pueden respaldar en la nube directamente y continuar tras una interrupción de red.

**7. ¿Puedo cambiarme de proveedor o salirme del servicio?**
Sí. Los datos son suyos, en su propio bucket, en formato estándar; la constancia firmada define la entrega completa de datos y llaves al terminar. No hay "cautiverio" tecnológico: usamos software y almacenamiento con formatos documentados.

**8. ¿Qué incluye exactamente la "prueba de restauración trimestral"?**
Restauramos un sistema acordado (un archivo o carpeta, una base de datos o un buzón) a un ambiente de prueba, medimos el tiempo contra el RTO pactado, verificamos la integridad de los datos y entregamos el registro firmado con hallazgos y acciones. Sin esa evidencia, un respaldo es solo una promesa.

**9. Si mi NAS queda alojado en sus oficinas, ¿pueden ver mi información?**
No. El NAS guarda volúmenes cifrados cuya llave es suya: sin ella, el contenido de cualquier disco es ilegible. Las credenciales de administración son suyas o de doble control, toda intervención técnica se hace con su autorización y queda en bitácora, y hay cláusula contractual de no acceso con derecho de auditoría.

**10. ¿Qué diferencia hay entre comprar el NAS, tomarlo en comodato o alojarlo con ustedes?**
La compra es su inversión: el equipo vive en su oficina y es suyo. El comodato evita el desembolso inicial: Integra-IO aporta y mantiene el equipo en su oficina bajo contrato de uso. El alojamiento pone la copia local en nuestras oficinas de Puebla (espacio asegurado) cuando su sitio no reúne condiciones; en los tres casos el servicio, el cifrado y la garantía de no acceso son idénticos.

---

## Cierre

Integra-IO diseña, implementa y opera su estrategia de respaldo en la nube con reglas 3-2-1, cifrado AES-256, RPO/RTO por sistema, pruebas de restauración con evidencia y reportes mensuales — para que un incidente sea un percance de horas, no una pérdida definitiva.

**Conversemos sobre su caso:**

> **Integra-IO — Integración Tecnológica, Puebla, México**
> contacto@integra-io.com · 222 544 7232 · integra-io.com

*Documento elaborado en octubre de 2026. Precios de terceros verificados el 13/10/2026 en fuentes oficiales (Backblaze, AWS, Wasabi, Microsoft Azure, Veeam, MSP360, Acronis, Synology, Afi.ai, SkyKick) y sujetos a cambio; confirman vigencia y alcance en la cotización.*
