// ============================================================
//  script.js  —  MOTOR RPG CON SECUENCIA DE ENEMIGOS Y SPRITES
// ============================================================

// ============================================================
//  SISTEMA NARRATIVO DE INTRODUCCIÓN (ESTILO UNDERTALE)
// ============================================================
const INTRO_STORY = [
  { text: "Una tarde con un bello atardecer\nEn la ciudad de Chihuahua.", img: "parte 1.png" },
  { text: "En un recorrido en las Grutas de Nombre de Dios\nNotas una extraña luz que refleja en las paredes.", img: "parte 2.png" },
  { text: "Un viejo y extraño mapa algo enterrado sobre salía...\nEsperando a ser descubierto.", img: "parte 3.png" },
  { text: "Al tocarlo, el mapa se activa y revela un secreto ancestral:\nChihuahua no se construyó al azar.", img: "parte 4.png" },
  { text: "Los fundadores de la ciudad eran una sociedad secreta.\nMatemáticos que ocultaron un gran conocimiento para mantener su estatus.", img: "parte 5.png" },
  { text: "Dicha conocimiento yacía bajo el suelo de la ciudad,\nProtegido por unas cerraduras numéricas.", img: "parte 6.jpg" },
  { text: "Sin embargo, un grupo llamado \"Los restadores\" se han hecho con la mitad del mapa.", img: "parte 7.png" },
  { text: "Quieren conseguir a toda costa ese conocimiento...\nHarán cualquier cosa para conseguirlo.", img: "parte 8.jpg" },
  { text: "En su querer, dejan a la ciudad sin luz, sin internet.\nExtrañas anomalías comienzan a sacudir las calles.", img: "parte 9.png" },
  { text: "Eres el único que activó el mapa original\nY el único que sabe como reparar el desastre en la ciudad.", img: "parte 10.png" }
];

let currentIntroIndex = 0;
let typewriterInterval = null;
let isWritingCinema = false;

function startIntroCinema() {
  currentIntroIndex = 0;
  show("cinema"); // Llama al transicionador oficial de pantallas
  loadIntroScene();
}

function loadIntroScene() {
  if (currentIntroIndex >= INTRO_STORY.length) {
    endCinemaAndGoToMenu();
    return;
  }

  const scene = INTRO_STORY[currentIntroIndex];
  const imgElement = document.getElementById("cinema-image");
  if (imgElement) {
    imgElement.src = `assets/historiainicial/${scene.img}`;
  }

  typewriterCinemaEffect(document.getElementById("cinema-text"), scene.text, 40);
}

function typewriterCinemaEffect(element, text, speed) {
  clearInterval(typewriterInterval);
  if (!element) return;
  element.innerHTML = "";
  isWritingCinema = true;
  let i = 0;

  typewriterInterval = setInterval(() => {
    if (i < text.length) {
      if (text.charAt(i) === "\n") {
        element.innerHTML += "<br>";
      } else {
        element.innerHTML += text.charAt(i);
      }
      i++;
    } else {
      clearInterval(typewriterInterval);
      isWritingCinema = false;
    }
  }, speed);
}

function handleCinemaNext() {
  if (isWritingCinema) {
    clearInterval(typewriterInterval);
    const scene = INTRO_STORY[currentIntroIndex];
    const textEl = document.getElementById("cinema-text");
    if (textEl) textEl.innerHTML = scene.text.replace(/\n/g, "<br>");
    isWritingCinema = false;
  } else {
    currentIntroIndex++;
    loadIntroScene();
  }
}

function endCinemaAndGoToMenu() {
  clearInterval(typewriterInterval);
  show("intro"); // Abre de forma limpia su Menú Principal de la Cantera
}

function initCinemaListeners() {
  const nextBtn = document.getElementById("btn-next-cinema");
  const skipBtn = document.getElementById("btn-skip-cinema");
  
  if (nextBtn) nextBtn.addEventListener("click", handleCinemaNext);
  if (skipBtn) skipBtn.addEventListener("click", endCinemaAndGoToMenu);

  document.addEventListener("keydown", (e) => {
    const cinemaScreen = document.getElementById("screen-cinema");
    if (cinemaScreen && cinemaScreen.style.display === "flex") {
      if (e.key === "Enter") {
        e.preventDefault();
        handleCinemaNext();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        endCinemaAndGoToMenu();
      }
    }
  });
}

// ─── DEFINICIÓN DE ZONAS ─────────────────────────────────────
// Cada zona tiene 3 enemigos en secuencia.
// "sprite" apunta a la carpeta en assets/personajes/<sprite>/
// Cuando tengas los sprites reales, solo cambia el nombre de la carpeta.
const ZONES = {

  // ── Punta Oriente (aritmética) ──────────────────────────
  plaza: {
    enemies: [
      { name: "El Maquilero",  hp: 20, sprite: "maquilero",  boss: false },
      { name: "El Didi",       hp: 20, sprite: "didi",       boss: false },
      { name: "El Estudiante", hp: 20, sprite: "estudiante", boss: false },
    ]
  },

  // ── Riberas (potencias y raíces) ────────────────────────
  parque: {
    enemies: [
      { name: "El Cholo",      hp: 20, sprite: "cholo",  boss: false },
      { name: "El Camionero",  hp: 20, sprite: "camionero",       boss: false },
      { name: "La Señora",     hp: 20, sprite: "senora", boss: false },
    ]
  },

  // ── Distrito 1 (geometría) ──────────────────────────────
  catedral: {
    enemies: [
      { name: "La Fresa",      hp: 20, sprite: "Fresa", boss: false },
      { name: "El Guardia",    hp: 20, sprite: "Guardia",  boss: false },
      { name: "El Empresario", hp: 20, sprite: "Empresario",       boss: false },
    ]
  },

  // ── Campestre (estadística) ─────────────────────────────
  palacio: {
    enemies: [
      { name: "El Viejito",    hp: 20, sprite: "Viejo",       boss: false },
      { name: "El Monaguillo", hp: 20, sprite: "Monagillo", boss: false },
      { name: "El Golfista",   hp: 20, sprite: "Golfista",  boss: false },
    ]
  },

  // ── Centro (álgebra — boss final con 3 mini-jefes) ──────
  univ: {
    enemies: [
      { name: "El Vagabundo",  hp: 25, sprite: "Vagabundo",  boss: false },
      { name: "La Pascualita", hp: 25, sprite: "Pascualita",       boss: false },
      { name: "El Gobernador", hp: 30, sprite: "marco", boss: true  },
    ]
  },

};


