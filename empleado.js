// Variables globales
let resultadosGuardados = []; // Para almacenar los resultados guardados
let idContador = 1; // Para crear un ID único por cada resultado

const guardarBtn = document.getElementById("guardar-btn");
const listarBtn = document.getElementById("listar-btn");

// Elementos de la tabla
const tablaResultado = document.getElementById("resultado-lista").getElementsByTagName('tbody')[0];

// Función para predecir y mostrar los resultados en la tabla
function predecir() {
  // 1. Obtén la imagen del canvas
  const imagen = document.getElementById("minicanvas");
  const tensor = tf.browser.fromPixels(imagen)
    .resizeNearestNeighbor([28, 28]) // Redimensiona la imagen
    .mean(2) // Convierte a escala de grises
    .expandDims(0) // Añade dimensión batch
    .expandDims(-1) // Añade dimensión de canal (grayscale)
    .toFloat()
    .div(tf.scalar(255)); // Normaliza los valores de 0 a 1

  // 2. Realiza las predicciones para cada modelo cargado
  // Asegúrate de que los modelos están cargados
  if (modelo && modelo2 && modelo3 && modelo4) {
    const predicciones = [];

    // Realiza la predicción para cada modelo
    predicciones.push({ modelo: "CNN", prediccion: modelo.predict(tensor).dataSync(), acertada: false });
    predicciones.push({ modelo: "CNN+DO", prediccion: modelo2.predict(tensor).dataSync(), acertada: false });
    predicciones.push({ modelo: "CNN+AD", prediccion: modelo3.predict(tensor).dataSync(), acertada: false });
    predicciones.push({ modelo: "CNN+DO+AD", prediccion: modelo4.predict(tensor).dataSync(), acertada: false });

    // Simulamos si las predicciones fueron acertadas o no (esto depende de tu lógica de validación)
    predicciones.forEach(resultado => {
      const prediccionArray = Array.from(resultado.prediccion);
      const maxPrediccion = Math.max(...prediccionArray);
      const modeloResultado = prediccionArray.indexOf(maxPrediccion);

      // Establecer un valor para acertada si la predicción es correcta (esto puede cambiar según el caso)
      // Aquí puedes poner tu lógica para marcar como "acertada" si el modelo predice correctamente
      resultado.acertada = (modeloResultado === 7); // Por ejemplo, si la predicción es 7

      // Limpiar la tabla antes de agregar nuevos resultados
      tablaResultado.innerHTML = "";

      // Añadir las filas con los resultados
      predicciones.forEach((resultado, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${idContador++}</td>
          <td>${resultado.modelo}</td>
          <td>${modeloResultado}</td>
          <td><input type="checkbox" ${resultado.acertada ? "checked" : ""} onclick="modificarAcertada(${idContador - 1})"></td>
        `;
        tablaResultado.appendChild(fila);

        // Guardar el resultado para futuras modificaciones o consultas
        resultadosGuardados.push({ id: idContador - 1, ...resultado });
      });
    });
  } else {
    console.log("Los modelos no están cargados correctamente.");
  }
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

// Event listeners para los botones
guardarBtn.addEventListener("click", guardarElemento);
listarBtn.addEventListener("click", listarElementos);
