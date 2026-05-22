// ============================================================
//  map.js  —  ARCHIVO DEL PELADO 3
//  Solo edita este archivo para cambiar el mapa y las zonas.
//  No toques script.js ni questions.js.
// ============================================================

// Posición y apariencia de cada zona en el mapa
// x, y → coordenadas en el canvas (680 × 380)
const ZONE_META = {
  plaza:    { x: 290, y: 160, label: "Plaza de Armas",      emoji: "🏛️", boss: false, color: "#7F77DD", colorDone: "#639922" },
  catedral: { x: 180, y: 110, label: "Catedral",            emoji: "⛪",  boss: false, color: "#7F77DD", colorDone: "#639922" },
  palacio:  { x: 390, y:  90, label: "Palacio de Gobierno", emoji: "🏛️", boss: false, color: "#7F77DD", colorDone: "#639922" },
  parque:   { x: 150, y: 240, label: "Parque Lerdo",        emoji: "🌳",  boss: false, color: "#7F77DD", colorDone: "#639922" },
  univ:     { x: 490, y: 240, label: "UACH",                emoji: "🎓",  boss: true,  color: "#D85A30", colorDone: "#639922" },
};

// Dibuja el mapa completo en el canvas
function drawMap(canvas, defeatedZones) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Fondo — zona verde urbana
  ctx.fillStyle = "#c8e6c9";
  ctx.fillRect(0, 0, W, H);

  // Calles principales (simulando cuadrícula de Chihuahua centro)
  const streets = [
    [0, 100, W, 100], [0, 190, W, 190], [0, 290, W, 290],   // horizontales
    [120, 0, 120, H], [290, 0, 290, H], [440, 0, 440, H], [580, 0, 580, H],  // verticales
  ];
  ctx.fillStyle = "#cfd8dc";
  streets.forEach(([x1, y1, x2, y2]) => {
    const isH = y1 === y2;
    ctx.fillRect(isH ? 0 : x1 - 7, isH ? y1 - 7 : 0, isH ? W : 14, isH ? 14 : H);
  });

  // Manzanas (bloques urbanos grises)
  ctx.fillStyle = "#b0bec5";
  const blocks = [
    [130, 110, 150, 70], [300, 110, 130, 70], [450, 110, 120, 70],
    [130, 200, 150, 80], [300, 200, 130, 80], [450, 200, 120, 80],
    [130, 300, 150, 60], [300, 300, 130, 60], [450, 300, 120, 60],
  ];
  blocks.forEach(([x, y, w, h]) => {
    ctx.fillStyle = "#b0bec5";
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 4);
    ctx.fill();
  });

  // Río Chuvíscar (detalle visual)
  ctx.strokeStyle = "#81d4fa";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(0, 340);
  ctx.bezierCurveTo(150, 330, 300, 360, 450, 340);
  ctx.bezierCurveTo(530, 330, 600, 350, W, 340);
  ctx.stroke();
  ctx.lineWidth = 1;

  // Label del río
  ctx.fillStyle = "#0277bd";
  ctx.font = "10px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Río Chuvíscar", 12, 337);

  // Zonas del juego
  Object.entries(ZONE_META).forEach(([id, z]) => {
    const done = defeatedZones.includes(id);
    const r = z.boss ? 28 : 22;

    // Sombra
    ctx.beginPath();
    ctx.arc(z.x + 2, z.y + 2, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fill();

    // Círculo de zona
    ctx.beginPath();
    ctx.arc(z.x, z.y, r, 0, Math.PI * 2);
    ctx.fillStyle = done ? z.colorDone : z.color;
    ctx.fill();
    ctx.strokeStyle = done ? "#27500A" : (z.boss ? "#993C1D" : "#3C3489");
    ctx.lineWidth = 2;
    ctx.stroke();

    // Emoji o check
    ctx.font = `${z.boss ? 18 : 16}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(done ? "✓" : z.emoji, z.x, z.y);

    // Etiqueta de zona
    ctx.fillStyle = "#1a1a1a";
    ctx.font = `bold ${z.boss ? 11 : 10}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(z.label, z.x, z.y + r + 5);
  });

  // Jugador (siempre en el centro del mapa)
  ctx.font = "22px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🧑‍🎓", 290, 190);

  // Título del mapa
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillRect(8, 8, 190, 22);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 11px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("MathQuest — Chihuahua Capital", 14, 19);
}

// Detecta si el click cayó en una zona (devuelve el id o null)
function getClickedZone(canvas, clientX, clientY, defeatedZones) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const mx = (clientX - rect.left) * scaleX;
  const my = (clientY - rect.top) * scaleX;

  for (const [id, z] of Object.entries(ZONE_META)) {
    if (defeatedZones.includes(id)) continue;
    const dx = mx - z.x;
    const dy = my - z.y;
    const r = z.boss ? 28 : 22;
    if (dx * dx + dy * dy <= (r + 10) * (r + 10)) return id;
  }
  return null;
}