// ══════════════════════════════════════════════════════════════
//  TIENDA + PERSISTENCIA (localStorage)
// ══════════════════════════════════════════════════════════════

const SAVE_KEY = "mathquest_save_v2";

// Catálogo de la tienda
const TIENDA_ITEMS = [
  { id: "hp5",  emoji: "🌯",  nombre: "Burrito",  desc: "Recupera 5 HP",  efecto: "hp",  valor: 5,  precio: 30  },
  { id: "hp10", emoji: "🌯",  nombre: "Burrote",   desc: "Recupera 10 HP", efecto: "hp",  valor: 10, precio: 50  },
  { id: "hp20", emoji: "🌮",  nombre: "Montadote",   desc: "Restaura toda la vida", efecto: "hpfull", valor: 0, precio: 100 },
];

// ── Guardar ──────────────────────────────────────────────────
function guardarProgreso() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      playerHP: STATE.playerHP,
      score:    STATE.score,
      defeated: STATE.defeated,
    }));
  } catch(e) { console.warn("No se pudo guardar:", e); }
}

// ── Cargar ───────────────────────────────────────────────────
function cargarProgreso() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const save = JSON.parse(raw);
    STATE.playerHP = save.playerHP ?? 20;
    STATE.score    = save.score    ?? 0;
    STATE.defeated = save.defeated ?? [];
    return true;
  } catch(e) { return false; }
}

// ── Borrar progreso ───────────────────────────────────────────
function borrarProgreso() {
  if (!confirm("¿Seguro que quieres borrar todo tu progreso?")) return;
  try { localStorage.removeItem(SAVE_KEY); } catch(e) {}
  STATE.playerHP = STATE.playerMaxHP;
  STATE.score    = 0;
  STATE.defeated = [];
  updateHUD();
  renderMuseo();
}

// ── Abrir tienda (desde mapa o entre zonas) ───────────────────
function abrirTienda(contexto) {
  // contexto: "mapa" | "entrebatalla"
  window._tiendaContexto = contexto || "mapa";
  renderTienda();
  show("shop");
}

function cerrarTienda() {
  if (window._tiendaContexto === "entrebatalla") {
    show("map"); refreshMap();
  } else {
    show("map"); refreshMap();
  }
}

// ── Comprar ítem ─────────────────────────────────────────────
function comprarItem(id) {
  const item = TIENDA_ITEMS.find(i => i.id === id);
  if (!item) return;
  if (STATE.score < item.precio) {
    sacudirPrecio(id); return;
  }
  if (item.efecto === "hp" && STATE.playerHP >= STATE.playerMaxHP) {
    mostrarMensajeTienda("💚 ¡Ya tienes la vida llena!"); return;
  }
  if (item.efecto === "hpfull" && STATE.playerHP >= STATE.playerMaxHP) {
    mostrarMensajeTienda("💚 ¡Ya tienes la vida llena!"); return;
  }

  STATE.score -= item.precio;

  if (item.efecto === "hp") {
    STATE.playerHP = Math.min(STATE.playerMaxHP, STATE.playerHP + item.valor);
  } else if (item.efecto === "hpfull") {
    STATE.playerHP = STATE.playerMaxHP;
  }

  guardarProgreso();
  updateHUD();
  renderTienda();
  mostrarMensajeTienda(item.emoji + " ¡" + item.nombre + " usada! +" + (item.efecto === "hpfull" ? "vida completa" : item.valor + " HP"));
}

function sacudirPrecio(id) {
  const el = document.getElementById("precio-" + id);
  if (!el) return;
  el.style.animation = "none";
  el.offsetHeight;
  el.style.animation = "shake-precio .4s ease";
}

function mostrarMensajeTienda(msg) {
  const el = document.getElementById("tienda-msg");
  if (!el) return;
  el.textContent = msg;
  el.style.opacity = "1";
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.opacity = "0"; }, 2400);
}

// ── Render tienda ─────────────────────────────────────────────
function renderTienda() {
  // Actualizar saldo en pantalla
  const saldo = document.getElementById("tienda-saldo");
  if (saldo) saldo.textContent = "⭐ " + STATE.score + " pts";

  // HP del jugador
  const hpBar  = document.getElementById("tienda-hp-bar");
  const hpText = document.getElementById("tienda-hp-text");
  const pct    = (STATE.playerHP / STATE.playerMaxHP * 100) + "%";
  if (hpBar)  { hpBar.style.width = pct; hpBar.style.background = STATE.playerHP > 10 ? "var(--green)" : STATE.playerHP > 5 ? "var(--amber)" : "var(--red3)"; }
  if (hpText) hpText.textContent  = STATE.playerHP + "/" + STATE.playerMaxHP + " HP";

  // Items
  const grid = document.getElementById("tienda-grid");
  if (!grid) return;
  grid.innerHTML = TIENDA_ITEMS.map(item => {
    const puedeComprar = STATE.score >= item.precio;
    const vidaLlena   = STATE.playerHP >= STATE.playerMaxHP;
    const bloqueado   = !puedeComprar || vidaLlena;
    return '<div class="tienda-card' + (bloqueado ? " tienda-card-off" : "") + '">'
      + '<div class="tienda-emoji">' + item.emoji + '</div>'
      + '<div class="tienda-info">'
      + '<div class="tienda-nombre">' + item.nombre + '</div>'
      + '<div class="tienda-desc">' + item.desc + '</div>'
      + '</div>'
      + '<button id="precio-' + item.id + '" class="tienda-btn-comprar'
      + (bloqueado ? " tienda-btn-off" : "") + '"'
      + (bloqueado ? " disabled" : "")
      + ' data-id="' + item.id + '" onclick="comprarItem(this.dataset.id)">'  
      + '⭐ ' + item.precio
      + '</button>'
      + '</div>';
  }).join("");
}

