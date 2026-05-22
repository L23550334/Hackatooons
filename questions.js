// ============================================================
//  questions.js  —  ARCHIVO DEL PELADO 2
//  Solo edita este archivo. No toques script.js ni map.js.
//
//  ESTRUCTURA DE CADA PREGUNTA:
//  {
//    q:    "Texto de la pregunta",
//    opts: ["Opción correcta", "Opción 2", "Opción 3", "Opción 4"],
//    ans:  0,   ← SIEMPRE 0 (la correcta va primero, el juego la baraja)
//    hint: "Pista corta opcional"
//  }
//
//  ZONAS DISPONIBLES:
//    plaza     → aritmética básica
//    catedral  → geometría
//    palacio   → estadística
//    parque    → potencias y raíces
//    univ      → álgebra y funciones  (boss final)
// ============================================================

const QUESTIONS = {

  // ----------------------------------------------------------
  //  ZONA 1 — Plaza de Armas  (aritmética)
  // ----------------------------------------------------------
  plaza: [
    {
      q: "¿Cuánto es 7 × 8?",
      opts: ["56", "54", "48", "63"],
      ans: 0,
      hint: "7 grupos de 8"
    },
    {
      q: "Si x + 5 = 12, ¿cuánto es x?",
      opts: ["7", "5", "8", "17"],
      ans: 0,
      hint: "Despeja x restando 5 a ambos lados"
    },
    {
      q: "¿Cuánto es 144 ÷ 12?",
      opts: ["12", "11", "13", "14"],
      ans: 0,
      hint: "¿Qué número × 12 = 144?"
    },
    {
      q: "¿Cuál es el 25% de 200?",
      opts: ["50", "25", "75", "40"],
      ans: 0,
      hint: "25% es la cuarta parte"
    },
    {
      q: "¿Cuánto es 15² ?",
      opts: ["225", "125", "215", "200"],
      ans: 0,
      hint: "15 × 15"
    },
    // ← AGREGA MÁS AQUÍ
  ],

  // ----------------------------------------------------------
  //  ZONA 2 — Catedral  (geometría)
  // ----------------------------------------------------------
  catedral: [
    {
      q: "Triángulo con lados 3, 4 y 5. ¿Cuál es su perímetro?",
      opts: ["12", "10", "14", "8"],
      ans: 0,
      hint: "Suma los tres lados"
    },
    {
      q: "¿Cuántos grados tiene cada ángulo de un triángulo equilátero?",
      opts: ["60°", "90°", "45°", "120°"],
      ans: 0,
      hint: "Los tres ángulos suman 180°"
    },
    {
      q: "Área de un triángulo con base 6 y altura 4",
      opts: ["12", "24", "10", "18"],
      ans: 0,
      hint: "Área = (base × altura) ÷ 2"
    },
    {
      q: "¿Cuántos lados tiene un hexágono?",
      opts: ["6", "5", "7", "8"],
      ans: 0,
      hint: "Hexa = seis en griego"
    },
    {
      q: "Perímetro de un cuadrado con lado de 9 cm",
      opts: ["36 cm", "18 cm", "81 cm", "27 cm"],
      ans: 0,
      hint: "Cuatro lados iguales"
    },
    // ← AGREGA MÁS AQUÍ
  ],

  // ----------------------------------------------------------
  //  ZONA 3 — Palacio de Gobierno  (estadística)
  // ----------------------------------------------------------
  palacio: [
    {
      q: "¿Cuál es la media de 4, 6, 8, 10?",
      opts: ["7", "6", "8", "9"],
      ans: 0,
      hint: "Suma todos y divide entre la cantidad"
    },
    {
      q: "¿Cuál es la mediana de 3, 7, 2, 8, 5?",
      opts: ["5", "3", "7", "4"],
      ans: 0,
      hint: "Ordena los números y encuentra el del centro"
    },
    {
      q: "En una bolsa: 3 rojas, 2 azules. ¿P(roja)?",
      opts: ["3/5", "2/5", "1/2", "1/3"],
      ans: 0,
      hint: "Casos favorables ÷ casos totales"
    },
    {
      q: "¿Cuál es la moda de: 2, 5, 5, 3, 2, 5, 1?",
      opts: ["5", "2", "3", "1"],
      ans: 0,
      hint: "El número que más se repite"
    },
    {
      q: "Rango de: 10, 4, 18, 7, 13",
      opts: ["14", "10", "18", "7"],
      ans: 0,
      hint: "Valor máximo − valor mínimo"
    },
    // ← AGREGA MÁS AQUÍ
  ],

  // ----------------------------------------------------------
  //  ZONA 4 — Parque Lerdo  (potencias y raíces)
  // ----------------------------------------------------------
  parque: [
    {
      q: "¿Cuánto es 2⁵?",
      opts: ["32", "25", "16", "64"],
      ans: 0,
      hint: "2×2×2×2×2"
    },
    {
      q: "¿Cuánto es √81?",
      opts: ["9", "8", "7", "10"],
      ans: 0,
      hint: "¿Qué número × sí mismo = 81?"
    },
    {
      q: "¿Cuánto es 3³?",
      opts: ["27", "9", "18", "21"],
      ans: 0,
      hint: "3×3×3"
    },
    {
      q: "¿Cuánto es 10⁰?",
      opts: ["1", "0", "10", "100"],
      ans: 0,
      hint: "Todo número elevado a 0 es..."
    },
    {
      q: "¿Cuánto es √144?",
      opts: ["12", "14", "11", "13"],
      ans: 0,
      hint: "¿Qué número al cuadrado da 144?"
    },
    // ← AGREGA MÁS AQUÍ
  ],

  // ----------------------------------------------------------
  //  ZONA 5 — UACH  (boss — álgebra y funciones)
  //  Esta zona tiene más HP, pon preguntas más difíciles
  // ----------------------------------------------------------
  univ: [
    {
      q: "Simplifica: x² · x³",
      opts: ["x⁵", "x⁶", "2x⁵", "x¹"],
      ans: 0,
      hint: "Suma los exponentes"
    },
    {
      q: "¿Cuánto es log₁₀(1000)?",
      opts: ["3", "2", "4", "10"],
      ans: 0,
      hint: "10 a la potencia ¿qué? = 1000"
    },
    {
      q: "Área de un círculo con r = 7 (π ≈ 3.14)",
      opts: ["153.86", "21.98", "44", "100"],
      ans: 0,
      hint: "A = π × r²"
    },
    {
      q: "f(x) = 2x + 3. ¿Cuánto es f(5)?",
      opts: ["13", "10", "16", "8"],
      ans: 0,
      hint: "Sustituye x = 5"
    },
    {
      q: "¿Cuántas soluciones tiene x² = -4?",
      opts: ["Ninguna (reales)", "2", "1", "4"],
      ans: 0,
      hint: "El cuadrado de un real nunca es negativo"
    },
    // ← AGREGA MÁS AQUÍ
  ]

};

// No muevas esta línea — la necesita script.js
if (typeof module !== "undefined") module.exports = QUESTIONS;
