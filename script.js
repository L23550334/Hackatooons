// ============================================================
//  script.js  —  ARCHIVO DEL PELADO 1
//  Motor del juego. Lee preguntas de questions.js
//  y el mapa de map.js. No toques esos archivos.
// ============================================================

// Configuración de cada zona (usa los ids de ZONE_META y QUESTIONS)
const ZONES = [
  { id: "plaza",    enemyName: "La Álgebra Loca",    hp: 3, boss: false },
  { id: "catedral", enemyName: "El Triángulo Maldito", hp: 3, boss: false },
  { id: "palacio",  enemyName: "La Estadística",      hp: 3, boss: false },
  { id: "parque",   enemyName: "La Potencia Oscura",  hp: 3, boss: false },
  { id: "univ",     enemyName: "El Maestro Final",    hp: 5, boss: true  },
];

// Estado global del juego
const STATE = {
  playerHP:    20,
  playerMaxHP: 20,
  score:       0,
  defeated:    [],        // ids de zonas ya vencidas
  currentZone: null,
  enemyHP:     0,
  enemyMaxHP:  0,
  qIndex:      0,
  locked:      false,
};

// ─── REFERENCIAS AL DOM ───────────────────────────────────────
const screens = {
  intro:  document.getElementById("screen-intro"),
  map:    document.getElementById("screen-map"),
  battle: document.getElementById("screen-battle"),
  end:    document.getElementById("screen-end"),
};

function show(name) {
  Object.values(screens).forEach(s => s.style.display = "none");
  screens[name].style.display = "flex";
}

// ─── INICIO ──────────────────────────────────────────────────
function startGame() {
  show("map");
  refreshMap();
}

// ─── MAPA ─────────────────────────────────────────────────────
function refreshMap() {
  const canvas = document.getElementById("mapCanvas");
  drawMap(canvas, STATE.defeated);
  updateHUD();
}

document.getElementById("mapCanvas").addEventListener("click", (e) => {
  const canvas = document.getElementById("mapCanvas");
  const zoneId = getClickedZone(canvas, e.clientX, e.clientY, STATE.defeated);
  if (zoneId) beginBattle(zoneId);
});

function updateHUD() {
  const pct = (STATE.playerHP / STATE.playerMaxHP * 100) + "%";
  document.getElementById("hp-bar").style.width = pct;
  document.getElementById("hp-bar").style.background =
    STATE.playerHP > 10 ? "#639922" : STATE.playerHP > 5 ? "#EF9F27" : "#E24B4A";
  document.getElementById("hp-text").textContent = STATE.playerHP + "/" + STATE.playerMaxHP;
  document.getElementById("score-map").textContent = "⭐ " + STATE.score;
}

// ─── BATALLA ──────────────────────────────────────────────────
function beginBattle(zoneId) {
  const zone = ZONES.find(z => z.id === zoneId);
  STATE.currentZone = zoneId;
  STATE.enemyMaxHP  = zone.hp;
  STATE.enemyHP     = zone.hp;
  STATE.qIndex      = 0;
  STATE.locked      = false;

  document.getElementById("enemy-name").textContent = zone.enemyName;
  document.getElementById("zone-label").textContent = ZONE_META[zoneId].label;
  document.getElementById("boss-badge").style.display = zone.boss ? "inline-block" : "none";
  show("battle");
  updateBattleHUD();
  nextQuestion();
}

function updateBattleHUD() {
  const ep = (STATE.enemyHP / STATE.enemyMaxHP * 100) + "%";
  const pp = (STATE.playerHP / STATE.playerMaxHP * 100) + "%";
  document.getElementById("enemy-hp-bar").style.width = ep;
  document.getElementById("enemy-hp-text").textContent = STATE.enemyHP + "/" + STATE.enemyMaxHP;
  document.getElementById("player-hp-battle-bar").style.width = pp;
  document.getElementById("player-hp-battle-text").textContent = STATE.playerHP + "/" + STATE.playerMaxHP;
  document.getElementById("score-battle").textContent = "⭐ " + STATE.score;
}

function nextQuestion() {
  const pool = QUESTIONS[STATE.currentZone];
  const q = pool[STATE.qIndex % pool.length];
  document.getElementById("question-text").textContent = q.q;
  document.getElementById("hint-text").textContent = q.hint ? "💡 " + q.hint : "";
  document.getElementById("hint-text").style.display = "none";

  // Barajar opciones manteniendo cuál es la correcta
  const items = q.opts.map((o, i) => ({ text: o, correct: i === q.ans }));
  items.sort(() => Math.random() - 0.5);

  const grid = document.getElementById("answer-grid");
  grid.innerHTML = "";
  items.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = item.text;
    btn.onclick = () => handleAnswer(item.correct, btn);
    grid.appendChild(btn);
  });

  setLog("¡Responde para atacar al enemigo!");
  STATE.locked = false;
}

function handleAnswer(correct, btn) {
  if (STATE.locked) return;
  STATE.locked = true;
  document.querySelectorAll(".answer-btn").forEach(b => b.disabled = true);

  if (correct) {
    btn.classList.add("correct");
    STATE.enemyHP = Math.max(0, STATE.enemyHP - 1);
    STATE.score  += 10;
    setLog("¡Correcto! Atacaste al enemigo. +10 pts");
    updateBattleHUD();
    if (STATE.enemyHP <= 0) {
      setTimeout(winBattle, 900);
    } else {
      STATE.qIndex++;
      setTimeout(nextQuestion, 1100);
    }
  } else {
    btn.classList.add("wrong");
    document.querySelectorAll(".answer-btn").forEach(b => {
      if (b !== btn && !b.classList.contains("wrong")) b.classList.add("correct");
    });
    document.getElementById("hint-text").style.display = "block";
    STATE.playerHP = Math.max(0, STATE.playerHP - 2);
    setLog("¡Incorrecto! El enemigo te atacó. −2 HP");
    updateBattleHUD();
    if (STATE.playerHP <= 0) {
      setTimeout(gameOver, 900);
    } else {
      STATE.qIndex++;
      setTimeout(nextQuestion, 1600);
    }
  }
}

function winBattle() {
  STATE.defeated.push(STATE.currentZone);
  STATE.score += 20;
  setLog("¡Victoria! Zona liberada. +20 pts bonus 🎉");

  const allDone = ZONES.every(z => STATE.defeated.includes(z.id));
  if (allDone) {
    setTimeout(showEndScreen, 1200);
  } else {
    setTimeout(() => { show("map"); refreshMap(); }, 1400);
  }
}

function gameOver() {
  setLog("💀 Sin HP... regresando al mapa.");
  STATE.playerHP = 5;
  setTimeout(() => { show("map"); refreshMap(); }, 1600);
}

function showEndScreen() {
  document.getElementById("final-score").textContent = STATE.score;
  const stars = STATE.score >= 300 ? "⭐⭐⭐" : STATE.score >= 150 ? "⭐⭐" : "⭐";
  document.getElementById("final-stars").textContent = stars;
  show("end");
}

function setLog(msg) {
  document.getElementById("battle-log").textContent = msg;
}

// Botón pista
document.getElementById("btn-hint").addEventListener("click", () => {
  const hint = document.getElementById("hint-text");
  hint.style.display = hint.style.display === "none" ? "block" : "none";
});

// ─── ARRANCAR ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => show("intro"));
