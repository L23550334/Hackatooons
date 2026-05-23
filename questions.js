// ============================================================
//  questions.js  —  LOS GUARDIANES DE LA CANTERA
//  Progresión de dificultad: 24 preguntas por zona.
//  Enemigo 1 (Fácil: 1-8) | Enemigo 2 (Medio: 9-16) | Enemigo 3 (Difícil: 17-24)
// ============================================================

const QUESTIONS = {

  // ----------------------------------------------------------
  //  ZONA 1 — Punta Oriente (Aritmética y Fracciones)
  // ----------------------------------------------------------
  plaza: [
    // --- FÁCIL (Enemigo 1) ---
    { q: "¿Cuánto es 8 × 7?", opts: ["56", "54", "48", "64"], ans: 0, hint: "8 grupos de 7." },
    { q: "¿Cuánto es -5 + 8?", opts: ["3", "-3", "13", "-13"], ans: 0, hint: "Tienes 8, te quitan 5." },
    { q: "¿Cuál es el 50% de 120?", opts: ["60", "50", "70", "12"], ans: 0, hint: "Es exactamente la mitad." },
    { q: "Calcula: 15 - (3 × 4)", opts: ["3", "48", "9", "12"], ans: 0, hint: "Multiplica primero, luego resta." },
    { q: "¿Cuánto es 1/2 + 1/2?", opts: ["1", "2/4", "1/4", "2"], ans: 0, hint: "Dos mitades hacen un..." },
    { q: "Si compras algo de $45 con un billete de $100, ¿cuánto sobra?", opts: ["$55", "$65", "$45", "$50"], ans: 0, hint: "100 menos 45." },
    { q: "¿Cuál es el 10% de 500?", opts: ["50", "5", "500", "25"], ans: 0, hint: "Quita un cero." },
    { q: "¿Cuánto es 144 ÷ 12?", opts: ["12", "14", "11", "13"], ans: 0, hint: "Docena por docena." },

    // --- MEDIO (Enemigo 2) ---
    { q: "¿Cuánto es 3/4 de 20?", opts: ["15", "10", "16", "5"], ans: 0, hint: "Divide 20 entre 4, luego multiplica por 3." },
    { q: "Calcula: 5 + 2 × 3²", opts: ["23", "63", "41", "35"], ans: 0, hint: "Primero la potencia, luego multiplica, luego suma." },
    { q: "¿Cuánto es -12 - (-5)?", opts: ["-7", "-17", "7", "17"], ans: 0, hint: "Restar un negativo es como sumar." },
    { q: "Convierte 0.25 a fracción.", opts: ["1/4", "1/2", "1/5", "2/5"], ans: 0, hint: "Es la cuarta parte de un entero." },
    { q: "¿Cuál es el 20% de 150?", opts: ["30", "15", "45", "20"], ans: 0, hint: "El 10% es 15, el doble es..." },
    { q: "Si 4 dulces cuestan $12, ¿cuánto cuestan 7?", opts: ["$21", "$24", "$19", "$28"], ans: 0, hint: "Descubre cuánto cuesta 1 primero." },
    { q: "¿Cuánto es 1/2 × 1/2?", opts: ["1/4", "1", "2/4", "1/2"], ans: 0, hint: "Multiplica directo: arriba por arriba, abajo por abajo." },
    { q: "Resuelve: 8 ÷ 2 × (2 + 2)", opts: ["16", "1", "8", "4"], ans: 0, hint: "Paréntesis primero, luego de izquierda a derecha." },

    // --- DIFÍCIL (Enemigo 3) ---
    { q: "¿Cuánto es 2/3 + 1/6?", opts: ["5/6", "3/9", "1/2", "4/6"], ans: 0, hint: "Convierte 2/3 a sextos (multiplica por 2)." },
    { q: "Un artículo de $400 tiene 25% de descuento. ¿Cuánto pagas?", opts: ["$300", "$100", "$375", "$350"], ans: 0, hint: "Descuéntale la cuarta parte." },
    { q: "¿Cuál es el mínimo común múltiplo (MCM) de 6 y 8?", opts: ["24", "48", "12", "16"], ans: 0, hint: "El primer número en la tabla del 6 y del 8." },
    { q: "¿Cuánto es 3 ÷ 1/2?", opts: ["6", "1.5", "3/2", "1"], ans: 0, hint: "¿Cuántas mitades caben en 3 enteros?" },
    { q: "Si 3 trabajadores terminan una barda en 4 horas, ¿cuánto tardan 6?", opts: ["2 horas", "8 horas", "3 horas", "6 horas"], ans: 0, hint: "El doble de trabajadores, la mitad del tiempo." },
    { q: "Resuelve: |-8| + |-2|", opts: ["10", "-10", "6", "-6"], ans: 0, hint: "El valor absoluto siempre es positivo." },
    { q: "¿A qué equivale 3/5 en porcentaje?", opts: ["60%", "35%", "50%", "30%"], ans: 0, hint: "Divide 100 entre 5 y multiplica por 3." },
    { q: "Calcula el máximo común divisor (MCD) de 18 y 24.", opts: ["6", "3", "12", "8"], ans: 0, hint: "El número más grande que divide a ambos sin dejar residuo." }
  ],

  // ----------------------------------------------------------
  //  ZONA 2 — Riberas de Sacramento (Potencias y Raíces)
  // ----------------------------------------------------------
  parque: [
    // --- FÁCIL (Enemigo 1) ---
    { q: "¿Cuánto es 3²?", opts: ["9", "6", "27", "12"], ans: 0, hint: "3 por 3." },
    { q: "¿Cuánto es √25?", opts: ["5", "2.5", "12.5", "6"], ans: 0, hint: "Un número que multiplicado por sí mismo da 25." },
    { q: "¿Cuánto es 10³?", opts: ["1000", "30", "100", "10000"], ans: 0, hint: "Un 1 con tres ceros." },
    { q: "¿A qué es igual x + x?", opts: ["2x", "x²", "2", "x"], ans: 0, hint: "Tienes una manzana y te dan otra." },
    { q: "Si x - 4 = 10, ¿cuánto vale x?", opts: ["14", "6", "40", "10"], ans: 0, hint: "Pasa el 4 sumando." },
    { q: "¿Cuánto es 2³?", opts: ["8", "6", "16", "4"], ans: 0, hint: "2 × 2 × 2" },
    { q: "¿Cuánto es √100?", opts: ["10", "50", "25", "1000"], ans: 0, hint: "10 por..." },
    { q: "¿Cualquier número elevado a la potencia 0 es igual a?", opts: ["1", "0", "El mismo número", "No existe"], ans: 0, hint: "Regla universal de los exponentes." },

    // --- MEDIO (Enemigo 2) ---
    { q: "Simplifica: x² · x³", opts: ["x⁵", "x⁶", "2x⁵", "x"], ans: 0, hint: "Misma base, los exponentes se suman." },
    { q: "¿Cuánto es √81 + √9?", opts: ["12", "90", "18", "8"], ans: 0, hint: "Resuelve cada raíz por separado y suma." },
    { q: "Si 3x = 21, ¿cuánto vale x?", opts: ["7", "18", "24", "6"], ans: 0, hint: "Pasa el 3 dividiendo." },
    { q: "¿Cuánto es 5³?", opts: ["125", "15", "25", "500"], ans: 0, hint: "5 × 5 × 5" },
    { q: "Simplifica: (y⁴)³", opts: ["y¹²", "y⁷", "y", "3y⁴"], ans: 0, hint: "Potencia de una potencia, se multiplican." },
    { q: "¿Cuánto es √144?", opts: ["12", "14", "72", "11"], ans: 0, hint: "12 por..." },
    { q: "Si 2x + 5 = 15, ¿cuánto vale x?", opts: ["5", "10", "4", "20"], ans: 0, hint: "Resta 5, luego divide entre 2." },
    { q: "¿Cuánto es 4² - 3²?", opts: ["7", "1", "25", "16"], ans: 0, hint: "16 menos 9." },

    // --- DIFÍCIL (Enemigo 3) ---
    { q: "¿Cuánto es 2⁻²?", opts: ["1/4", "-4", "1/2", "-1/4"], ans: 0, hint: "Exponente negativo invierte la base: 1 / (2²)." },
    { q: "Simplifica: x⁵ / x²", opts: ["x³", "x⁷", "x².5", "1"], ans: 0, hint: "En división, los exponentes se restan." },
    { q: "¿Cuál es la raíz cúbica de 27 (∛27)?", opts: ["3", "9", "4", "2"], ans: 0, hint: "¿Qué número multiplicado por sí mismo 3 veces da 27?" },
    { q: "Resuelve: 5x - 3 = 2x + 9", opts: ["4", "2", "6", "12"], ans: 0, hint: "Agrupa las 'x' de un lado y los números del otro." },
    { q: "¿Cuánto es √225?", opts: ["15", "25", "12.5", "20"], ans: 0, hint: "Termina en 5." },
    { q: "Si el área de un cuadrado es 64 m², ¿cuánto mide su lado?", opts: ["8 m", "32 m", "16 m", "4 m"], ans: 0, hint: "Aplica raíz cuadrada al área." },
    { q: "Expresa en potencia: √x", opts: ["x^(1/2)", "x²", "x/2", "x^(-2)"], ans: 0, hint: "Una raíz es un exponente fraccionario." },
    { q: "¿Cuánto es (-3)³?", opts: ["-27", "27", "-9", "9"], ans: 0, hint: "Negativo × Negativo × Negativo = Negativo." }
  ],

  // ----------------------------------------------------------
  //  ZONA 3 — Distrito Uno (Geometría)
  // ----------------------------------------------------------
  catedral: [
    // --- FÁCIL (Enemigo 1) ---
    { q: "¿Cuántos grados suman los ángulos internos de un triángulo?", opts: ["180°", "360°", "90°", "270°"], ans: 0, hint: "Medio giro." },
    { q: "¿Cómo se llama el polígono de 5 lados?", opts: ["Pentágono", "Hexágono", "Heptágono", "Rombo"], ans: 0, hint: "Como el edificio militar en EE.UU." },
    { q: "Perímetro de un cuadrado con lado de 6 cm.", opts: ["24 cm", "36 cm", "12 cm", "18 cm"], ans: 0, hint: "Suma sus 4 lados iguales." },
    { q: "Área de un rectángulo de 5 base y 4 altura.", opts: ["20", "9", "18", "40"], ans: 0, hint: "Base × Altura." },
    { q: "¿Cómo se llama el triángulo con 3 lados iguales?", opts: ["Equilátero", "Isósceles", "Escaleno", "Rectángulo"], ans: 0, hint: "De la palabra 'equi' (igual)." },
    { q: "Un ángulo recto mide...", opts: ["90°", "180°", "45°", "60°"], ans: 0, hint: "Forma una 'L' perfecta." },
    { q: "¿Cuál es la fórmula del perímetro del círculo?", opts: ["π × Diámetro", "π × r²", "Base × Altura", "Lado³"], ans: 0, hint: "Pi por Diámetro." },
    { q: "Área de un triángulo con base 8 y altura 3.", opts: ["12", "24", "11", "16"], ans: 0, hint: "(Base × Altura) ÷ 2" },

    // --- MEDIO (Enemigo 2) ---
    { q: "¿Cuánto miden los ángulos de un triángulo equilátero?", opts: ["60°", "90°", "45°", "120°"], ans: 0, hint: "180° divididos en 3 partes iguales." },
    { q: "Si dos ángulos de un triángulo miden 50° y 40°, ¿el tercero mide?", opts: ["90°", "100°", "80°", "180°"], ans: 0, hint: "Todo debe sumar 180°." },
    { q: "¿Cuál es la fórmula del área del círculo?", opts: ["π × r²", "2 × π × r", "π × d", "r² / π"], ans: 0, hint: "Pi por radio al cuadrado." },
    { q: "Teorema de Pitágoras: a² + b² = ?", opts: ["c²", "a + b", "h", "x²"], ans: 0, hint: "La hipotenusa al cuadrado." },
    { q: "¿Cuántos lados tiene un octágono?", opts: ["8", "6", "10", "7"], ans: 0, hint: "Como los brazos de un pulpo (octopus)." },
    { q: "Área de un cuadrado cuyo perímetro es 20.", opts: ["25", "100", "16", "400"], ans: 0, hint: "Si el perímetro es 20, cada lado es 5." },
    { q: "Un ángulo de 135° se clasifica como:", opts: ["Obtuso", "Agudo", "Recto", "Llano"], ans: 0, hint: "Mayor a 90°, menor a 180°." },
    { q: "Volumen de un cubo de 3 cm por lado.", opts: ["27 cm³", "9 cm³", "18 cm³", "6 cm³"], ans: 0, hint: "Lado × Lado × Lado." },

    // --- DIFÍCIL (Enemigo 3) ---
    { q: "Si los catetos miden 3 y 4, la hipotenusa mide...", opts: ["5", "7", "25", "6"], ans: 0, hint: "√(3² + 4²)" },
    { q: "¿Cuántos grados suman los ángulos internos de un cuadrilátero?", opts: ["360°", "180°", "540°", "720°"], ans: 0, hint: "Equivale a dos triángulos unidos." },
    { q: "Fórmula para el volumen de un cilindro.", opts: ["π × r² × h", "π × d × h", "(Base × h) / 3", "2πr"], ans: 0, hint: "Área de la base (círculo) por la altura." },
    { q: "Si la hipotenusa es 13 y un cateto 5, el otro cateto es:", opts: ["12", "8", "144", "18"], ans: 0, hint: "√(13² - 5²)" },
    { q: "¿Cuántas diagonales se pueden trazar desde un vértice en un hexágono?", opts: ["3", "4", "2", "6"], ans: 0, hint: "n - 3" },
    { q: "Área de un rombo cuyas diagonales miden 8 y 6.", opts: ["24", "48", "14", "12"], ans: 0, hint: "(D × d) ÷ 2" },
    { q: "Un triángulo con lados 5, 5 y 8 es...", opts: ["Isósceles", "Equilátero", "Escaleno", "Rectángulo"], ans: 0, hint: "Tiene exactamente dos lados iguales." },
    { q: "Circunferencia de un círculo con radio 5 (π ≈ 3.14).", opts: ["31.4", "15.7", "78.5", "10"], ans: 0, hint: "2 × π × 5" }
  ],

  // ----------------------------------------------------------
  //  ZONA 4 — El Campestre (Estadística y Probabilidad)
  // ----------------------------------------------------------
  palacio: [
    // --- FÁCIL (Enemigo 1) ---
    { q: "¿Cuál es la moda de: 2, 5, 5, 3, 2, 5, 1?", opts: ["5", "2", "3", "1"], ans: 0, hint: "El número que más se repite." },
    { q: "Si lanzo una moneda, ¿cuál es la probabilidad de que caiga Águila?", opts: ["1/2", "1/4", "1", "0"], ans: 0, hint: "Una cara favorable de dos posibles." },
    { q: "¿Cuál es la media (promedio) de 4, 6, 8?", opts: ["6", "18", "7", "5"], ans: 0, hint: "Suma todos y divide entre 3." },
    { q: "Rango de los datos: 10, 4, 18, 7.", opts: ["14", "10", "18", "7"], ans: 0, hint: "Valor máximo menos valor mínimo." },
    { q: "¿Qué probabilidad representa un suceso imposible?", opts: ["0%", "50%", "100%", "-1%"], ans: 0, hint: "Cero posibilidad." },
    { q: "¿Cuál es la mediana de: 3, 7, 2, 8, 5?", opts: ["5", "3", "7", "4"], ans: 0, hint: "Ordénalos: 2, 3, 5, 7, 8. ¿Cuál queda en medio?" },
    { q: "En un dado tradicional de 6 caras, ¿P(caiga 4)?", opts: ["1/6", "4/6", "1/2", "0"], ans: 0, hint: "Solo hay un número 4." },
    { q: "Un evento con 100% de probabilidad se llama:", opts: ["Seguro", "Imposible", "Probable", "Aleatorio"], ans: 0, hint: "Va a pasar sí o sí." },

    // --- MEDIO (Enemigo 2) ---
    { q: "En una urna: 3 bolas rojas, 2 azules. ¿P(sacar roja)?", opts: ["3/5", "2/5", "1/2", "3/2"], ans: 0, hint: "Rojas / Totales." },
    { q: "¿Cuál es el promedio de 10, 20, 30 y 40?", opts: ["25", "100", "20", "30"], ans: 0, hint: "Suma 100, divídelo entre 4." },
    { q: "Lanzo un dado. ¿Probabilidad de que caiga un número par?", opts: ["1/2", "1/6", "3/4", "1/3"], ans: 0, hint: "Los pares son 2, 4 y 6 (la mitad)." },
    { q: "¿Cuál es la mediana de: 2, 4, 6, 8?", opts: ["5", "4", "6", "10"], ans: 0, hint: "Suma los dos centrales y divide entre 2." },
    { q: "Si la probabilidad de lluvia es 30%, ¿cuál es la de NO lluvia?", opts: ["70%", "30%", "100%", "0%"], ans: 0, hint: "Lo que falta para el 100%." },
    { q: "Calificaciones: 8, 8, 9, 10, 10. ¿Cuál es la media?", opts: ["9", "8", "10", "8.5"], ans: 0, hint: "Suman 45. Divide entre 5." },
    { q: "Si tengo 5 boletos de 100 en una rifa, ¿mi probabilidad es?", opts: ["5%", "1%", "50%", "10%"], ans: 0, hint: "5 de cada 100." },
    { q: "¿Qué gráfica usa rebanadas para representar porcentajes?", opts: ["Pastel", "Barras", "Dispersión", "Líneas"], ans: 0, hint: "También conocida como gráfica circular o de tarta." },

    // --- DIFÍCIL (Enemigo 3) ---
    { q: "Lanzo 2 monedas. ¿Probabilidad de que ambas sean Águila?", opts: ["1/4", "1/2", "1/3", "1/8"], ans: 0, hint: "(1/2) × (1/2)" },
    { q: "Tienes promedios de 7 y 9 en dos parciales. ¿Qué necesitas en el 3ro para promediar 8?", opts: ["8", "9", "10", "7"], ans: 0, hint: "La suma de los tres debe ser 24." },
    { q: "Urna: 4 rojas, 6 verdes. Saco una roja, NO la devuelvo. ¿P(sacar otra roja)?", opts: ["3/9", "4/10", "3/10", "4/9"], ans: 0, hint: "Quedan 3 rojas de 9 totales." },
    { q: "¿Cuántas combinaciones de ropa hago con 3 camisas y 4 pantalones?", opts: ["12", "7", "34", "1"], ans: 0, hint: "Principio multiplicativo: 3 × 4." },
    { q: "La suma de las desviaciones respecto a la media siempre es:", opts: ["0", "1", "La varianza", "El rango"], ans: 0, hint: "Los positivos y negativos se cancelan." },
    { q: "Lanzo 2 dados. ¿Cuántos resultados posibles hay en total?", opts: ["36", "12", "6", "24"], ans: 0, hint: "6 caras del primero × 6 del segundo." },
    { q: "Si el rango es 20 y el mínimo es 5, ¿cuál es el máximo?", opts: ["25", "15", "100", "4"], ans: 0, hint: "Máximo - 5 = 20" },
    { q: "¿Cuál es la probabilidad de sacar un As en una baraja inglesa (52 cartas)?", opts: ["4/52", "1/52", "1/4", "13/52"], ans: 0, hint: "Hay 4 ases en total." }
  ],

  // ----------------------------------------------------------
  //  ZONA 5 — Centro Histórico (Álgebra y Funciones - BOSS)
  // ----------------------------------------------------------
  univ: [
    // --- FÁCIL (Enemigo 1 - Mini Boss 1) ---
    { q: "Simplifica: 3a + 5a - 2a", opts: ["6a", "10a", "8a", "a"], ans: 0, hint: "Solo suma y resta los números." },
    { q: "Evalúa f(x) = x + 4 para x = 5", opts: ["9", "20", "1", "54"], ans: 0, hint: "Cambia la 'x' por un 5." },
    { q: "Expande: 2(x + 3)", opts: ["2x + 6", "2x + 3", "x + 6", "5x"], ans: 0, hint: "El 2 multiplica a ambos términos." },
    { q: "Despeja y: y - 7 = 10", opts: ["17", "3", "-3", "10/7"], ans: 0, hint: "Pasa el 7 sumando." },
    { q: "Simplifica: x · x · x", opts: ["x³", "3x", "x", "x²"], ans: 0, hint: "Multiplicación reiterada es potencia." },
    { q: "¿Cuál es el coeficiente en el término -7x²?", opts: ["-7", "x", "2", "7"], ans: 0, hint: "Es el número que multiplica a la letra." },
    { q: "Evalúa f(x) = 10 - x para x = -2", opts: ["12", "8", "-12", "-8"], ans: 0, hint: "10 - (-2)" },
    { q: "Si x = 3, y = 4; ¿cuánto es xy?", opts: ["12", "7", "34", "1"], ans: 0, hint: "Letras juntas significa multiplicación." },

    // --- MEDIO (Enemigo 2 - Mini Boss 2) ---
    { q: "Resuelve el sistema: x+y=10, x-y=2", opts: ["x=6, y=4", "x=8, y=2", "x=5, y=5", "x=7, y=3"], ans: 0, hint: "Suma ambas ecuaciones." },
    { q: "Expande: (x + 2)(x + 3)", opts: ["x² + 5x + 6", "x² + 6", "2x + 5", "x² + 5x + 5"], ans: 0, hint: "Método FOIL: x², 3x, 2x, 6." },
    { q: "Factoriza: x² - 9", opts: ["(x-3)(x+3)", "(x-9)(x+1)", "(x-3)²", "No se puede"], ans: 0, hint: "Diferencia de cuadrados." },
    { q: "Evalúa f(x) = x² - 1 para x = 4", opts: ["15", "7", "16", "3"], ans: 0, hint: "El cuadrado de 4, menos 1." },
    { q: "¿En qué eje se cruza la gráfica f(x) = 3x - 5 con el eje Y?", opts: ["En y = -5", "En y = 3", "En y = 0", "No cruza"], ans: 0, hint: "Cruza cuando x = 0." },
    { q: "Resuelve: 3(x - 1) = 12", opts: ["5", "3", "4", "15"], ans: 0, hint: "Divide entre 3, luego suma 1." },
    { q: "Factoriza por factor común: 4x² + 8x", opts: ["4x(x + 2)", "x(4x + 8)", "4(x² + 2)", "2x(2x + 4)"], ans: 0, hint: "Saca el 4x completo." },
    { q: "Si f(x) = 2x, ¿cuál es la función inversa f⁻¹(x)?", opts: ["x/2", "-2x", "1/(2x)", "x-2"], ans: 0, hint: "Lo contrario de multiplicar es dividir." },

    // --- DIFÍCIL (Enemigo 3 - GOBERNADOR / BOSS FINAL) ---
    { q: "¿Cuáles son las soluciones de x² - 5x + 6 = 0?", opts: ["x=2, x=3", "x=-2, x=-3", "x=1, x=6", "x=-1, x=-6"], ans: 0, hint: "Dos números que sumen -5 y multipliquen 6." },
    { q: "Resuelve: 2^x = 32", opts: ["5", "16", "4", "6"], ans: 0, hint: "2 multiplicado por sí mismo cuántas veces da 32." },
    { q: "¿Cuál es el vértice de la parábola y = x²?", opts: ["(0,0)", "(1,1)", "(0,1)", "No tiene"], ans: 0, hint: "Es el punto más bajo en el origen." },
    { q: "¿Cuánto es log₁₀(100)?", opts: ["2", "10", "100", "0.5"], ans: 0, hint: "10 a la potencia ¿qué? = 100." },
    { q: "Una recta tiene ecuación y = -2x + 4. Su pendiente es:", opts: ["-2", "4", "2", "x"], ans: 0, hint: "El coeficiente que acompaña a la 'x'." },
    { q: "Si f(x) = 3x y g(x) = x+1, ¿cuánto es f(g(2))?", opts: ["9", "7", "6", "8"], ans: 0, hint: "Primero saca g(2), luego mete ese resultado a f(x)." },
    { q: "¿Cuántas soluciones reales tiene x² + 4 = 0?", opts: ["Ninguna", "Dos", "Una", "Infinitas"], ans: 0, hint: "Ningún número real al cuadrado da un negativo." },
    { q: "¡RETO FINAL! Si log₂(x) = 3, ¿cuánto vale x?", opts: ["8", "6", "9", "5"], ans: 0, hint: "Es equivalente a 2³ = x." }
  ]
};

// No mover
if (typeof module !== "undefined") module.exports = QUESTIONS;