// ── Museo ─────────────────────────────────────────────────────
const MUSEO_DATA = [
  {
    key: "plaza",
    emoji: "🏛️",
    nombre: "La Puerta de Chihuahua",
    zona: "Punta Oriente — La Zona de Carga",
    desc: "Arco monumental que da la bienvenida a la capital del estado más grande de México.",
    facts: [
      "Fue inaugurada en 1994 para conmemorar los 275 años de la fundación de Chihuahua.",
      "Sus dos columnas gemelas representan la fortaleza y el progreso del pueblo chihuahuense.",
      "Se ubica en la entrada norte de la ciudad, sobre la carretera hacia Ciudad Juárez.",
      "Mide aproximadamente 18 metros de altura y es visible desde varios kilómetros de distancia.",
      "El nombre «Chihuahua» proviene de la lengua rarámuri y se traduce como «lugar donde el agua escasa se concentra».",
      "Chihuahua es el estado más grande de México, con una superficie de 247,455 km²."
    ],
    svgKey: "puerta"
  },
  {
    key: "parque",
    emoji: "🗿",
    nombre: "El Obelisco de Sacramento",
    zona: "Riberas de Sacramento — El Acueducto",
    desc: "Monumento que conmemora la Batalla de Sacramento, uno de los episodios más significativos del siglo XIX chihuahuense.",
    facts: [
      "La Batalla de Sacramento tuvo lugar el 28 de febrero de 1847, durante la intervención estadounidense en México.",
      "Las tropas mexicanas bajo el general García Conde enfrentaron al ejército del coronel Alexander Doniphan.",
      "Tras la batalla, las fuerzas estadounidenses ocuparon la ciudad de Chihuahua por varios meses.",
      "El arroyo Sacramento fue durante siglos una fuente vital de agua para las comunidades del norte chihuahuense.",
      "El obelisco fue erigido como símbolo de memoria histórica y homenaje a los soldados caídos.",
      "El acueducto colonial de la ciudad, construido en el siglo XVIII, aún se conserva parcialmente."
    ],
    svgKey: "obelisco"
  },
  {
    key: "catedral",
    emoji: "💻",
    nombre: "Holograma de la Modernidad",
    zona: "Distrito Uno — La Central Cyber-Restadora",
    desc: "Fragmento digital que captura la esencia neón del futuro chihuahuense.",
    facts: [
      "Chihuahua es uno de los estados con mayor crecimiento industrial y tecnológico del norte de México.",
      "La ciudad alberga más de 300 empresas maquiladoras de alta tecnología electrónica y aeroespacial.",
      "El sector aeroespacial de Chihuahua es el tercero más importante de todo México.",
      "La UACH (Universidad Autónoma de Chihuahua), fundada en 1954, forma ingenieros y tecnólogos de clase mundial.",
      "Chihuahua cuenta con uno de los índices de conectividad digital más altos del país.",
      "Empresas como Foxconn, Bosch y Honeywell tienen operaciones en la ciudad."
    ],
    svgKey: "esfera"
  },
  {
    key: "palacio",
    emoji: "🐴",
    nombre: "Monumento a la División del Norte",
    zona: "El Campestre — El Laberinto del Club",
    desc: "Estatua ecuestre de Pancho Villa a todo galope, símbolo de la Revolución Mexicana y del espíritu indomable de Chihuahua.",
    facts: [
      "Pancho Villa lideró la División del Norte, el ejército revolucionario más poderoso de México (1910–1920).",
      "En su punto máximo, la División del Norte contaba con más de 40,000 soldados en combate.",
      "Villa capturó la ciudad de Chihuahua en dos ocasiones distintas durante la Revolución.",
      "El 9 de marzo de 1916, Villa realizó la única invasión armada a suelo estadounidense desde 1812, atacando Columbus, Nuevo México.",
      "El monumento ecuestre se encuentra sobre el Paseo Bolívar, la avenida más emblemática de la ciudad.",
      "Francisco Villa fue asesinado el 20 de julio de 1923 en Parral, Chihuahua, y fue sepultado en la ciudad."
    ],
    svgKey: "villa"
  },
  {
    key: "univ",
    emoji: "🕊️",
    nombre: "El Ángel de la Libertad",
    zona: "Centro Histórico — El Núcleo del Desierto",
    desc: "Figura que corona el Palacio de Gobierno de Chihuahua, símbolo de la independencia y la justicia que rigen al estado.",
    facts: [
      "El Palacio de Gobierno de Chihuahua, sede del ángel, data del siglo XVIII y fue construido en el lugar de la antigua Compañía de Jesús.",
      "Aquí fue ejecutado el cura Miguel Hidalgo y Costilla el 30 de julio de 1811, considerado el «Padre de la Patria» mexicana.",
      "El calabozo donde Hidalgo estuvo preso antes de su ejecución se conserva como museo y sitio histórico visitable.",
      "Sus paredes interiores están decoradas con murales del artista Aarón Piña Mora, que narran la historia de Chihuahua.",
      "El Centro Histórico de Chihuahua fue declarado Zona de Monumentos Históricos en 1990.",
      "La Catedral Metropolitana de Chihuahua, construida entre 1725 y 1826, es considerada una de las más bellas del norte de México."
    ],
    svgKey: "angel"
  },
];

