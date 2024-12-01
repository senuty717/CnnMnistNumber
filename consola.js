let modelo; // Variable global para el modelo cargado
const resultadosGuardados = []; // Para almacenar los resultados guardados
const tablaResultado = document.getElementById("resultado-lista").getElementsByTagName('tbody')[0];
let idContador = 1;

// Cargar el modelo
async function cargarModelo() {
  modelo = await tf.loadLayersModel('ruta/a/tu/modelo.json'); // Asegúrate de poner la ruta correcta
  console.log("Modelo cargado!");
}

// Función para predecir y mostrar los resultados en la tabla
async function predecir() {
  // 1. Obtén la imagen del canvas
  const imagen = document.getElementById("minicanvas");
  const tensor = tf.browser.fromPixels(imagen).resizeNearestNeighbor([28, 28]).mean(2).expandDims(0).expandDims(-1).toFloat().div(tf.scalar(255));

  // 2. Realiza la predicción
  const prediccion = await modelo.predict(tensor).data();
  const prediccionArray = Array.from(prediccion);
  const maxPrediccion = Math.max(...prediccionArray);
  const modeloResultado = prediccionArray.indexOf(maxPrediccion);

  // 3. Simula que se obtiene el resultado de varios modelos (puedes agregar más lógica si tienes diferentes modelos)
  const resultados = [
    { modelo: "CNN", prediccion: modeloResultado, acertada: false },
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
    `;
    tablaResultado.appendChild(fila);
  });
}

// Cargar el modelo cuando se inicia la página
window.onload = () => {
  cargarModelo();
};

// Event listeners para los botones
document.getElementById("guardar-btn").addEventListener("click", guardarElemento);
document.getElementById("listar-btn").addEventListener("click", listarElementos);
document.getElementById("predecir").addEventListener("click", predecir);
