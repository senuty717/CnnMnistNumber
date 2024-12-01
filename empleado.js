// Variables globales para los botones
const guardarBtn = document.getElementById("guardar-btn");
const modificarBtn = document.getElementById("modificar-btn");
const buscarBtn = document.getElementById("buscar-btn");

// Elementos de formularios
const formularioBuscar = document.getElementById("form-buscar");
const formularioGuardar = document.getElementById("form-guardar");
const formularioModificar = document.getElementById("form-modificar");

// Elementos de la tabla
const tablaResultado = document.getElementById("resultado-lista").getElementsByTagName('tbody')[0];

// Función para guardar un nuevo elemento
function guardarElemento() {
  const nuevoModelo = document.getElementById("nuevo-modelo").value.trim();

  if (nuevoModelo === "") {
    alert("Por favor, ingresa el nombre del modelo.");
    return;
  }

  // Simulamos la creación del nuevo modelo (aquí se haría una llamada a la base de datos o API)
  alert(`Modelo "${nuevoModelo}" guardado correctamente.`);
  document.getElementById("nuevo-modelo").value = ""; // Limpiar el campo de entrada
}

// Función para modificar un elemento
function modificarElemento() {
  const idModificar = document.getElementById("modificar-id").value.trim();
  const nuevoValor = document.getElementById("nuevo-valor").value.trim();

  if (idModificar === "" || nuevoValor === "") {
    alert("Por favor, ingresa el ID y el nuevo valor.");
    return;
  }

  // Simulamos la modificación del elemento (aquí se haría una llamada a la base de datos o API)
  alert(`Elemento con ID ${idModificar} modificado. Nuevo valor: ${nuevoValor}`);
  document.getElementById("modificar-id").value = ""; // Limpiar el campo de entrada
  document.getElementById("nuevo-valor").value = ""; // Limpiar el campo de entrada
}

// Función para buscar un elemento
function buscarElemento() {
  const idBuscar = document.getElementById("buscar-id").value.trim();

  // Limpiar los resultados previos
  const resultadoBuscarDiv = document.getElementById("resultado-buscar");
  resultadoBuscarDiv.innerHTML = "";

  if (idBuscar === "") {
    resultadoBuscarDiv.textContent = "Por favor, ingresa un ID para buscar.";
    return;
  }

  // Simulamos la búsqueda del elemento (aquí se haría una llamada a la base de datos o API)
  const elementoEncontrado = { id: idBuscar, modelo: 'Modelo 1 (CNN)', prediccion: '3', acertada: true };

  // Mostramos el resultado de la búsqueda
  if (elementoEncontrado) {
    resultadoBuscarDiv.innerHTML = `
      <p>ID: ${elementoEncontrado.id}</p>
      <p>Modelo: ${elementoEncontrado.modelo}</p>
      <p>Predicción: ${elementoEncontrado.prediccion}</p>
      <p>Acertada: ${elementoEncontrado.acertada ? "Sí" : "No"}</p>
    `;
  } else {
    resultadoBuscarDiv.textContent = "Elemento no encontrado.";
  }
}

// Evento para el botón Guardar
guardarBtn.addEventListener("click", guardarElemento);

// Evento para el botón Modificar
modificarBtn.addEventListener("click", modificarElemento);

// Evento para el botón Buscar
buscarBtn.addEventListener("click", buscarElemento);