// ─── RUTAS DE IMAGEN POR COLECCIONABLE ──────────────────────────────────────
// Coloca las imágenes en: assets/coleccionables/
const COLECCIONABLE_IMG = {
  puerta:  "assets/coleccionables/puerta.png",
  obelisco:"assets/coleccionables/obelisco.png",
  esfera:  "assets/coleccionables/esfera.png",
  villa:   "assets/coleccionables/villa.png",
  angel:   "assets/coleccionables/angel.png",
};

// ─── INYECTAR CSS DEL MODAL (se llama una sola vez al cargar) ─────────────────
function _injectModalCSS() {
  if (document.getElementById("_modal-col-style")) return;
  const s = document.createElement("style");
  s.id = "_modal-col-style";
  s.textContent = `
    /* ── Overlay backdrop ── */
    #modal-coleccionable {
      position: fixed; inset: 0; z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
      background: rgba(0,0,0,0);
      visibility: hidden;
      transition: background .3s ease;
    }
    #modal-coleccionable.mc-open {
      visibility: visible;
      background: rgba(0,0,0,0.88);
    }
    /* ── Tarjeta ── */
    .mc-card {
      background: linear-gradient(to bottom, var(--panel2,#2a1a0a), var(--bg,#110b04));
      border: 2px solid var(--gold2,#c49a2e);
      width: 100%; max-width: 480px;
      max-height: 88vh; overflow-y: auto;
      position: relative;
      box-shadow: 0 0 40px rgba(232,192,96,0.22), 0 12px 56px rgba(0,0,0,0.85);
      transform: scale(.88) translateY(18px);
      opacity: 0;
      transition: transform .4s cubic-bezier(0.17,0.67,0.35,1.15),
                  opacity   .32s ease;
      scrollbar-width: thin;
      scrollbar-color: var(--gold2,#c49a2e) transparent;
    }
    #modal-coleccionable.mc-open .mc-card {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
    /* ── Imagen del coleccionable ── */
    .mc-art {
      width: 100%; background: #0a0804;
      border-bottom: 2px solid var(--border,#6a4e22);
      overflow: hidden; display: block;
      height: 220px;
    }
    .mc-art img {
      width: 100%; height: 100%;
      object-fit: cover; object-position: center center;
      display: block; image-rendering: pixelated;
    }
    /* Puerta es paisaje muy ancho → ajuste vertical */
    .mc-art img[data-orient="landscape"] {
      object-position: center 40%;
    }
    /* Obelisco y Esfera son portrait alto → mostrar zona central */
    .mc-art img[data-orient="portrait"] {
      object-position: center 20%;
    }
    /* ── Zona badge ── */
    .mc-zona {
      display: inline-block;
      font-family: var(--font-pixel,'Press Start 2P',monospace);
      font-size: 12px; color: var(--green3,#50b838);
      background: rgba(0,0,0,0.7);
      border: 1px solid var(--green,#3a8c28);
      padding: 4px 10px; margin: 0;
      box-shadow: 0 0 6px rgba(80,184,56,0.2);
    }
    /* ── Cuerpo texto ── */
    .mc-body { padding: 18px 20px 24px; }
    .mc-title {
      font-family: var(--font-pixel,'Press Start 2P',monospace);
      font-size: clamp(15px,2.5vw,19px);
      color: var(--gold,#e8c060);
      line-height: 1.6; margin: 12px 0 8px;
      text-shadow: 0 0 10px rgba(232,192,96,0.3), 2px 2px 0 rgba(0,0,0,0.7);
    }
    .mc-desc {
      font-family: var(--font-body,'Nunito',sans-serif);
      font-size: 19px; color: var(--text2,#c8a870);
      line-height: 1.7; margin-bottom: 16px;
    }
    .mc-facts-title {
      font-family: var(--font-pixel,'Press Start 2P',monospace);
      font-size: 12px; color: var(--amber2,#f0b830);
      letter-spacing: 1px; margin-bottom: 10px;
    }
    .mc-facts { list-style: none; display: flex; flex-direction: column; gap: 8px; }
    .mc-facts li {
      font-family: var(--font-body,'Nunito',sans-serif);
      font-size: 18px; color: var(--text,#f2dc9a);
      line-height: 1.65; padding: 10px 14px;
      background: rgba(255,255,255,0.03);
      border-left: 3px solid var(--gold2,#c49a2e);
      border-bottom: 1px solid rgba(106,78,34,0.25);
    }
    .mc-facts li::before {
      content: "★ ";
      color: var(--gold2,#c49a2e);
      font-size: 14px;
    }
    /* ── Botón cerrar ── */
    .mc-close {
      position: absolute; top: 10px; right: 10px;
      background: rgba(0,0,0,0.75);
      border: 1px solid var(--border2,#9a7235);
      color: var(--text2,#c8a870);
      font-family: var(--font-pixel,'Press Start 2P',monospace);
      font-size: 12px; padding: 6px 12px;
      cursor: pointer; z-index: 1;
      transition: color .15s, border-color .15s;
    }
    .mc-close:hover { color: var(--gold,#e8c060); border-color: var(--gold2,#c49a2e); }
    /* ── Hint en tarjeta bloqueada ── */
    .mc-hint-tap {
      font-family: var(--font-pixel,'Press Start 2P',monospace);
      font-size: 10px; color: var(--amber2,#f0b830);
      text-align: center; margin-top: 4px; display: block;
      opacity: .75; animation: mc-blink 1.4s step-end infinite;
    }
    @keyframes mc-blink { 0%,100%{opacity:.75} 50%{opacity:.3} }
  `;
  document.head.appendChild(s);

  // Crear el nodo del modal si no existe
  if (!document.getElementById("modal-coleccionable")) {
    const el = document.createElement("div");
    el.id = "modal-coleccionable";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.innerHTML = '<div class="mc-card" id="mc-card-inner"></div>';
    document.body.appendChild(el);
    // Cierre al hacer clic en el backdrop
    el.addEventListener("click", function(e) {
      if (e.target === el) cerrarColeccionable();
    });
    // Cierre con Escape
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") cerrarColeccionable();
    });
  }
}

