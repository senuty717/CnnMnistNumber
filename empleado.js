// Variables globales
let resultadosGuardados = []; // Para almacenar los resultados guardados
let idContador = 1; // Para crear un ID único por cada resultado

const guardarBtn = document.getElementById("guardar-btn");
const buscarBtn = document.getElementById("buscar-btn");

const formularioBuscar = document.getElementById("form-buscar");

// Elementos de la tabla
const tablaResultado = document.getElementById("resultado-lista").getElementsByTagName('tbody')[0];

// Función para predecir y mostrar los resultados en la tabla
function predecir() {
  // Simulamos los resultados de las predicciones de los modelos
  const resultados = [
    { modelo: "CNN", prediccion: 3, acertada: false },
    { modelo: "CNN+DO", prediccion: 7, acertada: true },
    { modelo: "CNN+AD", prediccion: 1, acertada: false },
    { modelo: "CNN+DO+AD", prediccion: 8, acertada: true },
  ];

  // Limpiar la tabla antes de agregar nuevos resultados
  tablaResultado.innerHTML = "";

  // Añadir las filas con los resultados
  resultados.forEach((resultado, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${idContador++}</td>
      <td>${resultado.modelo}</td>
      <td>${resultado.prediccion}</td>
      <td><input type="checkbox" ${resultado.acertada ? "checked" : ""} onclick="modificarAcertada(${idContador - 1})"></td>
      <td><button onclick="modificarFila(${idContador - 1})">Modificar</button></td>
    `;
    tablaResultado.appendChild(fila);
    
    // Guardar el resultado para futuras modificaciones o consultas
    resultadosGuardados.push({ id: idContador - 1, ...resultado });
  });
}

// Función para modificar el valor de "Acertada"
function modificarAcertada(id) {
  const resultado = resultadosGuardados.find(r => r.id === id);
  resultado.acertada = !resultado.acertada; // Cambiar el valor de acertada

  // Opcional: Si quieres reflejar la modificación de inmediato en la tabla
  const fila = tablaResultado.getElementsByTagName('tr')[id - 1];
  const checkbox = fila.getElementsByTagName('input')[0];
  checkbox.checked = resultado.acertada;
}

// Función para guardar el resultado y borrar la tabla
function guardarElemento() {
  // Limpiar la tabla antes de guardar los resultados
  tablaResultado.innerHTML = "";

  // Guardamos los resultados en el array
  alert('Los resultados han sido guardados.');
}

// Función para buscar un intento por ID
function buscarElemento() {
  const idBuscar = document.getElementById("buscar-id").value.trim();

  // Limpiar los resultados previos
  const resultadoBuscarDiv = document.getElementById("resultado-buscar");
  resultadoBuscarDiv.innerHTML = "";

  if (idBuscar === "") {
    resultadoBuscarDiv.textContent = "Por favor, ingresa un ID para buscar.";
    return;
  }

  // Buscar el resultado
  const resultadoEncontrado = resultadosGuardados.find(r => r.id === parseInt(idBuscar));

  // Mostrar el resultado de la búsqueda
  if (resultadoEncontrado) {
    resultadoBuscarDiv.innerHTML = `
      <p>ID: ${resultadoEncontrado.id}</p>
      <p>Modelo: ${resultadoEncontrado.modelo}</p>
      <p>Predicción: ${resultadoEncontrado.prediccion}</p>
      <p>Acertada: ${resultadoEncontrado.acertada ? "Sí" : "No"}</p>
    `;
  } else {
    resultadoBuscarDiv.textContent = "Elemento no encontrado.";
  }
}

// Función para listar todos los resultados guardados
function listarElementos() {
  // Limpiar los resultados previos
  tablaResultado.innerHTML = "";

  resultadosGuardados.forEach(resultado => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${resultado.id}</td>
      <td>${resultado.modelo}</td>
      <td>${resultado.prediccion}</td>
      <td><input type="checkbox" ${resultado.acertada ? "checked" : ""} disabled></td>
      <td><button onclick="modificarFila(${resultado.id})">Modificar</button></td>
    `;
    tablaResultado.appendChild(fila);
  });
}

// Event listeners para los botones
guardarBtn.addEventListener("click", guardarElemento);
buscarBtn.addEventListener("click", buscarElemento);

// Evento para predecir
document.getElementById("predecir").addEventListener("click", predecir);
