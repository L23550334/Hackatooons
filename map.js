// ============================================================
//  map.js  —  MAPA + SECUENCIA CINEMÁTICA AL SELECCIONAR ZONA
// ============================================================

const COLONIA_ORDER = ["PO", "R", "D1", "Ca", "Ce"];

const COLONIA_META = {
  PO: { label: "Punta Oriente", enemyKey: "plaza"    },
  R:  { label: "Riberas",       enemyKey: "parque"   },
  D1: { label: "Distrito 1",    enemyKey: "catedral" },
  Ca: { label: "Campestre",     enemyKey: "palacio"  },
  Ce: { label: "Centro",        enemyKey: "univ"     },
};

// Posición en el mapa (% desde esquina superior-izquierda del wrapper)
const ZONE_POS = {
  PO: { x: 66, y: 74 },
  R:  { x: 30, y: 22 },
  D1: { x: 25, y: 48 },
  Ca: { x: 36, y: 74 },
  Ce: { x: 45, y: 56 },
};

// Datos cinemáticos de cada colonia
const ZONE_CINEMATIC = {
  PO: {
    nivel:     "NIVEL  I",
    nombre:    "PUNTA ORIENTE",
    subtitulo: "La Zona de Carga",
    tag:       "FRACCIONES",
    lore:      "Los Restadores han cortado la electricidad. Las fábricas se apagan una a una y el caos se apodera del sector industrial. Solo quien domine las fracciones podrá recalibrar el generador antes del amanecer.",
    color:     "#e09818",   // ámbar
  },
  R: {
    nivel:     "NIVEL  II",
    nombre:    "RIBERAS DE SACRAMENTO",
    subtitulo: "El Acueducto Saboteado",
    tag:       "ECUACIONES",
    lore:      "Los campamentos Restadores bloquean el acueducto histórico. Cientos de familias llevan días sin agua. Las válvulas están cifradas con ecuaciones — descifra los valores de X y devuelve el flujo al sector.",
    color:     "#30d4ff",   // cian
  },
  D1: {
    nivel:     "NIVEL  III",
    nombre:    "DISTRITO UNO",
    subtitulo: "La Central Cyber-Restadora",
    tag:       "ÁLGEBRA",
    lore:      "Bajo las luces de neón del Distrito Uno opera el servidor central enemigo. Sus firewalls mutan cada minuto con expresiones algebraicas. Infiltra la red y borra los nodos de control antes de que encripten toda la ciudad.",
    color:     "#ffa030",   // neón naranja
  },
  Ca: {
    nivel:     "NIVEL  IV",
    nombre:    "EL CAMPESTRE",
    subtitulo: "El Laberinto del Club",
    tag:       "GEOMETRÍA",
    lore:      "El club privado esconde agentes enemigos camuflados entre la élite local. Sus escudos de invisibilidad dependen de fórmulas geométricas. Calcula áreas, perímetros y ángulos para revelar a los impostores.",
    color:     "#50b838",   // verde
  },
  Ce: {
    nivel:     "BOSS  FINAL",
    nombre:    "CENTRO HISTÓRICO",
    subtitulo: "El Núcleo del Desierto",
    tag:       "BATALLA FINAL",
    lore:      "Bajo la Plaza de Armas duerme el artefacto que despertó a los Restadores. El Gobernador los controla desde las catacumbas del palacio. Esta es la última batalla — usa todo lo que aprendiste. Chihuahua entera te observa.",
    color:     "#e07040",   // terra
  },
};

let _cinemaRunning = false;

// ─── Dibuja el mapa ───────────────────────────────────────────
function drawMap(ignoredCanvas, defeatedZones) {
  let currentTargetIndex = defeatedZones.length;
  if (currentTargetIndex >= COLONIA_ORDER.length)
    currentTargetIndex = COLONIA_ORDER.length - 1;

  const activeZoneId = COLONIA_ORDER[currentTargetIndex];

  COLONIA_ORDER.forEach(id => {
    const btn = document.getElementById(`zone-${id}`);
    if (!btn) return;
    btn.className = "colonia-btn";
    if (defeatedZones.includes(id)) {
      btn.classList.add("beaten");  btn.disabled = false;
    } else if (id === activeZoneId) {
      btn.classList.add("active-now"); btn.disabled = false;
    } else {
      btn.classList.add("locked"); btn.disabled = true;
    }
  });
}

// ─── Entrada principal al seleccionar una zona ────────────────
function trySelectColonia(zoneId) {
  if (_cinemaRunning) return;
  const btn = document.getElementById(`zone-${zoneId}`);
  if (!btn || btn.disabled) return;

  _cinemaRunning = true;
  playCinematic(zoneId);
}