// ─── ABRIR MODAL COLECCIONABLE ────────────────────────────────────────────────
function abrirColeccionable(key) {
  const item = MUSEO_DATA.find(function(d){ return d.key === key; });
  if (!item) return;
  const imgSrc = COLECCIONABLE_IMG[item.svgKey] || "";
  // Detectar orientación para ajustar object-position
  const isLandscape = item.svgKey === "puerta";
  const isPortrait  = item.svgKey === "obelisco" || item.svgKey === "esfera";
  const orient      = isLandscape ? "landscape" : isPortrait ? "portrait" : "square";
  const imgTag = imgSrc
    ? '<img src="' + imgSrc + '" alt="' + item.nombre + '" data-orient="' + orient + '">'
    : "";
  const factsHTML = (item.facts || []).map(function(f){
    return "<li>" + f + "</li>";
  }).join("");
  document.getElementById("mc-card-inner").innerHTML =
    '<button class="mc-close" onclick="cerrarColeccionable()" aria-label="Cerrar">✕ CERRAR</button>'
    + '<div class="mc-art">' + imgTag + '</div>'
    + '<div class="mc-body">'
    + '<span class="mc-zona">▶ ' + item.zona + '</span>'
    + '<h2 class="mc-title">' + item.nombre + '</h2>'
    + '<p class="mc-desc">' + item.desc + '</p>'
    + '<p class="mc-facts-title">★ DATOS HISTÓRICOS</p>'
    + '<ul class="mc-facts">' + factsHTML + '</ul>'
    + '</div>';
  const overlay = document.getElementById("modal-coleccionable");
  overlay.style.display = "flex";
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      overlay.classList.add("mc-open");
    });
  });
  document.body.style.overflow = "hidden";
}

// ─── CERRAR MODAL ─────────────────────────────────────────────────────────────
function cerrarColeccionable() {
  const overlay = document.getElementById("modal-coleccionable");
  if (!overlay) return;
  overlay.classList.remove("mc-open");
  document.body.style.overflow = "";
  setTimeout(function(){ overlay.style.display = "none"; }, 380);
}

// ─── MUSEO (renderizado con tarjetas clicables) ───────────────────────────────
function renderMuseo() {
  const gallery = document.getElementById("museum-gallery");
  if (!gallery) return;
  const total   = MUSEO_DATA.length;
  const desbloq = STATE.defeated.length;
  const pct     = Math.round((desbloq / total) * 100);

  const ZONE_TO_KEY = { PO:"plaza", R:"parque", D1:"catedral", Ca:"palacio", Ce:"univ" };
  const desbloqKeys = STATE.defeated.map(function(id){ return ZONE_TO_KEY[id]; }).filter(Boolean);

  let html = '<div style="font-family:var(--font-pixel);font-size:12px;color:var(--text2);margin-bottom:12px;display:flex;align-items:center;gap:10px;">'
    + '<span>' + desbloq + '/' + total + '</span>'
    + '<div style="flex:1;height:10px;background:rgba(0,0,0,0.6);border:1px solid var(--border2);border-radius:2px;overflow:hidden;">'
    + '<div style="width:' + pct + '%;height:100%;background:linear-gradient(to right,var(--green2),var(--green3));transition:width .5s;"></div>'
    + '</div><span>' + pct + '%</span></div>';

  MUSEO_DATA.forEach(function(item) {
    var ok = desbloqKeys.includes(item.key);
    if (ok) {
      // Tarjeta desbloqueada — clicable, muestra hint de tap
      html += '<div class="museum-card unlocked" style="cursor:pointer;" onclick="abrirColeccionable(\'' + item.key + '\')">'
        + '<div class="museum-emoji">' + item.emoji + '</div>'
        + '<div class="museum-info">'
        + '<div class="museum-name">' + item.nombre + '</div>'
        + '<div class="museum-desc">' + item.desc + '</div>'
        + '<span class="museum-badge">✔ OBTENIDO</span>'
        + '<span class="mc-hint-tap">▶ TAP PARA DESCUBRIR</span>'
        + '</div></div>';
    } else {
      html += '<div class="museum-card locked-card" style="opacity:.55;filter:grayscale(.6);">'
        + '<div class="museum-emoji">🔒</div>'
        + '<div class="museum-info">'
        + '<div class="museum-name">???</div>'
        + '<div class="museum-desc">Completa ' + item.zona.split("—")[0].trim() + ' para desbloquear.</div>'
        + '</div></div>';
    }
  });

  html += '<button onclick="borrarProgreso()" class="btn-borrar-save">🗑 BORRAR PROGRESO</button>';
  gallery.innerHTML = html;
}

