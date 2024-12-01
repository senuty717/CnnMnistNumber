// Variables globales
let resultadosGuardados = []; // Para almacenar los resultados guardados
let idContador = 1; // Para crear un ID único por cada resultado

const guardarBtn = document.getElementById("guardar-btn");
const modificarBtn = document.getElementById("modificar-btn");
const buscarBtn = document.getElementById("buscar-btn");

const formularioBuscar = document.getElementById("form-buscar");
const formularioGuardar = document.getElementById("form-guardar");
const formularioModificar = document.getElementById("form-modificar");

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

// Función para modificar una fila
function modificarFila(id) {
  const resultado = resultadosGuardados.find(r => r.id === id);

  // Mostrar formulario para modificar la fila
  document.getElementById("modificar-id").value = resultado.id;
  document.getElementById("nuevo-valor").value = resultado.prediccion;
  formularioModificar.classList.remove("oculto");
}

// Función para guardar el resultado
function guardarElemento() {
  const id = document.getElementById("modificar-id").value.trim();
  const nuevoValor = document.getElementById("nuevo-valor").value.trim();

  if (id === "" || nuevoValor === "") {
    alert("Por favor, ingresa el ID y el nuevo valor.");
    return;
  }

  // Encontrar el resultado a modificar y actualizarlo
  const resultado = resultadosGuardados.find(r => r.id === parseInt(id));
  if (resultado) {
    resultado.prediccion = nuevoValor;
    alert(`Resultado con ID ${id} modificado. Nuevo valor: ${nuevoValor}`);
    
    // Actualizar la tabla
    const fila = tablaResultado.getElementsByTagName('tr')[id - 1];
    const celdaPrediccion = fila.getElementsByTagName('td')[2];
    celdaPrediccion.innerText = nuevoValor;
    
    // Limpiar formulario
    document.getElementById("modificar-id").value = "";
    document.getElementById("nuevo-valor").value = "";
    formularioModificar.classList.add("oculto");
  } else {
    alert("Resultado no encontrado.");
  }
}

// Función para buscar un resultado
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
modificarBtn.addEventListener("click", guardarElemento); // Usamos la misma función de "guardar" para modificar
buscarBtn.addEventListener("click", buscarElemento);

// Evento para predecir
document.getElementById("predecir").addEventListener("click", predecir);