// ─── Secuencia cinemática ─────────────────────────────────────
// Fase 1 (0 ms)     — zoom al punto de la zona en el mapa
// Fase 2 (600 ms)   — overlay negro aparece
// Fase 3 (1000 ms)  — tarjeta de lore aparece en el centro
// Fase 4 (3800 ms)  — "iniciando..." parpadea
// Fase 5 (4400 ms)  — beginBattle + limpiar overlay
function playCinematic(zoneId) {
  const cin   = ZONE_CINEMATIC[zoneId];
  const pos   = ZONE_POS[zoneId] || { x: 50, y: 50 };
  const mapImg = document.querySelector(".map-bg-img");
  const overlay = document.getElementById("cinema-overlay");
  const card    = document.getElementById("cinema-card");

  if (!overlay || !card || !mapImg) {
    _cinemaRunning = false;
    beginBattle(zoneId);
    return;
  }

  // — FASE 1: zoom en el mapa —
  mapImg.style.transition      = "transform .7s cubic-bezier(0.22,1,0.36,1)";
  mapImg.style.transformOrigin = `${pos.x}% ${pos.y}%`;
  mapImg.style.transform       = "scale(2.2)";

  // pulso en el botón de zona
  const btn = document.getElementById(`zone-${zoneId}`);
  if (btn) {
    btn.style.transition = "transform .3s, box-shadow .3s";
    btn.style.transform  = "translate(-50%,-50%) scale(1.35)";
    btn.style.boxShadow  = `0 0 32px ${cin.color}cc, 0 0 64px ${cin.color}44`;
  }

  // — FASE 2: overlay negro —
  setTimeout(() => {
    overlay.style.display = "flex";
    overlay.offsetHeight;
    overlay.classList.add("cinema-fade-in");
  }, 600);

  // — FASE 3: tarjeta de lore —
  setTimeout(() => {
    card.innerHTML = buildCard(cin, zoneId);
    card.style.display = "flex";
    card.offsetHeight;
    card.classList.add("cinema-card-in");
  }, 1050);

  // — FASE 4: texto "iniciando…" —
  setTimeout(() => {
    const launching = document.getElementById("cinema-launching");
    if (launching) launching.classList.add("cinema-launching-blink");
  }, 3600);

  // — FASE 5: lanzar batalla + limpiar —
  setTimeout(() => {
    // reset mapa
    if (mapImg) {
      mapImg.style.transition      = "transform .5s";
      mapImg.style.transform       = "scale(1)";
      mapImg.style.transformOrigin = "50% 50%";
    }
    if (btn) { btn.style.transform = ""; btn.style.boxShadow = ""; }

    // ocultar overlay
    overlay.classList.remove("cinema-fade-in");
    overlay.classList.add("cinema-fade-out");
    card.classList.remove("cinema-card-in");
    card.classList.add("cinema-card-out");

    setTimeout(() => {
      overlay.style.display = "none";
      overlay.classList.remove("cinema-fade-out");
      card.style.display    = "none";
      card.classList.remove("cinema-card-out");
      card.innerHTML        = "";
      _cinemaRunning = false;
    }, 500);

    beginBattle(zoneId);
  }, 4400);
}

// ─── HTML de la tarjeta cinemática ───────────────────────────
function buildCard(cin, zoneId) {
  const isBoss = zoneId === "Ce";
  const enemigos = {
    PO: ["El Maquilero", "El Didi", "El Estudiante"],
    R:  ["El Cholo", "El Camionero", "La Señora"],
    D1: ["La Fresa", "El Guardia", "El Empresario"],
    Ca: ["El Viejito", "El Monaguillo", "El Golfista"],
    Ce: ["El Vagabundo", "La Pascualita", "El Gobernador"],
  };
  const enemList = enemigos[zoneId] || [];

  return `
    <div class="cc-nivel" style="color:${cin.color}">${cin.nivel}</div>
    <div class="cc-linea" style="background:${cin.color}"></div>
    <div class="cc-nombre">${cin.nombre}</div>
    <div class="cc-subtitulo">${cin.subtitulo}</div>
    <div class="cc-tag" style="border-color:${cin.color};color:${cin.color}">${cin.tag}</div>
    <p class="cc-lore">${cin.lore}</p>
    <div class="cc-enemigos">
      ${enemList.map((e, i) => `
        <span class="cc-enemy" style="animation-delay:${0.05 + i * 0.08}s">
          ${isBoss && i === 2 ? "★" : (i + 1)} · ${e}
        </span>
      `).join("")}
    </div>
    <div class="cc-launching" id="cinema-launching">▶ INICIANDO MISIÓN...</div>
  `;
}