function renderTrofeosFinal() {
  const c = document.getElementById("end-trophies");
  if (!c) return;
  const ZONE_TO_KEY = { PO:"plaza", R:"parque", D1:"catedral", Ca:"palacio", Ce:"univ" };
  const desbloqKeys = STATE.defeated.map(id => ZONE_TO_KEY[id]).filter(Boolean);
  c.innerHTML = MUSEO_DATA.map(function(item) {
    var ok = desbloqKeys.includes(item.key);
    return '<div class="end-trophy-item" style="' + (ok ? "" : "opacity:.3;filter:grayscale(.8);") + '">'
      + '<div style="font-size:38px">' + (ok ? item.emoji : "🔒") + '</div>'
      + '<div style="font-size:10px;max-width:90px;line-height:1.6">' + (ok ? item.nombre : "???") + '</div>'
      + '</div>';
  }).join("");
}

// ─── ESTADO GLOBAL ───────────────────────────────────────────
const STATE = {
  playerHP:    20,
  playerMaxHP: 20,
  score:       0,
  defeated:    [],
  currentZone: null,
  enemyIndex:  0,
  enemyHP:     0,
  enemyMaxHP:  0,
  qIndex:      0,
  locked:      false,
};

let currentBattleTurn = "PLAYER_ATTACK";
let timerInterval     = null;
let timeLeft          = 0;
let timeAllocated     = 10;
let spriteTimeout     = null;

// ─── SPRITES ─────────────────────────────────────────────────
function spriteEnemy(carpeta, estado) {
  return `personajes/${carpeta}/${estado}.png`;
}
function spriteProta(estado) {
  return `personajes/protagonista/${estado}.png`;
}

function precargarSprites() {
  ["maquilero","didi","estudiante","protagonista"].forEach(c =>
    ["quieto","ataque","dano"].forEach(e => {
      const img = new Image();
      img.src = `personajes/${c}/${e}.png`;
    })
  );
}

function cambiarSprite(id, ruta) {
  const el = document.getElementById(id);
  if (el) el.src = ruta;
}

function spriteActualCarpeta() {
  const zona    = ZONES[STATE.currentZone];
  const enemigo = zona.enemies[STATE.enemyIndex];
  return enemigo ? enemigo.sprite : "maquilero";
}

// Anima acción y vuelve a quieto tras `ms` ms
function animarSprites(protaEstado, enemyEstado, carpeta, ms) {
  if (spriteTimeout) clearTimeout(spriteTimeout);
  cambiarSprite("prota-sprite", spriteProta(protaEstado));
  cambiarSprite("enemy-sprite", spriteEnemy(carpeta, enemyEstado));
  spriteTimeout = setTimeout(() => {
    cambiarSprite("prota-sprite", spriteProta("quieto"));
    cambiarSprite("enemy-sprite", spriteEnemy(carpeta, "quieto"));
  }, ms || 1200);
}

// ─── DOM ─────────────────────────────────────────────────────
const screens = {
  intro:  document.getElementById("screen-intro"),
  map:    document.getElementById("screen-map"),
  battle: document.getElementById("screen-battle"),
  shop:   document.getElementById("screen-shop"),
  end:    document.getElementById("screen-end"),
};

function show(name) {
  Object.values(screens).forEach(s => { if (s) s.style.display = "none"; });
  if (screens[name]) screens[name].style.display = "flex";
}

// ─── MAPA ────────────────────────────────────────────────────
function startGame() { show("map"); refreshMap(); }

function refreshMap() {
  if (typeof drawMap === "function") drawMap(null, STATE.defeated);
  updateHUD();
  renderMuseo();
}

function updateHUD() {
  const pct   = (STATE.playerHP / STATE.playerMaxHP * 100) + "%";
  const hpBar = document.getElementById("hp-bar");
  if (hpBar) {
    hpBar.style.width      = pct;
    hpBar.style.background = STATE.playerHP > 10 ? "#639922" : STATE.playerHP > 5 ? "#EF9F27" : "#E24B4A";
  }
  const hpText = document.getElementById("hp-text");
  if (hpText) hpText.textContent = STATE.playerHP + "/" + STATE.playerMaxHP;
  const scoreMap = document.getElementById("score-map");
  if (scoreMap) scoreMap.textContent = "⭐ " + STATE.score;
}

// ─── INICIAR BATALLA ─────────────────────────────────────────
function beginBattle(zoneId) {
  if (typeof COLONIA_META === "undefined") {
    console.error("Error: COLONIA_META no definida. Revisa map.js"); return;
  }
  if (spriteTimeout) clearTimeout(spriteTimeout);

  const meta         = COLONIA_META[zoneId];
  STATE.currentZone  = meta.enemyKey;
  STATE.enemyIndex   = 0;
  STATE.qIndex       = 0;
  STATE.locked       = false;
  currentBattleTurn  = "PLAYER_ATTACK";

  document.getElementById("zone-label").textContent = meta.label;

  // Fondo de escenario según la zona
  const FONDOS = {
    plaza:    "assets/fondos/PuntaOriente.jpeg",
    catedral: "assets/fondos/d1.jpeg",
    palacio:  "assets/fondos/campestre.jpeg",
    parque:   "assets/fondos/riberas.jpeg",
    univ:     "assets/fondos/centro.jpeg",
  };
  const arena = document.getElementById("arena-background");
  if (arena) {
    const fondo = FONDOS[meta.enemyKey];
    if (fondo) {
      arena.style.backgroundImage = `url('${fondo}')`;
      arena.style.backgroundSize  = "cover";
      arena.style.backgroundPosition = "center";
    } else {
      arena.style.backgroundImage = "";
    }
  }

  show("battle");
  cargarEnemigo();
  updateBattleHUD();
  nextQuestion();
}

