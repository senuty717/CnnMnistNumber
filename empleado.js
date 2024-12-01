// Array para almacenar los resultados guardados
let resultadosGuardados = [];

// Elementos de la tabla
const tablaResultado = document.getElementById("resultado-lista").getElementsByTagName('tbody')[0];

// Función para mostrar las predicciones en la tabla
function mostrarPredicciones(predicciones) {
  // Limpiar la tabla antes de agregar nuevos resultados
  tablaResultado.innerHTML = "";

  // Iterar sobre las predicciones y agregar una fila por cada modelo
  predicciones.forEach((prediccion, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>Modelo ${prediccion.modelo}</td>
      <td>${prediccion.indice}</td>
      <td><input type="checkbox" class="acertado-checkbox" data-modelo="${prediccion.modelo}" ${prediccion.acertado ? "checked" : ""}></td>
    `;
    tablaResultado.appendChild(fila);
  });

  // Habilitar los checkboxes para que el usuario pueda interactuar con ellos
  const checkboxes = document.querySelectorAll('.acertado-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.disabled = false; // Asegurarse de que los checkboxes son editables
  });
}

// Escuchar el evento personalizado 'actualizarPredicciones' que se dispara desde script.js
document.addEventListener('actualizarPredicciones', function(event) {
  const predicciones = event.detail; // Los datos de las predicciones están en event.detail
  mostrarPredicciones(predicciones); // Mostrar las predicciones en la tabla
});

// Lógica para el botón "Guardar"
document.getElementById('guardar-btn').addEventListener('click', function() {
  // Verificar si hay predicciones antes de guardar
  const predicciones = document.querySelectorAll('.acertado-checkbox');
  if (predicciones.length === 0) {
    alert("No hay resultados para guardar.");
    return;
  }

  // Obtener todos los checkboxes "Acertado"
  const checkboxes = document.querySelectorAll('.acertado-checkbox');
  const resultados = [];

  // Recopilar los resultados y el estado de los checkboxes
  checkboxes.forEach(checkbox => {
    resultados.push({
      modelo: checkbox.getAttribute('data-modelo'),
      acertado: checkbox.checked,
      prediccion: checkbox.closest("tr").querySelector('td:nth-child(3)').textContent // Obtener el número de la predicción
    });
  });

  // Guardar los resultados en el array
  resultadosGuardados.push(resultados);

  // Limpiar la tabla después de guardar los resultados
  tablaResultado.innerHTML = "";

  // Mostrar mensaje de éxito
  alert("Resultados guardados.");
});

// Lógica para el botón "Listar Resultados"
document.getElementById('listar-btn').addEventListener('click', function() {
  // Verificar si hay resultados guardados
  if (resultadosGuardados.length === 0) {
    alert("No hay resultados guardados.");
    return;
  }

  // Evitar que se acumulen tablas
  const tablaExistente = document.querySelector(".tabla-listado");
  if (tablaExistente) {
    tablaExistente.remove(); // Eliminar tabla existente si ya hay una mostrada
  }

  // Crear una nueva tabla para mostrar los resultados guardados
  const tablaListado = document.createElement("table");
  tablaListado.classList.add("tabla-listado");
  tablaListado.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Predicción</th>
        <th>Modelo</th>
        <th>Acertado</th>
      </tr>
    </thead>
    <tbody>
      <!-- Los resultados guardados se insertarán aquí -->
    </tbody>
  `;

  const tbody = tablaListado.querySelector('tbody');

  // Iterar sobre los resultados guardados y mostrarlos en la tabla
  resultadosGuardados.forEach((resultados, index) => {
    resultados.forEach((resultado, subIndex) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${index + 1}-${subIndex + 1}</td>
        <td>${resultado.prediccion}</td>
        <td>Modelo ${resultado.modelo}</td>
        <td><input type="checkbox" ${resultado.acertado ? "checked" : ""}></td>
      `;
      tbody.appendChild(fila);
    });
  });

  // Agregar la tabla a la página (puedes agregarla en un contenedor específico si lo deseas)
  document.body.appendChild(tablaListado);  // Se agrega al final de la página, puedes cambiar esto si necesitas agregarla en un contenedor específico
});
