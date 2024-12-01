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

  // Habilitar todos los checkboxes para asegurar la interacción
  const checkboxes = document.querySelectorAll('.acertado-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.disabled = false; // Asegurarse de que los checkboxes sean interactivos
  });
}

// Escuchar el evento personalizado 'actualizarPredicciones' que se dispara desde script.js
document.addEventListener('actualizarPredicciones', function (event) {
  const predicciones = event.detail; // Los datos de las predicciones están en event.detail
  mostrarPredicciones(predicciones); // Mostrar las predicciones en la tabla
});

// Lógica para el botón "Guardar"
document.getElementById('guardar-btn').addEventListener('click', function () {
  // Verificar si hay predicciones antes de guardar
  const checkboxes = document.querySelectorAll('.acertado-checkbox');
  if (checkboxes.length === 0) {
    alert("No hay resultados para guardar.");
    return;
  }

  // Recopilar los resultados y el estado de los checkboxes
  const resultados = [];
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
  console.log("Resultados guardados:", resultados); // Para depuración
});

// Lógica para el botón "Listar Resultados"
document.getElementById('listar-btn').addEventListener('click', function () {
  // Verificar si hay resultados guardados
  if (resultadosGuardados.length === 0) {
    alert("No hay resultados guardados.");
    return;
  }

  // Crear la ventana emergente
  const ventanaFlotante = document.createElement("div");
  ventanaFlotante.id = "ventana-flotante";
  ventanaFlotante.innerHTML = `
    <div class="ventana-contenido">
      <h3>Resultados Guardados</h3>
      <table class="tabla-listado">
        <thead>
          <tr>
            <th>ID</th>
            <th>Predicción</th>
            <th>Modelo</th>
            <th>Acertado</th>
          </tr>
        </thead>
        <tbody>
          <!-- Resultados serán insertados aquí -->
        </tbody>
      </table>
      <button id="cerrar-ventana">Aceptar</button>
    </div>
  `;

  // Agregar los resultados guardados a la tabla dentro de la ventana emergente
  const tbody = ventanaFlotante.querySelector('tbody');
  resultadosGuardados.forEach((resultados, index) => {
    resultados.forEach((resultado, subIndex) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${index + 1}-${subIndex + 1}</td>
        <td>${resultado.prediccion}</td>
        <td>Modelo ${resultado.modelo}</td>
        <td><input type="checkbox" ${resultado.acertado ? "checked" : ""} disabled></td>
      `;
      tbody.appendChild(fila);
    });
  });

  // Agregar la ventana emergente al body
  document.body.appendChild(ventanaFlotante);

  // Lógica para el botón "Aceptar" (cerrar ventana)
  document.getElementById('cerrar-ventana').addEventListener('click', function () {
    ventanaFlotante.remove();
  });
});

// Listener para detectar cambios en los checkboxes (para depuración o lógica adicional)
document.addEventListener('change', (event) => {
  if (event.target.classList.contains('acertado-checkbox')) {
    console.log(`Checkbox cambiado: Modelo=${event.target.dataset.modelo}, Marcado=${event.target.checked}`);
  }
});