function cargarEnemigo() {
  const enemigo        = ZONES[STATE.currentZone].enemies[STATE.enemyIndex];
  STATE.enemyHP        = enemigo.hp;
  STATE.enemyMaxHP     = enemigo.hp;
  document.getElementById("enemy-name").textContent   = enemigo.name;
  document.getElementById("boss-badge").style.display = enemigo.boss ? "inline-block" : "none";
  cambiarSprite("enemy-sprite", spriteEnemy(enemigo.sprite, "quieto"));
  cambiarSprite("prota-sprite", spriteProta("quieto"));
  updateBattleHUD();
}

function updateBattleHUD() {
  const ep = (STATE.enemyHP  / STATE.enemyMaxHP  * 100) + "%";
  const pp = (STATE.playerHP / STATE.playerMaxHP * 100) + "%";
  document.getElementById("enemy-hp-bar").style.width          = ep;
  document.getElementById("enemy-hp-text").textContent         = STATE.enemyHP  + "/" + STATE.enemyMaxHP;
  document.getElementById("player-hp-battle-bar").style.width  = pp;
  document.getElementById("player-hp-battle-text").textContent = STATE.playerHP + "/" + STATE.playerMaxHP;
  document.getElementById("score-battle").textContent          = "⭐ " + STATE.score;
}

// ─── TEMPORIZADOR ────────────────────────────────────────────
function startTimer(seconds, onTimeout) {
  clearInterval(timerInterval);
  timeLeft = timeAllocated = seconds;
  const bar = document.getElementById("timer-bar");
  const text = document.getElementById("timer-text");
  if (bar) {
    bar.style.transition = "none";
    bar.style.width = "100%";
    bar.getBoundingClientRect();
    bar.style.transition = "width 1s linear, background .5s";
  }
  if (text) {
    text.textContent = `${seconds}s`;
  }
  timerInterval = setInterval(() => {
    timeLeft -= 0.1;
    if (bar) bar.style.width = Math.max(0, (timeLeft / seconds) * 100) + "%";
    if (text) text.textContent = `${Math.ceil(timeLeft)}s`;
    if (timeLeft <= 0) { clearInterval(timerInterval); onTimeout(); }
  }, 100);
}

// ─── PREGUNTAS ───────────────────────────────────────────────
function nextQuestion() {
  if (STATE.enemyHP <= 0 || STATE.playerHP <= 0) return;
  STATE.locked = false;

  const pool = QUESTIONS[STATE.currentZone];
  const q    = pool[STATE.qIndex % pool.length];

  document.getElementById("question-text").textContent = q.q;
  document.getElementById("hint-text").textContent     = q.hint ? "💡 " + q.hint : "";
  document.getElementById("hint-text").style.display   = "none";

  const items = q.opts.map((o, i) => ({ text: o, correct: i === q.ans }));
  items.sort(() => Math.random() - 0.5);

  const grid = document.getElementById("answer-grid");
  grid.innerHTML = "";
  items.forEach(item => {
    const btn     = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = item.text;
    btn.onclick   = () => handleAnswer(item.correct, btn);
    grid.appendChild(btn);
  });

  if (currentBattleTurn === "PLAYER_ATTACK") {
    setLog("⚔️ ¡TU TURNO! Responde rápido para atacar.");
    startTimer(10, playerAttackTimeout);
  } else {
    setLog("⚠️ ¡EL ENEMIGO ATACA! Responde para esquivar.");
    startTimer(5, enemyAttackTimeout);
  }
}

// ─── TIMEOUTS ────────────────────────────────────────────────
function playerAttackTimeout() {
  STATE.locked = true;
  disableAnswerButtons();
  highlightCorrectAnswer();
  setLog("⏳ ¡Tiempo agotado! Tu ataque falló.");
  animarSprites("dano", "ataque", spriteActualCarpeta(), 1500);
  currentBattleTurn = "ENEMY_ATTACK";
  STATE.qIndex++;
  setTimeout(nextQuestion, 1900);
}

function enemyAttackTimeout() {
  STATE.locked = true;
  disableAnswerButtons();
  highlightCorrectAnswer();
  STATE.playerHP = Math.max(0, STATE.playerHP - 3);
  setLog("💥 ¡Muy lento! El enemigo conectó duro. −3 HP");
  updateBattleHUD();
  animarSprites("dano", "ataque", spriteActualCarpeta(), 1500);
  if (STATE.playerHP <= 0) { setTimeout(gameOver, 1000); return; }
  currentBattleTurn = "PLAYER_ATTACK";
  STATE.qIndex++;
  setTimeout(nextQuestion, 1900);
}

// ─── RESPUESTA DEL JUGADOR ────────────────────────────────────
function handleAnswer(correct, btn) {
  if (STATE.locked) return;
  STATE.locked = true;
  clearInterval(timerInterval);
  disableAnswerButtons();

  const elapsed = timeAllocated - timeLeft;
  const carpeta = spriteActualCarpeta();

  if (currentBattleTurn === "PLAYER_ATTACK") {
    if (correct) {
      btn.classList.add("correct");
      let dmg, pts, msg;
      if      (elapsed <= 3.0) { dmg = 5; pts = 20; msg = "🔥 ¡CRÍTICO! Resolviste en friega. −5 HP al enemigo"; }
      else if (elapsed <= 7.0) { dmg = 3; pts = 10; msg = "💥 ¡Buen golpe! −3 HP al enemigo"; }
      else                     { dmg = 1; pts =  5; msg = "⏱️ Por poco... −1 HP al enemigo"; }
      STATE.enemyHP = Math.max(0, STATE.enemyHP - dmg);
      STATE.score  += pts;
      setLog(msg);
      updateBattleHUD();
      animarSprites("ataque", "dano", carpeta, 1200);
      if (STATE.enemyHP <= 0) { setTimeout(enemyDefeated, 1500); return; }
    } else {
      btn.classList.add("wrong");
      highlightCorrectAnswer();
      STATE.playerHP = Math.max(0, STATE.playerHP - 2);
      setLog("🛡️ ¡Error! El enemigo bloqueó y contraatacó. −2 HP");
      updateBattleHUD();
      animarSprites("dano", "ataque", carpeta, 1200);
      if (STATE.playerHP <= 0) { setTimeout(gameOver, 1000); return; }
    }
    currentBattleTurn = "ENEMY_ATTACK";

  } else {
    if (correct) {
      btn.classList.add("correct");
      setLog("🏃‍♂️ ¡Esquivado! Saliste ileso.");
      animarSprites("ataque", "quieto", carpeta, 1200);
    } else {
      btn.classList.add("wrong");
      highlightCorrectAnswer();
      STATE.playerHP = Math.max(0, STATE.playerHP - 2);
      setLog("🤕 ¡F! No pudiste esquivar. −2 HP");
      updateBattleHUD();
      animarSprites("dano", "ataque", carpeta, 1200);
      if (STATE.playerHP <= 0) { setTimeout(gameOver, 1000); return; }
    }
    currentBattleTurn = "PLAYER_ATTACK";
  }

  STATE.qIndex++;
  setTimeout(nextQuestion, 1800);
}

// ─── ENEMIGO DERROTADO ────────────────────────────────────────
function enemyDefeated() {
  clearInterval(timerInterval);
  if (spriteTimeout) clearTimeout(spriteTimeout);

  const zona           = ZONES[STATE.currentZone];
  const hayMas         = STATE.enemyIndex + 1 < zona.enemies.length;
  STATE.score         += 20;

  if (hayMas) {
    // ── Descanso de 2.5 s antes del siguiente enemigo ──
    STATE.enemyIndex++;
    const siguiente = zona.enemies[STATE.enemyIndex];
    setLog(`🎉 ¡Enemigo derrotado! +20 pts  ·  Siguiente: ${siguiente.name}...`);
    disableAnswerButtons();

    // Sprites a quieto mientras se descansa
    cambiarSprite("prota-sprite", spriteProta("quieto"));
    cambiarSprite("enemy-sprite", spriteEnemy(siguiente.sprite, "quieto"));

    setTimeout(() => {
      cargarEnemigo();
      currentBattleTurn = "PLAYER_ATTACK";
      STATE.qIndex      = 0;
      STATE.locked      = false;
      setLog(`⚔️ ¡${siguiente.name} entra al combate!`);
      setTimeout(nextQuestion, 1000);
    }, 2500);

  } else {
    winBattle();
  }
}

// ─── GANAR ZONA ──────────────────────────────────────────────
function winBattle() {
  clearInterval(timerInterval);
  if (spriteTimeout) clearTimeout(spriteTimeout);

  const coloniaId = Object.keys(COLONIA_META).find(
    key => COLONIA_META[key].enemyKey === STATE.currentZone
  );
  if (coloniaId && !STATE.defeated.includes(coloniaId)) STATE.defeated.push(coloniaId);

  setLog("🏆 ¡ZONA LIBERADA! Limpiaste todos los enemigos. +20 pts");
  guardarProgreso();
  const allDone = COLONIA_ORDER.every(id => STATE.defeated.includes(id));
  if (allDone) {
    setTimeout(showEndScreen, 1400);
  } else {
    // Ofrecer tienda entre zonas
    setTimeout(() => { abrirTienda("entrebatalla"); }, 1400);
  }
}

// ─── GAME OVER ───────────────────────────────────────────────
function gameOver() {
  clearInterval(timerInterval);
  if (spriteTimeout) clearTimeout(spriteTimeout);
  setLog("💀 Te noquearon... Regresas al mapa.");
  STATE.playerHP = 20;
  setTimeout(() => { show("map"); refreshMap(); }, 1800);
}

// ─── PANTALLA FINAL ──────────────────────────────────────────
function showEndScreen() {
  document.getElementById("final-score").textContent = STATE.score;
  const stars = STATE.score >= 200 ? "⭐⭐⭐" : STATE.score >= 100 ? "⭐⭐" : "⭐";
  document.getElementById("final-stars").textContent = stars;
  renderTrofeosFinal();
  show("end");
}

// ─── UTILIDADES ──────────────────────────────────────────────
function setLog(msg) {
  const box = document.getElementById("battle-log");
  if (box) box.textContent = msg;
}
function disableAnswerButtons() {
  document.querySelectorAll(".answer-btn").forEach(b => b.disabled = true);
}
function highlightCorrectAnswer() {
  const pool = QUESTIONS[STATE.currentZone];
  const q    = pool[STATE.qIndex % pool.length];
  document.querySelectorAll(".answer-btn").forEach(b => {
    if (b.textContent === q.opts[q.ans]) b.classList.add("correct");
  });
}

// ─── PISTA ───────────────────────────────────────────────────
const hintBtn = document.getElementById("btn-hint");
if (hintBtn) {
  hintBtn.addEventListener("click", () => {
    const hint = document.getElementById("hint-text");
    if (hint) hint.style.display = hint.style.display === "none" ? "block" : "none";
  });
}

// ─── ARRANQUE DE LA APLICACIÓN COMPLETADO ─────────────────────
document.addEventListener("DOMContentLoaded", () => {
  _injectModalCSS();
  precargarSprites();
  cargarProgreso();
  renderMuseo();
  
  // Aquí estuvo el detalle del choque: iniciamos la cinemática de forma segura
  initCinemaListeners();
  if (screens.intro && screens.map && screens.battle && screens.end) {
    startIntroCinema(); // Arranca en el cine antes del menú
  } else {
    console.error("Faltan elementos en el DOM. Revisa los IDs.");
  }
});